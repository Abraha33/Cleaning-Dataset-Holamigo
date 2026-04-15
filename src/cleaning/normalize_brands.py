"""
normalize_brands.py
Funciones para normalizar marcas usando el oráculo de marcas (brands.json / marcas_oraculo.json).
"""

import json
import re
import unicodedata
import pandas as pd
from pathlib import Path


def load_brands_oracle(brands_path: str) -> dict:
    """Carga el oráculo de marcas desde un JSON.
    
    Retorna un dict de {variante_normalizada: marca_oficial}.
    """
    with open(brands_path, 'r', encoding='utf-8') as f:
        brands_raw = json.load(f)
    
    oracle = {}
    if isinstance(brands_raw, list):
        for brand in brands_raw:
            nombre = brand if isinstance(brand, str) else brand.get('name', '')
            key = _norm_key(nombre)
            oracle[key] = nombre.strip()
    elif isinstance(brands_raw, dict):
        for oficial, variantes in brands_raw.items():
            oracle[_norm_key(oficial)] = oficial
            if isinstance(variantes, list):
                for v in variantes:
                    oracle[_norm_key(v)] = oficial
    return oracle


def _norm_key(x: str) -> str:
    """Clave de normalización interna: uppercase, sin acentos, sin espacios dobles."""
    x = str(x).strip().upper()
    x = unicodedata.normalize('NFKD', x).encode('ascii', 'ignore').decode('utf-8')
    x = re.sub(r'\s+', ' ', x)
    return x


def normalize_brand(brand: str, oracle: dict, fallback: str = None) -> str:
    """Normaliza una marca usando el oráculo.
    
    Si no se encuentra en el oráculo, retorna el fallback (o la marca original si fallback es None).
    """
    if pd.isna(brand) or str(brand).strip() == '':
        return fallback or ''
    key = _norm_key(brand)
    return oracle.get(key, fallback or brand.strip())


def apply_brand_normalization(df: pd.DataFrame, col_marca: str, oracle: dict) -> pd.Series:
    """Aplica normalización de marca a toda una columna del DataFrame."""
    return df[col_marca].apply(lambda x: normalize_brand(x, oracle))
