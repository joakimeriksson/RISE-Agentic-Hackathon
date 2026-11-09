# Paper to JSON: acceptance checklist

- [ ] `npm run check forms` passes the checks for my timebox (30 or 45 minutes).
- [ ] 03/05/2026 is read as 3 May, following the DD/MM rule in certifications.json.
- [ ] Missing fields become null and are reported, never guessed.
- [ ] Every application ends up valid or with a readable list of problems.
- [ ] Controls have labels and work by keyboard; results are shown as text, not only colour.
- [ ] Invalid inputs give readable errors and nothing from the documents is run as code or HTML.
- [ ] The application labels its inputs and results as synthetic.
- [ ] If I added an LLM step, my own checks still decide what is shown as correct.
- [ ] I reviewed the diff, saved my work and cleaned up cloud compute.

`npm run check forms` tests the logic in logic.js; check the rest by hand in the page. `npm test` only checks the kit itself.
