# Business Idea Analysis — XPMatch

Skill: `cmba-idea` (stage 1 of `cmba-run`). Written 2026-09-23. Inputs read first:
- `docs/prds/XPMatch-Build-PRD-v1.1.md` and `docs/prds/XPMatch-MVP1-plan.md` (draft 8), which are the founder's product decisions;
- the read-only review of `TayoAki/XPMatchv1` summarized in the plan's §3.

This is an audit of an existing, decided premise, not a blank-page search. The skill's own control applies: a recommendation that only restates what XPMatch already plans, with no new angle, caps at 10/20.

## Step 0 — Applicability & entity

| Precondition | Holds? | Evidence |
| --- | --- | --- |
| Identifiable operator or brand the buyer forms a relationship with | Yes | Travelers keep an account, profile, trips and inbox with the XPMatch brand (plan §4) |
| Direct channel, with no intermediary owning the relationship | Yes, with a caveat | The app stores control distribution (TestFlight, Play testing) and later billing, but XPMatch owns the account and profile. Bookings happen on partner sites (plan §4, "How money moves") |
| Content/audience-led acquisition is plausible | Yes | Travel planning is content-heavy, and XPMatch's product is itself traveler content (itineraries, reviews) |
| One operator can package and price the offer | Not yet | The pilot is free, pricing is undecided (plan D-016), and the revenue path is partner commissions whose rates partners set. Only the separate USD 79 concierge experiment (PRD §1) is something the founder could price today |

**Verdict: PARTIAL — 3/4.** The count would allow APPLIES with the gap named. It is classified PARTIAL because the buyer's relationship is with a product, not a person. The traveler never meets the operator, so the creator voice ("I help…") and the personal-brand and sales-call parts of the framework don't transfer.

