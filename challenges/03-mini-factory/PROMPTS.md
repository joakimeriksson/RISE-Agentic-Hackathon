# Mini Factory: prompts

```text
I'm a beginner working on Mini Factory (challenges/03-mini-factory). Read its README.md, app.js and logic.js first.
Goal: A single-step state table for three stations. I have 30 minutes.
Put calculations in logic.js and the page in app.js, using the bundled data in data/generated/.
Before coding, give me a short plan and tell me how I can check each step in the browser.
Build one small step at a time. After each step run `npm run check factory` and keep going until the 30-minute checks pass. Fix logic.js, never the self-check test.
Follow the simulation rules in README.md exactly.
Keep controls labeled and keyboard usable. No external services, new dependencies or secrets.
Finally, explain what changed, what the checks show and one remaining limitation.
```

- **Self-check:** `npm run check factory` fails on "[test name]". Explain in plain words what the test expects, then fix logic.js. Do not edit self-check.test.js.
- **Debug:** Expected [one checklist result]; observed [actual result]; error [text]. Find the cause, make a small fix and repeat the check. Do not rewrite unrelated files.
- **Review:** Run `npm run check factory` and check my app against CHECKLIST.md. Identify an incorrect calculation, unsupported claim or inaccessible control. Fix the most important issue.
- **Extend:** Experiment with buffer capacity or a seeded breakdown schedule. Preserve existing behavior, explain the tradeoff and demonstrate it with a test.
- **Explain:** Describe the inputs, assumptions and evidence in plain language. Explain how to save and reset safely.
