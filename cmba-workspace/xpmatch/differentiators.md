# Differentiators — XPMatch

Skill: `cmba-differentiate`. Written 2026-09-23 and read by every later stage; no other stage re-derives it. Read first: `idea.md`, `docs/prds/XPMatch-Build-PRD-v1.1.md`, `docs/prds/XPMatch-MVP1-plan.md` (draft 8).

Written before `validation.md` existed. It was re-checked after validation; see the note under Assumptions & Unknowns.

**Competitor set:**
- [Wanderlog](https://wanderlog.com/), [Layla](https://play.google.com/store/apps/details?id=ai.layla.android.app) and [Mindtrip](https://mindtrip.ai/), fetched 2026-09-23 (UTC) with curl through the session proxy (US storefronts) and cross-checked with WebFetch.
- **Why these three:** they are the free app-store planners a traveler installs for the same job: tell it about a trip and get an itinerary.
- **Missing pages:** layla.ai returned HTTP 429 (a Vercel security checkpoint), so Layla's claims come only from its App Store and Google Play listings.
- **Possible second choice not fetched:** the traveler's real second choice may be a general assistant (ChatGPT, Gemini) or Google Maps with reviews. That is unmeasured; the survey in `validation.md` asks it.

**Subject footprint:**
- The planned product is described in the plan (§4, §6) and isn't public.
- The live v1 site, [xpmatchme.com](https://www.xpmatchme.com/), is fetched as the current public copy.

Sources: W1 wanderlog.com · W2 wanderlog.com/trip-planner-ai · W3 wanderlog.com/trip-planner-mobile-app · W4 wanderlog.com/hotels · W5 App Store id1476732439 · L1 App Store id6758730467 · L2 Google Play ai.layla.android.app · M1 mindtrip.ai · M2 mindtrip.ai/about · M3 mindtrip.ai/creator-program · M4 App Store id6503107567 · X1 www.xpmatchme.com · X2 app.xpmatchme.com.

## Claim inventory

Quotes are verbatim. "No claim" means the claim is absent from the pages that loaded; it does not prove the competitor lacks the feature.

| Claim | XPMatch (planned, plan §4) | Wanderlog | Layla (store listings only) | Mindtrip | Verdict |
| --- | --- | --- | --- | --- | --- |
| AI builds the itinerary | Chat → options → "Create itinerary" | "auto-generating an itinerary" (W2) | "Chat with me, and I'll craft the perfect trip itinerary." (L2) | "In seconds, we’ll create customizable itineraries for anywhere you’d like to go." (M1) | SHARED |
| Recommendations come from real travelers | Every item comes from a real traveler's permissioned itinerary | "Wanderlog collects guides from travelers and reviews from the top travel apps" (W3) | No claim | "trusted tips from real travelers and local experts" (M4) | SHARED |
| Personalized to you | A taste profile, approved by the traveler | "smart recommendations based on your itinerary." (W1) | "destination videos that I’ll use AI to personalise just for you" (L2) | "any preferences or pet peeves you have" (M1) | SHARED |
| Plan by chatting | Chat, plus a voice interview for the profile | Yes (W2) | "just by chatting." (L1) | Yes (M1) | SHARED |
| Payment doesn't set ranking | Commission is never a ranking input, for every item (AGENTS.md) | "we rank hotels only by price and rating, not by how much they pay us." (W4, hotels only) | No claim | No claim; the creator program pays "commission on bookings" (M3) | SHARED (Wanderlog, hotels) |
| Explains why each stop fits the traveler's profile | "slow mornings ✓ · seafood ✓ · under €30 ✓" on every option | No claim | Nearest: "chosen for the flight options and accommodation I know you’ll love best" (L2), a claim with no per-item reasons | Nearest: "suggestions that balance everyone’s vibes" (M1) | OURS (unverified for Layla's website) |
| Shows each stop's catch and what isn't known | "the catch, and what isn't known" on every option | No claim | No claim | No claim | OURS |
| Names the real trip each stop came from, with context | "Ana, a couple, 3 days in May" | Guides show their authors (W1 "explore user-shared guides"), but generated itineraries don't attribute stops | No claim | Creator guides exist (M3), with no per-stop attribution claimed | OURS, narrow: Wanderlog is one step away |
| Shows similar travelers who picked the stop, with their consent | Opt-in "similar taste" on items | No claim | No claim | No claim | OURS |
| Says so when it lacks good options instead of filling the day | "the chat says so instead of filling slots with weak ones" | No claim; "No matter where you travel" (W2) | No claim | "for anywhere you’d like to go" (M1) | OURS |
| Group planning | Couples only in the pilot | "Plan along with your friends with live syncing and collaborative editing." (W1) | "share it with your vacation buddies for their two cents" (L2) | "start a group chat and build an itinerary that works for everyone" (M1) | THEIRS |
| Booking and live prices | Outbound links only | "we gather all suggestions in one spot and compare prices for you!" (W2) | "to fetch you live prices" (L2) | "Stay at the best hotels around the world for the best prices." (M1) | THEIRS |
| Offline use | MVP-1.1 | "access it anytime, even without an internet connection." (W2) | Not stated | Not stated | THEIRS |
| Coverage | One pilot city | "No matter where you travel" (W2) | Not stated | "around the world or in your own backyard" (M2) | THEIRS |
| Free | Free in the pilot; later price undecided (D-016) | "a free travel app (with an optional Pro subscription)" (W5) | "Layla is free to download." (L1) | "(and yes, it’s totally free)" (M4) | SHARED for now |
| Proof at scale | None | "Over 1 million people have already tried Wanderlog"; "8M+ Trips planned" (W1) | "over 10 million customizable AI itineraries" (L2) | "As featured in …" (M1); 4.7 from "795 Ratings" (M4) | THEIRS |

Prices seen in the store listings, as the stores display them (list prices not confirmed):
- **Wanderlog Pro:** monthly USD 5.99 and 16.99; annual USD 31.99, 39.99, 49.99 and 59.99 (W5).
- **Layla Premium:** "Monthly subscription $9.99" and "Yearly $49.99" (L1).
- **Mindtrip:** no in-app purchases (M4).

### The live v1 site says something else

X1 today claims:
- "In seconds, XPMatch drafts a plan for anywhere you want to go";
- "get paid when people with your standards book what you recommend";
- "Recommendations use live map data" (X2).

The planned product covers one city, builds only from real travelers' trips, and pays no creators in MVP-1. X1 also reuses two lines that appear word for word on Mindtrip's site: "Snag a coveted table at the hottest restaurants." and "Create. Inspire. Earn." (both on X1 and M1). That is a brand and legal risk, separate from positioning, and `profile.md` replaces those lines.

## Deficits (competitor claims XPMatch cannot make)

1. **Coverage:** "for anywhere you’d like to go" (M1). XPMatch covers one city (D-006).
2. **Booking and live prices** (W2, L2, M1). XPMatch sends travelers to partner and official sites.
3. **Group planning** (W1, L2, M1). The pilot supports solo travelers and couples (PRD §3).
4. **Trip tools:** offline use, routes, reservation import and bill splitting (W1, W2, M4). XPMatch has none of these in MVP-1.
5. **Proof:** millions of users and itineraries, press mentions and 4.6–4.9 store ratings. XPMatch has zero travelers.
6. **Speed and breadth:** "In seconds", anywhere (M1). XPMatch can plan only where permissioned itineraries exist.

The first and last deficits are the price of the candidate below; they are not accidents.

## Candidates and copy-cost

| Candidate | Source (1–6) | What would it cost each rival to copy? | Tier |
| --- | --- | --- | --- |
| **A. Evidence on every stop:** why it fits the profile, its catch, what isn't known, and whose trip it came from | 3 (a cost they'll bear: permissioned, attributed supply plus structured profiles) | **Wanderlog:** it already has traveler guides (W3) and authors (W1); it would need a taste profile and fit explanations, which is a feature, not a model change. **Mindtrip:** fit and catch text is cheap for a model to write; attributing every stop to a real trip means restricting generation to creator content, which conflicts with "thousands of data sources" (M2). **Layla:** fit text is cheap, but catches on bookable items work against partner bookings (L2) | POSITIONAL |
| **B. Only real travelers' stops, and an honest "not enough" instead of filler** | 4 (the customer they'll refuse: no plan where no real trip exists) + 5 (a promise: never filler or invented places) | **Mindtrip and Layla:** it breaks their promise. Their offer is any destination in seconds (M1, L2); refusing to plan without real-trip supply would remove most destinations. **Wanderlog:** it could add a "from travelers' guides only" mode for cities with enough guides, keeping generation as the default. That costs something but doesn't break its model | STRUCTURAL against Mindtrip and Layla; POSITIONAL against Wanderlog |
| C. Similar travelers who picked it, with their consent | 2 (an asset once it exists: an opt-in, taste-matched community) | Needs profiles, opt-in and density per city. Wanderlog has the users (W1) but no profile; it's a feature build for it | POSITIONAL, and XPMatch lacks the density today |
| D. Commission never ranks | 1 | Wanderlog already claims it for hotels (W4). Extending it costs nothing | COSMETIC: don't position on it; keep it as a trust rule |
| E. Ratings from real trips, tagged by taste ("travelers with your taste loved it"; only from travelers who opt in to anonymous counts, plan D-027) | 2 (an asset that only XPMatch's check-in loop produces) | Wanderlog has trips with dates and could add check-ins. Whoever builds taste density in a city first wins; no rival's model stops it | POSITIONAL, not built yet |

## VERDICT: POSITIONAL

**The differentiator:** XPMatch plans your trip only from real travelers' trips, and every stop shows why it fits you, what the catch is and whose trip it came from; where it doesn't have enough, it says so.

- **What it combines:** candidate A's display with candidate B's constraint. A alone is copyable in one product cycle. B is what makes A believable: evidence on every stop requires real, attributed supply.

**Mechanism (why a rival can't follow):**
- **Against Mindtrip and Layla, structural:** their offer is any destination "in seconds" (M1), built from "thousands of data sources" (M2) or chat generation (L2). Planning only from attributed real trips would mean refusing most destinations, which abandons the offer.
- **Against Wanderlog, positional:** it has traveler guides (W3) and could add a guides-only mode with fit explanations without changing its model.

**Shelf life (positional against Wanderlog):**
- **Estimate:** about 12 months from XPMatch's public launch. `UNSOURCED`: it is an estimate, not a measurement.
- **Why that long:** the display layer (fit and catch text) can be copied in weeks. A taste profile plus per-stop attribution is a larger build for a team whose default is generation.
- **Plan the structural follow-up:** taste-tagged ratings from real trips (E), gathered city by city through check-ins, before a larger rival adds profiles.

**Substitution test:** the sentence was re-read with each rival's name in it.
- **"Wanderlog plans your trip only from real travelers' trips…"** is false today: it auto-generates itineraries ranked on "traveler reviews from Tripadvisor and Google" (W2) and promises "No matter where you travel" (W2). **Passes.**
- **Mindtrip** claims "anywhere… In seconds" (M1). **Passes.**
- **Layla** writes itineraries by chat with partner live prices (L2). **Passes, with limited evidence (store listings only).**

**Consequence for every stage downstream:**
- **Where to lean:** the positioning may lean on the differentiator. Its biggest cost, one city, not in seconds, has to be presented as the reason it can be trusted: real trips take time to collect.
- **What to leave out:**
  - Never position on coverage, booking or group planning.
  - Never position on "commission never ranks" (D).
  - Never position on "AI trip planner"; that's category language every rival shares.
- **The movement statement** (`uvp.md`) must not rest on candidate A alone, because A has a shelf life. It rests on B's refusal (no invented or filler stops), which rivals built on breadth cannot follow.

## Assumptions & Unknowns

- `UNVERIFIED`: Layla's website claims (the site blocked both fetch methods). A search-engine title reading "Trusted by Millions" was excluded because its page didn't load.
- `UNVERIFIED`: whether any rival shows per-stop catches inside the app. Only marketing pages and store listings were read, not the apps themselves. Human task: install the three apps, plan 3 days in the pilot city, and screenshot one stop in each.
- **The traveler's real second choice:** originally `UNKNOWN`. Updated by `validation.md`:
  - Search intent points to ChatGPT ("can chatgpt plan a trip for me", "chatgpt travel itinerary prompt reddit") and to Reddit.
  - One quoted traveler used ChatGPT and got "the same itinerary as it seems everyone else is on".
  - The substitution test holds for ChatGPT by construction: it generates plans and doesn't draw on attributed trips. Its own copy wasn't fetched, so a fetched inventory is still owed.
  - Survey Q5 measures the second choice.
- `INFERRED`: that travelers value an honest "not enough" over coverage. Only the plan's relevance study (≥7 of 10 prefer the matched plan) and the pilot can test this. If travelers choose coverage, candidate B is a handicap, not a differentiator.
  - **Partly supported** by `validation.md` quote 6 ("constantly recommending places that are permanently closed") and quote 8 ("I’d honestly trust routes made by real people…"). Neither quote tests the trade-off against coverage.
- The planned claims describe a product that doesn't exist yet. Any public copy that states them before the pilot proves them is a promise, not a claim.
- **Re-checked after `validation.md` (2026-09-23):** no claim above was refuted. Two assumptions were updated in place (the second choice, and the value of an honest "not enough").
