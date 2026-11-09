# LLM access for the 60-minute stretches

Missions 06–08 can add an LLM step in their 60-minute stretch. Everything up to the 45-minute goal works without one.

While `npm run dev` is running, the page can call `/llm/chat/completions`. The dev server forwards that request to an OpenAI-compatible endpoint and adds the API key itself, so the key never reaches the browser or your code. Facilitators set three environment variables before starting the server:

| Variable | Meaning | Default |
| --- | --- | --- |
| `LLM_BASE_URL` | OpenAI-compatible base URL, ending in `/v1` | `http://localhost:11434/v1` (Ollama on the same machine) |
| `LLM_MODEL` | Model name sent by the page | `gemma4:latest` |
| `LLM_API_KEY` | Bearer key, if the endpoint needs one | none |

A call from `app.js`:

```js
const res = await fetch('/llm/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ model: import.meta.env.LLM_MODEL, messages: [{ role: 'user', content: 'Hello' }] }),
});
const reply = (await res.json()).choices[0].message.content;
```

Rules for the stretch:

- Treat the reply as a proposal. Run it through your own `logic.js` checks before showing it as correct.
- Send only the bundled synthetic inputs. Never paste real internal documents into a prompt.
- Show a readable message when the endpoint is missing or slow; the rest of the page must keep working.
- The offline kit and `npm run build` output have no proxy, so the LLM step works only with `npm run dev`.
