"""Run every development check from the repository root and summarize the results."""

import argparse
import os
from pathlib import Path
import subprocess
import sys


ROOT = Path(__file__).resolve().parent.parent
PLAYWRIGHT = ROOT / "tests" / "node_modules" / "playwright" / "package.json"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--skip-browser", action="store_true",
        help="skip the browser suite; it is reported as skipped, not passed",
    )
    args = parser.parse_args()

    checks = [
        ("data validation", [sys.executable, "validate_data.py"], {}),
        ("inline JavaScript syntax", [sys.executable, "tests/check_inline_js.py"], {}),
        ("browser test syntax", ["node", "--check", "tests/browser.test.mjs"], {}),
    ]
    if not args.skip_browser:
        checks.append((
            "browser regression suite",
            ["node", "--test", "tests/browser.test.mjs"],
            {"PLAYWRIGHT_BROWSERS_PATH": os.environ.get("PLAYWRIGHT_BROWSERS_PATH", "0")},
        ))

    results = []
    for name, command, extra_env in checks:
        print(f"== {name}: {' '.join(command)}", flush=True)
        if name == "browser regression suite" and not PLAYWRIGHT.exists():
            print("Playwright is not installed. See README.md, Optional development checks.")
            results.append((name, "FAIL"))
            continue
        try:
            code = subprocess.run(command, cwd=ROOT, env={**os.environ, **extra_env}).returncode
        except FileNotFoundError as error:
            print(f"Cannot run {command[0]}: {error}")
            code = 1
        results.append((name, "PASS" if code == 0 else f"FAIL (exit {code})"))

    if args.skip_browser:
        results.append(("browser regression suite", "SKIPPED"))

    print("\nSummary:")
    for name, status in results:
        print(f"  {status:<14} {name}")
    return 0 if all(status in ("PASS", "SKIPPED") for _, status in results) else 1


if __name__ == "__main__":
    sys.exit(main())
