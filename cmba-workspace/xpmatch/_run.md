# Run — XPMatch — 2026-09-23

**Mode:** full build, run as an audit of the planned product (`docs/prds/`). Every artifact read all earlier artifacts first. Evidence came from live pages fetched on 2026-09-23: competitors, forums, app stores and the v1 site.

## Run log

| # | Stage | Score /20 | Gate | Notes |
| --- | --- | --- | --- | --- |
| 0 | Applicability (`idea.md` Step 0) | — | **PARTIAL 3/4, proceed** | Brand voice only; `cmba-discovery` must not run; X profile skipped; offer scoped to the beta invitation |
| 1 | Idea | Self: 16 | **Pass** | Recommendation A (taste-matched plans from real travelers' trips), 18 on the scorecard. Sources 3 of 4 (the first version said 2; the founder's public origin was missed, per `eval.md`). Kill condition: relevance study below 7/10 |
| 2 | Validation | Self: 17 | **AMBER with a stated pivot, proceed** | Pain and time are in travelers' words, and there are 8 reachable people. No spend seen for 2–4 day trips. Reddit is a `GAP`. The pivot: free beta, revenue tested where money moves, short profile, couples not the lead |
| 3b | Differentiation | Self: 16 | **POSITIONAL** | Evidence on every stop, from real trips, with an honest "not enough". Structural against Mindtrip and Layla; positional against Wanderlog. Shelf life about 12 months (`UNSOURCED`) |
| 3 | UVP | Self: 16 (inflated: the first version carried the matching-claim error, audit row 16) | **Pass**: five named groups walk away | Movement built on the enemy (the popularity default plus fill-every-slot AI), not on the positional claim |
| 4 | Profile and site | Independent: 13/20, then **15/20** on the re-grade | **Passes at the threshold** after one revision. Edited again after the re-grade; not re-graded | First grade: unshippable placeholders, the missed public origin, the author-similarity claim. Fixed (`eval.md`) |
| 5 | Content | Independent: 0/20 (kill check), then **14/20** on the re-grade | **Still fails**: below 15, and the substitution test fails. Edited again after the re-grade; not re-graded | The kill check is now clear. Voice match needs the founder's own posts, which this run couldn't read (`eval.md`) |
| 7 | Lead magnet | Self: 16 | **Pass** | Narrow (shape the days) to wide (fill the slots). Top-left template. Five-question survey pooled with validation's |
| 6 | Journey | Self: 16 | **Pass**: all chain links hold | Written after stage 7 because it needs the magnet's concept. Product first appears at email 2 |
| 8 | Discovery | — | **Skipped** (Gate 0) | Re-opens only if a concierge service runs |
| 9 | Offer | Independent triage: 17 | **Pass**: the model matches small plus niche. Three defects fixed after triage | Built offer: the free beta invitation. Next rung: a USD 79 concierge presale test |
| 10 | Email | Self: 16 | **LIFECYCLE ONLY** | Two growth tactics, a two-email welcome, routing rules, segments, three data-gated tracks |
| 11 | Metrics | Self: 16 | **Pass** | Instrumentation window first, then 3 sequential tests (supply, money, urgency) with keep/kill lines fixed in advance |

- **Self scores** are the author's own and are biased upward. The independent grade (`eval.md`) came in lower on both artifacts it fully graded. Treat every remaining self score with that in mind.
- **Halted at:** completed. No gate halted: validation returned AMBER with a stated pivot, not RED.
- **Total elapsed:** one working session, 2026-09-23, including the research agents' fetches.
- **Weakest artifacts, corrected by `eval.md`:**
  - **`content.md`** failed: the kill check fired on a mis-cited quote and on unmeasured numbers in post copy. The voice gap also came from not reading v1's weekend guide.
  - **`profile.md`** failed on shippability, and it repeated a claim about how matching works that contradicts the plan.
  - **The first version of this log got the ranking right but the reasons wrong:** it listed only gaps the run had declared itself.
  - **`journey.md` and `email.md` weren't graded** but shared three defects, now fixed. Whether they're weaker than profile is untested.

