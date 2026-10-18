# Synthetic data and schemas

Every fixture is generated locally by `npm run data:generate`, using **Mulberry32 seed 42**, fixed UTC timestamps, LF newlines, stable ordering and three-decimal sensor precision. `npm run data:validate` compares every byte and SHA-256 manifest, not just counts. Total fixtures are under 5 MB. Licensing: CC0. No measured or personal records are used.

| File | Schema, units and conventions |
| --- | --- |
| sensor-readings.csv | 864 rows: 3 machines × 288 five-minute samples on 2026-01-15 UTC. timestamp_utc ISO UTC, machine_id M1–M3, temperature_c °C (~18–41), vibration_mm_s mm/s (1–2), power_kw kW (5–8). A planted temperature interval exists; find it through your analysis. |
| sensor-dirty.csv | 865 rows; same schema; empty and `broken` numeric cells become null, not zero. Duplicate timestamp+machine is flagged and excluded from aggregates. Original records retained in table/export. |
| sensor-empty.csv / sensor-malformed.csv | Header-only valid empty data / deliberately wrong header and formula-like string. |
| robot-presets.json | lengths [1,0.7] m; angles degrees; limits [-150,150] and [-135,135]; 12 x/y target pairs in m including boundary and unreachable points. Geometric reach differs from limit-constrained reach. |
| factory-scenarios.json | Three scenarios; integer arrival/processing/duration seconds, per-queue capacity items. duration 120 or 240 s; no warm-up discarded. |
| sound-metadata.json and five WAVs | Mono PCM, 16000 Hz, 32000 samples, two seconds, amplitude ≤0.12, seed 42; tone-440, tone-1000, equal-amplitude 440/880 mix, seeded uniform noise and silence. Metadata stores expected peaks; no peak is guaranteed for noise. |
| experiment-config.json | k W/(m K), area m², deltaT K, thicknesses m, integer seeds, relative noise 0.02. Q in W; positive thickness required. |
| source-cards.json | Six original fictional cards: id, title, content, role, synthetic:true. Supporting, conflicting, irrelevant and harmless injection-fixture text. No real authors or scientific authority. |

Implementation choices are part of the tasks: document factory event ordering and bounds, sound analysis settings and research noise/spread definitions. Keep source-card text untrusted.
