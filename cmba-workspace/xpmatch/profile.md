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
   - "Recommendations use live map data" (MVP-1 uses operator-entered places);
   - "get paid when people with your standards book what you recommend" (no creator payouts in MVP-1).
3. **Replace "Answer 15 questions…".** The friction evidence in `validation.md` ("ridiculous levels of detail") argues against leading with a long quiz, and the plan's profile is 3–5 questions.

## Recommended primary platform: LinkedIn

**Why:**
- The pilot's first 20 travelers, its contributors (people who already took trips to the pilot city) and its local partners are most reachable through the founder's own network.
- LinkedIn is the skill's safe default for B2C.
- X is skipped by Gate 0.
- LinkedIn is not the channel that fills a 1,000-tester beta. `content.md` covers that; this profile's job is trust and the pilot's first few dozen people.

## LinkedIn

1. **Banner copy** (one thing: the beta):
   - Line 1: `Trips planned from travelers who travel like you.` (49 characters)
   - Line 2: `XPMatch beta · [pilot city] · Join the waitlist at [site]` (57 characters)
   - **No social proof number:** there isn't a real one yet.
   - Pine text on an ivory background, or ivory on pine. Nothing else in the banner.

2. **Headshot brief:** warm, curious, trustworthy, unhurried.
   - Natural light, outdoors or at a café table.
   - Use the same photo on the landing page's founder note.

3. **Tagline** (180 characters with the placeholder; limit 220 per the skill, `[VERIFY]` the current limit):
   > Founder, XPMatch · Trip plans built only from real travelers' trips that match your taste. Every stop shows why it fits, the catch, and whose trip it came from. [pilot city] first.

   - **Traces to:** `uvp.md` value clause plus the differentiator. The audience noun comes through "your taste", and the city scopes it.

4. **Custom profile link and creator tools:**
   - Claim `linkedin.com/in/[linkedin-url]`.
   - No hashtags: LinkedIn removed profile hashtags in February 2024 and retired the Creator Mode toggle in March 2024 `[verified: 2026-07-28, per the skill]`.
   - Discovery keywords go in the tagline and About instead: *trip planning, itinerary, real travelers, taste, [pilot city], travel app, beta*.
   - Check that newsletter access shows on the profile `[VERIFY]`. `email.md` doesn't depend on it.

5. **Featured:** the beta landing page, as a single item. It's the one asset the founder owns: the list is the founder's, while LinkedIn's followers are LinkedIn's.

