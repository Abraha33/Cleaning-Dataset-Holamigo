"""
family_filtered_matching.py
Matching semántico filtrado por familias de producto.

Flujo:
1. Para cada producto B, identificar su familia_b.
2. Obtener familias_a compatibles usando MAPA_FAMILIAS.
3. Filtrar df_a al subconjunto de esas familias.
4. Calcular similitud solo dentro del subconjunto.
5. Etiquetar: alta / media / sin_match.
"""

import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

from src.features.build_familias import MAPA_FAMILIAS


THRESH_ALTA  = 0.85
THRESH_MEDIA = 0.70


def classify_confidence(score: float) -> str:
    if score >= THRESH_ALTA:
        return 'alta'
    if score >= THRESH_MEDIA:
        return 'media'
    return 'sin_match'


def run_family_filtered_matching(
    df_b: pd.DataFrame,
    df_a: pd.DataFrame,
    emb_b: np.ndarray,
    emb_a: np.ndarray,
    k: int = 3
) -> pd.DataFrame:
    """
    Ejecuta el matching filtrado por familias entre B (query) y A (corpus).

    Args:
        df_b: DataFrame con columnas [sku, nombre_b, familia_b].
        df_a: DataFrame con columnas [Codigo, nombre_a, familia_a, Marca].
        emb_b: Embeddings de df_b (mismo orden de filas).
        emb_a: Embeddings de df_a (mismo orden de filas).
        k: Top-k candidatos por producto B.

    Returns:
        DataFrame con columnas:
        [id_b, nombre_b, familia_b, id_a, nombre_a, familia_a,
         score, rank, nivel_confianza]
    """
    results = []

    for i, row_b in df_b.reset_index(drop=True).iterrows():
        familia_b = row_b.get('familia_b', 'SIN_FAMILIA')
        familias_ok = MAPA_FAMILIAS.get(familia_b, None)

        if familias_ok is None:
            # Familia no mapeada → sin_match directo
            results.append({
                'id_b':            row_b.get('sku', i),
                'nombre_b':        row_b.get('texto_match', ''),
                'familia_b':       familia_b,
                'id_a':            None,
                'nombre_a':        None,
                'familia_a':       None,
                'score':           0.0,
                'rank':            1,
                'nivel_confianza': 'sin_match'
            })
            continue

        # Filtrar corpus A a familias compatibles
        df_a_filt = df_a[df_a['familia_a'].isin(familias_ok)].reset_index(drop=True)
        
        if df_a_filt.empty:
            results.append({
                'id_b':            row_b.get('sku', i),
                'nombre_b':        row_b.get('texto_match', ''),
                'familia_b':       familia_b,
                'id_a':            None,
                'nombre_a':        None,
                'familia_a':       None,
                'score':           0.0,
                'rank':            1,
                'nivel_confianza': 'sin_match'
            })
            continue

        # Índices originales de df_a para extraer embeddings correctos
        idx_a_filt = df_a[df_a['familia_a'].isin(familias_ok)].index.tolist()
        emb_a_filt = emb_a[idx_a_filt]

        # Similitud coseno
        sims = cosine_similarity(emb_b[i:i+1], emb_a_filt)[0]
        top_idx = np.argsort(sims)[::-1][:k]

        for rank, j in enumerate(top_idx, start=1):
            row_a = df_a_filt.iloc[j]
            score = float(sims[j])
            results.append({
                'id_b':            row_b.get('sku', i),
                'nombre_b':        row_b.get('texto_match', ''),
                'familia_b':       familia_b,
                'id_a':            row_a.get('Codigo', None),
                'nombre_a':        row_a.get('texto_match', ''),
                'familia_a':       row_a.get('familia_a', None),
                'score':           score,
                'rank':            rank,
                'nivel_confianza': classify_confidence(score) if rank == 1 else None
            })

    return pd.DataFrame(results)
