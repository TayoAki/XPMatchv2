# UVP — XPMatch

Skill: `cmba-uvp` (stage 3 of `cmba-run`). Written 2026-09-23. Read first: `idea.md`, `validation.md` (AMBER, with a stated pivot), `differentiators.md` (POSITIONAL), the PRD and the MVP-1 plan (draft 8).

Voice: brand, third person. Step 0 is PARTIAL, so there is no "I help…" creator voice.

## Step 0 — Applicability

Same verdict as Gate 0 in `idea.md`. It is restated here, not re-derived.

| Precondition | Holds? | Evidence |
| --- | --- | --- |
| Identifiable operator or brand the buyer forms a relationship with | Yes | An account, profile, trips and inbox under the XPMatch brand (plan §4) |
| Direct channel | Yes, with a caveat | The app stores control distribution; XPMatch owns the account |
| Content-led acquisition plausible | Yes | Travel planning is content-heavy, and the product is traveler content |
| One operator can package and price the offer | Not yet | The pilot is free and pricing is undecided (D-016). `validation.md` found no spend on 2–4 day trips |

**Verdict: PARTIAL — 3/4.**
- **Transfers:** the positioning, in brand voice.
- **Does not transfer:** the creator voice, the personal brand, discovery calls (`cmba-discovery` is skipped).
- **Real constraint:** real-traveler supply per city and proof that matching beats destination-only plans (PRD H1). Positioning is not the binding constraint.

## Step 1 — Value statement

> XPMatch helps couples and solo travelers planning 2–4 days in one city get a day-by-day plan built only from real trips by travelers with their taste, so they spend minutes instead of evenings planning and every stop fits how they travel.

**Self-exclusion test:** these people read it and correctly walk away.
- **People who enjoy planning and want control:** "Much of my enjoyment of travel is the planning process." (`validation.md`)
- **Travelers going anywhere but the pilot city.**
- **Groups of three or more, and families with kids:** the pilot is solo and couples (PRD §3).
- **Top-10 sightseers:** "tourists always want to see this top 10 things from the list." (`validation.md`)
- **People who want to book flights and hotels inside one app.**

## Step 2 — Objections and aspirations

Source key: **E** means evidence, a verbatim quote in `validation.md`. **H** means hypothesis, with the question to ask a real traveler to confirm it.

| # | Objection (their voice) | Source | Aspiration (their words where they exist) | Source |
| --- | --- | --- | --- | --- |
| O1 | "ChatGPT is free and instant. Why would I need an app?" | E: "you do not have to pay" (RS); "ai trip planner free" (autocomplete) | "not the same itinerary as everyone else" | E, from "the same itinerary as it seems everyone else is on" |
| O2 | "AI plans are generic. I'll get the same list as everyone else." | E: Judy, Lexma | "routes made by real people" | E: fizza_pizza (HN) |
| O3 | "It'll send me to places that are closed." | E: the Layla 1★ review | "whose style resonated with us" | E: aravindbharathy (HN) |
| O4 | "I don't want to answer a hundred questions first." | E: "ridiculous levels of detail" (Mindtrip 1★); "adds friction" (HN) | "it gathered the info in a few seconds" | E: Allan (RS) |
| O5 | "Why trust a stranger's trip? I don't know their taste." | E: "a rating from a person you know nothing about" (RS) | "that was easy" | H: "After your last trip plan, what would have made you say 'that was easy'?" |
| O6 | "It won't cover where I'm going." | H: from the coverage deficit (`differentiators.md`). Ask: "Would you use a planner that covers only the city you're visiting?" | — | — |

## Step 3 — Levels deeper

| # | Question | Answer | Rank |
| --- | --- | --- | --- |
| 1 | Who, more specifically? | Couples and solo travelers taking a 2–4 day city trip, who choose places by whether they fit, not by fame | 2 |
| 2 | Demographic? | Adults 18+ (plan: 18+ confirmation). No evidence on age or income | 5 |
| 3 | What kind of solution does that group require? | Fast, and checkable: a finished plan in minutes whose every stop can be questioned | 4 |
| 4 | Psychographics? | **Fit over fame:** they distrust popularity rankings and anonymous ratings, and trust people whose taste they recognize. "We picked the ones whose style resonated with us" (E) | 1 |
| 5 | Does geography matter? | Yes. The product exists only in the pilot city (D-006). The audience is visitors to it, not residents | 3 |

**Kept: 4, 1, 5.** Fit over fame, couples and solo travelers on 2–4 day city trips, visiting the pilot city.

**Cut:**
- **Demographic:** no evidence, and age or income doesn't predict who wants taste-matched plans.
- **Solution type:** "fast" is shared by every AI planner, and "checkable" is already the differentiator (3b), so keeping it would double-count.

## Step 3b — Differentiation check

Read from `differentiators.md`, not re-derived. **Verdict: POSITIONAL.**
- **Competitors checked:** wanderlog.com, the Layla store listings and mindtrip.ai, fetched 2026-09-23.
- **Also a likely alternative:** ChatGPT, from the search intent in `validation.md`; its copy wasn't fetched.

| Element | Verdict | Evidence from their live copy |
| --- | --- | --- |
| AI builds the itinerary | SHARED | W2, L2, M1 |
| From real travelers | SHARED | W3 "collects guides from travelers"; M4 "trusted tips from real travelers" |
| Personalized | SHARED | W1, L2, M1 |
| Why each stop fits, its catch and what isn't known | OURS | No rival claims it |
| Whose trip each stop came from | OURS, narrow | Wanderlog shows guide authors, not per-stop sources in generated plans |
| An honest "not enough" instead of filler | OURS | Rivals promise "anywhere" (M1, W2) |