- **Transfers:** idea, validate, differentiate, UVP (in brand voice, not first person), content (in the skill's intent-led mode), journey (the conversion is joining the beta, not buying), lead magnet, offer (scoped to the beta invitation), email (its own gate decides the form), metrics, eval.
- **Must not run:** `cmba-discovery`. No service is in scope; the concierge is a separate experiment the plan does not include. `cmba-profile` runs only on the surfaces a product company controls: the founder's LinkedIn and the landing page. Its X checklist is skipped because travelers don't choose a travel app from its founder's X profile.
- **Real constraint on this business:** content supply per city (plan D-006) and proof that matching beats destination-only suggestions (PRD H1). Positioning is not the binding constraint.

**Subject type:** organization, so the organizational sources are used.
**Sources that produced candidates: 2/4.** Proven capability and underused asset did; repeated inbound request and solved-internally are `GAP`. That meets the minimum of 2, but the overlap signal is weak, which makes the recommendation below less certain than a four-source harvest would.

## Harvest (organizational sources)

| Source | Question | What the footprint shows | Candidates |
| --- | --- | --- | --- |
| Proven capability | What does XPMatch demonstrably do better than its category? | Nothing is demonstrated against the category yet: zero paying customers and no outside testers (v1 `docs/BUSINESS_PLAN.md`, `docs/BETA_READINESS.md`). What v1 *built*: explained match scoring, review answers that quote evidence verbatim, and "packages" of one stay, three things to do and three places to eat | A, D |
| Underused asset | What does XPMatch own that isn't monetized? | v1's planning and import tooling (links, screenshots, reservations), its advisor-segment research, and the PRD's trust rules | A, B, C, E |
| Repeated inbound request | What do customers keep asking for? | `GAP`: there are no customers yet. Human task: log every tester request during the pilot | — |
| Solved-internally | What problem did the founders solve for themselves? | `GAP`: the founder's own planning story isn't documented. Human task: write it down; it is also the profile About section's missing input | — |

Overlap: A appears in two sources (proven capability and underused asset). Nothing appears in three.

## Candidates

### A. Taste-matched itineraries from real travelers (the PRD premise)
- Sources: proven capability and underused asset (overlap: 2)
- Chain: real travelers' permissioned trips → matched to one traveler's taste profile, with honest reasons and catches → a plan for both partners in minutes instead of hours → save time, and peace of mind that the trip fits → **Relationships** (a couple's shared trip). Solo travelers get the same outcome without the second person.
- Angle: the trust rules (only real, permissioned sources; honest catches; commission never ranks) are the PRD's, not a generic planner's.

### B. Concierge itinerary service (the PRD's separate USD 79 experiment)
- Source: underused asset (v1 tooling makes hand-built plans fast)
- Chain: founder-built itinerary from a short intake → delivered in 48 hours → save time and gain peace of mind → **Relationships**.
- Angle: pays to learn which plans travelers want before the app can generate them.

### C. Advisor workspace (v1's retired segment B)
- Source: underused asset (v1 research on advisors)
- Chain: matching engine plus client taste profiles → advisors plan client trips faster → advisors make money → **Wealth**.
- Angle: the same engine, sold to professionals who plan trips every week instead of a few times a year.

### D. Weekend packages (v1's "one stay, three to do, three to eat")
- Source: proven capability (built in v1)
- Chain: a pre-assembled weekend → decide in one tap → save time → **Wealth** (time) and **Relationships**.
- Angle: fast, but a package is the same for everyone, which is the opposite of taste matching.

### E. Trip memory: publish the trips you took
- Source: underused asset (v1 import tools)
- Chain: turn a finished trip into a shareable itinerary → recognition from people who follow it → feel approval → **Relationships**.
- Angle: this is XPMatch's supply side (plan §4 "Share the whole trip") presented as a product of its own.

## Cut list

| Candidate | Why cut |
| --- | --- |
| Generic AI trip planner (v1's chat-first direction) | Fails the persistence check's "unique angle" question: nothing about it requires XPMatch's history or assets, and v1's docs show the founder retired it |
| Group-trip organizer (v1 segment C) | Cut by the PRD: group preference matching is outside the beta (PRD §3), and v1 kept it only as a research slot |

## Persistence check (candidates A–E)

| # | Question | A | B | C | D | E |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Does the founder like doing this? | Yes: it is the founder's chosen product (PRD) | Unknown; hand-planning trips is service work | No: the founder retired it (PRD) | Unknown | Yes, as part of A |
| 2 | Interested in learning more? | Yes | Unknown | No | Unknown | Yes |
| 3 | Still liked in 6–12 months? | Likely (a long PRD investment) | Unknown | No | Unknown | Likely |
| 4 | Natural expansion (name two) | More cities; hotels and flights (PRD REQ-016) | Group trips; honeymoons | Agencies; corporate travel | Seasonal packs; gift trips | Creator itineraries; paid guides |
| 5 | Unique angle: why XPMatch? | The PRD's trust rules and matching | Weak: anyone can sell custom itineraries | Moderate | Weak | Moderate |

Q1 cuts C: the founder does not want to build it. C stays in the scorecard only as the external benchmark the forced-spread rule asks for ("is this more scalable than C?"). It cannot be recommended.

## Scorecard

Each candidate was scored against the strongest one (C), not in the abstract.

| Idea | Clarity | Usability | Stability | Scalability | Stickiness | Profitability | Total |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A. Taste-matched real-traveler itineraries | 3 | 4 | 4 | 3 | 2 | 2 | **18** |
| B. Concierge itinerary service | 5 | 1 | 4 | 1 | 2 | ~~4~~ 2 `SUPERSEDED` | ~~17~~ **15** |
| C. Advisor workspace (benchmark only, cut by Q1) | 3 | 2 | 4 | 4 | 5 | 4 | **22** |
| D. Weekend packages | 4 | 4 | 2 | 4 | 1 | 2 | **17** |
| E. Trip memory | 3 | 4 | 3 | 4 | 2 | 1 | **17** |

Totals ran from 17 to 22, a 5-point span, one short of the skill's 6-point rule. `SUPERSEDED` by `validation.md` (2026-09-23): after B's re-score the totals run from 15 to 22, a 7-point span. The lenses still don't separate A, D and E by score alone, so the separating sentences below remain:
- **A vs B:** B is a service whose hours grow with every customer (Usability 1, Scalability 1). A is software once the city's supply exists.
- **A vs D:** D gives everyone the same weekend, which is the generic list the UVP's enemy describes. A exists to be different per person.
- **A vs E:** E is A's supply side. It can't stand alone, because nobody pays to publish their trip (Profitability 1). Merge E into A.

**Profitability scores were provisional.** A's 2 reflects zero paying customers and an undecided revenue model; B's 4 assumed people already pay for custom itineraries.

**Result from `validation.md` (2026-09-23):**
- **A's 2 stands:** no spend was observed for 2–4 day city trips.
- **B's 4 is `SUPERSEDED` and becomes 2:** human planners do charge (USD 250 per travel day; USD 399 or €400 per trip), but only for trips of 5 days or more. The two 3-day guides for sale have 0 ratings.

## Recommendation

**A. Taste-matched itineraries from real travelers**, with E merged in as its supply side.

It sits in a paying market only if validation shows travelers already spend on planning (apps or custom itineraries). Its weakest lenses are the known risk for consumer travel products: people take only a few leisure trips a year (Stickiness 2), and willingness to pay is unproven (Profitability 2). The plan's post-trip reviews, partner planning and next-trip return metric (PRD H3) are its answers to stickiness. None is proven.

- **Runner-up:** B, the concierge service. It lost on usability and scalability, but it is the fastest way to learn what travelers will pay for. That is why `offer.md` names it as the first paid rung, if the founder chooses to run the PRD's separate experiment.
  - **Amended by `validation.md`:** paid human planning was seen only for trips of 5+ days, so aim the experiment there. The one short-trip test is the USD 79 presale that `validation.md` names.
- **The new angle this audit adds:** by the lenses, the consumer premise's weakness is stickiness, not positioning. The benchmark C shows what high stickiness looks like: professionals plan trips every week. The founder has ruled out advisors, so the job is to make A come back more often. That makes post-trip reviews, partner planning and "every trip improves the next plan" core retention work, not nice-to-haves.
- **Differentiation:** read `differentiators.md` before acting. At the time of scoring it didn't exist; the recommendation above is revisited there.
- **Kill condition:** this recommendation is wrong if the 10-traveler relevance study (plan §10) shows fewer than 7 of 10 travelers prefer the matched plan over a destination-only one. Then A has no reason to exist and B becomes the business.

## Assumptions & Unknowns

- `GAP`: the founder's own origin story (solved-internally) and any inbound requests (none exist yet).
- `INFERRED`: stickiness scores assume 2–4 leisure trips a year, from v1's segment description (v1 `docs/BUSINESS_PLAN.md` §3), not measured behavior.
- **Profitability scores, checked in `validation.md`:** A's 2 stands and B's 4 is superseded (now 2). Neither is measured on XPMatch's own travelers yet.
- The advisor benchmark's stickiness score (5) is reasoning from how often advisors plan trips, not a measurement.
