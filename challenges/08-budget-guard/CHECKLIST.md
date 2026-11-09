# Budget Guard: acceptance checklist

- [ ] `npm run check budget` passes the checks for my timebox (30 or 45 minutes).
- [ ] Totals and co-funding add up and match a hand calculation.
- [ ] Each broken rule names the partner it concerns; exactly 30 % overhead is allowed.
- [ ] The untouched draft is eligible for no call; a fixed budget is eligible for C4 and C1.
- [ ] Controls have labels and work by keyboard; results are shown as text, not only colour.
- [ ] Invalid inputs give readable errors and nothing from the documents is run as code or HTML.
- [ ] The application labels its inputs and results as synthetic.
- [ ] If I added an LLM step, my own checks still decide what is shown as correct.
- [ ] I reviewed the diff, saved my work and cleaned up cloud compute.

`npm run check budget` tests the logic in logic.js; check the rest by hand in the page. `npm test` only checks the kit itself.
