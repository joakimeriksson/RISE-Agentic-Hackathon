# Research Autopilot: acceptance checklist

- [ ] `npm run check research` passes the checks for my timebox (30 or 45 minutes).
- [ ] Zero and negative thickness values are rejected.
- [ ] Doubling thickness halves noiseless heat flow.
- [ ] Three trials at each of five settings produce 15 reproducible trials; every quoted passage exists in the cited card.
- [ ] Controls have labels and work by keyboard; visual output has a text alternative.
- [ ] Invalid inputs give readable errors and execution is bounded.
- [ ] The application identifies results as synthetic or simulated.
- [ ] A partner can repeat my check, and I can explain one assumption.
- [ ] I reviewed the diff, saved my work and cleaned up cloud compute.

`npm run check research` tests the calculations in logic.js; check the rest by hand in the page. `npm test` only checks the kit itself.
