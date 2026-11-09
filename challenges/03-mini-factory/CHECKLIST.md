# Mini Factory: acceptance checklist

- [ ] `npm run check factory` passes the checks for my timebox (30 or 45 minutes).
- [ ] Identical inputs produce identical results.
- [ ] Pause stops simulated progress; reset restores the initial state.
- [ ] Queues stay within capacity and every arrival is waiting, processing, completed or explicitly rejected.
- [ ] Controls have labels and work by keyboard; visual output has a text alternative.
- [ ] Invalid inputs give readable errors and execution is bounded.
- [ ] The application identifies results as synthetic or simulated.
- [ ] A partner can repeat my check, and I can explain one assumption.
- [ ] I reviewed the diff, saved my work and cleaned up cloud compute.

`npm run check factory` tests the calculations in logic.js; check the rest by hand in the page. `npm test` only checks the kit itself.
