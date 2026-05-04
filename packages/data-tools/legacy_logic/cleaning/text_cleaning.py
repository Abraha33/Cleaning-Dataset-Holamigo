"""
text_cleaning.py
Funciones para limpiar y normalizar texto de nombres de productos.
Usado para generar texto_match antes de calcular embeddings.
"""

import re
import unicodedata
import pandas as pd


def normalize_text(x: str) -> str:
    """Normalización base: lowercase, sin acentos, sin caracteres especiales."""
    if pd.isna(x):
        return ''
    x = str(x).strip().lower()
    x = unicodedata.normalize('NFKD', x).encode('ascii', 'ignore').decode('utf-8')
    x = re.sub(r'[^a-z0-9%+./ -]', ' ', x)
    x = re.sub(r'\s+', ' ', x).strip()
    return x


def extract_brand_from_brackets(name: str) -> str:
    """Extrae la marca entre corchetes del nombre de un producto B.
    
    Ejemplo: 'Vaso 8oz [Darnel]' → 'Darnel'
    """
    if pd.isna(name):
        return ''
    m = re.search(r'\[([^\]]+)\]', str(name))
    return m.group(1).strip() if m else ''


def clean_name_remove_brand(name: str) -> str:
    """Elimina la marca entre corchetes del nombre para limpiar el texto_match.
    
    Ejemplo: 'Vaso 8oz [Darnel]' → 'Vaso 8oz'
    """
    if pd.isna(name):
        return ''
    clean = re.sub(r'\[[^\]]+\]', '', str(name))
    return re.sub(r'\s+', ' ', clean).strip()


def build_texto_match(df: pd.DataFrame, col_nombre: str, remove_brand: bool = True) -> pd.Series:
    """Construye la columna texto_match a partir de la columna de nombre.
    
    Args:
        df: DataFrame con la columna de nombre.
        col_nombre: nombre de la columna con el nombre del producto.
        remove_brand: si True, elimina marca entre corchetes antes de normalizar.
    
    Returns:
        Serie con texto_match normalizado.
    """
    if remove_brand:
        nombres = df[col_nombre].apply(clean_name_remove_brand)
    else:
        nombres = df[col_nombre]
    return nombres.apply(normalize_text)
