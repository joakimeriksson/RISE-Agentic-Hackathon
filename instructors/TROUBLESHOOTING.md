# Troubleshooting

After five minutes of unresolved setup trouble, use the fallback ladder.

| Symptom | Check | Recovery |
| --- | --- | --- |
| Sign-in failure | Correct personal account, SSO/policy, domain blocks | Offline kit or pair; never share login |
| Quota exceeded | Payer, actual remaining quota, policy | No paid enablement; use offline/approved demo |
| Slow container | Creation status and event network | Wait within five-minute limit then switch |
| Install failure | Node pin, terminal error, registry access | Re-run npm ci once; use offline kit if blocked |
| Preview unavailable | Run demo active, port 5173 private, signed-in tab | Open Ports → Open in Browser |
| Occupied port | Existing terminal/task already serving | Use that server or stop it with Ctrl+C; don't change fixed port |
| Agent unavailable | Entitlement and workspace file access | Task steps, conceptual hints and pairing |
| Malformed CSV | Exact headers, numeric/missing conventions, 1 MiB cap | Reset to bundled data; inspect error |
| Audio blocked | Use the synthetic WAV inputs without adding playback | Start sample; no microphone required |
| Permission denied | Browser microphone permission/secure origin | Use synthetic sample mode |
| Frozen simulation | Starter TODO, paused state, end of run | Complete TODO, Step or Reset; inspect bounds |
| Lost changes | Saved files, Source Control, personal remote | Recover from local history/download/commit; don't discard blindly |

Export results before refresh/reset. Closing the preview does not stop Codespaces compute. Stop/delete from the account's Codespaces list after saving work.
