# Profile Rewrite — XPMatch (founder's LinkedIn and the beta landing page)

Skill: `cmba-profile` (stage 4 of `cmba-run`). Written 2026-09-23. Read first: `idea.md`, `validation.md`, `differentiators.md`, `uvp.md`.

**Scope, set by Gate 0 (`idea.md`):** only the founder's LinkedIn and the landing page. The X checklist is skipped, because travelers don't pick a travel app from its founder's X profile.

**Placeholders:**
- `[pilot city]`: until D-006 is decided.
- `[founder name]`, `[site]` and `[linkedin-url]`: the founder's live LinkedIn wasn't fetched (login wall, and no URL on file).

Don't publish anything that still contains a bracket.

## 0. Controllable-surface inventory

| Surface | Who controls it | Actionable? |
| --- | --- | --- |
| Brand name, logo, colors | The founder | Yes. Colors follow the PRD tokens (pine `#174D42`, ivory `#F7F8F5`, dark `#182B28`) |
| Site template and copy (xpmatchme.com, now the v1 site) | The founder (v1 repository) | Yes. The live copy conflicts with the plan and must change first (below) |
| Guarantee wording | The founder | Yes. None exists. The plan's trust rules are policies, not a guarantee |
| Pricing | The founder, with app-store billing rules later | Only "free while in beta" (D-016 open) |
| Google Business Profile | — | Not applicable: no premises |
| Reviews and responses | App stores | Not yet: testing builds (TestFlight, Play testing) have no public reviews |
| The founder's personal LinkedIn | The founder | Yes. It's the only brand-independent asset, so it gets the most care |
| App-store listing | The founder, within Apple and Google review rules | Later, at public release. Not part of this stage |
| Local partnerships and photography | The founder, in the pilot city | Yes, once D-006 is decided. Photos need the photographer's rights (plan: no stock or generated images presented as real) |

### Blocking prerequisite: the live site

Fix these before any new traffic goes to xpmatchme.com. The copy lives in the v1 repository, which this session doesn't change.