6. **About** (final text except the founder's own story, which only the founder can write; see Assumptions):

   > Most travel lists rank places by how popular they are, and AI planners fill every hour, anywhere, in seconds. You end up on the same itinerary as everyone else, and sometimes at a place that closed long ago.
   >
   > [FOUNDER TO WRITE, 1–2 sentences: the trip where this happened to you. Don't publish until this is real.]
   >
   > The first version of XPMatch was a web prototype that could plan anywhere. I started over. XPMatch is now a phone app that builds a plan only from real trips by travelers whose taste matches yours. Every stop shows why it fits you, what the catch is and whose trip it came from. When it doesn't have enough good options, it tells you instead of padding your day.
   >
   > It starts in one city, [pilot city], because real trips take time to collect, and every one is shared with its author's permission.
   >
   > It's for couples and solo travelers spending 2–4 days in [pilot city] who pick places by fit, not fame. It's not for large groups yet, or for booking flights and hotels.
   >
   > The beta is free. Join the waitlist: [site]
   >
   > Took a trip to [pilot city] you'd be happy to share? Message me.

   **Lineage:**
   - Paragraph 1 is the UVP's MOVEMENT.
   - Paragraph 3 is VALUE plus the differentiator.
   - Paragraph 4 answers objection O6.
   - Paragraph 5 is the self-exclusion from Step 1.
   - **There is no proof or "brag" section:** there's nothing true to put in it yet. Add pilot results when they exist, sourced.
   - **The first person here is the founder's own voice on their own profile.** That's allowed; the UVP's brand-voice rule applies to XPMatch's surfaces.

7. **Company page:**
   - Name: `XPMatch`.
   - Tagline: `Trips planned from travelers who travel like you. [pilot city] first.` (69 characters; `[VERIFY]` the current limit).
   - Description:
     > XPMatch is a phone app that plans short city trips from real travelers' trips that match your taste. Tell it once how you like to travel, type the trip you want, and get a day-by-day plan where every stop shows why it fits, what the catch is and whose trip it came from. In beta in [pilot city], free.
   - Attach the company page to the founder's Experience entry.

## X / Twitter

Skipped by Gate 0. Not rewritten.

## One-page site (the beta landing page)

- **Hero headline:** Trips planned from travelers who travel like you.
- **Subhead:** XPMatch builds your 2–4 days in [pilot city] from real trips by people with your taste. Every stop shows why it fits, what the catch is and whose trip it came from. Free while in beta.
- **One CTA:** `Join the [pilot city] beta`

**How it works** (three steps, matching plan §4 steps 2–5):
1. **Tell it how you travel.** A short voice chat or a few taps. You check what it heard before anything is planned.
2. **Say the trip you want.** "Three days with my partner in May, slow mornings, lots of seafood."
3. **Swipe, then create.** Each stop has alternatives, and the one showing is the one kept. Tap *Create itinerary* and your days are saved.

**Why it's different** (the UVP's movement and objection close): Lists rank places by popularity. AI planners fill every hour, anywhere. XPMatch only uses real trips taken by travelers with your taste. It never invents places, and it flags anything closed on the day you'd go. When it doesn't have enough good options for you, it says so.

**Who it's for:** couples and solo travelers spending 2–4 days in [pilot city] who choose places by fit, not fame.
**Not for, yet:** groups of three or more, families with kids, other cities (join the waitlist for yours), or booking flights and hotels in one app.

**Proof:** omitted. There is none yet; don't add testimonials, counts or ratings until real ones exist.

**Form:** short on purpose. The friction evidence applies here too.

| Field | Type | Required | Why |
| --- | --- | --- | --- |
| Email | email | Yes | The invitation |
| First name | text | No | Greeting in emails |
| Where are you going? | select: [pilot city] · Somewhere else (then a text field "Which city?") | Yes | Separates pilot testers from the waitlist for other cities (plan §4 step 3) |
| When? | select: month · Not sure yet | No | Invitation timing; check-in timing later |
| Who with? | select: Solo · With my partner · Other | No | Matches the pilot's scope (solo and couples) |
| Your phone | select: iPhone · Android | Yes | Chooses the store testing program the invitation comes from: TestFlight or Google Play closed testing (plan §12). Android testers are asked for their Play account email only when invited. `[VERIFY]` Play's current way of adding testers. Added after `journey.md` found the gap |
| I'm 18 or older | checkbox | Yes | The app requires 18+ (plan §4 step 1) |
| Email me my beta invitation | checkbox | Yes | Consent for the invitation |
| Also send occasional XPMatch updates | checkbox | No | Separate consent for updates; `email.md` sends updates only to people who ticked it |

- **After submitting:** "You're on the list." Then an optional 2-minute survey: `validation.md`'s ten questions, multiple choice first and one open question last.
- **Footer:** privacy policy link, and one text link: *Took a trip to [pilot city]? Share it* → a separate contributor form. It's secondary to the hero CTA, because supply is the binding constraint (`idea.md`).
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
  - **Rewrite:** names the job (a 2–4 day city trip), the source (real travelers' trips), the proof mechanism (a reason, a catch and a source on every stop) and the scope (one city).
  - **Result:** a stranger now knows who it's for and what they get. That's a change of content, not just polish, so it's not capped.
- **LinkedIn:** `GAP`. The live profile wasn't fetched, so the delta can't be scored.

## Assumptions & Unknowns

- `GAP`: the founder's own trip story (from `idea.md`, solved-internally). The About has a marked slot for it and must not ship with it empty or invented.
- `[VERIFY]`: current LinkedIn character limits for headline and company tagline, and newsletter availability. Only the hashtag and Creator Mode removals carry a verified stamp (2026-07-28, from the skill).
- `UNSOURCED`: "free while in beta" is the plan's pilot policy, not a price decision (D-016).
- **"A short voice chat"** in How it works depends on D-035. If voice isn't in the pilot, the step reads "A few taps" (`uvp.md`).
- **Stale scoring:** the skill's output template and rubric still ask for "exactly 5 hashtags". That instruction is obsolete (the skill's own step 4), so no hashtags are given.
- **Not claimed:**
  - "In minutes" appears only in the UVP paragraph's draft. It's kept out of the banner and hero until the pilot measures it (`uvp.md`).
  - "Travelers like you" is not mentioned, because it needs consent and density that don't exist yet.
