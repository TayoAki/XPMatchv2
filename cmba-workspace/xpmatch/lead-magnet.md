# Lead Magnet System — XPMatch

Skill: `cmba-leadmagnet` (stage 7 of `cmba-run`). Written 2026-09-23. Read first: every artifact before it, especially `uvp.md`, `profile.md` and `content.md`.

**Order note:** `cmba-run` says stages 7 and 9 inform each other, and that stage 6 needs this stage's concept. So the order was:
1. Draft this magnet.
2. Sketch the offer: a free beta invitation, built fully in `offer.md`.
3. Finalize this magnet.
4. Write `journey.md`.

## Problem architecture

- **Narrow problem:** turning a list of places into 2–4 days that work (how many things a day, which area when, what goes in the morning). Small, tactical, done in one sitting.
- **Wide problem it exposes:** filling each slot with a place that fits how *you* travel, knowing why it fits, what the catch is and whether the person who recommended it travels like you. That's the ongoing, expensive part: evenings of research and distrust (`validation.md`, quotes 1–9). It's what the beta app does (`offer.md`).
- **Bridge sentence:** *"Great, your days have a shape now. But what are you putting in the slots? Every row asks why it fits you, what the catch is and who recommended it. That's the part that takes evenings, and it's the part XPMatch does from real travelers' trips."*

**Failure tests:**
- **Too generous?** No. The template gives structure and leaves the slots empty. It teaches the three questions (fit, catch, source) but can't answer them.
- **Does it raise the wide problem naturally?** Yes. The template's own columns ("Why it fits me", "The catch", "Who recommended it") make the gap visible the moment someone tries to fill a row.

## Format decision

- **Quadrant: top-left**, easy to consume and high engagement.
- **Why:** the offer is simple and free (a beta invitation), so volume matters more than lead heat, and top-left produces volume. A top-right format (a webinar or 1:1 consult) is for complex, expensive offers, and XPMatch has none. The possible paid concierge (`offer.md`) is a later, separate test.

**Format:** *The 4-slot city trip planner*, a copyable template (Google Sheets and a printable page), plus a 6-minute video showing it filled in for one day.
- **Tab 1, "Your days":**
  - rows are Day 1–4 × Morning, Lunch, Afternoon, Dinner;
  - columns are Area, Place, Why it fits me, The catch, Who recommended it (and do they travel like me?), Open that day?, Backup.
