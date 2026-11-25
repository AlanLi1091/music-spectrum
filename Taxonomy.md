# Music Spectrum taxonomy audit

Pre-Alpha · build.6 working draft

## Classification rules

Classify what each record names before assigning parents or aliases. Keep the current
`family` as the explorer's display group during the audit.

| Classification | Evidence to look for |
| --- | --- |
| Genre, subgenre or microgenre | Attested usage of the name and a description of its scope. A parent relationship requires evidence that the child is narrower in the relevant usage. |
| Hybrid style | Attested usage of the combined style and evidence of how the source styles contribute. Record relationships individually when the evidence supports them. |
| Cultural or geographic label | Evidence that the term groups music by scene, language, geography, tradition or market. Record distinct musical styles separately when their scope can be established. |
| Compilation series | A named sequence of releases confirmed by a catalog or label. Record the series identity and scope before linking individual volumes. |
| Alias | Evidence that two names refer to the same concept in the same scope. Record spelling and language variants without treating broader, narrower or overlapping labels as aliases. |

A slash or a shared word flags a record for review. It supplies no evidence about
equivalence or parentage. Use sources to establish the meaning and scope in context.
Catalog tags can verify usage and relationships within that catalog. Additional
evidence may be needed to generalize beyond it.

## Baseline

The seed contains 640 records and 640 unique IDs. There are 633 records currently
typed `genre_or_style` and seven typed `compilation`. The names produced no
collisions after folding case and removing spaces, punctuation and diacritics.
Conceptual overlap and aliases require a separate review.

Run `python3 validate_data.py` from the repository root to check record fields,
IDs, score ranges, unrated values, DNA keys and the embedded offline snapshot.
Taxonomic findings are tracked separately below.

## First review batch

These are candidate dispositions. The seed and offline snapshot remain as published
while the audit documents the evidence and the open decisions.

| Record | Proposed treatment | Evidence or open question |
| --- | --- | --- |
| `g0001` Ambient / Drone and `g0002` Drone | Review scope overlap | The seed has both names as separate records. Determine what the compound entry covers before proposing an alias, parent or split. |
| `g0090` UK Garage / 2-Step | Review for a parent and child | The seed joins two terms. Check their scope in sources and determine what the existing record is intended to cover. |
| `g0138` Footwork / Juke and `g0188` Hardcore / Gabber | Review each compound independently | Confirm whether the paired labels describe the same style within the project's intended scope. |
| `g0506` Orchestral / Classical | Review label dimensions | Determine whether the intended record describes instrumentation, tradition or their intersection. |
| `g0210` J-Pop, `g0211` K-Pop and `g0561` Celtic Music | Review for a cultural or geographic designation | MusicBrainz lists J-Pop and K-Pop as genre tags. Establish each term's scope before deciding how the explorer should represent it. [MusicBrainz genre list](https://musicbrainz.org/genres) |
| `g0282` Jazz Rap | Candidate subgenre relationship to `g0285` Hip-Hop | MusicBrainz lists Jazz Rap under Hip-Hop. The seed already groups Jazz Rap under Hip-Hop. Any additional relationship to `g0408` Jazz needs separate evidence. [MusicBrainz Hip-Hop entry](https://musicbrainz.org/genre/52faa157-6bad-4d86-a0ab-d4dec7d2513c) |
| `c635` Café del Mar | Retain the compilation category | MusicBrainz catalogs a Café del Mar release-group series. Confirm which volumes the seed record is intended to cover before adding member links. [MusicBrainz series entry](https://musicbrainz.org/series/be930628-5b24-4bb3-85a6-6bbcf688e932) |
| `c634` Hotel Costes, `c636` Buddha-Bar, `c637` Saint-Germain-des-Prés Café, `c638` Hed Kandi: Beach House, `c639` Late Night Tales and `c640` DJ-Kicks | Retain current types pending scope verification | Verify each series identity, its title variants and the boundaries of its release catalog before adding member links. |

## Migration record

For each accepted change, record the original IDs and names, the retained or
replacement IDs, the action, the rationale, the source and any affected references.
Keep the old IDs traceable and avoid reusing them. If an old ID maps to several
records, document the split and its scope. Before applying any ID-changing migration,
check how saved browser edits keyed by the old ID will behave.

Review existing EI/FI/PI and DNA values when scope changes. If their applicability
to the new scope is unknown, record that explicitly and preserve the original
values in migration history. Keep the canonical JSON and its offline snapshot
synchronized when changes are applied.
