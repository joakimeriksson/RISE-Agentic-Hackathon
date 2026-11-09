# Sound Lab

Build a visual analyzer for bundled synthetic audio samples.

**Level:** Intermediate · **Self-check:** `npm run check sound`

There is no hidden solution. You get a brief, synthetic inputs, a self-check and an empty workspace; you build the rest with an agent or a partner.

## Open the task

1. In your prepared cloud workspace run `npm ci`, then `npm run dev`.
2. Open private port 5173 and choose **Sound Lab**.
3. Read this brief and inspect `task.json` and `app.js` in this directory.
4. Choose one visible outcome. Use [PROMPTS.md](PROMPTS.md), review each change, save and refresh.

## Build in steps

1. Add a sample chooser and explicit Start and Stop controls.
2. Read a bundled WAV sample and display its waveform.
3. Calculate and display a spectrum and peak frequency.
4. Provide numerical results and compare a tone, a mixture and silence.

## Choose your timebox

- **30 minutes:** aim for a waveform with sample rate and duration. Spend 0–5 exploring, 5–10 planning with the agent, 10–25 implementing, and 25–30 checking and demonstrating. Start with a small working slice; finish the core steps as time allows.
- **45 minutes:** finish the core steps and validate them. Let users choose the analysis window and explain frequency resolution.
- **60 minutes:** Add smoothing or a frequency-band indicator. Microphone mode is optional and must release all tracks on Stop. Have a partner inspect the change and your evidence.

Setup time is not counted.

## Check your result

- [ ] Known tones are identified within one frequency bin (sample rate / window size).
- [ ] Silence produces finite values and a sensible no-peak message.
- [ ] No playback or microphone access starts automatically; visual results are sufficient.

Run `npm run check sound` to test the calculations in `logic.js`; it reports each 30- and 45-minute check as pass or fail. Ask your agent to keep going until the checks for your timebox pass, and to fix `logic.js` rather than the test. Check the page itself (controls, drawing, keyboard use) by hand with [CHECKLIST.md](CHECKLIST.md), and explain one limitation.

## Hints and working without an agent

Start by inspecting the WAV metadata and drawing a short waveform. Choose an analysis method before asking the agent to implement it.

Sketch the controls and output first. Write one calculation in `logic.js`, check a tiny example by hand, then run `npm run check sound`. In `app.js`, add a labeled input or a small table to `workspace` that uses it, save, refresh and inspect the result. Keep a backup before each step and ask a partner to review it.

## Inputs and deliverable

- [sound-metadata.json](../../data/generated/sound-metadata.json)
- [tone-440.wav](../../data/generated/tone-440.wav)
- [tone-1000.wav](../../data/generated/tone-1000.wav)
- [mix.wav](../../data/generated/mix.wav)
- [noise.wav](../../data/generated/noise.wav)
- [silence.wav](../../data/generated/silence.wav)

[Data schemas and units](../../data/README.md). Use synthetic inputs only; no external services or real hardware. Deliver your application, a repeatable check and a short explanation of the evidence and assumptions.

## Save, reset and fallback

Save files and inspect the diff. Use editor Undo for a recent mistake; back up work before discarding a saved file. Reload resets the task checklist, not your saved code. Implement Reset/Stop behavior where your application needs it.

Without network access, extract the offline kit and open its index to read the task, inspect inputs and plan your implementation. Editing requires an existing approved editor or pairing; there is no prebuilt demonstration or offline agent. In the standalone task HTML, find the TODO near the end of the inline script and edit there. Keep the extracted folder structure for data links. [Fallbacks](../../docs/FALLBACKS.md).
