# Security

Use synthetic data only. Do not report secrets or personal information in public issues. If you find an exposure, stop sharing it and contact the repository owner or named facilitator through an approved private channel. No private reporting endpoint has been verified yet.

The frontend has no secrets, backend or production interfaces. Uploads, iterations and trial counts are bounded. Source text is untrusted. CI uses read-only contents permission, pinned action revisions, no fork-PR secrets and a 15-minute timeout; it does not deploy or use pull_request_target.

Dependency audit results and blocked checks belong in release evidence. Do not advertise security certification. No publication, billing changes or elevated PR execution is authorized by this project.