## Coherence audit

**Prevention came first:** every stage read its predecessors. The backstop below checks the seams between skills; a contradiction sits at a seam and is invisible from inside either document.

| # | Seam | Finding | Severity | Resolution |
| --- | --- | --- | --- | --- |
| 1 | Capture forms ↔ email and invitations | The waitlist form had no phone-type field. Store testing invitations differ for iPhone and Android, so Android travelers couldn't have been invited | **High** | **Fixed:** `profile.md` form now asks for the phone; Android Play email asked for at invitation time `[VERIFY]` |
| 2 | Metrics ↔ content (same intervention, two timelines) | `content.md` scheduled the contributor ask (asset 11) for weeks 11–12, while `metrics.md` tests it in W1. Also, city assets 1–3 needed permissioned trips that nothing asked for before week 11 | **High** | **Fixed:** asset 11 moved to W1's dates; city assets wait for 3 permissioned trips; asset 1 is barred from W3 |
| 3 | Email ↔ lead magnet (expectations) | The magnet promised "a few short notes", but the journey sends 4 emails in week one plus a 4-issue track | Medium | **Fixed:** the disclosure now states the real cadence. `email.md` rule 5 caps sends at one a week after the first week |
| 4 | Email welcome ↔ shadow tracks | The waitlist welcome promises "at most one email a month", but tracks were weekly | Medium | **Fixed:** `email.md` rule 6, no tracks for waitlist members |
| 5 | Copy ↔ plan decision D-035 | UVP, site and email 2 promise "a short voice chat", but voice depends on the S0.2 spike | Medium | **Fixed:** a conditional note in `uvp.md`, `profile.md` and `journey.md`. If voice slips, the copy says "a few taps" |
| 6 | UVP ↔ plan (overclaim) | "no invented or closed places": the plan detects only "closed that day", not permanent closures | Medium | **Fixed:** the copy now says "no invented places, and anything listed as closed on the day you'd go is flagged". The data behind it was added later (row 17) |
| 7 | Offer ↔ plan | The guarantee promises a reply "within 2 working days"; the plan sets no response time | Medium | **Held:** the founder must confirm it before it's published (`offer.md`) |
| 8 | Validation ↔ profile (survey placement) | `validation.md` said the survey runs "as" the waitlist form; `profile.md` shows it after the form | Low | **Fixed:** the wording now says "right after", plus the magnet's subset |
| 9 | Email ↔ metrics | NPS was scheduled in `metrics.md` but missing from email's jobs | Low | **Fixed:** added to `email.md`, counted under rule 5 |
| 10 | Validation ↔ idea (temporal) | Validation refuted the concierge's profitability score of 4 | — | **Stamped `SUPERSEDED`** in `idea.md`; B re-scored to 15; runner-up note amended |
| 11 | Validation ↔ differentiators (temporal) | The "second choice" assumption was open; search intent points to ChatGPT | Low | **Updated in place** in `differentiators.md`; survey Q5 measures it |
| 12 | Downstream ↔ UVP (audience) | Every downstream artifact uses couples and solo travelers, 2–4 days, the pilot city, fit over fame. Couples stay out of the lead everywhere | — | Consistent |
| 13 | All artifacts (sourcing) | Every conversion band and revenue figure is tagged `UNSOURCED` or cited; every threshold is labeled a decision | — | Consistent |
| 14 | Metrics ↔ everything (concurrency) | The passive contributor links ship in W0 as a baseline, not a test. The concierge presale criterion is identical in `validation.md`, `offer.md` and `metrics.md`. The presale's 20 people are excluded from journey metrics in W2 | — | Consistent |
| 15 | Idea ↔ differentiators | `idea.md` said the recommendation would be revisited in `differentiators.md`. The POSITIONAL verdict supports A (real trips plus per-stop evidence) | — | Consistent; no change to A |
| 16 | UVP ↔ plan (how matching works) | "Travelers whose taste matches yours" contradicted plan §5 and AGENTS.md: items are matched to the traveler's own profile, and similarity to the source traveler appears only with consent. It spread from `uvp.md` into profile, journey, email, offer, the UI plan and the plan's proposed wording | **High, missed by this audit, found by `eval.md`** | **Fixed** in all of them |
| 17 | Copy ↔ plan data | "Closed that day" flags had no data behind them: the place record had no hours | Medium, found by `eval.md` | **Fixed in the plan:** A-002, §7, T5 |
| 18 | Journey ↔ journey (chain) | Post 2 ("fail at the scheduling, not the choosing") contradicted email 2 ("The slots are easy") | Medium, found by `eval.md` | **Fixed:** post 2 now says shape first, choosing is harder |
| 19 | Content ↔ UVP rules | The untimed "10 minutes" in post copy broke `uvp.md`'s own rule against untimed durations, and it spread to the magnet, email and journey | Medium, found by `eval.md` | **Fixed:** removed everywhere |

