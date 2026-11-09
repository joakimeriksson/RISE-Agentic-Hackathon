# Robot Lab: prompts

```text
I'm a beginner working on Robot Lab (challenges/02-robot-lab). Read its README.md, app.js and logic.js first.
Goal: Two labeled controls and a numeric endpoint. I have 30 minutes.
Put calculations in logic.js and the page in app.js, using the bundled data in data/generated/.
Before coding, give me a short plan and tell me how I can check each step in the browser.
Build one small step at a time. After each step run `npm run check robot` and keep going until the 30-minute checks pass. Fix logic.js, never the self-check test.
Keep controls labeled and keyboard usable. No external services, new dependencies or secrets.
Finally, explain what changed, what the checks show and one remaining limitation.
```

- **Self-check:** `npm run check robot` fails on "[test name]". Explain in plain words what the test expects, then fix logic.js. Do not edit self-check.test.js.
- **Debug:** Expected [one checklist result]; observed [actual result]; error [text]. Find the cause, make a small fix and repeat the check. Do not rewrite unrelated files.
- **Review:** Run `npm run check robot` and check my app against CHECKLIST.md. Identify an incorrect calculation, unsupported claim or inaccessible control. Fix the most important issue.
- **Extend:** Add inverse kinematics or a recorded movement sequence. Preserve existing behavior, explain the tradeoff and demonstrate it with a test.
- **Explain:** Describe the inputs, assumptions and evidence in plain language. Explain how to save and reset safely.
