# Offer Architecture — XPMatch

Skill: `cmba-offer` (stage 9 of `cmba-run`). Written 2026-09-23. Read first: every earlier artifact, especially `validation.md` (AMBER: no spend on 2–4 day trips), `differentiators.md` (POSITIONAL) and `lead-magnet.md` (the survey design).

**Scope, set by Gate 0 (`idea.md`):** the built offer is the **beta invitation**, which is what every upstream artifact converts to. The one paid rung that could exist now, the concierge from the PRD's separate experiment, is specified as the *next rung*, with its arithmetic.

## Position

- **Quadrant: small + niche.**
  - **Audience:** no email list, no measured following. The founder's LinkedIn follower count is a `GAP` (login wall), and v1 site traffic is `UNKNOWN`.
  - **Topic:** 2–4 day trips to one pilot city for travelers who choose by fit, not fame. There are no posts yet to measure topical spread; the planned themes are in `content.md`.
  - **What this quadrant suits:** a medium-ticket service, paid workshops, and 1:1 work.
- **Route: southern.** Narrow and deep: one city, one audience, before breadth.
- **Next rung:** a medium-ticket service (the hand-built plan), run as a paid *test*. Not a subscription, not a course.

## Ladder inventory

| Rung | Offer | Price | Status | Source |
| --- | --- | --- | --- | --- |
| Free product | The XPMatch app, MVP-1 pilot | Free | `CONFIRMED` as a plan decision; not live | Plan §4, "How money moves" |
| Partner revenue | Outbound "Check price and availability" and "Official site" links; commission only once a partner confirms it | Set by partners | `INFERRED`: planned, and no partner agreements exist | Plan §4 step 6 and "How money moves" |
| Concierge | A hand-built itinerary (the PRD's separate experiment) | USD 79 | `INFERRED`: defined in the PRD, with no sign it's running | PRD §1 (via `idea.md`) |
| Creator payouts | "get paid when people with your standards book what you recommend" | — | `UNKNOWN`: claimed on the live v1 site, not in the plan (no payouts in MVP-1) | X1 (`differentiators.md`) |
| Subscription | Like Wanderlog Pro (USD 5.99–16.99 a month) or Layla Premium (USD 9.99 a month) | — | Absent; D-016 open | Plan D-016; `validation.md` |
| Business offers (v1 site) | "For business": Venues, Hosts, Packages, "Book a demo" | — | `CONFIRMED` in the live v1 site's navigation (fetched 2026-09-23); whether anything is sold is `UNKNOWN` | xpmatchme.com; missed by the first version, found by `eval.md` |
| Creator program (v1 site) | "For creators": Become a Creator, Creator Academy | — | `CONFIRMED` in v1's navigation; whether it runs is `UNKNOWN` | xpmatchme.com |

**Absent rungs:** the paid concierge (not running) and a subscription.

**Recommendation targets:** the concierge, as a test. Its absence is `INFERRED`, so **the first action is confirming it:**
- the founder confirms that no concierge or paid plan is sold anywhere today, including the v1 site;
- the founder confirms whether v1's creator-payout claim is live or only copy;
- the founder confirms whether any of v1's business offers (venues, hosts, packages) is sold. If one is, it's an operated rung and is not recommended as new. The concierge test stays on the traveler side.

No rung the subject already operates is recommended.

## Differentiation check

Read from `differentiators.md`, not re-derived: **POSITIONAL.**
- **Competitors:** wanderlog.com, the Layla store listings and mindtrip.ai (fetched 2026-09-23).

| Element | Verdict | Evidence |
| --- | --- | --- |
| Free AI plan | SHARED | Mindtrip "(and yes, it’s totally free)" (M4); Wanderlog free with Pro (W5) |
| Built from real travelers | SHARED | W3, M4 |
| Why each stop fits, its catch and its source trip | OURS | No rival claims it |
| An honest "not enough" instead of filler | OURS | Rivals promise "anywhere" (M1, W2) |

**How the offer uses the `OURS` element:** its achievement statement *is* the differentiator: every stop carries why, the catch and the source, or the traveler is told a day couldn't be filled well.

**Shelf life against payback:**
- **The beta:** free, so there's no payback period to set against the shelf life of about 12 months (`UNSOURCED`).
- **The concierge test:** a presale that pays back immediately.
- **Any future subscription** would need to pay back well inside 12 months, or rest on the structural follow-up in `differentiators.md` (taste-tagged trip ratings).

**Substitution test:** "Join Wanderlog's [pilot city] beta: a plan built only from real travelers' trips, where every stop shows why it fits you, the catch and whose trip it came from."
- False for Wanderlog: it auto-generates plans ranked on Tripadvisor and Google reviews (W2).
- False for Mindtrip ("anywhere… in seconds", M1) and Layla (chat-written plans, L2).
- **Passes.**

## Ladder model

Every value in this section is a placeholder and `UNSOURCED` unless it cites a source. The point is the structure and the break-even, not the totals.

**Partner commissions**, the plan's revenue path:

> revenue per started trip = bookable clicks per trip × click-to-booking rate × average booking value × commission rate

- **Placeholders:** 3 × 5% × USD 150 × 4% = **USD 0.90 per started trip**.
- **Against cost:** the plan's cost hypothesis is about USD 1 of model spend per started trip (PRD §11). At these placeholders, commissions don't cover model cost.
- **The volume assumption to test first:** click-to-booking. It's unobservable until a partner confirms bookings, and no commission is claimed before then (plan).
- **Break-even:** at USD 1 cost per trip, a trip needs about USD 25 of confirmed bookings at a 4% commission.

**Concierge presale test** (`validation.md`'s cheapest test):
- **Offer:** 20 people × a USD 79 hand-built 3-day plan. The pass line is 3 paid, which is USD 237.
- **Effort:** about 2.5 founder-hours a plan (`UNSOURCED`), so about USD 32 an hour.
- **Verdict:** this is a learning instrument, not a business.

**Long-trip concierge** (the pivot in `validation.md`):
- **Offer:** trips of 5+ days, priced against the observed USD 250–400 human planners (Revealed Rome, Tiffany Parks, Euro Travel Coach).
- **Example:** USD 299 × 4 a month = **USD 1,196 a month** for about 20 hours (`UNSOURCED` hours).
- **Effort reduction:** the app's own planner drafts the plan and the founder finishes it. That cuts hours only once slice 5 exists.
- **Outsourcing:** none yet.

**Subscription:** not modeled.
- **Why:** no spend was seen for short trips, and trips happen "once or twice a year" (`validation.md`).
- **If it's ever tested:** an annual price (the observed range is USD 31.99–59.99) fits trip frequency better than a monthly one.

| Rung | Offer | Price | Volume | Annual | Effort |
| --- | --- | --- | --- | --- | --- |
| 1 | Beta invitation | Free | Pilot of 20, then waves up to 1,000 (plan §12) | 0 | Product and operations |
| 2 | Partner links | Commission | 1,000 testers × 1.5 trips a year × USD 0.90 | ≈ USD 1,350 (placeholder) | Low once built |
| 3 | Concierge test | USD 79 | 3–20 plans, once | USD 237–1,580, once | 2.5 h a plan |
| 4 | Long-trip concierge (if Q3 demand appears) | USD 299 | 4 a month | ≈ USD 14,352 | ≈ 20 h a month |

- **Total:** not meaningful yet. Every row after the first is a hypothesis.
- **Net hours saved:** none until the app drafts plans for the concierge.

## The offer (built): the [pilot city] beta invitation

1. **Achievement statement:** by the end of your first session, you'll have a saved plan for every day of your 2–4 days in [pilot city]. Every stop comes from a real traveler's trip and shows why it fits you, what the catch is and whose trip it came from.
   - **How it's held to account:**
     - the plan's activation metric (a first itinerary within 24 hours of an approved profile);
     - the share of requested days filled with good options.
   - **A day XPMatch can't fill well** is shown honestly (plan §4 step 4), but it counts as a miss against this promise, not a success. The first version let either outcome count (`eval.md`).

2. **Likelihood:**
   - **Outcome statement:** Today a short trip means a pile of open tabs and a plan that looks like everyone else's. After one session, you have days that fit how you travel, and you know the catches before you go.
   - **Testimonial required** (spec only; none exists):
     - from a pilot traveler who isn't a friend, family member or staff;
     - about *this plan*, naming one stop that fit and one catch that helped;
     - published with written permission as first name plus trip type, without dates or companions.
   - **Guarantee:** every stop comes from a real traveler's trip, shared with their permission. If you find one that doesn't match its source, report it in the app. We'll check it within 2 working days, fix or remove it, and tell you what changed.
     - This is honorable at pilot scale: the plan's operator queue has a named response owner (slice 7).
     - Re-check the 2-day promise against the plan's "median time to resolve a report" before each wave.

3. **Accelerants:**
   - The 4-slot planner (`lead-magnet.md`) as the mental model.
   - A profile in a short voice chat or a few taps.
   - Swipe alternatives, typed changes ("cheaper dinner on day 2") and undo.
   - Evening check-ins that make the next plan better.
   - Invite a partner to the same plan.

4. **Fascinations** (two only):
   - The one question every stop in your plan answers that no top-10 list does.
   - Why the best stop in your plan may be one you've never seen on a list.

**Price: free while in beta.**
- **Why free:** no spend was observed for 2–4 day trips (`validation.md`), the nearest rival is free (Mindtrip), and the pilot's job is evidence for H1 and activation, not revenue.
- **When this changes:** D-016 decides pricing after the pilot.

## Landing page skeleton

The beta waitlist page in `profile.md` is this offer's page.
- **Hero:** the achievement in plain words, with one CTA.
- **Benefits:** the three steps from `profile.md`, then the five-inch and five-mile benefits from `journey.md` email 4.
- **Proof:** none until the testimonial spec is met. The guarantee sits there instead.
- **FAQ:**

| Question | Answer |
| --- | --- |
| Is it free? | Yes, during the beta |
| Which phones? | iPhone and Android |
| Which cities? | [pilot city] first; join the waitlist for yours |
| Whose trips are these? | Real travelers who agreed to share them and can withdraw them any time |
| Can other travelers see me? | No, unless you choose to share (plan §4) |
| What do you do with my data? | Link to the privacy policy |
| Why one city? | Real trips take time to collect |

- **Bold CTA:** `Join the [pilot city] beta`

## Right-person outreach template

Send it manually while the list has fewer than 100 people, and automate it after that (`email.md`). The segments come from the lead-magnet survey (Q1 timing, Q2 challenge, Q4 city).

> Subject: Your [pilot city] trip in **[month from Q1/Q4]**
>
> Hi [first name],
>
> You said the hardest part of your last city trip was **[Q2 answer, in their words: "narrowing it down" / "lists that didn't match what you like" / "knowing who to trust" / "turning places into days" / "agreeing on the plan"]**.
>
> That's exactly the part XPMatch does: it builds the days from what real travelers actually did, matched stop by stop to you, and every stop shows **[for "trust": whose trip it came from / for "fit": why it fits you / for "days": which area and slot it's in]**.
>
> The [pilot city] pilot is small, and invitations go out in the order people joined. Want in? [Join the [pilot city] beta →]
>
> [first name] at XPMatch

Every bolded segment varies by persona. Unbolded text stays the same.

## Next rung (not built): the concierge presale

The spec, for when the founder decides to run it:
- a USD 79 hand-built 3-day [pilot city] plan;
- offered to the first 20 survey completers who aren't friends or family;
- pass line: at least 3 paid within 14 days.

**What happens next:**
- **If it passes and Q3 ("A person who plans it for me") is high:** build the long-trip version as a full four-part offer with `cmba-discovery`. A service is then in scope, so the skipped stage 8 re-opens.
- **If 0 pay:** revenue rests on partners alone.

## Control comparison

- **There's no live pricing page to compare against.** v1's older prices were retired by the PRD (plan §1). This offer is more specific about the achievement than anything live.
- **What it lacks:** the proof a real offer would have (testimonials, counts). It can't manufacture those, and it doesn't.

## Assumptions & Unknowns

- **Every revenue figure is `UNSOURCED`**, except the competitor prices from `validation.md`. The commission math is a formula with placeholders.
- `INFERRED`: that the concierge isn't running, and that v1's creator payouts are only copy. Confirm both first.
- **The guarantee's 2-day window** is a pilot-scale promise; review it at each wave gate.
  - The plan names a response owner but sets no response time (slice 7), so this is a new promise.
  - The founder must confirm it before it appears anywhere.
- **D-016 (pricing) stays open.** "Free while in beta" is a pilot decision, not a price.
