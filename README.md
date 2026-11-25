# Music Spectrum Build.3 — Pre-Alpha

Open index.html in a browser. Offline, no dependencies. genres.json is the editable source dataset; the HTML embeds a snapshot. Export edited values from the UI as JSON. Browser local storage may be unavailable on some file viewers.

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