**Carried into the assembly:** every stop shows why it fits, the catch and whose trip it came from, drawn only from real trips, with an honest "not enough".
- **Shelf life:** about 12 months from public launch, `UNSOURCED`; see Assumptions.
- **Movement statement:** built on the enemy, not on this element, as the skill requires for a positional claim.

## Step 4 — Movement statement

> Travel lists rank places by how popular they are, and AI planners fill every hour, anywhere, in seconds. That means you get the same itinerary as everyone else, stops that don't fit how you travel, and sometimes places that closed long ago. Until now.

- **The enemy:** the popularity default plus fill-every-slot generation. That's an industry habit, not a person or company.
- **Harm the traveler has felt:**
  - "same itinerary as… everyone else" (E);
  - "pretty generic (to me)" (E);
  - "permanently closed" (E).

## Step 5 — Assembled UVP

> **[MOVEMENT]** Travel lists rank places by how popular they are, and AI planners fill every hour, anywhere, in seconds. You end up on the same itinerary as everyone else, with stops that don't fit how you travel and sometimes places that closed long ago. **[ASPIRATION + DEEP DIVE]** XPMatch builds your days from real trips taken by travelers whose taste matches yours, so the plan feels like yours, not everyone's. **[VALUE, TWISTED]** Tell it once how you like to travel, in a short voice chat or a few taps, then type the trip you want. In minutes you have a day-by-day plan where every stop shows why it fits you, what the catch is and whose trip it came from, and you can swipe any stop for another. **[OBJECTIONS]** No long questionnaire, no invented places, and anything closed on the day you'd go is flagged. No ratings from strangers you know nothing about. When it doesn't have enough good options, it tells you instead of padding your day. It starts in one city because real trips take time to collect, and it's free while in beta.

**Clause 4 (PROOF) is omitted.** XPMatch has no travelers yet, and the skill forbids inventing proof.

### Objection trace

| Objection | Answered by |
| --- | --- |
| O1: free and instant elsewhere | "free while in beta"; "In minutes" |
| O2: generic | "travelers whose taste matches yours"; "feels like yours, not everyone's" |
| O3: closed places | "no invented places, and anything closed on the day you'd go is flagged". This is the plan's clash flag (plan §4 step 5). The paragraph doesn't promise more: nothing in the plan detects a permanent closure |
| O4: too many questions | "a short voice chat or a few taps"; "No long questionnaire" |
| O5: strangers' taste | "whose taste matches yours"; "whose trip it came from"; "no ratings from strangers you know nothing about" |
| O6: coverage | "It starts in one city because real trips take time to collect". The deficit is stated as the reason for trust |

### Tests

- **Substitution test:** the name was swapped for Wanderlog, Mindtrip, Layla and ChatGPT.
  - Each claims or does full coverage and generation: "anywhere" (M1), "No matter where you travel" (W2), chat-written itineraries (L2), and a general assistant.
  - None builds only from attributed trips or shows a catch per stop.
  - "XPMatch" can't be swapped out without the paragraph becoming false. **Passes today**, within the shelf life above.
- **Control comparison:** set beside the live v1 hero.
  - **v1:** "Ready to stop wasting your weekends?" / "Answer 15 questions and find out why what you do with your free time doesn't fit you, and what to do about it."
  - The new paragraph is more specific: short city trips, real trips, evidence per stop, one city.
  - It also fixes a direct conflict: v1 leads with a 15-question quiz, which the friction evidence (O4) argues against. A reader can tell them apart. **Not capped.**

## Derivatives

`[pilot city]` stays a placeholder until D-006 is decided. Don't publish copy with the placeholder in it.

- **Founder's LinkedIn headline** (≤220 characters; it's the founder's own profile, so their voice is allowed):
  > Founder, XPMatch · Trip plans built only from real travelers' trips that match your taste. Every stop shows why it fits, the catch, and whose trip it came from. [pilot city] first.
- **Site hero:**
  - **Headline:** *Trips planned from travelers who travel like you.*
  - **Subhead:** *XPMatch builds your 2–4 days in [pilot city] from real trips by people with your taste. Every stop shows why it fits, what the catch is and whose trip it came from. Free while in beta.*
- **One-line intro** (podcasts and DMs):
  > XPMatch plans short city trips only from real travelers' trips that match your taste, and shows you why each stop fits.

## Assumptions & Unknowns

- **Shelf life of the differentiator:** about 12 months from public launch (`UNSOURCED` estimate, `differentiators.md`).
  - A rival with traveler guides (Wanderlog) could add taste profiles and per-stop reasons.
  - The movement statement doesn't depend on it; the assembly's value clause does.
  - Plan to re-run `cmba-differentiate` at the first-wave gate (plan §12).
- **Hypotheses (H):** O6 and the aspiration "that was easy" come from no traveler; confirm them with the questions in Step 2.
  - Every other objection and aspiration has a verbatim source in `validation.md`.
  - That sample skews toward older travelers who mostly go to Europe (RS) and toward technical readers (HN).
- **"In minutes"** is a design target (plan §4), not a measurement. Keep it out of public copy until the pilot times it.
- **"a short voice chat"** holds only if D-035 (decided by the voice spike, S0.2) puts voice in the pilot. If voice slips to MVP-1.1, say "a few taps" in every derivative: here, `profile.md` and `journey.md` email 2.
- **"free while in beta"** follows the pilot decision (plan §4, "How money moves") and `validation.md`'s pivot. Change it if D-016 sets a price.
- **Couples:** kept in the audience but not in the lead. The evidence that couples disagree is old and contested (`validation.md`).
- **Things not to claim:** trip partners and "travelers like you" are real features (plan §4), but they're left out of the UVP. The first is a convenience; the second works only with consent and density that don't exist yet. Don't imply other travelers are visible by default.
