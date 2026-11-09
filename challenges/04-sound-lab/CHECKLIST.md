# Sound Lab: acceptance checklist

- [ ] `npm run check sound` passes the checks for my timebox (30 or 45 minutes).
- [ ] Known tones are identified within one frequency bin (sample rate / window size).
- [ ] Silence produces finite values and a sensible no-peak message.
- [ ] No playback or microphone access starts automatically; visual results are sufficient.
- [ ] Controls have labels and work by keyboard; visual output has a text alternative.
- [ ] Invalid inputs give readable errors and execution is bounded.
- [ ] The application identifies results as synthetic or simulated.
- [ ] A partner can repeat my check, and I can explain one assumption.
- [ ] I reviewed the diff, saved my work and cleaned up cloud compute.

`npm run check sound` tests the calculations in logic.js; check the rest by hand in the page. `npm test` only checks the kit itself.
