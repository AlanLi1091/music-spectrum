# AGENTS.md — Music Spectrum

## Mission and authority
Build a navigable map of human music using three independent indices, a documented taxonomy, and eventually track, compilation and playlist analysis. The owner defines product requirements, constraints and acceptance criteria; agents choose implementation details. Do not change the core model, scope, release stage or licensing without owner approval. Prefer small, reversible changes.

## Canonical model
All indices are 0–100 inclusive. None measures musical quality.
- Energy Index (EI; `energy`): perceived musical drive and intensity, including rhythm, percussion, bass, density, tension and motion. BPM alone is not energy.
- Function Index (FI; `function`): attentional salience under comparable listening conditions. 0 = pure utility/background; 100 = effectively unignorable. Context, playback level and listener familiarity matter. FI is not a measure of usefulness.
- Popularity Index (PI; `popularity`): mainstream reach and recognition. 0 = extremely obscure; 100 = exceptionally widespread. Record geography, platform, reference year and methodology when available. Existing estimates use global reach and provisional reference year 2026.
- Preserve X=EI, Y=FI, Z=PI, with PI vertical. Auxiliary attributes do not replace these axes.

## Data and taxonomy
- `genres.json` is the editable canonical dataset; `index.html` currently embeds a snapshot for offline use. Keep the two synchronized whenever data changes.
- Preserve stable IDs and existing fields: id, name, family, kind, energy, function, popularity, status, dna. Do not silently delete or renumber records.
- Unknown or unevaluated values are null, never zero. Preserve provisional/unrated status; distinguish subjective estimates from empirical measurements. Never fabricate genres, references, listening tests, statistics or confidence.
- Document sources, reference tracks, scoring rationale, listening conditions and uncertainty where available. Do not describe a genre estimate as a measured track score. PI comparisons require compatible scope and time.
- Distinguish genre, subgenre, microgenre, cultural/geographic labels, hybrids and compilation series. Allow multiple parent relationships and aliases; prefer stable IDs over name-based joins. For each merge, record the original IDs, the retained ID, the rationale, and the supporting evidence. Keep previous IDs traceable through the migration record. Log uncertain cases for review and leave their records intact until the classification rule is confirmed. Genre distributions may overlap.
- Existing DNA placeholders: rhythm, tempo, instrumentation, timbre, melody, harmony, structure, vocal_lyrics, emotion, production. Populate only with support; distinguish typical traits from mandatory definitions.
- Existing seed is a mixed, incomplete taxonomy, not an exhaustive validated ontology. Reference MusicBrainz and Every Noise at Once for reconciliation, not as automatic proof of structural uniqueness. Respect source licensing and attribution.
- Long-term goals: normalize the seed, document scores and ranges, add regional/time-dependent PI, expand coverage, then support track/playlist analysis and exploratory hybrid combinations. Label hypothetical combinations explicitly.

## Engineering constraints
Keep the app lightweight, static, offline-capable and maintainable. Prefer plain HTML/CSS/JavaScript and JSON; no mandatory backend, external API, build system or runtime dependency without approval. Preserve rotation, sliders, search, filtering, nearest-neighbor discovery, local edits and JSON export. Handle unavailable storage gracefully. Avoid unnecessary rewrites and dependencies. Never commit credentials or private user data.

## Validation and acceptance
Before committing, inspect the current implementation and affected data. Validate JSON parsing, unique IDs, score types/ranges, null handling, DNA schema and snapshot consistency; explain intentional count changes. Check JavaScript syntax and, when a browser is available, test loading, rotation, all three sliders, search/filter, selection, edit persistence and export. Check mobile layout and accessibility for UI changes. Test affected features and regressions; do not claim tests that were not run. Report changes, evidence, known limitations and any owner decisions needed. The owner has final experience-side acceptance.

## Git and release policy
Current stage: Pre-Alpha. Planned milestones are in `Roadmap.md`. Git tag refs are authoritative for tags that exist. Use case-sensitive `build.N` tags unless the owner specifies otherwise; do not introduce semantic release versions prematurely. Read existing changes before editing, keep commits focused, and never force-push or overwrite existing tags. Commit and push only as authorized; create tags/releases only with explicit authorization. Verify remote commit and tag before reporting success. Do not confuse a branch, commit message or version label with an actual Git tag.
