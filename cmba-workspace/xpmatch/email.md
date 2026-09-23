# Email Engine — XPMatch

Skill: `cmba-email` (stage 10 of `cmba-run`). Written 2026-09-23. Read first: every earlier artifact, especially `profile.md` and `lead-magnet.md` (the two forms), `journey.md` (the six emails) and `discovery.md` (skipped: no discovery form exists).

## 0. Should XPMatch do email, and in what form? **LIFECYCLE ONLY**

| Question | Answer |
| --- | --- |
| An audience, or a path to one, that isn't already transacting? | Yes: magnet subscribers and the waitlist |
| Do buyers follow, or search at the moment of need? | They search (`content.md`: intent-led). **Email retains; it doesn't acquire** |
| Can a stated cadence be kept indefinitely? | Not a weekly one. There's one founder, pre-pilot, building an app |
| Something every week the buyer wants? | No. Travelers plan "once or twice a year" (`validation.md`). A weekly issue would be filler, which is the enemy in `uvp.md` |

**Verdict: LIFECYCLE ONLY. There is no newsletter.**

Email's jobs:
1. Deliver the magnet and run the six-email journey (`journey.md`).
2. Welcome people who join the waitlist.
3. Send triggered emails: invitation ready, your wave opens, your city opens.
4. Send a seasonal [pilot city] note to people who ticked "occasional updates".
5. Reactivate people when a new wave or city opens.
6. Send the NPS survey after a traveler's first itinerary (`metrics.md`).

The trip itself (check-ins and reminders) runs in the app through push notifications (plan §4), not email.

## Growth: two tactics

