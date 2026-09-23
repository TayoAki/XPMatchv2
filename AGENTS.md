# XPMatch agent workflow

The operating contract for any coding agent working here (Claude Code, Codex, Cursor). It adapts the `software-factory` skill in `.claude/skills/software-factory/` to this repository. Product scope lives in `docs/prds/`; this file covers how work gets done.

## Sources of truth

- `docs/prds/XPMatch-Build-PRD-v1.1.md` is the founder's PRD, preserved as supplied. Do not edit it; record changes as a new revision.
- `docs/prds/XPMatch-MVP1-plan.md` is the proposed MVP-1 scope (PRD revision v1.2). Check its approval line before implementing anything it changes.
- Requirement and evidence IDs (`REQ-###`, `AC-REQ-###-##`, `NFR-###`, `EV-###`) are permanent. Cite them in plans, tests, commits and PRs.
- `TayoAki/XPMatchv1` (the web prototype) is a product reference only. Do not copy its code (founder decision, 2026-09-23). Its docs record older decisions, such as prices, match percentages and a web-first plan. Where they conflict with the PRD or an approved revision, the PRD wins.

## Task contract

- A raw PRD, brief, issue or idea is input to refine, not permission to implement.
- Refine raw input into the factory-ready format (`.claude/skills/software-factory/assets/FACTORY_PRD.template.md`). Preserve the source and label supplied facts, repository evidence, assumptions, recommendations and decisions needed.
- Do not implement a `BLOCKED` PRD. Implement only an approved revision, unless the founder explicitly authorized auto-proceed for non-blocked work.
- Classify each task's risk as low, medium or high. Identity, authorization, personal data, payments, migrations, provider spend and production changes are high risk.
- Stop and ask when different interpretations would change behavior, data, permissions, architecture, cost, schedule or release risk.

## Required sequence

1. **Refine:** produce or update the factory-ready PRD with requirement IDs, acceptance criteria, non-goals, risks, evidence mapping and open decisions.
2. **Approve:** record readiness and the founder's approval of that revision. Stop if `BLOCKED`.
3. **Preflight:** read these instructions, inspect the working state, check open PRs for overlapping files, find the relevant code and tests, and confirm the repository does not contradict the PRD.
4. **Isolate:** work only on the task branch described below, never on `main`.
5. **Build:** make the smallest coherent change that follows the established architecture, keeping it traceable to requirement IDs.
6. **Prove:** run the required checks and verify real behavior. Map every acceptance criterion to pass, fail or untested, with evidence.
7. **Ship:** when authorized, open a PR that includes the PRD revision, contract, verification, evidence, risks and rollback notes.
8. **Review:** when a reviewer is configured, address current-head feedback for at most 5 cycles. Stop on conflicts, timeouts or scope growth.
9. **Handoff:** present the branch or PR and stop. Merge and deployment belong to the founder.

## Repository commands

There is no application code yet. Sprint 0 ticket S0.1 (the project shell) establishes these commands. Until it lands, never claim any of them ran.

- Runtime/toolchain: set in S0.1 (Node 22 is available in cloud sessions)
- Install: set in S0.1
- Format/lint: set in S0.1
- Typecheck: set in S0.1
- Tests: set in S0.1
- Build (including native builds): set in S0.1
- Development server: set in S0.1

## Architecture and invariants

Planned layout (PRD §5): `apps/mobile` (Expo/React Native), `services/api` (TypeScript), `services/voice` (long-lived WebSocket relay, later), `packages/contracts` (shared schemas), `db/migrations` (PostgreSQL/Supabase), `evals` (matching and explanation cases).