1. **Remove the two lines that appear word for word on Mindtrip's site:** "Snag a coveted table at the hottest restaurants." and "Create. Inspire. Earn." (`differentiators.md`). That's brand and legal risk.
2. **Remove the claims the new product can't make:**
   - "In seconds, XPMatch drafts a plan for anywhere you want to go" (it covers one city);
   - "Recommendations use live map data" (on the app's login page, app.xpmatchme.com; MVP-1 uses operator-entered places);
   - "get paid when people with your standards book what you recommend" (no creator payouts in MVP-1).
3. **Replace "Answer 15 questions…".** The friction evidence in `validation.md` ("ridiculous levels of detail") argues against leading with a long quiz, and the plan's profile is 3–5 questions.
4. **Also close to Mindtrip's copy** (found by `eval.md`; re-fetched 2026-09-23):
   - "In seconds, XPMatch drafts a plan for anywhere you want to go" closely follows Mindtrip's "In seconds, we’ll create customizable itineraries for anywhere you’d like to go."
   - "tag @XPMatch for suggestions that balance everyone's standards" follows Mindtrip's "suggestions that balance everyone’s vibes".
   - The "Visit our Inspiration page" line mirrors Mindtrip's Inspiration pages.
   - Rewrite all three.
5. **The example card** ("Alto Terrace · 4.4 overall · 4.8 from people like you · 91 fit · 9/10 of comparable travelers would go back · Elsa, books like you") shows specific ratings and a named reviewer.
   - If Alto Terrace or Elsa are real, or the numbers aren't real data, label the card "Example" or remove it (AGENTS.md: never present fabricated reviews or activity as real).
   - Whether the venue exists wasn't checked.
6. **Remove v1's own "people like you" claims** (found in the re-grade). They describe a mechanism v2 doesn't have: v2 matches stops to the traveler, and similarity to others appears only with consent.
   - "matches you to experiences people like you actually loved"
   - "borrow plans from XPMatchers whose taste profile looks like yours"
   - the "Get inspired" heading "Plans from people whose taste looks like yours."

## Recommended primary platform: LinkedIn

**Why:**
- The pilot's first 20 travelers, its contributors (people who already took trips to the pilot city) and its local partners are most reachable through the founder's own network.
- LinkedIn is the skill's safe default for B2C.
- X is skipped by Gate 0.
- LinkedIn is not the channel that fills a 1,000-tester beta. `content.md` covers that; this profile's job is trust and the pilot's first few dozen people.

## LinkedIn

1. **Banner copy** (one thing: the beta):
   - Line 1: `Only real travelers' trips, matched to how you travel.` (54 characters)
   - Line 2: `XPMatch beta · Join the waitlist at xpmatchme.com` (49 characters). This assumes the v2 landing page replaces the v1 site at the founder's existing domain.
   - Once D-006 names the city, line 2 can become `XPMatch beta · [pilot city] · xpmatchme.com`.
   - **No social proof number:** there isn't a real one yet.
   - Pine text on an ivory background, or ivory on pine. Nothing else in the banner.

2. **Headshot brief:** warm, curious, trustworthy, unhurried.
   - Natural light, outdoors or at a café table.
   - Use the same photo on the landing page's founder note.

3. **Tagline** (199 characters; limit 220 per the skill, `[VERIFY]` the current limit):
   > Founder, XPMatch · 2–4 day city trips for couples and solo travelers, built only from what real travelers actually did, matched stop by stop to your taste. Every stop shows why it fits and its catch.

   - **Traces to:** `uvp.md` value clause plus the differentiator. It names the audience (couples and solo travelers on 2–4 day city trips); the city is added once D-006 names it.

4. **Custom profile link and creator tools:**
   - Claim `linkedin.com/in/[linkedin-url]`.
   - No hashtags: LinkedIn removed profile hashtags in February 2024 and retired the Creator Mode toggle in March 2024 `[verified: 2026-07-28, per the skill]`.
   - Discovery keywords go in the tagline and About instead: *trip planning, itinerary, real travelers, taste, [pilot city], travel app, beta*.
   - Check that newsletter access shows on the profile `[VERIFY]`. `email.md` doesn't depend on it.

5. **Featured:** the beta landing page, as a single item. It's the one asset the founder owns: the list is the founder's, while LinkedIn's followers are LinkedIn's.

6. **About** (ships today; no placeholders):

   > Travel lists rank places by how popular they are, and AI planners fill every hour, anywhere, in seconds. You end up on the same itinerary as everyone else, and sometimes at a place that has closed for good.
   >
   > XPMatch grew out of MileMatch, a travel review concept built on one observation: two honest reviews can be opposites because the reviewers have different reference points.
   >
   > The first version of XPMatch was a web prototype that could plan anywhere. I started over. XPMatch is being rebuilt as a phone app that plans trips only from what real travelers actually did, matched stop by stop to how you travel. Every stop shows why it fits you, what the catch is and whose trip it came from. When it doesn't have enough good options, it tells you instead of padding your day.
   >
   > It starts in one city, because real trips take time to collect, and every one is shared with its author's permission.
   >
   > It's for couples and solo travelers spending 2–4 days in a city who pick places by fit, not fame. It's not for large groups yet, or for booking flights and hotels.
   >
   > The beta is free. Join the waitlist: xpmatchme.com
   >
   > Took a trip you'd be happy to share? Message me.

   - **The origin line:** the founder's own published words, from xpmatchme.com/about (fetched 2026-09-23). The first version left this as a gap; `eval.md` found it.
   - **Optional:** the founder can add one sentence about the trip where they saw the problem themselves. It isn't required to publish.

   **Lineage:**
   - Paragraph 1 is the UVP's MOVEMENT.
   - Paragraph 2 is the origin.
   - Paragraph 3 is VALUE plus the differentiator.
   - Paragraph 4 answers objection O6.
   - Paragraph 5 is the self-exclusion from Step 1.
   - **There is no proof or "brag" section:** there's nothing true to put in it yet. Add pilot results when they exist, sourced.
   - **The first person here is the founder's own voice on their own profile.** That's allowed; the UVP's brand-voice rule applies to XPMatch's surfaces.

7. **Company page:**
   - Name: `XPMatch`.
   - Tagline: `Only real travelers' trips, matched to how you travel.` (54 characters; `[VERIFY]` the current limit).
   - Description:
     > XPMatch is a phone app, now in development, that plans short city trips from what real travelers actually did, matched stop by stop to your taste. Tell it once how you like to travel, type the trip you want, and get a day-by-day plan where every stop shows why it fits, what the catch is and whose trip it came from. The beta starts in one city and is free.
   - Attach the company page to the founder's Experience entry.

## X / Twitter

Skipped by Gate 0. Not rewritten.

## One-page site (the beta landing page)

- **Hero headline:** Only real travelers' trips, matched to how you travel.
  - The first fix, "Real travelers' trips, matched to how you travel.", read as true for Wanderlog and Mindtrip in the re-grade. "Only" is the part they can't claim.
- **Subhead** (ships today): XPMatch builds 2–4 day city plans from what real travelers actually did, matched stop by stop to you. Every stop shows why it fits, what the catch is and whose trip it came from. Starting with one city, free while in beta.
- **Once D-006 names the city:** "…your 2–4 days in [pilot city]…"
- **One CTA** (ships today): `Join the beta`. Once the city is named: `Join the [pilot city] beta`.

**How it works** (three steps, matching plan §4 steps 2–5):
1. **Tell it how you travel.** A short voice chat or a few taps. You check what it heard before anything is planned.
2. **Say the trip you want.** "Three days with my partner in May, slow mornings, lots of seafood."
3. **Swipe, then create.** Each stop has alternatives, and the one showing is the one kept. Tap *Create itinerary* and your days are saved.

**Why it's different** (the UVP's movement and objection close): Lists rank places by popularity. AI planners fill every hour, anywhere. XPMatch only uses what real travelers actually did, and matches each stop to how you travel. It never invents places, and it flags anything listed as closed on the day you'd go. When it doesn't have enough good options for you, it says so.