| Tactic | Why this one | How it's tracked | Target |
| --- | --- | --- | --- |
| **The lead magnet**, the 4-slot planner (`lead-magnet.md`) | The only asset built for the solution-aware traveler. It works before the pilot city is chosen | `utm_source` per placement (`article-4slot`, `article-ai-check`, `linkedin`, `forum-profile`), `utm_medium=magnet` | 20–40% of warm visitors opt in (`UNSOURCED`, `lead-magnet.md`) |
| **Profile links and social CTAs** (the founder's LinkedIn Featured, banner and first comments; forum profile links where rules allow) | The pilot's first 20 come from the founder's network (`profile.md`) | `utm_source=linkedin` or `forum`, `utm_medium=social`, `utm_campaign=` the post's slug | Measured, not guessed: `UNKNOWN` until 30 days of data |

**Not chosen, on purpose:**
- **A third tactic:** a third source in the first 90 days would blur attribution.
- **Giveaways:** they attract prize-seekers, not travelers.
- **Cross-promotion:** there's no partner yet.
- **The in-app partner invite:** it's product growth, not list growth, and the app's own metrics count it (plan §10, "Partner adoption").

## Welcome series (the waitlist)

Two emails, for people who join the beta waitlist (`profile.md` form). Magnet subscribers get `journey.md` instead. The routing rules below keep anyone from getting both.

### Email 1 (immediate)

**Subject:** You're on the [pilot city] list: here's what happens next
**Preview:** At most one email a month. Here's exactly when.

> Hi [first name],
>
> You're on the list for XPMatch in [pilot city].
>
> Quick version of who we are: travel lists rank places by how popular they are, and AI planners fill every hour for anywhere. XPMatch builds your days only from what real travelers actually did, matched stop by stop to how you travel, and every stop shows why it fits you, what the catch is and whose trip it came from.
>
> **What you'll get from us, and when:**
> - **Your invitation:** the day your place in the pilot opens. It comes from Apple's TestFlight or Google Play testing, depending on your phone, and we'll tell you exactly what to tap.
> - **If you ticked "occasional updates":** at most one email a month, on the first Tuesday, around 9 am [pilot city] time, and under three minutes to read.
> - **That's all.** We won't send a newsletter or daily tips.
>
> Two small favors so the invitation doesn't get lost: **reply "yes" to this email**, and if it landed in Promotions or Spam, **move it to your main inbox**.
>
> One question, so we invite you at the right time: **when is your [pilot city] trip?** Reply with a month, or "not sure yet".
>
> [first name] at XPMatch

### Email 2 (day 7)

**Subject:** Three things to use before your invitation arrives
**Preview:** None of them need the app.

> Hi [first name],
>
> While you wait, here are the three most useful things we've made. None of them need the app.
>
> 1. **The 4-slot day**: plan 2–4 days in a city without wearing yourselves out. [article link]
> 2. **Check an AI itinerary before you trust it**: five checks, including whose trip each stop came from. [article link]
> 3. **4 questions about any reviewer**: how to tell if a 5★ came from someone who travels like you. [article link]
>
> When your invitation is ready, you'll hear from us the same day.
>
> [first name] at XPMatch

Two emails only. The skill's point is that a short welcome done well beats a long one, and this list's real engagement is the invitation.

## Routing (so no one gets the same intervention twice)

1. A magnet subscriber gets `journey.md` emails 1–4.
2. If they join the waitlist during those emails, the journey stops. They get welcome email 2 only, because journey email 1 already did welcome email 1's job.
3. Journey emails 5–6 (urgency) go **only** to the segment "Pilot city, trip soon" who haven't joined yet. They go only when a real cap and date exist.
4. Anyone who says "Somewhere else" never gets urgency emails.
5. After the journey's first week (emails 1–4 on days 0, 2, 4 and 6), at most one promotional email a week per person, across journey emails 5–6, tracks, seasonal notes and the `offer.md` outreach email. Triggered invitations are exempt.
6. **People on the waitlist get no shadow track.** Welcome email 1 promised them at most one email a month plus their invitation, and that promise wins.
7. The NPS survey (`metrics.md`) is a triggered send, 14 days after a traveler's first itinerary. It counts toward rule 5.

## Segmentation plan

Built from the lead-magnet survey and the waitlist form.

| Segment | Defined by | What they get differently |
| --- | --- | --- |
| Pilot city, trip soon | Q4 = [pilot city] and Q1 = booked or not booked yet (or the waitlist form's "When?" is within 3 months) | First invitations; journey emails 5–6; the right-person email in `offer.md` |
| Pilot city, later | Q4 = [pilot city], Q1 = maybe or no | Journey emails 1–4, then an invitation in a later wave; no urgency |
| Another city | Q4 = somewhere else (city recorded) | Journey emails 1–4, no pilot urgency, a "your city opens" trigger. Counts toward the next-city demand tally (`lead-magnet.md`) |
| Likes planning | Q3 = "Nothing, I like planning it myself" | Content only (articles, template updates). No invitation push |
| Wants a person | Q3 = "A person who plans it for me" | The concierge presale offer, **only if the founder runs it** (`offer.md`, next rung) |
| Not answered | No survey | Journey emails 1–4 with the default paragraphs; one reminder to answer Q4 |

Provider data (source and campaign from UTMs, open frequency) is used for attribution only, never to decide who gets invited.

## Shadow newsletter tracks

Adapted for LIFECYCLE ONLY:
- They're short, triggered tracks (4 issues, one a week), not a newsletter. Every issue reuses a `content.md` asset, so no new writing is needed.
- They start after journey email 4, for people *not* in "Pilot city, trip soon".
- **Build them only after ≥50 survey responses** confirm these are the top three challenges (Q2). If the data differs, rebuild around the actual top three.

| Track (Q2 challenge) | Issues | Titles | Merge point |
| --- | --- | --- | --- |
| Too many options | 4 | 1. The overlap test · 2. Write your 3 must-haves first · 3. The 4-slot day · 4. Leave a slot empty rather than fill it | Lifecycle list (invitation and seasonal note) |
| Lists don't match what we like | 4 | 1. A 4.8-star place can be wrong for you · 2. Popular vs right for you · 3. Your 3 must-haves · 4. How XPMatch shows why a stop fits | Same |
| Who to trust | 4 | 1. 4 questions about any reviewer · 2. A friend's tip vs a stranger's review · 3. The catch is the useful part · 4. Why every XPMatch stop names whose trip it came from | Same |

"Turning places into days" folds into the first track. "Agreeing with the person I travel with" gets no track unless the survey shows it at 10% or more (`lead-magnet.md`).

## Metrics baseline and targets

**Current values:** `UNKNOWN — needs owner input`. There is no list yet, and the v1 site's list, if any, wasn't inspected. All targets are `UNSOURCED` planning bands for triggered and welcome email; replace them after the first 200 sends.

| Metric | Current | Target | If it moves the wrong way, check |
| --- | --- | --- | --- |
| Open rate | `UNKNOWN` | 40–60% | Subject and preview first; then send time; then whether the provider is authenticated (SPF, DKIM, DMARC) |
| Click-through rate | `UNKNOWN` | 5–15% | Link context: does the link say where it goes? Then segment fit: is this person in the wrong segment? |
| Conversion (email → waitlist or invitation accepted) | `UNKNOWN` | ≥15% of "Pilot city, trip soon" | Email-to-page match (does the form repeat the email's promise?), then whether the cap and date are real |
| Bounce | `UNKNOWN` | <2% | List hygiene (typos from the form), then attachments (there should be none) |
| Unsubscribe per send | `UNKNOWN` | <0.5% | Expectations: did we send more than email 1 promised? Then relevance: wrong city segment? |

## Tooling

- **No provider is chosen yet.** It's the founder's decision, and AGENTS.md forbids enabling a paid provider without authorization.
- **What's needed:** tags or segments, a few automations (journey, welcome, routing), consent fields, and double opt-in available for EU and UK subscribers.
- **Kit:** the source material's ConvertKit is now called Kit `[verified: 2026-07-28, per the skill]`. Its current pricing and free tier are `[VERIFY]` before choosing.
- **The subscriber list never goes in this repository**, which is public (AGENTS.md).

## Control comparison

`GAP`: the v1 site's list was not joined.
- This session can't receive email, and signing up would write to v1's production database.
- **Human task:** sign up with a test address, time the first email, and check it against this plan. Does it set expectations? Does a survey follow? Report what arrived against what should have.

## Assumptions & Unknowns

- **Consent:** the magnet's disclosure line covers the journey emails in most places. EU and UK subscribers need explicit consent for anything beyond the template (`lead-magnet.md`).
- **The monthly note** is a promise. If the founder can't keep a monthly cadence, change email 1 to "a few times a year" before sending it; don't miss the promise later.
- **Invitations** depend on each store's testing flow (TestFlight links, Google Play closed-testing lists) `[VERIFY]` at the time of the pilot.
- **Every rate is `UNSOURCED`.**