- The model interprets and phrases. Server code owns authorization, eligibility, scoring, persistence, source freshness and spend limits. Never expose model-generated SQL or an open-ended HTTP tool.
- Keep itinerary and content fit separate from author similarity. Commission is never a ranking input. Missing evidence lowers coverage; it never counts as a good fit.
- Never present fabricated travelers, reviews, itineraries or activity as real. Label synthetic test data as fixtures.
- Plans are built by a deterministic, versioned planner from ranked items. The model writes explanation wording only; it never chooses or orders plan items.
- Nothing about a traveler becomes visible to other travelers without an explicit opt-in. Shared activity and "travelers like you" never include trip dates, companions, spending, notes or profile details, and people who haven't opted in are never shown, not even as a count.
- Messages, comments, questions and private review notes are private user content. Never send them to the model, analytics or logs. The operator sees only reported items and reviews submitted for publishing.
- Community content is readable only while it is published and its permission is current. Withdrawal blocks reads immediately.
- Writes carry a server-derived actor, request ID, command name, schema version, idempotency key and expected revision. A repeated key with the same payload returns the original receipt; a different payload is a conflict.
- Data conventions: UUIDs; UTC timestamps plus IANA time zones; local trip dates; money as integer minor units with currency and price basis.
- Migrations follow expand, compatible code, backfill, verify, then contract. One migration owner at a time. Test row policies with two separate users.
- Every paid provider call (model, maps, voice) checks the budget before dispatch and is metered.
- Build for the 1,000-tester beta (plan §12): paginate every list, bound every query, index each column a row policy filters on, and cache model output that doesn't depend on one traveler.

## Isolation and shared resources

- Default branch: `main`. Never commit to it directly.
- Branches: Claude Code cloud sessions use their harness-assigned `claude/<name>` branch. Other work uses `<ticket-id>-<short-slug>`, for example `s1.2a-profile-recap`.
- Worktrees: a Claude Code cloud session runs in its own freshly cloned container, which serves as the task's isolated checkout. Parallel local work uses `git worktree add .worktrees/<task> -b <branch> main`.
- Single-checkout mode (two tasks sharing one local checkout) is not allowed unless the founder authorizes it for that task.
- Evidence goes in `.artifacts/<task>/`. No external evidence host is approved.
- Worktrees do not isolate Supabase projects, API keys and quotas, device builds or test accounts. Use development credentials only, and never put production data in fixtures.

## Verification and evidence

- Every correctness claim references a check, capture, measurement or stated human judgment.
- Mark blocked checks `untested` and give the reason.
- UI changes need comparable before and after captures, or a recorded flow, on the same screen and data.
- Voice, audio, permission and lifecycle claims need physical iOS and Android devices; simulators only supplement them.
- API and matching changes need repeatable scripted probes or eval cases with sanitized output.
- Evidence complements tests; it never replaces them.
- Never record or upload secrets, personal data, tester content or unrelated screens.

## Pull-request gate

Before opening or updating a PR:

1. Review the complete diff.
2. Update from `main` without rewriting shared history.
3. Rerun the required checks on the final commit.
4. Include the outcome, scope, acceptance-criterion status, verification, evidence, risks and rollback or follow-up notes.

- Automated reviewer: none configured.
- Required CI: none yet; S0.1 adds typecheck, lint, tests and migration checks.
- Maximum review cycles: 5.
- Required human approver: the founder (repository owner).

## Safety and authority

- This repository is public. Never commit secrets, `.env` files, personal data, tester data or private partner terms.
- Never commit or force-push to `main`. Use `--force-with-lease` only on the task's own branch, and only when authorized.
- Never use another task's branch, worktree, uncommitted changes, port or test database.
- Never merge, deploy, change production state, buy or enable a paid provider, install an external app or expand credentials without the founder's explicit authorization.

## Completion

Return:

- the PRD revision, readiness, approval state, assumptions and unresolved decisions;
- the branch or PR URL;
- what changed and why;
- acceptance-criterion status by ID;
- checks run, each marked pass, fail or untested;
- evidence, with the exact revision and environment tested;
- review iterations and unresolved findings;
- security, privacy, migration, rollout and follow-up risks;
- confirmation that merge and deployment were not performed unless separately authorized.
