# Cost and access checklist

Event-specific payer: **unassigned — facilitator must record before creating compute**. Validated machine, idle timeout, retention, quota and agent entitlement: **not yet tested**. No paid usage or prebuilds are enabled by this kit.

Before invitations, inspect current account and organization billing controls. Record who pays for compute and retained storage, the available quota, and whether each budget blocks usage or merely alerts. Use a short idle timeout and limited retention where policy permits. Choose the smallest machine demonstrated to work during preflight. Stop compute after use and delete unneeded Codespaces only after exporting/saving changes. Browser closure does not prove compute stopped; stopped workspaces may still incur storage charges.

An agent subscription or quota is separate from Codespaces. No model API is used by the applications. Agent access and workspace-file access must be verified separately. Use guided edits when entitlement is unavailable. Managed accounts may have additional restrictions on template creation and publishing.

Sources rechecked 18 October 2026: [Codespaces billing](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces), [organization costs](https://docs.github.com/en/codespaces/managing-codespaces-for-your-organization/managing-the-cost-of-github-codespaces-in-your-organization), [template setup](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/setting-up-your-repository/setting-up-a-template-repository-for-github-codespaces). Recheck shortly before the event. No price, free-use or quota guarantee is made here.
