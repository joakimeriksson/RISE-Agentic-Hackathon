# Ask the Handbook: acceptance checklist

- [ ] `npm run check handbook` passes the checks for my timebox (30 or 45 minutes).
- [ ] Every answer quotes a sentence that really exists in the cited guide.
- [ ] Questions the guides do not cover get an honest "no answer", not a guess.
- [ ] An outdated or replaced guide is never cited when a newer one answers the question.
- [ ] Controls have labels and work by keyboard; results are shown as text, not only colour.
- [ ] Invalid inputs give readable errors and nothing from the documents is run as code or HTML.
- [ ] The application labels its inputs and results as synthetic.
- [ ] If I added an LLM step, my own checks still decide what is shown as correct.
- [ ] I reviewed the diff, saved my work and cleaned up cloud compute.

`npm run check handbook` tests the logic in logic.js; check the rest by hand in the page. `npm test` only checks the kit itself.
