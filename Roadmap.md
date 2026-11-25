# Music Spectrum — Development Roadmap

Status: **Pre-Alpha**. Roadmap milestone: `build.5` (planned tag; Git refs are authoritative).

## Direction

Use a stage-driven rather than date-driven roadmap. Advance only after the owner accepts the current stage's exit criteria. The product evolves from a classification tool into a global music atlas, discovery engine, analytics platform, and ultimately a Music Possibility Space.

## Baseline at roadmap creation

- 640 seed records, 640 unique IDs, 19 families.
- 633 genre/style records and 7 compilation records; these are not yet a normalized ontology.
- 105 complete EI/FI/PI scores (16.4%); 535 records lack at least one score.
- 111 provisional and 529 unrated records according to the existing status field.
- Music DNA annotations: 0 records populated.
- Static offline-capable prototype, three-dimensional explorer, canonical JSON database, and shared agent instructions. Browser interaction and comprehensive data validation remain to be completed.

## Phase 0 — Pre-Alpha: Foundations (current)

- [x] Energy Index (EI), Function Index (FI), Popularity Index (PI) definitions.
- [x] Three-dimensional interactive spectrum prototype.
- [x] 640-record seed database.
- [x] Agent development governance (AGENTS.md and CLAUDE.md).
- [ ] Normalize taxonomy, reconcile aliases and duplicates, separate cultural labels from musical structures and compilations.
- [ ] Define reproducible EI/FI/PI scoring rubrics, listening conditions and reference anchors.
- [ ] Add score provenance, rationale and confidence; retain null for unknowns.
- [x] Establish automated data validation, embedded snapshot consistency checks, JavaScript checks and browser regression tests.

**Exit criteria:** Stable data model, tested core interactions, initial taxonomy and scoring methodology accepted by the owner. No promotion solely on build count.

## Phase 1 — Alpha: Global Music Atlas

- [ ] Target 1,000–2,000 valid classifications.
- [ ] Multiple parent relationships and aliases with stable IDs.
- [ ] Ten-dimensional Music DNA: rhythm, tempo, instrumentation, timbre, melody, harmony, structure, vocal/lyrics, emotion, production.
- [ ] Genre distributions and ranges in EI/FI/PI space, rather than fixed points alone.
- [ ] Overlap and documented evolutionary relationships.
- [ ] Full three-dimensional coordinate exploration.

**Exit criteria:** Core genres have traceable definitions, coordinates, DNA and classification relationships.

## Phase 2 — Beta: Music Discovery Engine

- [ ] Target 3,000–6,000 valid classifications.
- [ ] Regional and platform-specific PI, with comparable scope, evidence and reference dates.
- [ ] Historical popularity trajectories; distinguish observed data from illustrative or estimated values.
- [ ] Auxiliary indices such as Complexity, Groove and Bass; use color, size or filters without replacing the canonical axes.
- [ ] Three-dimensional region filtering and attribute-based discovery.
- [ ] BGM scenario matching (broadcasting, gaming, driving, work, commercial spaces and dedicated listening).

**Exit criteria:** Users can discover suitable music from desired attributes without knowing genre names beforehand.

## Phase 3 — Release Candidate: Music Analytics

- [ ] Track-level database and scoring.
- [ ] Artist and record-label analysis.
- [ ] Compilation point-cloud analysis (e.g., Hotel Costes).
- [ ] Playlist spectrum analysis and cross-collection comparison.
- [ ] DJ set trajectories and energy curves.
- [ ] Personal Music Taste Fingerprint with appropriate privacy and consent.

**Exit criteria:** Stable, repeatable analysis of tracks and music collections, with transparent aggregation and missing-data handling.

## Phase 4 — Stable Release: Global Music Spectrum

- [ ] Aspirational coverage of 6,000–10,000 valid music labels.
- [ ] Unified data standards, migrations and version management.
- [ ] Transparent classification and scoring evidence.
- [ ] Community contribution and data-review mechanism.
- [ ] Stable public web app.
- [ ] Standardized JSON data interface.

**Exit criteria:** Owner acceptance of database quality, methodology, user experience and sustainable maintenance.

## Phase X — Research & Innovation: Music Possibility Space

Long-term research, not a fixed release deadline.

- [ ] Model combinations of Music DNA attributes and identify compatible constraints.
- [ ] Investigate existing but unnamed music types.
- [ ] Explore sparsely populated spectrum regions; distinguish coverage gaps from actual unexplored musical possibilities.
- [ ] Analyze cross-genre fusion feasibility.
- [ ] Explore AI audio feature extraction and assisted scoring, subject to validation and licensing.
- [ ] Suggest new musical combinations and production directions, clearly marked as hypothetical when appropriate.

## Product modules

| Module | Purpose |
| --- | --- |
| Music Atlas | Global genre and style map |
| Music Explorer | Attribute-based navigation and discovery |
| Music DNA | Underlying musical characteristics |
| Music Analytics | Tracks, compilations, playlists and DJ sets |
| Music Fingerprint | Personal listening preference profile |
| Music Possibility | Exploration of unknown musical combinations |

## Proposed near-term build sequence

| Build | Theme |
| --- | --- |
| build.3 | Three-dimensional spectrum and seed database |
| build.4 | Agent development governance |
| build.5 | Development roadmap |
| build.6 | Music taxonomy normalization |
| build.7 | EI/FI/PI scoring standards |
| build.8 | Music DNA data specification |
| build.9 | Data validation and automated checks |
| build.10 | Genre distribution space |

These are tentative milestone labels, not assertions that corresponding Git tags exist. The order may change with dependencies and validation needs. Pre-Alpha need not end at build.10. Tags and release-stage changes require explicit owner authorization per AGENTS.md.

## Design principles

- **Universality:** Cover human musical cultures beyond electronic music.
- **Neutrality:** EI, FI and PI are independent; none measures musical quality.
- **Traceability:** Classifications and scores must have documented evidence or be explicitly provisional.
- **Extensibility:** Accommodate new genres, attributes and combinations, overlapping categories and multiple parent relationships.
- **Simplicity:** Keep the architecture lightweight, offline-capable and low-maintenance; follow AGENTS.md.
- **Human-directed, agent-developed:** The owner defines requirements, constraints and acceptance criteria; agents choose implementation within those boundaries.

Database quality takes precedence over label counts. Do not inflate coverage with duplicates, invented genres or fabricated scores. Numerical coverage targets and milestone scope are planning assumptions, not mandatory quotas or release promises.
