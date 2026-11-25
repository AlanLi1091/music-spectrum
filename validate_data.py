"""Check the canonical genre data and the offline snapshot."""

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SCORES = ("energy", "function", "popularity")
DNA_KEYS = {
    "rhythm", "tempo", "instrumentation", "timbre", "melody", "harmony",
    "structure", "vocal_lyrics", "emotion", "production",
}


def validate_records(records):
    if not isinstance(records, list) or not records:
        raise ValueError("genres.json must contain a nonempty array of records")

    ids = set()
    for index, record in enumerate(records, start=1):
        location = f"genres.json record {index}"
        if not isinstance(record, dict):
            raise ValueError(f"{location} must be an object")

        for field in ("id", "name", "family"):
            value = record.get(field)
            if not isinstance(value, str) or not value.strip():
                raise ValueError(f"{location}: {field} must be a nonempty string")

        record_id = record["id"]
        location = f"{location} ({record_id})"
        if record_id in ids:
            raise ValueError(f"{location}: duplicate ID")
        ids.add(record_id)

        kind = record.get("kind")
        if kind not in ("genre_or_style", "compilation"):
            raise ValueError(f"{location}: unrecognized kind")

        status = record.get("status")
        if status not in ("provisional", "unrated"):
            raise ValueError(f"{location}: unrecognized status")

        for field in SCORES:
            if field not in record:
                raise ValueError(f"{location}: missing {field}")
            score = record[field]
            if score is None:
                continue
            if type(score) not in (int, float) or not 0 <= score <= 100:
                raise ValueError(f"{location}: {field} must be null or a number from 0 to 100")
            if status == "unrated":
                raise ValueError(f"{location}: unrated record has a value for {field}")

        dna = record.get("dna")
        if not isinstance(dna, dict):
            raise ValueError(f"{location}: dna must be an object")
        if kind == "compilation" and not dna:
            continue
        if dna.keys() != DNA_KEYS:
            raise ValueError(f"{location}: dna does not contain the ten documented keys")


def validate_snapshot(records, html):
    declarations = list(re.finditer(r"\bconst\s+seed\s*=\s*", html))
    if len(declarations) != 1:
        raise ValueError("index.html must contain exactly one const seed declaration")

    payload = html[declarations[0].end():]
    snapshot, end = json.JSONDecoder().raw_decode(payload)
    if not payload[end:].lstrip().startswith(";"):
        raise ValueError("index.html: expected a semicolon after the embedded JSON")
    if json.dumps(snapshot, sort_keys=True) != json.dumps(records, sort_keys=True):
        raise ValueError("index.html: embedded seed differs from genres.json")


def main():
    try:
        records = json.loads((ROOT / "genres.json").read_text(encoding="utf-8"))
        validate_records(records)
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        validate_snapshot(records, html)
    except (OSError, ValueError) as error:
        print(f"Data validation failed: {error}", file=sys.stderr)
        return 1

    print(f"Validated {len(records)} records and the matching offline snapshot.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
