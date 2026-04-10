"""
Analiza marcas en ecoplast_data.json vs brand_master / brand_alias.
Actualiza usage_count en brand_alias y normalization_dict (field=brand).
Genera ecoplast_brands_usage.csv y ambiguous_brands_from_ecoplast.csv.
"""
from __future__ import annotations

import csv
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

ECO = ROOT / "ecoplast_data.json"
MASTER_PATH = ROOT / "data-normalization" / "masters" / "brand_master.csv"
ALIAS_PATH = ROOT / "data-normalization" / "masters" / "brand_alias.csv"
NORM_PATH = ROOT / "data-normalization" / "masters" / "normalization_dict.csv"
USAGE_OUT = ROOT / "data-normalization" / "review" / "ecoplast_brands_usage.csv"
AMBIG_ECO = ROOT / "data-normalization" / "review" / "ambiguous_brands_from_ecoplast.csv"


def whole_word_pattern(phrase: str) -> re.Pattern | None:
    phrase = phrase.strip()
    if not phrase:
        return None
    parts = phrase.split()
    segs = [re.escape(p) for p in parts]
    core = r"\s+".join(segs)
    return re.compile(r"(?<!\w)" + core + r"(?!\w)", re.IGNORECASE | re.UNICODE)


def overlaps(a: tuple[int, int], used: list[tuple[int, int]]) -> bool:
    s, e = a
    for u, v in used:
        if s < v and e > u:
            return True
    return False


def read_csv_dicts(path: Path) -> tuple[list[str], list[dict]]:
    with path.open(encoding="utf-8-sig", newline="") as f:
        r = csv.DictReader(f)
        rows = list(r)
        fn = r.fieldnames or []
    return fn, rows


