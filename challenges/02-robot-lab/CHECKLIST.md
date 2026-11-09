# Robot Lab: acceptance checklist

- [ ] `npm run check robot` passes the checks for my timebox (30 or 45 minutes).
- [ ] Zero angles place the endpoint at (L1 + L2, 0).
- [ ] A 90-degree first joint and zero second joint place it at (0, L1 + L2).
- [ ] Keyboard controls respect joint limits; drawing and displayed coordinates agree.
- [ ] Controls have labels and work by keyboard; visual output has a text alternative.
- [ ] Invalid inputs give readable errors and execution is bounded.
- [ ] The application identifies results as synthetic or simulated.
- [ ] A partner can repeat my check, and I can explain one assumption.
- [ ] I reviewed the diff, saved my work and cleaned up cloud compute.

`npm run check robot` tests the calculations in logic.js; check the rest by hand in the page. `npm test` only checks the kit itself.
