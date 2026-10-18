# Contributing

Keep each milestone or fix small and reviewable. Use a branch in an authorized repository, inspect the diff, and submit a PR with participant-visible behavior, actual test results and limitations. Do not merge without owner review. Preserve the task-first design: no completed implementations or answer keys in the participant kit. Add behavior tests as participants implement their own features.

Run `npm ci`, `npm run lint`, `npm test`, `npm run data:validate`, `npm run check:docs`, `npm run build`, `npm run build:offline`, and `npm run test:browser` (after installing the cloud browser dependency). Do not claim Codespaces or pilot checks passed from local CI. Keep synthetic fixtures under 5 MB. No external application services, secrets, telemetry or real hardware. Owner approval is required for licensing, public visibility, branding, hosting and billing.
