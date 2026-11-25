"""Check inline JavaScript in the offline entry point with Node."""

import argparse
from html.parser import HTMLParser
from pathlib import Path
import subprocess
import sys


class InlineScripts(HTMLParser):
    def __init__(self):
        super().__init__()
        self.scripts = []
        self.active = None

    def handle_starttag(self, tag, attrs):
        if tag != "script":
            return
        attributes = dict(attrs)
        script_type = (attributes.get("type") or "").strip().lower()
        if "src" not in attributes and script_type in (
            "", "module", "text/javascript", "application/javascript",
            "text/ecmascript", "application/ecmascript",
        ):
            self.active = (self.getpos()[0], script_type, [])

    def handle_data(self, data):
        if self.active is not None:
            self.active[2].append(data)

    def handle_endtag(self, tag):
        if tag == "script" and self.active is not None:
            self.scripts.append(self.active)
            self.active = None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("html", nargs="?", type=Path,
                        default=Path(__file__).resolve().parents[1] / "index.html")
    path = parser.parse_args().html
    extractor = InlineScripts()
    extractor.feed(path.read_text(encoding="utf-8"))
    extractor.close()
    if extractor.active is not None:
        print(f"{path}: unclosed inline script", file=sys.stderr)
        return 1
    if not extractor.scripts:
        print(f"{path}: no inline JavaScript found", file=sys.stderr)
        return 1

    failed = False
    for line, script_type, chunks in extractor.scripts:
        mode = "module" if script_type == "module" else "commonjs"
        script = "\n" * (line - 1) + "".join(chunks)
        result = subprocess.run(
            ["node", "--check", f"--input-type={mode}"],
            input=script, text=True, capture_output=True,
        )
        if result.returncode:
            failed = True
            print(f"{path}: inline JavaScript starting at line {line}", file=sys.stderr)
            print(result.stderr, end="", file=sys.stderr)

    if failed:
        return 1
    print(f"JavaScript syntax OK ({len(extractor.scripts)} inline script(s)).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
