# Business Analysis — XPMatch

Skill: `cmba-metrics` (stage 11 of `cmba-run`). Written 2026-09-23. Read first: every earlier artifact, and the MVP-1 plan's §10 measurement plan.

**Scope:**
- This covers the *go-to-market* loop: site, magnet, email, waitlist, supply and money.
- In-app product metrics belong to the plan's §10: activation, kept-item ratio, H1 relevance, H2 profile path and the rest. They aren't re-scheduled here.
- Where the two meet (an invitation accepted, then a first plan), this file uses the plan's definitions.

## Baseline

| Metric | Value | Source | Status |
| --- | --- | --- | --- |
| Daily visitors (site and per landing page) | — | No analytics on a v2 page; v1 site traffic not inspected | `UNKNOWN`: install analytics (window 0) |
| Where visitors come from | — | No UTMs yet | `UNKNOWN`: UTMs per `email.md` |
| Time on site, per page | — | — | `UNKNOWN`: window 0 |
| Bounce rate | — | — | `UNKNOWN`: window 0 |
| Daily sales | 0 | Nothing is sold; the beta is free by design (plan §4) | Known: 0 |
| Conversion per page (magnet opt-in; waitlist join) | — | Pages not live | `UNKNOWN`: form submissions as events (window 0) |
| Revenue | 0 | Free beta; no partner agreement; no concierge running (`offer.md`) | Known: 0 |
| ARPU | — | No paying customers | Not applicable until a paid rung exists |
| CAC | — | No spend recorded; founder time isn't tracked | `UNKNOWN`: log founder hours per channel from window 0 |
| LTV | — | No revenue | Not applicable yet |
| LTV : CAC | — | — | Not applicable yet |
| USD per landing-page visit | 0 by design | Free beta | Known: 0. It is **not** a problem to fix during the beta |
| **Proxy summary metric:** activated travelers per 100 landing visits | — | Landing visits → waitlist → invitation accepted → plan activation (plan §10 definition) | `UNKNOWN`: needs window 0 plus app events |
| Permissioned trips collected for [pilot city] (supply) | 0 | Plan S0.3: the founder track hasn't started | Known: 0 |
| Email metrics (open, click, bounce, unsubscribe) | — | No list | `UNKNOWN`, per `email.md` |

Every dollar metric is 0 or not applicable because of a plan decision, not a failure. The summary metric is replaced by the proxy until D-016 sets a price.

## Precondition: instrumentation (window 0, not a test)

The baseline is almost entirely `UNKNOWN`, so the first 30 days are **instrumentation**, with no hypothesis and no keep/kill line. Nothing below may start until all of these are live:

1. Privacy-respecting page analytics on the magnet page and the waitlist page (tool chosen by the founder; free tier first).
2. Form submissions fired as events: magnet opt-in, waitlist join, survey completed, contributor form sent.
3. UTMs on every link (`email.md` scheme), and the source stored with each sign-up.
4. Email provider events: sends, opens, clicks, bounces, unsubscribes.
5. A founder time log per channel (LinkedIn, forums, DMs, concierge), so CAC in hours exists.
6. A permissioned-trips counter for [pilot city], with its source recorded: passive link or an active ask.
7. From the pilot on, the app's own events (plan §10): `signin_completed`, `profile_confirmed`, `trip_started`.

**Also live in window 0**, because they're launches, not tests:
- the magnet page and journey emails (`lead-magnet.md`, `journey.md`);
- the waitlist page and welcome series (`profile.md`, `email.md`);
- the *passive* contributor asks: the site footer link and the line in the LinkedIn About.

Window 0 records their baseline rates.

## Levers vs outcomes