**Who it's for:** couples and solo travelers spending 2–4 days in a city (the pilot city first) who choose places by fit, not fame.
**Not for, yet:** groups of three or more, families with kids, other cities (join the waitlist for yours), or booking flights and hotels in one app.

**Proof:** omitted. There is none yet; don't add testimonials, counts or ratings until real ones exist.

**Form:** only what the invitation needs, plus three optional fields: 8 fields, 5 required.
- The first version also asked "Who with?". It moved to the optional survey (`validation.md` Q2), because nothing about the invitation depends on it.
- The magnet page (`lead-magnet.md`) asks for email only.

| Field | Type | Required | Why |
| --- | --- | --- | --- |
| Email | email | Yes | The invitation |
| First name | text | No | Greeting in emails |
| Where are you going? | select: [pilot city] · Somewhere else (then a text field "Which city?") | Yes | Separates pilot testers from the waitlist for other cities (plan §4 step 3) |
| When? | select: month · Not sure yet | No | Invitation timing; check-in timing later |
| Your phone | select: iPhone · Android | Yes | Chooses the store testing program the invitation comes from: TestFlight, or Google Play testing: internal for the pilot, closed for the waves (plan A-001, §12). Android testers are asked for their Play account email only when invited. `[VERIFY]` Play's current way of adding testers. Added after `journey.md` found the gap |
| I'm 18 or older | checkbox | Yes | The app requires 18+ (plan §4 step 1) |
| Email me my beta invitation | checkbox | Yes | Consent for the invitation |
| Also send occasional XPMatch updates | checkbox | No | Separate consent for updates; `email.md` sends updates only to people who ticked it |

- **After submitting:** "You're on the list." Then an optional short survey: `validation.md`'s ten questions, multiple choice first and one open question last.
- **Footer:** privacy policy link, and one text link: *Took a trip you'd share? Tell us* → a separate contributor form (name the city once D-006 is decided). It's secondary to the hero CTA, because supply is the binding constraint (`idea.md`).
- **Before the form goes live:** the founder picks the form and email provider. None is chosen, and AGENTS.md forbids enabling a paid provider without the founder's authorization. The privacy policy must name that provider.

## Networking cadence

- 7–10 thoughtful comments a day on 7–10 accounts slightly bigger than the founder's: [pilot city] food and culture writers, local tour and hospitality founders, travel-product builders.
- 3–5 new connections a day with people who travel to, or live in, [pilot city].
- Reply to every comment on the founder's own posts.
- Thank 2–3 people who engaged, by DM, with no ask.
- After 30–45 days of real back-and-forth: ask for a 15-minute call about supporting each other. For locals, that can be sharing a trip.
- **The 10 named accounts:** a `GAP` (LinkedIn needs a login). Human task: pick them once D-006 names the city.

## Control comparison

- **Site:**
  - **Live v1 hero:** "Ready to stop wasting your weekends?" / "Answer 15 questions and find out why what you do with your free time doesn't fit you…"
  - **Rewrite:** names the job (a 2–4 day city trip), the source (only what real travelers actually did), the refusal (an honest "not enough") and the scope (one city).
  - **Result, corrected after `eval.md`:** a stranger now knows who it's for and what they get, so it's not capped.
    - The first version also called the per-stop evidence new. It isn't: v1's live example card already shows a fit reason, a tradeoff and "Elsa, books like you".
    - The genuine change is scope, source and refusal, not the evidence format.
- **LinkedIn:** `GAP`. The live profile wasn't fetched, so the delta can't be scored.

## Assumptions & Unknowns

- **Origin:** the About uses the founder's published origin line (xpmatchme.com/about). A personal trip story is optional, not a gap.
- **Ship-today check** (corrected in the re-grade):
  - **Ships today:** banner line 1, the tagline, the About without its waitlist line, the company page, the headline and the ship-today subhead.
  - **Waits for a waitlist page plus a form and email provider** (the founder's choice; the live site's call to action is still "Get my Fit Score"): banner line 2, the About's waitlist line, the "Join the beta" CTA and the form.
  - **Waits for D-006 (the city):** the city-named variants and the form's "Where are you going?" options.
  - **Waits for D-035 (voice):** "a short voice chat" in How it works. Otherwise it says "a few taps".
  - **Waits for D-005 (plan approval):** anything describing the product as planned.
  - **Waits for the live-site fixes above:** anything that sends traffic to xpmatchme.com.
- `[VERIFY]`: current LinkedIn character limits for headline and company tagline, and newsletter availability. Only the hashtag and Creator Mode removals carry a verified stamp (2026-07-28, from the skill).
- `UNSOURCED`: "free while in beta" is the plan's pilot policy, not a price decision (D-016).
- **"A short voice chat"** in How it works depends on D-035. If voice isn't in the pilot, the step reads "A few taps" (`uvp.md`).
- **Stale scoring:** the skill's output template and rubric still ask for "exactly 5 hashtags". That instruction is obsolete (the skill's own step 4), so no hashtags are given.
- **Not claimed:**
  - "In minutes" appears only in the UVP paragraph's draft. It's kept out of the banner and hero until the pilot measures it (`uvp.md`).
  - "Travelers like you" is not mentioned, because it needs consent and density that don't exist yet.