**Unresolved high-severity contradictions:**
- **The first audit reported none. That was wrong:** row 16 is high severity, and the "downstream ↔ uvp/idea" seam should have caught it. It's fixed now.
- **Item 7** is still a medium hold that needs the founder's decision.

**Rows to add to the skill's seam checklist** (the skill asks for new rows when a failure class is found):
- **Copy ↔ product decisions:** does any public copy promise a feature whose inclusion is still an open decision (here D-035, voice)?
- **Copy ↔ product mechanism** (from `eval.md`): does any public copy describe how the product works differently from the plan? Check every "built from", "matched to" and "never" claim against the plan's requirements.

## Findings outside the CMBA artifacts (for the founder)

1. **The live v1 site** (xpmatchme.com) reuses two lines word for word from Mindtrip's site ("Snag a coveted table at the hottest restaurants.", "Create. Inspire. Earn.").
   - It also claims "anywhere… in seconds", "live map data" and creator payouts, none of which v2 will do.
   - More lines closely follow Mindtrip's copy: "In seconds… anywhere", "tag @XPMatch… balance everyone's standards", and the Inspiration-page line.
   - An example card shows specific ratings and a named reviewer (`eval.md`).
   - Fix it before sending traffic (`profile.md`).
2. **v1's test fixtures** pair 14 real businesses with invented reviews, ratings and prices, and the UI shows them as Google data.
   - A demo booking uses the founder's real name.
   - Never reuse these fixtures (AGENTS.md: no fabricated activity presented as real). Consider removing them from v1's public repository.
3. **The 30-for-30 outreach list** (8 people who described the problem in public) was delivered privately and is not in this public repository.

## Pipeline self-check (the `cmba-run` rubric)

| # | Dimension | Self-score | Why |
| --- | --- | --- | --- |
| 1 | Order fidelity | 4 | Ran in dependency order. Stage 7 ran before 6 because 6 needs the magnet. No stage used an artifact that didn't exist yet (differentiation was written before validation and re-checked after) |
| 2 | Gate enforcement | 3 | Gate 0 genuinely classified PARTIAL and removed a stage. Validation could have returned RED, but the evidence of pain was real, so no gate halted |
| 3 | Artifact coherence | 1 as first delivered, 3 after fixes | **As first delivered:**<br>• The whole set carried one claim about how matching works that contradicted the plan (row 16).<br>• The `cmba-run` kill check ("any downstream artifact that contradicts an upstream one") would have zeroed that version.<br>**After fixes:** 13 seam contradictions found in total. 12 are fixed and one is held for the founder. The UVP's enemy runs through journey email 3 and the About. |
| 4 | Assumption propagation | 4 | `[pilot city]`, `UNSOURCED` bands, D-035 and the AMBER spend gap stay visible downstream |
| 5 | Run log honesty | 1 | It ranked the weakest artifacts correctly for the wrong reasons, and wrongly reported no unresolved high-severity contradiction. Both are corrected above |