| Candidate change | Lever or outcome | Kept? |
| --- | --- | --- |
| "Get more beta sign-ups" | Outcome | No: act on its levers |
| "Increase plan activation" | Outcome (and owned by plan §10) | No |
| "Make revenue" | Outcome (and 0 by design) | No |
| Active contributor ask: `content.md` post 4 plus direct messages to people the founder knows who've been to [pilot city] | Lever (supply) | Yes |
| Concierge presale (`validation.md`'s cheapest test) | Lever (offer) | Yes |
| Urgency email with a real pilot cap (`journey.md` email 5) | Lever (urgency) | Yes |
| Forum answers vs LinkedIn posts as the traffic source | Lever (traffic) | Ranked, cut |
| Magnet headline variant ("overwhelm" vs "sameness") | Lever (copy) | Ranked, cut |
| Email 2 rewrite | Lever (copy) | Ranked, cut |
| Landing-page video and readability | Lever | Ranked, cut |
| Voice-first vs survey-first profile | Lever, but owned by the plan (PRD H2) | Excluded here, so it isn't scheduled twice |
| Hand-run relevance study | Owned by the plan (H1, S0.3) | Excluded here, same reason |

## Hypotheses (ranked)

| # | Hypothesis (if / then / because) | Metric | Impact 1–10 | Keep? |
| --- | --- | --- | --- | --- |
| 1 | If the founder actively asks (post 4 plus direct messages with the contributor form link), then permissioned [pilot city] trips rise well above the passive baseline, because right now no one is asked directly, and supply is the binding constraint (`idea.md`) | Permissioned trips per 30 days, by source | 9 | **Yes** |
| 2 | If survey completers are offered a hand-built 3-day plan at USD 79, then at least 3 of 20 pay within 14 days, because the pain is stated in their own words and human planning sells for longer trips (`validation.md`) | Paid presales ÷ offers | 8 | **Yes** |
| 3 | If pilot-city subscribers who haven't joined get the urgency email with a real cap and date, then waitlist joins from that email outnumber unsubscribes it causes, because a real cap turns "later" into a date (`journey.md` email 5) | Joins with `utm_campaign=email5`; unsubscribes from email 5 | 7 | **Yes** |
| 4 | If forum answers replace half of the LinkedIn posting time, then visitors per founder-hour rise, because searchers are in forums (`validation.md`) | Visitors per founder-hour, by source | 6 | No (cut) |
| 5 | If the magnet headline leads with "sameness" instead of "overwhelm", then opt-in rises, because distrust quotes outnumber overwhelm quotes | Visitor → email | 5 | No: at about 200 visitors a month, a split test would need roughly 580 visitors to detect 20% vs 30%, about 3 months (see Assumptions) |
| 6 | If email 2 leads with the product instead of the empty column, then clicks rise | Email 2 click-through | 4 | No: too few subscribers to resolve, and it contradicts the journey's stage discipline |
| 7 | If the landing page adds the 6-minute video, then time on page and opt-in rise | Opt-in | 2 | No |

**Top 3:** #1 supply, #2 money, #3 urgency. The rest are cut, not deferred into the same windows.

## Test calendar

The dates are proposals: shift the whole calendar with the founder's actual start. Only one change runs per window, and each keep/kill line is fixed now, before the test runs.

| Window | Change | Metric watched | Keep / kill (decided now) |
| --- | --- | --- | --- |
| **W0** 2026-10-05 → 2026-11-03 | **Instrumentation and launches (not a test).** Analytics, events, UTMs, time log; magnet, waitlist and passive contributor links live | Baselines only | No criterion. Don't start W1 until items 1–6 of the precondition list are live |
| **W1** starts the day D-006 names the city, 30 days (earliest 2026-11-04) | **Active contributor ask:** `content.md` post 4 plus direct messages, each with the contributor form link. `content.md` moves asset 11 into this window so it isn't run twice | Permissioned trips (with web and in-app permission) in 30 days, by source | **Keep** the active ask as the main supply channel if ≥10 trips come in, with at least 3× W0's passive rate. **Kill** it if <3: supply needs a different channel (local guides, partners) before any city content ships. Between 3 and 9: extend 30 days once, then decide |
| **W2** 30 days after W1 ends (earliest 2026-12-04) | **Concierge presale:** USD 79 3-day plan offered to the first 20 survey completers who aren't friends or family. Only if the founder decides to run the PRD's experiment (`offer.md`) | Paid within 14 days of the offer | **Keep** (spend shown, `validation.md` flips to GREEN for this audience) if ≥3 pay. **Kill** the traveler-pays hypothesis for short trips if 0 pay. 1–2: record it as weak evidence; no GREEN. The 20 people are left out of the journey email metrics for this window |
| **W3** starts the week pilot invitations open with a real cap and date, 30 days (no date yet: plan §9 sets none until slice 1 is measured) | **Urgency email** (`journey.md` email 5) to pilot-city subscribers who haven't joined | Joins attributed to `utm_campaign=email5`, and email 5 unsubscribes | **Keep** if joins ≥5 and joins > unsubscribes. **Kill** (drop email 5, keep email 6) if joins < unsubscribes. City content (`content.md` asset 1) must not launch during W3, or email attribution is the only reading allowed |

## NPS instrument

- **Who and when:** sent by email 14 days after a traveler's first created itinerary (plan §10 `trip_started`).
- **Why outside the app:** it adds no MVP-1 scope.
- **Where answers live:** a free form tool the founder controls, never in this repository. Free-text answers are never sent to the model.

> **How likely are you to recommend XPMatch to a friend planning a city trip?** (0–10)
>
> - **10:** What did you love most about your plan? *(free text; ask separately for permission to quote it, per the testimonial spec in `journey.md`)*
> - **9:** What one thing would have made it a 10?
> - **7–8:** What specifically would make XPMatch a 9 or 10 for you?
> - **0–6:** Where did XPMatch fail to give you a plan that fit? *(free text)* Then: "Can we ask you two follow-up questions?" (yes/no)

- **Score:** % promoters (9–10) minus % detractors (0–6).
- **Baseline run:** the first 5 pilot travelers (plan slice 13), reported as counts with the score beside them, per plan §10.
- **Cadence:** each pilot cohort and each wave.
- **Trend target:** up from the pilot to wave 1. The absolute number isn't a goal.
- **Detractor analysis can end two ways:**
  - fix the plan quality (plan §10 metrics); or
  - find what the detractors have in common and set expectations earlier, for example "one city only" or "no booking".

## Incentive readiness

- **Trigger:** NPS rising across two consecutive cohorts, promoters above 50% of respondents, and at least 20 respondents.
- **Only then** consider a traveler referral incentive. The in-app partner invite is not a referral program and needs no incentive.
- **Current status:** not ready. There are no travelers.

## Control comparison

What v1 visibly tried, per its docs:
- zero outside testers and zero paying customers (`idea.md`);
- a 15-question quiz as its opt-in (`lead-magnet.md`);
- copy promising creators payment for bookings (`differentiators.md`).

None of the three kept hypotheses repeats those:
- **#1** asks for trips with permission and **no payment**, the opposite of v1's payout promise;
- **#2** (money) and **#3** (urgency) were never run.

## Assumptions & Unknowns

- **Every threshold** is a decision made now so it can't be moved later. None is a benchmark.
- **The split-test arithmetic** (hypothesis 5) assumes a two-sided test at 95% confidence and 80% power: n ≈ (1.96 + 0.84)² × (0.2·0.8 + 0.3·0.7) ÷ 0.1² ≈ 290 per arm.
- **W1 and W3 dates** depend on D-006 and on the pilot opening. The plan sets no dates before slice 1 is measured.
- **CAC in hours:** it exists only if the founder logs time. Without the log, CAC stays `UNKNOWN`.