def main() -> int:
    with ECO.open(encoding="utf-8") as f:
        products = json.load(f)

    m_fields, master_rows = read_csv_dicts(MASTER_PATH)
    a_fields, alias_rows = read_csv_dicts(ALIAS_PATH)
    n_fields, norm_rows = read_csv_dicts(NORM_PATH)

    canon_by_id: dict[str, str] = {}
    phrases: list[tuple[str, str, str, str]] = []
    # phrase, brand_id, matched_brand_name (canonical), source: brand_master | brand_alias

    for row in master_rows:
        bid = row["brand_id"].strip()
        c = row["brand_name_canonical"].strip()
        canon_by_id[bid] = c
        phrases.append((c, bid, c, "brand_master"))

    alias_by_name_cf: dict[str, list[dict]] = defaultdict(list)
    for row in alias_rows:
        an = row["alias_name"].strip()
        phrases.append((an, row["brand_id"].strip(), canon_by_id[row["brand_id"].strip()], "brand_alias"))
        alias_by_name_cf[an.casefold()].append(row)

    # Longest phrase first; estable por phrase
    phrases_unique: list[tuple[str, str, str, str]] = []
    seen_cf: set[str] = set()
    for p in sorted(phrases, key=lambda x: (-len(x[0]), x[0].casefold())):
        cf = p[0].casefold()
        if cf in seen_cf:
            continue
        seen_cf.add(cf)
        phrases_unique.append(p)

    compiled: list[tuple[re.Pattern, str, str, str, str]] = []
    for phrase, bid, mname, src in phrases_unique:
        pat = whole_word_pattern(phrase)
        if pat:
            compiled.append((pat, phrase, bid, mname, src))

    usage_rows: list[dict] = []
    alias_hits_cf: Counter[str] = Counter()
    norm_hits_cf: Counter[str] = Counter()
    bracket_re = re.compile(r"\[([^\]]*)\]")

    n_products = 0
    n_matches = 0

    for item in products:
        n_products += 1
        sku = str(item.get("sku", "")).strip()
        name = str(item.get("name", "") or "")

        used_spans: list[tuple[int, int]] = []
        matched_keys: set[tuple[str, str]] = set()

        for pat, phrase, bid, mname, src in compiled:
            for m in pat.finditer(name):
                if overlaps(m.span(), used_spans):
                    continue
                used_spans.append(m.span())
                raw = name[m.start() : m.end()]
                n_matches += 1
                usage_rows.append(
                    {
                        "sku": sku,
                        "name": name,
                        "raw_brand_token": raw,
                        "matched_brand_id": bid,
                        "matched_brand_name": mname,
                        "source": src,
                    }
                )
                matched_keys.add((sku, raw.casefold()))
                cf_raw = raw.casefold()
                for ar in alias_rows:
                    if ar["alias_name"].strip().casefold() == cf_raw:
                        alias_hits_cf[ar["alias_name"].strip().casefold()] += 1
                for nr in norm_rows:
                    if nr.get("field", "").strip() != "brand":
                        continue
                    if nr.get("original_value", "").strip().casefold() == cf_raw:
                        norm_hits_cf[nr["original_value"].strip().casefold()] += 1

        for bm in bracket_re.finditer(name):
            inner = bm.group(1).strip()
            if not inner:
                continue
            cf_inner = inner.casefold()
            resolved_bid = ""
            resolved_name = ""
            resolved_src = ""
            for phrase, bid, mname, src in phrases_unique:
                if phrase.casefold() == cf_inner:
                    resolved_bid = bid
                    resolved_name = mname
                    resolved_src = src
                    break
            key = (sku, cf_inner)
            if resolved_bid and key in matched_keys:
                continue
            if resolved_bid:
                n_matches += 1
                matched_keys.add(key)
                usage_rows.append(
                    {
                        "sku": sku,
                        "name": name,
                        "raw_brand_token": inner,
                        "matched_brand_id": resolved_bid,
                        "matched_brand_name": resolved_name,
                        "source": resolved_src,
                    }
                )
                for ar in alias_rows:
                    if ar["alias_name"].strip().casefold() == cf_inner:
                        alias_hits_cf[ar["alias_name"].strip().casefold()] += 1
                for nr in norm_rows:
                    if nr.get("field", "").strip() != "brand":
                        continue
                    if nr.get("original_value", "").strip().casefold() == cf_inner:
                        norm_hits_cf[nr["original_value"].strip().casefold()] += 1
            else:
                usage_rows.append(
                    {
                        "sku": sku,
                        "name": name,
                        "raw_brand_token": inner,
                        "matched_brand_id": "",
                        "matched_brand_name": "",
                        "source": "",
                    }
                )

    # Escribir usage
    USAGE_OUT.parent.mkdir(parents=True, exist_ok=True)
    u_fields = ["sku", "name", "raw_brand_token", "matched_brand_id", "matched_brand_name", "source"]
    with USAGE_OUT.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=u_fields)
        w.writeheader()
        w.writerows(usage_rows)

    # Actualizar alias CSV
    for row in alias_rows:
        cf = row["alias_name"].strip().casefold()
        c = alias_hits_cf.get(cf, 0)
        row["usage_count"] = str(c) if c else ""

    with ALIAS_PATH.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=a_fields, extrasaction="ignore")
        w.writeheader()
        w.writerows(alias_rows)

    # Actualizar norm CSV
    for row in norm_rows:
        if row.get("field", "").strip() != "brand":
            continue
        ov = row.get("original_value", "").strip()
        if not ov:
            continue
        c = norm_hits_cf.get(ov.casefold(), 0)
        row["usage_count"] = str(c) if c else ""

    with NORM_PATH.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=n_fields, extrasaction="ignore")
        w.writeheader()
        w.writerows(norm_rows)

    # ambiguous_brands_from_ecoplast: sin match, freq >= 3
    token_freq: Counter[str] = Counter()
    token_example: dict[str, tuple[str, str]] = {}
    for row in usage_rows:
        if row.get("matched_brand_id", "").strip():
            continue
        t = row["raw_brand_token"].strip()
        if not t:
            continue
        ck = t.casefold()
        token_freq[ck] += 1
        if ck not in token_example:
            token_example[ck] = (t, row["sku"], row["name"])

    amb_rows = []
    for ck, freq in token_freq.items():
        if freq < 3:
            continue
        raw_disp, ex_sku, ex_name = token_example[ck]
        amb_rows.append(
            {
                "raw_brand_token": raw_disp,
                "frequency": str(freq),
                "example_product_name": ex_name,
                "example_sku": ex_sku,
            }
        )
    amb_rows.sort(key=lambda x: (-int(x["frequency"]), x["raw_brand_token"].casefold()))

    amb_fields = ["raw_brand_token", "frequency", "example_product_name", "example_sku"]
    with AMBIG_ECO.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=amb_fields)
        w.writeheader()
        w.writerows(amb_rows)

    # Top 20 tokens (todos)
    all_tf: Counter[str] = Counter()
    token_match: dict[str, bool] = {}
    for row in usage_rows:
        t = row["raw_brand_token"].strip()
        if not t:
            continue
        ck = t.casefold()
        all_tf[ck] += 1
        has = bool(row.get("matched_brand_id", "").strip())
        token_match[ck] = token_match.get(ck, False) or has

    top20 = all_tf.most_common(20)

    first_raw_all: dict[str, str] = {}
    for row in usage_rows:
        t = row["raw_brand_token"].strip()
        if not t:
            continue
        ck = t.casefold()
        if ck not in first_raw_all:
            first_raw_all[ck] = t

    # Ejemplos: una con match, una sin
    ex_match = next((r for r in usage_rows if r.get("matched_brand_id")), None)
    ex_nomatch = next((r for r in usage_rows if not r.get("matched_brand_id", "").strip()), None)

    print("productos_ecoplast_procesados", n_products)
    print("coincidencias_marca_detectadas", n_matches)
    print("filas_ecoplast_brands_usage", len(usage_rows))
    print("ambiguous_brands_from_ecoplast_filas", len(amb_rows))
    print("top20_raw_brand_token")
    for ck, fr in top20:
        disp = first_raw_all.get(ck, ck)
        mt = "match" if token_match.get(ck) else "sin_match"
        print(f"  {disp!r}\t{fr}\t{mt}")
    print("ejemplo_con_match", ex_match)
    print("ejemplo_sin_match", ex_nomatch)
    print()
    print("--- reglas_tokenizacion (no normalizacion extra) ---")
    print(
        "1) Match de frase conocida (brand_name_canonical o alias_name) en name con "
        "regex (?<!\\w)...(?!\\w) por palabra completa (re.UNICODE); "
        "frases compuestas permiten espacios flexibles (\\s+) entre tokens."
    )
    print(
        "2) Orden de aplicacion: frases unicas ordenadas por longitud descendente; "
        "no se solapan spans en el mismo producto (primera coincidencia gana el tramo)."
    )
    print(
        "3) Contenido entre corchetes [...] se revisa despues: si coincide exactamente "
        "(casefold) con un canónico o alias, se omite fila duplicada si ya hubo match "
        "en ese sku con el mismo token; si no coincide con ninguno, se emite fila sin match."
    )
    print(
        "4) raw_brand_token: substring exacta del name para match en texto; "
        "interior de corchetes .strip() cuando la fila proviene solo del análisis de corchetes."
    )

    return 0


if __name__ == "__main__":
    sys.exit(main())
