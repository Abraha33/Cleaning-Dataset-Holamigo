"""
build_familias.py
Construye las columnas familia_a y familia_b que agrupan productos en familias semánticas.
Estas familias son el filtro previo al matching semántico.
"""

import re
import unicodedata
import pandas as pd


def _norm(x: str) -> str:
    if pd.isna(x):
        return ''
    x = str(x).strip().lower()
    x = unicodedata.normalize('NFKD', x).encode('ascii', 'ignore').decode('utf-8')
    x = re.sub(r'\s+', ' ', x)
    return x


def get_familia_a(row: pd.Series) -> str:
    """Deriva familia_a a partir de Categoría y Subcategoría del catálogo A (ERP)."""
    c = _norm(row.get('Categoría', ''))
    s = _norm(row.get('Subcategoría', ''))

    if 'bolsa' in c:
        if 'papel' in s:         return 'BOLSAS_PAPEL'
        if 'manija' in s:        return 'BOLSAS_PAPEL'
        if 'aseo' in s:          return 'BOLSAS_ASEO'
        if 'fondo cuadrado' in s: return 'BOLSAS_PAPEL'
        return 'BOLSAS_OTRAS'

    if 'caja' in c:
        if 'pizza' in s:         return 'CAJAS_PIZZA'
        if 'torta' in s:         return 'CAJAS_TORTA'
        if 'brownie' in s:       return 'CAJAS_REPOSTERIA'
        if 'cupcake' in s:       return 'CAJAS_REPOSTERIA'
        if 'hamburguesa' in s:   return 'CAJAS_HAMBURGUESA'
        return 'CAJAS_OTRAS'

    if 'desechable' in c:
        if 'parafinado' in s or 'parafin' in s: return 'PARAFINADO'
        if 'vaso' in s:          return 'VASOS'
        if 'plato' in s:         return 'PLATOS'
        if 'cubierto' in s:      return 'CUBIERTOS'
        if 'aluminio' in s:      return 'ALUMINIO'
        return 'DESECHABLES_OTROS'

    if 'contenedor' in c:
        if 'torta' in s:         return 'CONTENEDOR_TORTA'
        if 'visual' in s:        return 'CONTENEDOR_VISUAL'
        if 'sello' in s:         return 'CONTENEDOR_SELLO'
        return 'CONTENEDOR_OTROS'

    if 'embalaje' in c:
        if 'vinipel' in s or 'strech' in s: return 'EMBALAJE_FILM'
        if 'cinta' in s:         return 'EMBALAJE_CINTA'
        return 'EMBALAJE_OTROS'

    if 'higiene' in c or 'aseo' in c or 'limpieza' in c:
        return 'HIGIENE_LIMPIEZA'

    if 'papel' in c:
        return 'PAPEL_OTROS'

    base = (c + '_' + s).strip('_')
    return base if base else 'SIN_FAMILIA'


def get_familia_b(row: pd.Series) -> str:
    """Deriva familia_b a partir de category del catálogo B (externo)."""
    cat = _norm(row.get('category', ''))

    # Repostería
    if 'cupcakes' in cat:                   return 'CUPCAKES'
    if 'ponques' in cat:                    return 'CAJAS_REPOSTERIA'
    if 'brownies' in cat:                   return 'CAJAS_REPOSTERIA'

    # Tapas y moldes
    if 'tapas de carton' in cat:            return 'TAPAS_CARTON'
    if 'tapas plasticas' in cat:            return 'TAPAS_PLASTICO'
    if 'moldes de aluminio' in cat:         return 'ALUMINIO'
    if 'rollos de aluminio' in cat:         return 'ALUMINIO'

    # Desechables por material
    if 'de pet' in cat:                     return 'DESECHABLES_PET'
    if 'de icopor' in cat:                  return 'ICOPOR'
    if 'de madera' in cat:                  return 'MADERA'
    if 'de plastico' in cat:
        if 'vasos' in cat:                  return 'VASOS'
        if 'copas' in cat:                  return 'VASOS'
        if 'cubiertos' in cat:              return 'CUBIERTOS'
        if 'platos' in cat:                 return 'PLATOS'
        return 'DESECHABLES_PLASTICO'
    if 'de carton' in cat or 'bio' in cat:
        if 'vasos' in cat:                  return 'VASOS_CARTON'
        return 'DESECHABLES_CARTON'
    if 'de papel' in cat:                   return 'PAPEL_OTROS'
    if 'de alumnio' in cat or 'aluminio' in cat: return 'ALUMINIO'

    # Bolsas
    if 'bolsas' in cat:                     return 'BOLSAS'

    # Embalaje
    if 'embalaje' in cat:                   return 'EMBALAJE_OTROS'

    # Higiene / alimentos
    if 'higiene' in cat or 'limpieza' in cat or 'aseo personal' in cat:
        return 'HIGIENE_LIMPIEZA'
    if 'alimentos' in cat or 'abarrotes' in cat or 'bebidas' in cat:
        return 'ALIMENTOS'

    return cat if cat else 'SIN_FAMILIA'


def build_familias(df_a: pd.DataFrame, df_b: pd.DataFrame):
    """Añade familia_a a df_a y familia_b a df_b in-place."""
    df_a['familia_a'] = df_a.apply(get_familia_a, axis=1)
    df_b['familia_b'] = df_b.apply(get_familia_b, axis=1)
    return df_a, df_b


# Mapa de compatibilidad familia_b → familias_a
MAPA_FAMILIAS = {
    'CUPCAKES':            ['DESECHABLES_OTROS', 'CONTENEDOR_VISUAL', 'CONTENEDOR_OTROS'],
    'CAJAS_REPOSTERIA':    ['CAJAS_REPOSTERIA', 'CAJAS_OTRAS'],
    'TAPAS_CARTON':        ['DESECHABLES_OTROS', 'PARAFINADO', 'PAPEL_OTROS'],
    'TAPAS_PLASTICO':      ['DESECHABLES_OTROS', 'DESECHABLES_PLASTICO'],
    'ALUMINIO':            ['ALUMINIO', 'DESECHABLES_OTROS'],
    'DESECHABLES_PET':     ['DESECHABLES_OTROS', 'CONTENEDOR_VISUAL', 'CONTENEDOR_SELLO'],
    'ICOPOR':              ['DESECHABLES_OTROS'],
    'MADERA':              ['DESECHABLES_OTROS'],
    'VASOS':               ['VASOS', 'DESECHABLES_OTROS'],
    'VASOS_CARTON':        ['VASOS', 'DESECHABLES_OTROS'],
    'CUBIERTOS':           ['CUBIERTOS', 'DESECHABLES_OTROS'],
    'PLATOS':              ['PLATOS', 'DESECHABLES_OTROS'],
    'DESECHABLES_PLASTICO':['DESECHABLES_OTROS'],
    'DESECHABLES_CARTON':  ['DESECHABLES_OTROS', 'PARAFINADO'],
    'PAPEL_OTROS':         ['PAPEL_OTROS', 'DESECHABLES_OTROS', 'PARAFINADO'],
    'BOLSAS':              ['BOLSAS_OTRAS', 'BOLSAS_PAPEL', 'BOLSAS_ASEO'],
    'EMBALAJE_OTROS':      ['EMBALAJE_FILM', 'EMBALAJE_CINTA', 'EMBALAJE_OTROS'],
    'HIGIENE_LIMPIEZA':    ['HIGIENE_LIMPIEZA'],
    'ALIMENTOS':           ['SIN_FAMILIA'],
    'CAJAS_PIZZA':         ['CAJAS_PIZZA', 'CAJAS_OTRAS'],
}