- **Tab 2, "Your 3 must-haves":** three lines, filled in before searching (content headline #4).
- **Tab 3, "10-minute check":** the five checks from content post 1 (exists and is open, one area per half-day, count the famous names, why this for me, find the catch), as tick boxes beside each row.
- **The video:** fills one day using the method. The example is labeled *illustrative* and uses no real traveler's trip unless that traveler gave web permission (`content.md` rules).
- **What it isn't:** a cheat sheet or ebook. Those are bottom-half formats the skill never builds from. This is a working tool the traveler fills in.

It ships before D-006, because it needs no city. City-specific versions come later with permissioned trips.

## Landing page (full copy)

**Headline:** Plan your next city break with the 4-slot day: three days that fit you, not everyone else's itinerary.
- It fuses two desires from `validation.md`: days that don't overwhelm ("overwhelmed… only have a few days") and not the same trip as everyone ("the same itinerary as it seems everyone else is on").

**Image direction:** a phone and a laptop side by side, showing the template's Day 1 with two rows filled and two empty.
- The filled rows show the column headers "Why it fits me" and "The catch".
- Any example text is marked *Example*. No real business is shown next to an invented comment.

**Transformation copy (three lines):**
- Turn a list of 30 places into three days you'll actually enjoy.
- Know why each stop fits you before you go, not after.
- Spot the catch (queues, closing days, cross-town walks) while you can still swap it.

**Form fields:** email only.
- Below the field: "We'll email you the template now, three short notes this week, then about one a week for a month. Unsubscribe any time." Privacy policy link.
  - This is the real cadence of `journey.md` plus one `email.md` track. The first draft said "a few short notes", which undercounted it (coherence fix, `_run.md`).
- **EU visitors:** if the pilot city or audience is in the EU, add an unticked consent box for the notes (see Assumptions).

**Trust builders:** none. None are real yet, so the page is designed without them. No testimonials, counts or logos until real ones exist.

**CTA button:** `Send me the template`

One CTA, no navigation bar, fifth- to sixth-grade reading level.

## Survey (on the thank-you page)

Shown right after the email is submitted, next to the template link. It isn't a plain thank-you page. The wording reuses `validation.md`'s questions so the answers pool with the waitlist survey.

1. **Are you planning a city trip in the next 3 months?** Yes, already booked · Yes, not booked yet · Maybe · No *(validation Q1)*
2. **What was the hardest part of planning your last 2–4 day city trip?** There were too many options and I couldn't narrow them down · Lists and reviews didn't match what we actually like · I couldn't tell which recommendations to trust · Turning places into days that made sense · Agreeing with the person I travel with · Other: ____ *(validation Q3)*
3. **What would help most on your next short trip?** An app that builds a plan from real travelers' trips that fit my taste · A person who plans it for me · A ready-made guide to the city · Friends' recommendations · Nothing, I like planning it myself *(validation Q7)*
4. **Where's your next city trip?** [pilot city] · Somewhere else: ____ · Not sure yet
5. **Open:** Tell us about the last time a travel recommendation turned out wrong for you. What happened? *(validation Q10)*

**Tool: Google Forms.**
- **Why:** free, which fits a pre-pilot stage with zero audience and no approved spend (AGENTS.md: no paid provider without the founder's authorization). The answers land in one sheet with the waitlist survey.
- **Moving up:** Typeform's logic isn't needed at under 1,000 responses. RightMessage makes sense only once `email.md`'s engine runs at volume.
- **Privacy:** the privacy policy must say the answers are stored in the founder's Google account.

## What the survey will let you decide

| Question | Decision it unlocks |
| --- | --- |
| Q1: planning now? | Who gets a pilot invitation first ("booked" and "not booked yet" with Q4 = pilot city), and which email branch they get (`email.md`) |
| Q2: biggest challenge | Which content theme leads (`content.md`) and which feature the invitation emails lead with (fit, trust, scheduling). If "Agreeing with the person I travel with" is under 10%, content asset 12 is dropped |
| Q3: format | Whether an app is the right format at all. If "A person who plans it for me" beats the app option, the concierge test in `offer.md` moves up. "Nothing, I like planning" gets content only, with no invitation push |
| Q4: city | Pilot invitation or waitlist, and demand for the next city (the plan's "more cities" expansion gate) |
| Q5: open | Objections and exact wording for the next `uvp.md` revision |

## Conversion expectations (falsifiability)

These bands are `UNSOURCED` planning numbers, not benchmarks. Replace them with the first 30 days' actuals.

| Stage | Expected band | If it's below the band, it means… |
| --- | --- | --- |
| Landing-page visitors per month | ≥200 from warm sources (founder's LinkedIn, forum profile links) | Under 200: a **traffic** problem. Fix distribution (`content.md`), not the page |
| Visitor → email | 20–40% from warm traffic | Under 10% with ≥200 visitors: a **headline** problem first (test the headline alone), then a **magnet** problem (test the video-only version) |
| Email → survey completed | ≥30% | Under 30%: the survey is too long or badly placed. Cut it to Q1–Q3 and Q5 |
| Email → beta waitlist (pilot city only) | ≥15% of those with Q4 = pilot city | Under 5%: a **bridge or offer** problem. Rework email 2 in `journey.md` before changing the magnet |

## Control comparison

The live v1 site's opt-in (fetched 2026-09-23, `differentiators.md`), against the four required elements:

| Element | Present? |
| --- | --- |
| 1. Headline fusing two desires | "Ready to stop wasting your weekends?" has one desire. **No** |
| 2. Tangible image | `UNVERIFIED`: not captured |
| 3. Transformation copy | `UNVERIFIED`: not captured |
| 4. Minimal form | "Answer 15 questions…" is a 15-step quiz before capture. **No** |

**Finding:** at least 2 of the 4 elements are missing; 2 are unverified.

## Assumptions & Unknowns

- **Consent law** depends on where subscribers live. The pilot city isn't decided (D-006).
  - If the audience includes the EU or UK, the follow-up notes need explicit, unticked consent.
  - The disclosure line alone may not be enough.
  - Confirm with the chosen email provider's consent features before launch.
- **The conversion bands are `UNSOURCED`.**
- **The email provider isn't chosen.** It's the founder's decision; paid tools need authorization.
- **The survey options are hypotheses.** They're written from `validation.md` quotes and are only the audience's own words where a quote supports them.
- **The template's columns mirror the app's evidence model (fit, catch, source) on purpose.** If testers don't find those columns useful by hand, that's early evidence about the app's cards too; `metrics.md` records it.
