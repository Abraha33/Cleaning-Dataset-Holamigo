"""
embeddings_similarity.py
Genera embeddings con sentence-transformers y calcula matrices de similitud coseno.
"""

import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


DEFAULT_MODEL = 'sentence-transformers/all-MiniLM-L6-v2'


def build_embeddings(texts: list, model_name: str = DEFAULT_MODEL, batch_size: int = 64) -> np.ndarray:
    """Genera embeddings normalizados para una lista de textos."""
    model = SentenceTransformer(model_name)
    embeddings = model.encode(
        texts,
        normalize_embeddings=True,
        batch_size=batch_size,
        show_progress_bar=True
    )
    return embeddings


def compute_similarity_matrix(emb_query: np.ndarray, emb_corpus: np.ndarray) -> np.ndarray:
    """Calcula la matriz de similitud coseno entre queries y corpus.
    
    Returns:
        Matriz de shape (n_queries, n_corpus) con scores 0-1.
    """
    return cosine_similarity(emb_query, emb_corpus)


def get_top_k_matches(
    df_query: pd.DataFrame,
    df_corpus: pd.DataFrame,
    emb_query: np.ndarray,
    emb_corpus: np.ndarray,
    k: int = 3,
    id_col_query: str = 'sku',
    id_col_corpus: str = 'Codigo',
    name_col_query: str = 'texto_match',
    name_col_corpus: str = 'texto_match'
) -> pd.DataFrame:
    """Para cada elemento de query, obtiene los top-k matches del corpus.
    
    Returns:
        DataFrame con columnas: id_b, nombre_b, id_a, nombre_a, score, rank
    """
    sim_matrix = compute_similarity_matrix(emb_query, emb_corpus)
    
    results = []
    for i, (idx_q, row_q) in enumerate(df_query.iterrows()):
        top_indices = np.argsort(sim_matrix[i])[::-1][:k]
        for rank, j in enumerate(top_indices, start=1):
            row_c = df_corpus.iloc[j]
            results.append({
                'id_b':      row_q.get(id_col_query, i),
                'nombre_b':  row_q.get(name_col_query, ''),
                'id_a':      row_c.get(id_col_corpus, j),
                'nombre_a':  row_c.get(name_col_corpus, ''),
                'score':     float(sim_matrix[i][j]),
                'rank':      rank
            })
    return pd.DataFrame(results)
