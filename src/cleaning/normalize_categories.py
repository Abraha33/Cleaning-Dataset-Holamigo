"""
normalize_categories.py
Funciones para normalizar categorías y subcategorías usando el árbol de categorias.json.
"""

import json
import re
import unicodedata
import pandas as pd


def load_categories_oracle(categorias_path: str) -> dict:
    """Carga el árbol de categorias.json y construye un índice plano.
    
    Retorna un dict de {nombre_normalizado: codigo}.
    """
    with open(categorias_path, 'r', encoding='utf-8') as f:
        tree = json.load(f)
    
    index = {}
    _flatten_tree(tree, index)
    return index


def _flatten_tree(node, index, prefix=''):
    """Recorre el árbol de categorías recursivamente y construye el índice plano."""
    if isinstance(node, dict):
        name = node.get('nombre') or node.get('name') or ''
        code = node.get('codigo') or node.get('code') or prefix
        if name:
            index[_norm_key(name)] = code
        children = node.get('hijos') or node.get('children') or node.get('subcategorias') or []
        for child in children:
            _flatten_tree(child, index, prefix=code)
    elif isinstance(node, list):
        for item in node:
            _flatten_tree(item, index, prefix)


def _norm_key(x: str) -> str:
    x = str(x).strip().lower()
    x = unicodedata.normalize('NFKD', x).encode('ascii', 'ignore').decode('utf-8')
    x = re.sub(r'\s+', ' ', x)
    return x


def normalize_category(cat: str, oracle: dict) -> str:
    """Intenta mapear una categoría a su código en la taxonomía.
    
    Retorna el código si lo encuentra, o la categoría original normalizada si no.
    """
    if pd.isna(cat) or str(cat).strip() == '':
        return ''
    key = _norm_key(cat)
    return oracle.get(key, cat.strip())
