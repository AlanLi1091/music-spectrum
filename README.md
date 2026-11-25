# Music Spectrum Build.3 — Pre-Alpha

Open index.html in a browser. Offline, no dependencies. genres.json is the editable source dataset; the HTML embeds a snapshot. Export edited values from the UI as JSON. Browser local storage may be unavailable on some file viewers.

## Optional development checks

The app opens directly from `index.html`. The development checks require Python 3,
Node.js 20 or later, and npm. From the repository root, install the locked test
dependency and its headless Chromium browser:

```sh
npm --prefix tests ci
PLAYWRIGHT_BROWSERS_PATH=0 tests/node_modules/.bin/playwright install chromium --only-shell
```

Run all checks from the repository root. The command exits nonzero if any check
fails; `--skip-browser` reports the browser suite as skipped, not passed:

```sh
python3 tests/run_all.py
```

Or run each check individually:

```sh
python3 validate_data.py
python3 tests/check_inline_js.py
PLAYWRIGHT_BROWSERS_PATH=0 node --test tests/browser.test.mjs
```

The browser suite opens the local HTML file in a headless browser with an
isolated, offline context for each test. The install commands need internet
access. Normal app use and checks after installation work offline.

## Model
- EI: perceived musical drive and intensity, 0–100.
- FI: attentional salience, 0–100, from utility/background to unignorable under comparable listening conditions.
- PI: global mainstream reach, 0–100, provisional reference year 2026. Region, platform and year should be added before empirical scoring.
- All scores are provisional subjective estimates; null means not evaluated, never zero. No axis represents quality.
- The seed taxonomy mixes genre, subgenre, cultural labels and compilation series. It is not an exhaustive or verified ontology. A future version should add aliases, multiple parent IDs, distributions, regional PI and evidence per score.
- DNA fields are placeholders, not completed annotations.

## References for future taxonomy reconciliation
https://musicbrainz.org/genres
https://everynoise.com/

## Next milestones
1. Normalize aliases and split cultural labels from musical structures.
2. Score remaining seed entries with documented reference tracks and listening conditions.
3. Add ranges, confidence, regional PI and empirical evidence.
4. Expand to thousands of labels; add track and playlist analysis.