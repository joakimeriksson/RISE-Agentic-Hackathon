# Data Detective: acceptance checklist

- [ ] `npm run check data` passes the checks for my timebox (30 or 45 minutes).
- [ ] Changing a filter updates the table, chart and summary together.
- [ ] Missing and malformed readings are reported rather than converted to zero.
- [ ] An empty selection gives a useful message.
- [ ] Controls have labels and work by keyboard; visual output has a text alternative.
- [ ] Invalid inputs give readable errors and execution is bounded.
- [ ] The application identifies results as synthetic or simulated.
- [ ] A partner can repeat my check, and I can explain one assumption.
- [ ] I reviewed the diff, saved my work and cleaned up cloud compute.

`npm run check data` tests the calculations in logic.js; check the rest by hand in the page. `npm test` only checks the kit itself.
