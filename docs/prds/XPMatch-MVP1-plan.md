# XPMatch MVP-1 plan (PRD revision v1.2, approved)

| Field | Value |
| --- | --- |
| Source | `docs/prds/XPMatch-Build-PRD-v1.1.md` (founder's PRD v1.1, 2026-09-23); read-only review of `TayoAki/XPMatchv1`; founder answers of 2026-09-23 |
| Method | `mobile-plan-mvp` for scope; `software-factory` for intake, readiness and delivery slices |
| Readiness | **READY WITH ASSUMPTIONS**: this revision is approved, so S0 and slices 1–2 can start. Paid model and voice calls (slices 2b and 5) also need D-009 (spend ceiling), slices 3 onward need D-006 (pilot city and permissioned content), and the first external invite needs D-021 (who answers safety reports) |
| Approval | **Approved** by the founder on 2026-09-23, as written in draft 10 (D-005). D-041 to D-045 were approved the same day. The other decisions (D-006 to D-040) stay open until the founder resolves them; §15 says which have working defaults and which block a slice |
| Revision note | Draft 2 (2026-09-23) adds the social features the founder chose for the first pilot: contributor updates, trip partners with comments, an opt-in named activity feed, ask-a-contributor Q&A and direct messages. Draft 3 (2026-09-23) makes the flow profile-first: every traveler has an approved profile before matching, and matching ranks the individual items in travelers' itineraries. Draft 4 (2026-09-23): the app builds each traveler a complete itinerary from those items, shows how each item matches the profile and which similar travelers picked it, and lets any item be swapped in one tap. Draft 5 (2026-09-23) plans for a 1,000-tester beta, reached in gated waves after the pilot (§12). Draft 6 (2026-09-23): travelers review what they did, through evening check-ins during the trip and a check-in after it. Ratings stay private unless shared as reviews, and whole trips can be published before the first wave. Draft 7 (2026-09-23): one-tap sign-in with Apple or Google, a voice interview or a survey for the profile, plans requested by typing in a chat box, swipes or arrow taps to change items, and trips saved automatically. Draft 8 (2026-09-23): the chat first answers with options the traveler swipes through, changes by typing and can undo, and a "Create itinerary" button then turns the picks into the itinerary. Draft 9 (2026-09-23): travelers can change the app's colors (System, Light or Dark, and five contrast-checked accents, REQ-030), and the UI plan in `docs/design/XPMatch-UI-plan.md` sets the design system: v1's design language with the PRD's colors. Draft 10 (2026-09-23): the data shape in `docs/design/XPMatch-data-shape.md` defines the taste vocabulary (taxonomy 0.1), the contributor capture template, field-level shapes for the core loop, matching and planner rules v0, and the option card contract (D-041 to D-045) |

PRD v1.1 stays the base document. This revision changes scope and order only; everything not mentioned here (trust rules, data conventions, quality thresholds, rollout, rollback) carries over unchanged. Requirement IDs are the PRD's own.

## 1. Decision summary

- MVP-1 tests the PRD's core bet (H1: relevant human content beats destination-only suggestions) with the fewest moving parts. The loop is: one-tap sign-in → a profile each traveler creates once, by voice interview or survey → the traveler types what they want in a chat box → the chat answers with options drawn from real, permissioned travelers' itineraries, each showing how it matches the profile, and the traveler swipes or taps arrows to pick → "Create itinerary" arranges the picks into a day-by-day itinerary and saves it → partner or official link. It covers one city, invited travelers, and iOS plus Android.
- Compared with v1.1, the in-app map and offline reading move to MVP-1.1, right after the first 5 invited travelers. The voice interview stays in the pilot by founder decision, if the S0.2 device test passes (D-035). Compare, in-app contributor publishing, guest browsing and AI-proposed rearrangements move later. No trust, privacy or cost rule is relaxed.
- The 10-traveler relevance study moves up to S0–S1 and runs by hand, so H1 is tested before most of the code exists.
- Several decisions recorded in v1's docs are retired because PRD v1.1 replaced them: web-first, selling the service first, fixed prices, match percentages, and a multi-city beta (§3). Pricing stays open (D-016).
- The first pilot also carries the social features the founder chose on 2026-09-23: contributor itinerary updates, ask-a-contributor Q&A, trip partners with stop comments, an opt-in named activity feed, and direct messages (§4, §8). They add shared access, public profiles, messaging, push notifications and moderation duties, so the first invites move later. Trips stay private unless their owner turns sharing on, travel dates are never shown to other travelers, and block, report and message requests land before any traveler can reach another.
- Planning assumption (founder, 2026-09-23): the beta grows to 1,000 testers. At that size the servers aren't the constraint; content per city, moderation and tester management are. MVP-1 builds in the cheap scale choices from day one, and the beta grows in gated waves after the 20-person pilot (§12).
- Travelers feed the supply side (founder, 2026-09-23). On each evening of the trip and once after it, they tick what they did and rate it. Ratings are private by default and only suggest profile changes for approval. In the pilot, travelers can share ratings as labeled, moderated reviews; before the first wave, they can publish whole trips as itineraries. This is how content keeps up with 1,000 testers.
- Look and feel (founder, 2026-09-23): v2 keeps v1's calm design language but uses the PRD's colors, and travelers can change the colors themselves (REQ-030). The components follow shadcn's model through its React Native counterpart (D-037). Details are in `docs/design/XPMatch-UI-plan.md`.
- Founder approval: this revision was approved on 2026-09-23 (D-005). Still needed from the founder: choose the pilot city and start collecting content permissions now (D-006), because nothing after slice 2 can be shown honestly without them. Set the spend caps before paid model and voice calls (D-009). Before the first external invite, name who answers safety reports and how fast (D-021).

## 2. Product, users and constraints

**Promise (PRD v1.1):** Tell XPMatch how you like to travel. It helps you choose relevant travelers' itineraries, contextual reviews and places, explains the tradeoffs, and turns your choices into a private trip board.

**Product wording (approved with this revision, D-005; corrected in draft 9):** Tell XPMatch how you like to travel. It builds your trip from what real travelers actually did, matched stop by stop to how you travel, shows why each stop fits you, and lets you swap anything in one tap.
- **Why it changed:** draft 4 said "what travelers like you actually did". But items are matched to the traveler's own profile, and similarity to the source traveler appears only with consent (§5, AGENTS.md).

- **First customer:** a solo traveler or couple planning a 2–4 day leisure trip to the pilot city, invited into the pilot.
- **Job to be done:** "Show me what people who travel like me actually did there, tell me honestly what won't suit me, and give me a plan I can use."
- **First measurable outcome:** a new invited traveler gets a plan within 24 hours of approving their profile, and keeps most of its items a week later. Both are hypotheses, measured as plan activation and kept-item ratio in §10 (adapted from PRD §11).
- **Release type:** an unpaid, controlled pilot. It isn't a demo: real people put private data in, so sign-in, data isolation, deletion and spend caps must be production-grade. It isn't a public launch either: no store listing, no payments, and at most 20 invited travelers (team → 5 → up to 20, PRD §13). After the pilot, the same app grows in gated waves toward a 1,000-tester beta (§12).

**Confirmed constraints (supplied):**

- Native iOS and Android with React Native and Expo; PostgreSQL on Supabase (PRD D-001, §5).
- No booking, payments, subscriptions or creator payouts in the pilot (PRD §3).
- One city; solo travelers and couples; 2–4 day leisure trips (PRD §2).
- Trust rules: deterministic authorization and ranking, evidence-backed explanations, no fabricated peers, commission never affects ranking (PRD D-002, §5).
- v2 is a fresh codebase; v1 is a product reference only (founder, 2026-09-23).
- The repository is public, and the PRD and plans may be public (founder, 2026-09-23).
- The first pilot includes contributor itinerary updates, trip partners with stop comments, an opt-in named activity feed, ask-a-contributor Q&A and direct messages (founder, 2026-09-23). This brings forward PRD v1.1's later timing for feeds and collaborative editing (PRD §3). Activity sharing is an explicit per-trip opt-in. That keeps it within the PRD's rules that nothing is published implicitly (PRD §4) and that there is no automatic social posting (PRD §3).
- Every traveler has an approved profile before any matching (founder, 2026-09-23). The app then:
  - ranks itinerary items, meaning the stops in real travelers' itineraries, against that profile;
  - builds the traveler a complete itinerary from them;
  - shows how each item matches the profile, and which travelers with similar profiles picked the same item;
  - makes it simple to swap any item.
- The beta targets 1,000 testers, reached in gated waves after the pilot (founder planning assumption, 2026-09-23).
- Travelers review what they did, prompted during the trip (evenings) and after it. Anyone who's been to a place can review it, labeled "From an XPMatch trip" or "Self-reported". Reviews and ratings are in the pilot; publishing whole trips comes before the first wave (founder, 2026-09-23).
- Sign-in is one tap with Apple or Google, with no codes. Profiles come from an AI voice interview or a survey. Travelers ask for trips by typing in a chat box. The chat answers with options they pick from by swiping or tapping arrows, changing by typing, or undoing. "Create itinerary" then builds the itinerary and saves it to Trips (founder, 2026-09-23).

## 3. What v1 teaches (repository evidence)

v1 is a Next.js web prototype. Its code (commit `28c66b6`) and docs were reviewed read-only on 2026-09-23. Its code is not carried over; these lessons are.

- **Onboarding length is the first known drop-off.** Most production traffic was iPhone Safari. The only outside sign-up recorded created an account, saw the six-step onboarding quiz and left (v1 `docs/MOBILE_PLAN.md`). This is one data point, not a trend, but it is the only external evidence there is. MVP-1 keeps the voice interview short, offers a short survey instead, and builds a plan as soon as the traveler asks for one.
- **Phone patterns v1 already converged on:** a three-question conversational quiz instead of a long form, bottom tabs, and up/down buttons instead of drag on the trip board (v1 `docs/MOBILE_PLAN.md`, Plan B). MVP-1 starts from those behaviors.
- **The core content doesn't exist yet.** v1 has no real travelers' itineraries: each one is a model-written proposal or the user's own edits. Its reviews come from Google, and its "taste twin" means a place the user loved, not a person. Permissioned itineraries, first-party reviews and author similarity are all new work. That is why D-006 (content supply) is the critical path.
- **v1 inverts the PRD's trust model; MVP-1 must not.** In v1:
  - chat cards show model-written ratings and prices with no "estimate" label;
  - match scores are computed in the browser from model text;
  - the model refers to places by name rather than by ID;
  - one tool replaces a whole itinerary with no preview or undo;
  - profile changes apply without approval;
  - the itinerary is a single field where the last write wins.

  MVP-1 answers each with a server-owned rule: catalog IDs only, server-side scoring, a preview before any bulk change, approved profile versions, and trip revisions with conflict checks.
- **Provider data needs its own policy.** v1 keeps Google Places data, including review author names, in a catalog shared by all users with no expiry. It also saves the first search hit as a permanent match. MVP-1 uses operator-entered place facts (A-002). When the in-app map arrives in MVP-1.1, it must follow the provider's caching terms and verify matches.
- **Spend limits must cover every paid call.** v1 caps only some place lookups; model calls and most Google calls are uncapped. MVP-1 checks the budget before every model call (REQ-013).
- **Cost comes from provider calls, not the model.** In v1, Google place lookups and photos made up most of a trip's cost, and the model only 2–12%. Once its place catalog was in use, a typical trip chat cost about USD 0.35 (v1 `docs/PLACE_CATALOG.md` §1 and §3, `docs/COGS.md` §3). MVP-1's operator-entered catalog avoids that cost. MVP-1.1's map needs its own budget before it ships.
- **There is no outside traction yet.** v1 records zero paying customers and no outside testers; the one outside sign-up left during onboarding. Its only real usage figure is 387 production requests in 72 hours (v1 `docs/BETA_READINESS.md`). Its pitch line that testers rate "60%+ of picks a hit" has no data behind it (v1 `docs/BUSINESS_PLAN.md`). The pilot's measurements (§10) will be the first real evidence.
- **Voice is untested.** v1's redesign spec included a microphone, but it was never built (v1 `docs/UI_REDESIGN_PLAN.md` §13). The S0.2 spike is the first real test.
- **Ideas worth keeping (as behavior, not code):**
  - review answers that cite quotes by index, so the quote shown is always verbatim;
  - prompt rules that require honest downsides;
  - the "Remember this?" card as the model for approving profile changes;
  - the "heads-ups" and "Couldn't verify" labels, which already express tradeoffs and unknowns;
  - the same five preference areas (stays, food, flights, activities, general);
  - v1's pre-beta checklist: backups, error monitoring, real-phone tests, privacy and terms pages, key rotation;
  - fake-provider test servers, so journeys can be tested without paid APIs. Fixtures must be labeled as fixtures, never recorded into demos as real reviews.
- **v1 decisions this plan retires**, because PRD v1.1 replaced them:
  - web-first;
  - selling the service by hand first;
  - the fixed prices in v1's September 21 decision log: USD 19 Trip Pass, USD 49 a year for Plus, USD 49 advisor seats, USD 149–399 concierge;
  - numeric match percentages;
  - a 10–25-person beta across many cities that included friend groups and advisors;
  - the advisor and group segments.

  Sources: v1 `docs/BUSINESS_PLAN.md`, `docs/REVENUE_MODEL.md`, `docs/UI_REDESIGN_PLAN.md` §13, `docs/BETA_READINESS.md`. Pricing itself stays an open decision (D-016).

## 4. Journeys

### Contributor (supply): run by the operator in MVP-1

1. The founder recruits someone who has taken a trip to the pilot city.
2. The contributor shares an itinerary (days, stops, notes), reviews, and the trip's context: when, with whom, purpose and pace.
3. The contributor agrees to a permission record: what may be shown, the attribution name, whether their travel taste may be shown publicly, and how to withdraw.
4. The operator enters the material with the import tool, which validates it and links each stop to a place in the pilot-city catalog.
5. The operator publishes it. It is matchable only while its permission is current.
6. When a contributor asks to withdraw, the operator runs the withdraw command and new reads stop immediately.

Contributors are not paid in-app during the pilot; any thank-you is handled outside the app (D-014). Self-serve submission, preview and a moderation queue arrive before the first wave (§12). By then, travelers who publish their own trips become contributors through the same flow (see "Reviews: during and after the trip" below).

### Traveler (the value journey)

Every traveler creates a profile once, and plans are built from it whenever they ask (founder, 2026-09-23).

1. **Sign in with one tap:** "Continue with Apple" or "Continue with Google", with no codes and no passwords (D-007). Continuing confirms the traveler is 18 or older and accepts the terms. A display name is asked for only the first time they share or message.
2. **Create a profile, once.** The traveler chooses one of two ways:
   - **Talk it through:** the AI interviews them by voice with 3–5 short questions about how they like to travel.
   - **Take the survey:** a few one-tap screens (D-034).

   Either way, they see a recap, correct anything, mark must-haves and approve it. If voice fails, the mic is denied or the voice budget runs out, the survey opens with the answers so far filled in. Nothing is matched until a profile is approved.
3. **Ask for a trip:** the traveler types what they want into the chat box on Trips, for example "3 days in [city] with my partner in May, slow mornings, lots of seafood". The AI turns it into a trip request and shows it back as chips: 3 days · couple · May · slow mornings · seafood.
   - If the length is missing, the options cover 3 days and say so (D-033).
   - A city that isn't open yet gets a clear answer and a waitlist instead of options.
4. **Pick from the options:** the chat answers with options for the trip, drawn from items in real travelers' itineraries (places, meals, activities) and ranked against the profile and the request. They're grouped by day and time of day, one card per slot, for example Day 1: morning café, lunch, afternoon, dinner (D-036). Each option shows:
   - how it matches the profile, for example "slow mornings ✓ · seafood ✓ · under €30 ✓";
   - the catch, and what isn't known;
   - whose trip it comes from, with their context (for example "Ana, a couple, 3 days in May");
   - travelers with a similar profile who picked it (only people who agreed to be shown), and reviews from travelers who've been there.

   Swipe a card left or right, or tap its arrows, to move through alternatives for that slot; whichever option is showing is kept. The traveler can also type changes into the chat, like "cheaper dinner on day 2", "more beaches" or "skip museums", and the options update. Every change can be undone. Choices save as a draft, so the traveler can leave and come back. Options that fail a must-have are never shown. If there aren't enough good options, the chat says so instead of filling slots with weak ones.
5. **Create the itinerary:** tapping "Create itinerary" turns the options showing into a day-by-day itinerary. It orders each day by time and area, flags anything that clashes (closed that day, outside the trip dates), and saves the itinerary to Trips automatically. It stays editable with the same swipes, arrows, typed changes and undo. The traveler can also remove or move items, or add one from Explore. Asking for "another version" starts a new set of options.
6. On an item, "Check price and availability" or "Official site" opens that page, and the click is recorded.
7. Quick feedback: "useful / not useful" on items, or a report about a source.
8. **Profile changes:** editing the profile creates a new version. "Rebuild" on a trip offers fresh options in the chat. Creating from them shows the new version with Keep and Undo, and unless the traveler taps Keep, the previous version stays. Trip-only preferences from the chat stay on that trip and never change the profile.
9. **During and after the trip:** check-ins ask what the traveler did and how it was (see "Reviews: during and after the trip" below). Evening check-ins need dates, given in the chat or added to the trip.

**Explore** lists more matched items and itineraries to browse, plus the Activity feed. Anything there can be added to a day of the plan.

### Reviews: during and after the trip (founder addition, 2026-09-23)

Travelers are the main source of new reviews. Nothing they rate becomes public unless they choose to share it.

**During the trip** (needs trip dates and notifications turned on):

1. Each evening of the trip, at 8 pm in the trip city's time zone, a notification asks "How was today?" and lists that day's plan items (D-030).
2. The traveler taps what they did and rates each item: loved it, fine, or not for me. They can add a short note, or add something they did that wasn't in the plan. Skipping is always fine, and check-ins can be turned off for the trip.

**After the trip:**

1. The morning after the last trip date, the app asks "How was the trip?" If the trip has no dates, it shows an "I'm back, review my trip" button, and the app asks once, 14 days after the trip was saved (D-030).
2. The recap shows the whole plan, with the evening answers already filled in. The traveler ticks what else they did, gives a quick reason for anything skipped (ran out of time, closed, didn't appeal), rates the rest, and adds anything missing.
3. They choose what happens next:
   - **Keep private** (the default). Ratings shape their own future plans: items rated "not for me" aren't used again, and similar ones rank lower. Any profile change the ratings suggest ("You loved every seafood place. Add seafood to your profile?") waits for their approval.
   - **Share as reviews.** Each rated item with a note becomes a public review under their display name. It shows the month and trip type (solo or couple, and purpose), never exact dates or companions. The traveler sees a preview first, and a moderator approves each review before it goes public (D-032).
   - **Share the whole trip**, available before the first wave. What they actually did, in order, becomes an itinerary other travelers can be matched with. It goes through a preview, a rights confirmation and moderation, and can be withdrawn any time. The traveler becomes a contributor.

On a shared trip, each partner gets their own check-ins and ratings.

**Any time:**

- "I've been here" on any place, to rate and review places from trips taken before XPMatch.
- "Add a past trip" in Profile, before the first wave, to publish an earlier trip as an itinerary.

**Labels:**

- Reviews made in a check-in on a trip saved in XPMatch say "From an XPMatch trip".
- All other reviews say "Self-reported".
- Both are the traveler's own account: nothing tracks location, a partner click never counts as a visit, and no review is called "verified" (PRD REQ-010, D-031).

**How money moves:** travelers pay nothing in the pilot. The revenue path is partner outbound links. Clicks are recorded, and no commission is claimed until a partner confirms one.

### Social journeys (founder additions, 2026-09-23)

**Trip partners**

1. The trip owner taps "Invite a partner" and shares a single-use invite link.
2. The partner signs in, sees whose trip it is, and accepts.
3. Both see the same board. Each stop shows who added it, and "What's changed" lists the other person's edits since their last visit.
4. Either person can comment on a stop; only people on the trip can see comments.
5. The owner can remove the partner and the partner can leave. Access ends immediately.

**Sharing trip activity (opt-in)**

1. On a trip, the traveler turns on "Share activity" and first sees exactly what others will see: display name, place, city and "this week". Dates, companions, spending and notes are never shown.
2. Each place they keep then appears in Explore's Activity tab and on the place itself, for example "Maya kept this".
3. Removing the stop, turning sharing off, blocking someone or deleting the account takes the item down.

**Travelers like you (opt-in)**

1. In Profile, a traveler can turn on "Show my picks to travelers with similar taste". It's off by default, and it only works while their activity sharing is on.
2. When someone with a similar profile gets a plan containing an item this traveler also kept, the item shows their display name and "similar taste". Their profile details, dates and companions are never shown.
3. Contributors appear the same way, but only if they agreed to show their public taste.

**Contributor updates**

1. The operator publishes a new revision of C's itinerary that adds a stop.
2. Anyone viewing the itinerary sees the stop marked new, the update appears in Activity, and the stop becomes available to new plans, swaps and Explore for travelers it fits.
3. Travelers whose trips use items from that itinerary get a notice ("Ana added a new stop") and can add it to a day if they want. Nothing changes by itself.

**Ask a contributor**

1. On an itinerary, a traveler taps "Ask C a question".
2. The question goes to the operator queue and stays private.
3. The operator passes it to C. C's answer is published on the itinerary with C's permission, as "A traveler asked… C answered…", without the asker's name.
4. The traveler sees that the question was answered.

**Direct messages**

1. A traveler taps "Message" on someone's profile or activity item. The button appears only if that person shares activity and allows messages.
2. The first message arrives as a request, which the recipient can accept, ignore or block.
3. Once accepted, both can send text messages.
4. Either person can block or report at any time. A report sends the reported messages to the operator, who can't browse other conversations.

## 5. Build now, next and later

### Build now (MVP-1)

| Capability | In MVP-1 | Why | REQ |
| --- | --- | --- | --- |
| Sign-in and isolation | One tap with Apple or Google, no codes or passwords (D-007); continuing confirms 18+ and the terms; owner-only data; second-device restore; sign-out clears local data | Real private data, with the lowest-friction start | REQ-001 |
| Account deletion | In-app delete that revokes access and removes owned rows, with a deletion record | Real users | REQ-014 (subset) |
| Voice interview | The AI interviews the traveler by voice with 3–5 short questions, once, when the profile is created. Final answers become typed candidates linked to what the traveler said. Interrupting, muting, ending or switching to the survey keeps the answers so far | Journey step 2; founder choice for the pilot, if S0.2 passes (D-035) | REQ-004, REQ-002 |
| Survey | A few one-tap screens: the alternative to voice, and the fallback when voice fails, the mic is denied or the budget runs out | Journey step 2 | REQ-002 |
| Taste recap and profile | Editable recap covering general, dining and experience preferences, must-haves and spend ranges. Approval creates an immutable version, and matching needs an approved profile. Trip-only overrides | Journey steps 2 and 8 | REQ-002 |
| Chat trip request | The traveler types what they want. The model turns it into a structured request (city, length, dates, party, purpose, trip-only preferences), which the API validates and shows back as chips. The chat answers with options and a "Create itinerary" button. 3 days when no length is given; a clear answer for cities that aren't open | Journey step 3 | REQ-029, REQ-003 |
| Content import and rights | Operator import script with validation, permission records, publish, withdraw and an audit log; operator-entered pilot-city place catalog | Supply without fake content | REQ-005 |
| Matching and explanations | Ranks itinerary items against the approved profile: an eligibility filter, then versioned weighted components. A place that appears in several itineraries is grouped into one result. Content fit stays separate from author similarity, which only appears with contributor consent. Every item carries its profile matches, tradeoffs and unknowns. The ranking feeds the plan, swaps and Explore | The core bet (H1) | REQ-006 |
| Options and itinerary | A deterministic, versioned planner proposes an option, with alternatives, for each day's slots, using the ranked items, the request, pace, meal times and area. "Create itinerary" arranges the chosen options by day, time and area, flags clashes, and saves the trip. It never uses an item that fails a must-have, and says so when there aren't enough good options. "Rebuild" offers fresh options, with Keep and Undo on the result | Journey steps 4, 5 and 8 | REQ-025 |
| Swipe and edit | Swipe an option or item, or tap its arrows, to move through up to three alternatives for the slot: in the chat before the itinerary exists, and on the itinerary after. Type changes into the chat; remove, move or add from Explore; undo on every change | Journey steps 4–5 | REQ-026, REQ-029 |
| Automatic saving | Option choices save as a draft while the traveler picks. "Create itinerary" saves the trip in one revision, with lineage for every item, and every later change saves as it happens. Revisions and conflict handling; a rebuild replaces a trip only after Keep | Journey steps 4–5 | REQ-008 |
| Explore and item detail | More matched items and itineraries to browse; item detail with the source traveler's context and reviews; the source itinerary one tap away; an "Open in Maps" link per place | Journey steps 4–5 | REQ-007 (list) |
| Outbound links | Allowlisted redirect; one logical click event; never shown as a booking | Journey step 6; revenue signal | REQ-011 (subset) |
| Feedback and reports | "Useful / not useful" on matches; "report a problem" goes to an operator list | Trust metric | REQ-010 (report), REQ-012 |
| Telemetry | Authoritative events from committed actions; internal accounts flagged | Measuring the pilot | REQ-012 |
| Spend caps and kill switches | Per-user and global daily model budgets checked before each call; metered usage; switches for model features, matching and outbound links | Real money | REQ-013 |
| Accessibility basics | Screen-reader labels, large text, button alternatives to drag | Main journey on both platforms | REQ-015 (subset) |
| Appearance | System, Light or Dark and five contrast-checked accent colors, chosen in Profile. Applies instantly, is saved to the account, and is cached on the device so it doesn't flash at start-up (UI plan §4) | Founder addition: travelers can change the colors easily | REQ-030 |
| Safety foundation | Display names; block and report on every piece of user content; a text filter; the operator queue with a response owner; community guidelines and contact details; 18+ confirmation; rate limits | Required before travelers can see or reach each other; app-store rules for user content | REQ-023, REQ-010 (report and block) |
| Contributor updates | "New" markers on updated itineraries, notices on trips that use that itinerary's items, updates in Activity | Founder addition; keeps human content visibly current | REQ-017 |
| Ask-a-contributor Q&A | Question form, operator queue, published answers, an "answered" notice | Founder addition; answers resolve unknowns for every traveler | REQ-021 |
| Trip partners and comments | Invite link, shared board with "added by" and "what's changed", stop comments, remove and leave | Founder addition; couples are half the segment | REQ-019, REQ-020 |
| Opt-in trip activity | Per-trip sharing with a preview, the Activity tab, place badges, removal | Founder addition; lets travelers see what others are adding | REQ-018 |
| Travelers like you | Plan items show, by display name, similar travelers who picked the same item, only with their consent; contributors only with public-taste consent | Founder addition; social proof from people with similar profiles | REQ-027 |
| Direct messages | Message requests, inbox, text messages, an allow-messages setting, block and report in conversations | Founder addition | REQ-022 |
| Notifications | In-app notices and unread counts; push notifications that never include message text | Messages, answers, partner edits, updates and check-ins need to reach people | REQ-024 |
| Check-ins and reviews | Evening check-ins on trip days and an after-trip check-in; tick, rate, note, add; private by default; suggested profile updates for approval; share as moderated, labeled reviews; "I've been here" on any place | Founder addition; travelers become the main source of new reviews | REQ-028, REQ-010 |
| Scale foundations | The day-one choices listed in §12 | Lets the same app grow to 1,000 testers without rework | NFR-008 |

### Next (MVP-1.1, before inviting more than the first 5 travelers)

| Capability | Condition | REQ |
| --- | --- | --- |
| In-app map with card-to-pin sync and list equivalents | Provider terms and keys verified | REQ-007 |
| Offline reading of saved trips, with age labels | Pilot trips happen during the cohort window | REQ-015 |
| Voice interview, only if it slipped from the pilot | The S0.2 spike or device testing wasn't ready in time (D-035) | REQ-004 |

### Later (each needs its own approval)

- Contributor self-serve submission and in-app answers to questions have moved up: they're required before the first wave beyond the pilot (§12).
- Shortlist and compare up to three with price bases (REQ-009).
- AI-proposed rearrangements with an exact preview (REQ-003 bulk proposals).
- Live offer refresh, then hotel, flight and experience providers (REQ-011 refresh, REQ-016).
- Guest browsing without an account (PRD D-004).
- Hotel and flight preference questions (D-013).
- Numeric match scores, trips with more than two people and group preference matching, the web companion, more cities, creator payouts and subscriptions (PRD §3 expansion gates).
- Photos or attachments in messages and comments.

## 6. Screens and states

Bottom navigation: Trips, Explore, Inbox, Profile. Trips is the home screen: a chat box to ask for a plan, then the traveler's trips. Explore replaces Discover, for browsing and Activity. Inbox is new, for messages, requests, answers and updates. The PRD had Discover, Trips and Profile. Colors: the PRD's pine `#174D42`, ivory `#F7F8F5`, white surfaces and dark `#182B28` text (PRD §4) are the default theme, and travelers can switch mode and accent color in Profile (REQ-030). Layouts, tokens and components are in `docs/design/XPMatch-UI-plan.md`.

| Screen | Main decision | States that change the experience |
| --- | --- | --- |
| Sign in | Continue with Apple or Google | Cancelled; offline; a returning traveler lands on Trips |
| Profile: voice or survey (first time only) | Talk to the AI or take the survey | Mic permission is asked only when voice is chosen |
| Voice interview | Answer one question at a time, out loud | Connecting; listening; speaking; interrupted; paused; reconnecting. Mute, end and "switch to survey" are always visible. Mic denied, network lost or budget reached opens the survey with the answers so far |
| Survey | Answer a few one-tap questions | Progress shown; skip a question; back; submit |
| Taste recap (first time, then from Profile) | Correct and approve | Uncertain values flagged; unknowns stay unknown; newer version approved on another device (reload); saving; no plan until approved |
| Chat box (on Trips and on each plan) | Say what trip you want, or what to change | Understood (shown as chips); one follow-up question if something important is missing; city not open (a clear answer and a waitlist); daily budget reached (saved trips still work); offline |
| Trip options (in the chat) | Swipe or tap arrows to pick the option for each slot, type changes, then tap "Create itinerary" | Building options; partial failure; not enough good options for every day (says so); an option's source withdrawn; draft saved as you go. The options open full screen from the chat reply, with the chat box still at the bottom (UI plan §7) |
| Itinerary | Review the day-by-day plan; swipe, remove or move items | Creating; clashes flagged (closed that day, outside the dates); an item's source withdrawn; saved automatically |
| Item alternatives (swipe or arrows) | Keep the item showing, or move on to the next alternative | Loading; no more alternatives (says so); undo |
| Item detail | Does this fit me, what's the catch, whose trip is it from, and who like me picked it? | Profile matches, tradeoffs, unknowns; every source traveler's note; similar travelers shown only with their consent; source withdrawn |
| Itinerary or review detail | See an item in the context of the trip it came from | Reasons, tradeoffs, unknowns; author similarity hidden without consent; source withdrawn; dated event expired |
| Rebuild banner | Keep or undo a rebuilt trip | What changed, item by item; the previous version stays unless the traveler taps Keep |
| Explore | Browse more matched items and itineraries; add one to a day | Loading; partial failure; no suitable items (honest empty state); blocked by a must-have (reason shown) |
| Add to a day (from Explore) | Add it to a day of the plan, or pick which trip if there's more than one | Added; already in the plan; conflicts flagged |
| Trips (home) | Ask for a plan in the chat box, or open a saved trip | No trips yet (the chat box invites a first request); network failure |
| Profile and privacy | Update taste, delete account, sign out | Edits create a new version; deletion in progress or failed with retry |
| Appearance (in Profile) | Choose System, Light or Dark, and an accent color | Live preview; applied at once; saved to the account; another device picks it up after sign-in |
| Report a problem | Say what's wrong with a source | Submitted; offline |
| Activity (a tab in Explore) | Which shared place or update to look at | Empty ("No shared activity yet"); item removed since loading; blocked people hidden |
| Traveler profile | Who is this, and can I message them? | Messages off; blocked; account deleted |
| Share activity (on a trip) | Turn sharing on after seeing exactly what others will see | Preview; on; off, which removes shared items |
| Trip partners | Invite, accept, remove or leave | Invite expired or used; already a member; removed; owner deleted their account |
| Stop comments | Discuss a stop with a partner | Empty; posting; blocked by the filter; deleted; offline |
| Ask a question | Send a question about an itinerary | Submitted; answered; not published; rate-limited |
| Inbox | Open a conversation, request or notice | Empty; requests waiting; unread counts; offline |
| Conversation | Read and send messages | Request pending; accepted; blocked; reported; blocked by the filter; rate-limited; other person deleted their account |
| Report or block | Report content or a person, or block them | Submitted; already blocked; unblock from Profile |
| Community guidelines and contact | What's allowed and how to reach the team | — |
| Evening check-in (opened from the notification) | Mark what you did today and rate it | Nothing planned today; already answered; skipped; offline (answer later, and the after-trip check-in picks it up) |
| After-trip check-in | Tick what you did, rate it, add anything missing, then keep private or share | Evening answers filled in; half done (resume later); nothing ticked; trip has no dates ("I'm back") |
| Review preview | Confirm exactly what the public review shows | Preview; submitted; published; rejected with a reason; withdrawn |
| I've been here (on any place) | Rate and review a place you've visited | Already reviewed (edit instead); labeled "Self-reported" |
| Profile suggestion | Approve or dismiss a change suggested by your ratings | Approved (new profile version); dismissed |
| Publish my trip (before the first wave) | Turn a trip you took into a public itinerary | Preview; rights confirmation; submitted; published; rejected with a reason; withdrawn |

Plan items show similar travelers who picked them (founder decision). So the relevance study runs by hand, before that feature exists. The app also records which items showed similar travelers, so their effect can be measured separately (§10).

## 7. Data and access boundaries

**Entities** (subset of PRD §5 groups M01–M08; names follow the PRD).
- **Field-level detail:** fields, the taste vocabulary (taxonomy 0.1) and matching rules v0 are in `docs/design/XPMatch-data-shape.md` (added in draft 10, approved with this revision).
- **Tables it adds to the list below:** `account_settings` (REQ-030), `city`, `area`, `place_hours`, `place_fact`, `proposal_slot`, `proposal_option`, `proposal_event`, `taxonomy_dimension` and `checkin_schedule`.

The entities:

- Identity and profile (M01): `app_user` bound to the auth provider's verified subject, `private_profile`, `private_profile_version` (immutable once approved), `preference_value`, `spend_range` (minor units, currency, basis), `preference_evidence`.
- Interview, plans and commands (M02 subset):
  - the interview `conversation` and its messages;
  - `plan_request`, the structured request the model made from the traveler's chat message, as validated by the API, with the message ID;
  - `plan_proposal`, the options draft: the request, profile version, planner version, and each day's slots with the chosen option, its alternatives and their assessments. It saves as the traveler picks, and "Create itinerary" turns it into a trip. For a rebuild of an existing trip, the result stays a proposal until the traveler taps Keep;
  - `mutation_receipt` for idempotency.

  No outbox until an asynchronous consumer exists.
- Content and catalog (M03): `place` (operator-entered: name, area, category, coordinates, official or partner URL, regular opening days and hours with a last-checked date), the contributor's public profile and consented public taste, `community_content`, `content_revision`, `content_permission`, `published_itinerary`/`day`/`stop`, and `review` with context.
- Matching (M04): profile and trip context snapshot, `match_model_version`, `planner_version`, `match_run`, `match_assessment` (its typed target is an itinerary item, the primary unit, or a whole itinerary, review or place), and `match_component` with evidence and explanation; `feedback_event`.
- Trips (M05): `trip`, `trip_revision`, `trip_day`, `trip_stop`, `trip_source` (lineage, including the channel each item came from: generated plan, swap, Explore, activity, partner or contributor update).
- Visits and reviews (founder addition):
  - `visit` is private to its owner: place, trip item (if any), done or skipped, skip reason, rating (loved it, fine, not for me), private note, source (evening check-in, after-trip, "I've been here") and local date.
  - A shared review is the PRD's `review` community content, with `content_permission` (the traveler's consent), `content_revision` and moderation status. It carries the label, month and trip type, never the visit date.
  - Profile suggestions from ratings reuse the PRD's draft-candidate flow: a candidate, then approval, then a new `private_profile_version`.
  - Check-in notices are scheduled per trip day, in the trip city's IANA time zone.
- Operations (M07/M08 subset): `partner_handoff`, `usage_event`, budget counters, `decision_event`, `content_report`, `moderation_action`, deletion record.
- Social (founder additions):
  - a traveler `public_profile` (display name and allow-messages setting; no photo);
  - `trip_share_setting` (off by default);
  - `peer_pick_setting` for "show my picks to travelers with similar taste" (off by default; works only while activity sharing is on);
  - `activity_item` (actor, kind, place, city, time; never trip dates, companions or notes);
  - `trip_member` and `trip_invite` (hashed token, expiry, single use);
  - `stop_comment`;
  - `contributor_question` (answers publish as a `content_revision`);
  - `source_update_notice`;
  - `conversation`, `conversation_participant` (requested, accepted, left) and `message`;
  - `user_block`, `notification` and `push_token`.

  `content_report` also covers messages, comments, profiles, activity items and questions.
- Deferred: voice (M06), search sessions and offers (M07), shortlist and compare (M05).

**Access:**

| Actor | Reads | Writes | Enforced by |
| --- | --- | --- | --- |
| Traveler | Own profile, versions, trips, receipts, visits, ratings and private notes; published content with a current permission, including other travelers' published reviews | Own profile, trips, visits, reviews, feedback and reports | API authorization plus row policies |
| Trip partner | The shared trip: its stops, comments, change history and the other member's display name | Stops and comments on that trip | Row policies on current membership |
| Other travelers | Display names; shared activity; similar travelers' picks, only with those travelers' consent; published Q&A; conversations they take part in. Nothing from anyone who blocked them | Message requests (only to people who allow them), reports, blocks | API authorization plus row policies; blocks apply everywhere |
| Operator (founder) | Content, permissions, reports, and the reported items attached to each report | Import, publish, withdraw, publish answers, hide content, suspend accounts | Service scripts with an audit log; operator tools never read private profiles, trips or unreported conversations |
| Model | Only what the API passes for one request: a profile summary and candidate content. Never messages, comments, questions, activity or private review notes | Nothing directly; returns schema-validated wording that the API checks. It never chooses or orders plan items | API boundary; no database credentials |

**External services:**

| Service | Used for | Note |
| --- | --- | --- |
| Supabase | Auth, Postgres, row policies | Separate development and production projects |
| Text model provider | Interview extraction, explanation wording | Chosen in S0 (D-008); metered and capped |
| Expo EAS | Builds and internal distribution | Needs Apple and Google developer accounts (D-012) |
| API host | `services/api` | Must support long-lived WebSockets for the voice interview (D-010) |
| Push notifications | Messages, requests, answers, partner edits, updates, trip check-ins | Expo's push service with APNs and FCM credentials (D-012); previews never include message text (D-018) |
| Real-time delivery | Messages and shared boards | Supabase Realtime is the candidate; confirm in S0.1 that it enforces row policies, with polling as the fallback (D-020) |
| Apple and Google sign-in | One-tap sign-in | Supabase Auth with native Sign in with Apple and Google sign-in; needs the Apple capability and Google OAuth clients (D-007, D-012) |
| Voice model (Gemini Live) | The voice interview | Chosen and measured in the S0.2 spike; metered and capped (D-009, D-035) |
| Crash and error monitoring | App and API errors | Chosen in S0.1 |
| Over-the-air updates | App fixes without new store builds | Expo EAS Update, with a minimum-version check |

Not in MVP-1: the Google Maps SDK or Places API (MVP-1.1) and partner APIs. Place facts are operator-entered, which avoids provider retention limits.

## 8. First working transaction: acceptance

Scenario: contributor C's 3-day itinerary for the pilot city and two of C's reviews are imported with a permission record. T and U are invited travelers. Each check maps to PRD v1.1 criteria.

| # | Observable result | PRD criteria | Evidence |
| --- | --- | --- | --- |
| T1 | C's content can be published only with a current permission record, and appears in matching once published. | AC-REQ-005-01 | Import tests; public projection check |
| T2 | T takes the survey (and, in a separate run, the voice interview), corrects one recap value and approves: exactly one approved version exists, and a retried approval returns the same version. Before approval no options or itinerary are built, and Explore can't be reached. Denying the mic partway through the interview opens the survey with T's answers so far. | AC-REQ-002-01, AC-REQ-002-02, AC-REQ-002-03, AC-REQ-004-03 | Transaction tests; device run |
| T3 | T has a must-have and types "3 days, slow mornings, lots of seafood" into the chat. The chat answers with options for every slot of 3 days, drawn from C's and other permissioned itineraries. Each option shows its source, how it matches T's profile, a tradeoff (or "no evidenced tradeoff") and its unknowns. No option fails the must-have; if there aren't enough good options, the chat says so. The same inputs and planner version always produce the same options and the same itinerary. | AC-REQ-006-01, AC-REQ-006-02, AC-REQ-006-03, AC-REQ-025-01, AC-REQ-025-02, AC-REQ-029-01 | Deterministic planner and ranking tests; eval cases |
| T4 | Without C's public-taste consent, no author-similarity claim appears. | AC-REQ-006-02 | Permission test |
| T5 | T's option choices survive closing and reopening the app. Tapping "Create itinerary" saves one trip to Trips as a single revision, containing exactly the options that were showing, with lineage for every item. A retried tap returns the same receipt instead of creating a second trip. Clashes are flagged on the itinerary: a stop on a day its listed hours say it's closed, or outside the trip dates. A stop without listed hours says "opening days not known" instead. | AC-REQ-008-01, AC-REQ-008-02 | Transaction tests; device run |
| T6 | After T removes one stop, moves another, force-quits and signs in on a second device, both devices show the same latest revision. Two conflicting edits produce a conflict, not a silent overwrite. | AC-REQ-008-01, AC-REQ-008-02, AC-REQ-001-01 | Concurrency tests; two-device run |
| T7 | "Check price and availability" opens the allowlisted page and records exactly one outbound event. A tampered URL is refused, and nothing says "booked". | AC-REQ-011-01, AC-REQ-011-02 | Redirect tests; device run |
| T8 | U requesting T's profile or trip by ID is denied by both the API and row policies. | AC-REQ-001-02, NFR-001 | Two-user negative tests |
| T9 | After C withdraws, C's items leave T's plan suggestions, swaps and Explore immediately. T's trip keeps T's own edits and shows C's stops as "source withdrawn", without C's notes. | AC-REQ-005-02 | Withdrawal fixture; device check |
| T10 | When T's daily model and voice budget is used up, the voice interview switches to the survey, the chat says it can't build new plans today, and saved trips keep working. | AC-REQ-013-01, AC-REQ-013-02 | Forced-budget test |
| T11 | After the scripted journey, each authoritative event appears once per logical action, and internal accounts are flagged. | AC-REQ-012-01, AC-REQ-012-02 | Event reconciliation script |
| T12 | After T deletes the account, T can't sign in and T's rows are gone; the deletion is recorded. | AC-REQ-014-01 (subset) | Deletion test |
| T13 | T completes T2–T7 with VoiceOver and with TalkBack at 200% text size. | AC-REQ-015-01, NFR-005 | Device checklist |

### Added criteria on PRD requirements (founder decision, 2026-09-23)

- `AC-REQ-001-03`: Travelers sign in with Apple or Google in one step, with no codes or passwords. Signing in with the same account on a second device opens the same account and trips. Deleting the account also revokes the app's Sign in with Apple authorization.
- `AC-REQ-002-03`: A signed-in traveler without an approved profile goes to profile creation before any plan or Explore. They choose the voice interview or the survey, and matching starts only after approval.
- `AC-REQ-004-03`: The profile can be created by voice interview or survey. If the mic is denied, the network drops or the voice budget runs out, the survey opens with the answers given so far, and nothing already confirmed is lost.
- `AC-REQ-006-03`: Itinerary items, meaning the stops in permissioned itineraries, are ranked against the traveler's approved profile, and that ranking feeds the plan, swaps and Explore. Each result:
  - names its source itinerary and traveler;
  - gives at least one reason tied to the profile;
  - gives a tradeoff, or "no evidenced tradeoff";
  - lists its unknowns.

  A place that appears in several itineraries is one result that lists every source.
- `AC-REQ-010-03`: A traveler can share a rating with a note as a review, from a check-in or from "I've been here". It shows their display name, rating, note, the month and trip type, never exact dates or companions. It's labeled "From an XPMatch trip" only when made in a check-in on a trip saved in XPMatch, and "Self-reported" otherwise. It is published only after a preview and moderation, and the author can edit or withdraw it at any time.

### New requirements (REQ-017 onward)

PRD v1.1 stops at REQ-016. These continue its numbering and are pending approval with this revision. REQ-017 to REQ-024 cover the social features, REQ-025 to REQ-027 cover the generated plan, REQ-028 covers trip check-ins, REQ-029 covers chat trip requests, and REQ-030 covers appearance.

- **REQ-017, contributor itinerary updates.** A new revision of a published itinerary shows what changed, and travelers whose trips use its items can choose whether to add the new stops.
  - `AC-REQ-017-01`: When revision 2 of C's itinerary adds a stop, viewers see it marked new, and a traveler whose trip uses items from C's itinerary gets a notice. Adding the stop to a day records lineage to revision 2 as one trip revision; dismissing changes nothing.
  - `AC-REQ-017-02`: Updates are never applied without the traveler's acceptance. A withdrawn source creates no new notices and withdraws pending ones.
- **REQ-018, opt-in trip activity.** Travelers can choose to show the places they keep on a trip under a display name.
  - `AC-REQ-018-01`: Sharing is off by default. Turning it on first shows exactly what others will see; after that, each kept place creates one activity item visible to signed-in travelers.
  - `AC-REQ-018-02`: Activity never includes trip dates, companions, spending, notes or trip IDs, in the app or in API responses. Removing the stop, turning sharing off, blocking someone or deleting the account removes the item from others' view immediately.
- **REQ-019, trip partners.** A trip owner can invite a partner to plan one trip together.
  - `AC-REQ-019-01`: A single-use, expiring invite lets a signed-in person join after accepting. Members see and edit the same board, including who added each stop and what changed since their last visit.
  - `AC-REQ-019-02`: Non-members are denied by both the API and row policies. Invites never reveal whether an email has an account and never show email addresses. Removal or leaving ends access immediately. Concurrent edits produce a conflict, not a silent overwrite.
- **REQ-020, trip-partner comments.** Members can discuss stops.
  - `AC-REQ-020-01`: Comments are visible only to current members. Authors can delete their own, filtered terms are blocked, and any comment can be reported.
  - `AC-REQ-020-02`: A member who is removed or leaves loses access to the comments immediately.
- **REQ-021, ask-a-contributor Q&A.**
  - `AC-REQ-021-01`: A question reaches the operator queue and is not public. An answer published with the contributor's permission appears on the itinerary without the asker's identity, and the asker sees that it was answered.
  - `AC-REQ-021-02`: Rejected or unanswered questions never appear publicly, and question rate limits apply.
- **REQ-022, direct messages.**
  - `AC-REQ-022-01`: A traveler can message only people who share activity and allow messages. The first message is a request the recipient can accept, ignore or block; once accepted, both can send text messages.
  - `AC-REQ-022-02`: Only participants can read a conversation, enforced by both the API and row policies. Blocking stops contact both ways. Message text never reaches analytics, logs or the model, and the operator sees only reported messages.
- **REQ-023, safety controls for user content and contact.**
  - `AC-REQ-023-01`: Every display name, activity item, comment, question and message can be reported from where it appears, and every traveler can be blocked. Reports reach the operator queue, which has a named response owner.
  - `AC-REQ-023-02`: A server-side filter blocks listed terms in names, comments, questions and messages. Rate limits cap invites, questions, new conversations and messages. Sign-up confirms the traveler is 18 or older. Community guidelines and contact details are reachable in the app.
- **REQ-024, notifications.**
  - `AC-REQ-024-01`: Messages, requests, answers, partner edits, contributor updates and trip check-ins create in-app notices with unread counts. Push notifications are sent only after the traveler allows them.
  - `AC-REQ-024-02`: Push previews never contain message or comment text. Each notice type can be turned off, and signing out stops push to that device.
- **REQ-025, options and itinerary.** The app proposes options for each traveler's trip and turns the chosen ones into a complete day-by-day itinerary.
  - `AC-REQ-025-01`: Given an approved profile and a trip request, a deterministic, versioned planner proposes an option, with alternatives, for each day's slots from ranked items, using the traveler's pace, meal times and areas. Each option shows how it matches the profile, a tradeoff or "no evidenced tradeoff", its unknowns and its source. "Create itinerary" arranges the options showing by day, time and area, flags clashes, and saves the trip. The same inputs and planner version produce the same options and itinerary.
  - `AC-REQ-025-02`: No item fails a must-have. When there aren't enough good items, the plan says how many days it could fill instead of padding with weak or unsourced items. The model writes explanation wording only; it never chooses or orders items.
- **REQ-026, swipe and edit.** Any item can be changed with a swipe or a tap.
  - `AC-REQ-026-01`: Swiping an option or item, or tapping its arrows, moves through up to three alternatives for the same slot, each with its profile matches and source. This works in the chat before the itinerary is created and on the itinerary after. The one showing is kept and saved, to the draft or the trip, and undo restores the previous one. The traveler can also remove an item, move it to another time or day, add one from Explore, or type a change into the chat. Arrows and buttons do everything a swipe does (PRD REQ-015).
  - `AC-REQ-026-02`: Alternatives never fail a must-have, and when none fit, the item says so. Every edit is one trip revision. A rebuild replaces a trip only after the traveler taps Keep; otherwise the previous version stays.
- **REQ-027, travelers like you.** Plan items show other travelers with similar profiles who picked the same item.
  - `AC-REQ-027-01`: A traveler appears only if their activity sharing is on and they turned on "Show my picks to travelers with similar taste". A contributor appears only with public-taste consent. Both are shown by display name with "similar taste", never with profile details, dates or companions.
  - `AC-REQ-027-02`: Travelers who haven't opted in are never shown, not even as a count. Blocking hides both people from each other. Turning the setting off, or deleting the account, removes the person from every item immediately.
- **REQ-028, trip check-ins and private ratings.** Travelers record what they did and how it was, during and after the trip.
  - `AC-REQ-028-01`: On a trip with dates and notifications allowed, the traveler gets one check-in per trip evening, listing that day's items, at 8 pm in the trip city's time zone. The morning after the last date, they get the after-trip check-in, with the evening answers filled in. A trip without dates offers "I'm back" and one reminder 14 days after it was saved. Done or skipped, skip reasons, ratings, notes and added places are saved privately; nothing becomes public without sharing.
  - `AC-REQ-028-02`: Ratings never change the approved profile by themselves. Suggested changes are drafts the traveler approves (PRD REQ-002). Items rated "not for me" aren't used in that traveler's future plans. Check-ins stop when turned off for the trip or when the trip is deleted. Private notes never reach analytics, logs or the model.
- **REQ-029, chat trip requests.** Travelers ask for plans, and for changes, by typing in a chat box.
  - `AC-REQ-029-01`: A typed request becomes a structured trip request (city, length, dates, party, purpose, trip-only preferences), shown back as chips, and the chat answers with options and a "Create itinerary" button. A request without a length gets 3 days and says so. A typed change such as "cheaper dinner on day 2" changes only the options, or itinerary slots, it names.
  - `AC-REQ-029-02`: The model only turns words into a request; the planner chooses the items. A city that isn't open, or dates in the past, get a clear answer and no plan. Text in the chat can't change permissions, settings or anyone else's data (PRD REQ-003). Trip-only preferences from the chat never change the profile.
- **REQ-030, appearance (founder addition, 2026-09-23).** Travelers can change the app's colors.
  - `AC-REQ-030-01`: In Profile → Appearance, the traveler chooses System, Light or Dark and one of the offered accent colors. Every screen changes at once, without a restart, and the choice holds after restarting and on a second device signed in to the same account. With System chosen, switching the phone between light and dark changes the app while it's open.
  - `AC-REQ-030-02`: Every offered mode-and-accent pair passes an automated contrast check in CI: text at least 4.5:1, field outlines and focus rings at least 3:1. Fit, catch, unknown and error colors keep their meaning in every theme and always come with an icon and words. Appearance never affects matching, and only its owner can read or change it.

### Social checks

Scenario: T and partner P plan a trip together, U is another invited traveler, and C's itinerary is published.

| # | Observable result | Criteria | Evidence |
| --- | --- | --- | --- |
| T14 | The operator publishes revision 2 of C's itinerary, and U sees the new stop marked. T, whose trip uses C's items, gets a notice and adds the stop to a day; a second device shows exactly one new trip revision. Dismissing leaves the trip unchanged. | AC-REQ-017-01, AC-REQ-017-02 | Revision fixtures; device run |
| T15 | T's question reaches the operator queue and stays private. The published answer appears without T's identity, and T sees it was answered. | AC-REQ-021-01, AC-REQ-021-02 | API tests; device run |
| T16 | T invites P with a single-use link; P accepts and edits, and each stop shows who added it. U is denied by the API and row policies, and the used link fails for anyone else. | AC-REQ-019-01, AC-REQ-019-02 | Multi-user tests; two-device run |
| T17 | P comments on a stop; T sees it and U can't. After T removes P, P loses the board and the comments immediately. | AC-REQ-020-01, AC-REQ-020-02 | Row-policy tests |
| T18 | Sharing stays off until T turns it on after the preview. U then sees "[T's display name] kept Café X · [city] · this week", and the activity API response contains no dates, companions, spending, notes or trip ID. | AC-REQ-018-01, AC-REQ-018-02 | API response schema test; device run |
| T19 | When T removes the stop, turns sharing off, or blocks U, the item is gone from U's view on the next load. People who blocked each other see neither the other's activity nor their profile. | AC-REQ-018-02, AC-REQ-023-01 | API tests |
| T20 | U allows messages and receives T's request, accepts it, and both exchange messages. A non-participant is denied. After U blocks T, contact stops both ways. | AC-REQ-022-01, AC-REQ-022-02 | Multi-user tests; two-device run |
| T21 | U reports a message. The operator sees only the reported messages and can suspend T, but operator tools can't open unreported conversations. Message text appears in no analytics event, log line or model input. | AC-REQ-022-02, AC-REQ-023-01 | Access tests; log redaction check |
| T22 | Listed terms are blocked in names, comments, questions and messages. Rate limits return a clear error without creating content. Sign-up requires 18+ confirmation, and the guidelines and contact details are reachable. | AC-REQ-023-02 | API tests; device checklist |
| T23 | A new message creates an unread count and, if T allowed push, a notification that shows the sender but not the text. Signing out stops push on that device. | AC-REQ-024-01, AC-REQ-024-02 | Device run on both platforms |
| T24 | After T deletes the account, T's messages show as deleted to U, T's comments and activity are gone, P keeps the shared trip as its new owner, and T's invites stop working. | AC-REQ-014-01 (subset), D-019 | Deletion test |

### Plan checks

Scenario: T has an approved profile and a plan. U and V have profiles similar to T's.

| # | Observable result | Criteria | Evidence |
| --- | --- | --- | --- |
| T25 | Before creating the itinerary, T swipes a dinner option in the chat, or taps its arrows, and sees up to three alternatives for that slot, none of which fails T's must-have. The one showing is kept, and undo restores the previous dinner. When nothing fits, the option says so. After "Create itinerary", the same works on the itinerary. With VoiceOver or TalkBack, the arrows do the same. | AC-REQ-026-01, AC-REQ-026-02 | API tests; device run |
| T26 | U shares activity, turned on "show my picks" and kept an item in T's plan, so T sees U's display name and "similar taste" on it. V hasn't opted in and never appears, not even as a count. After U turns the setting off, U is gone on T's next load. | AC-REQ-027-01, AC-REQ-027-02 | Consent and similarity tests; device run |
| T27 | After T edits the profile, "Rebuild" on T's trip shows a new version with Keep and Undo. The trip changes only when T taps Keep; Undo, or leaving, keeps the previous version. | AC-REQ-026-02, AC-REQ-003-01 | Transaction tests; device run |

### Review checks

Scenario: T saved a dated 3-day trip, and U is another invited traveler.

| # | Observable result | Criteria | Evidence |
| --- | --- | --- | --- |
| T28 | On each trip evening at 8 pm city time, T gets one check-in listing that day's items. T marks two as done (loved it, fine) and one as skipped (closed), and nothing about them is public. The next morning, the after-trip check-in shows those answers already filled in. | AC-REQ-028-01 | Scheduling tests across time zones; device run |
| T29 | After T rates three seafood places "loved it", T sees "Add seafood to your profile?" The profile changes only after T approves, as a new version. An item T rated "not for me" doesn't appear in T's next plan. | AC-REQ-028-02, AC-REQ-002-01 | Transaction and planner tests |
| T30 | T shares one rating with a note. The preview shows T's display name, the rating, note, month, "couple" and "From an XPMatch trip", and no dates or companions. The review goes public only after moderation, and then U sees it on the item. When T withdraws it, it disappears immediately. A review from "I've been here" is labeled "Self-reported". | AC-REQ-010-01, AC-REQ-010-02, AC-REQ-010-03 | Projection and moderation tests; device run |
| T31 | Before wave 1: T publishes the trip they took. After a preview, a rights confirmation and moderation, it becomes an itinerary other travelers can be matched with, with T as its contributor. Withdrawing it removes it from new plans immediately. | AC-REQ-005-01, AC-REQ-005-02 | Submission and withdrawal tests |

### Sign-in and chat checks

| # | Observable result | Criteria | Evidence |
| --- | --- | --- | --- |
| T32 | T signs in with Apple on an iPhone and U with Google on an Android phone, with no code or password. Signing in again with the same account on a second device opens the same account and trips. After T deletes the account, the Sign in with Apple authorization is revoked. | AC-REQ-001-01, AC-REQ-001-03 | Device runs on both platforms |
| T33 | T types "3 days with my partner, slow mornings, lots of seafood". The chips read 3 days · couple · slow mornings · seafood, and the chat answers with options and a "Create itinerary" button. "Make dinner on day 2 cheaper" changes only that option. A request for a city that isn't open gets a clear answer and no options. Text that tries to reach other travelers' data or change settings has no effect. | AC-REQ-029-01, AC-REQ-029-02, AC-REQ-003-02 | Eval cases; injection tests; device run |

### Appearance check

| # | Observable result | Criteria | Evidence |
| --- | --- | --- | --- |
| T34 | T picks Dark and Ocean on an iPhone. Every screen changes at once, including the options, the itinerary and sheets. After a restart the app opens in Dark and Ocean without flashing the default colors. After T signs in on an Android phone it switches to Dark and Ocean. With System chosen, switching the phone to light mode changes the app while it's open. The CI contrast check passes for every offered pair, and a build with a failing pair is rejected. | AC-REQ-030-01, AC-REQ-030-02 | Device runs on both platforms; CI contrast test; before and after captures |

## 9. Delivery slices

Each slice is an end-to-end, demonstrable outcome; split it into 0.5–2 day tickets when it becomes Ready (PRD §9). No dates until slice 1 has been measured.

| Slice | Demonstrable outcome | Covers | Depends on |
| --- | --- | --- | --- |
| S0.1 Project shell | Expo app opens on iOS and Android development builds; API health endpoint; shared contracts package; migration runner; CI runs typecheck, lint and tests; versions pinned from current official docs; crash and error monitoring; an over-the-air update channel with a minimum-version check; a city on every core table (§12); semantic color tokens with light and dark themes, a CI contrast test and the UI kit checked on both platforms (UI plan §4, §9) | REQ-015 baseline | D-005, D-037 |
| S0.2 Voice spike (throwaway, time-boxed) | Two-way audio with interruption on a physical iPhone and Android phone; latency and cost per minute measured; decides whether voice is in the pilot (D-035) | REQ-004 feasibility | Devices, development credentials |
| S0.3 Founder track (no code) | Pilot city chosen; permissions and trips collected with the capture template (`docs/design/XPMatch-contributor-capture-template.md`); hand-run relevance study; spend ceiling; developer accounts | D-006, D-009, D-012, D-041, D-043, H1 | — |
| 1 Sign-in and ownership | Sign in with Apple and Google on two devices; U can't read T's data; account deletion, including revoking Sign in with Apple | T8, T12, T32 | S0.1, D-007 |
| 2 Profile: survey and recap | The survey, recap and approval; no plan without an approved profile; trip-only overrides | T2 (survey) | 1, D-034 |
| 2b Voice interview | The AI voice interview with interrupt, mute, end and "switch to survey"; falls back to the survey with answers kept; metered and capped | T2 (voice), T10 | 2, S0.2 passed, D-008, D-009, D-035 |
| 2c Appearance | System, Light or Dark and five accent colors in Profile; applied at once; saved to the account and restored on a second device; no color flash at start-up | T34 | 1, D-037, D-039 |
| 3 Content import and rights | Real permissioned itinerary imported, published and withdrawn | T1, T9 (read gate) | S0.1, D-006 |
| 4 Item matching and Explore | Items ranked for the profile, grouped by place and traceable to their sources, or an honest empty state; Explore; deterministic eval baseline | T4 | 2, 3 |
| 5 Chat options, itinerary and trip | The chat turns a message into a trip request and answers with options; swipe or arrows to pick; typed changes and undo; the draft saves as it goes; "Create itinerary" arranges and saves the trip; the same edits on the itinerary; remove, move, add from Explore; rebuild with Keep and Undo; restore on a second device; conflicts | T3, T5, T6, T9 (trip side), T10, T25, T27, T33 | 4, D-008, D-009, D-011, D-023, D-033, D-036 |
| 6 Links, feedback, telemetry | Outbound click, reports, reconciled events | T7, T11 | 5 |
| 7 Safety foundation | Display names; block and report on every piece of user content; text filter; operator queue with a response owner; community guidelines and contact details; 18+ confirmation; rate limits | T22 | 1, D-021 |
| 8 Contributor updates and Q&A | Revision diffs, "new" markers and update previews on boards; questions to the operator queue and published answers | T14, T15 | 3, 5, 7 |
| 9 Trip partners and comments | Invites, shared board with attribution and "what's changed", comments, remove and leave | T16, T17 | 5, 7, D-019, D-022 |
| 10 Opt-in activity and travelers like you | Per-trip sharing with a preview, the Activity tab, place badges, removal; similar travelers who picked the same item, with their consent | T18, T19, T26 | 5, 7, D-024 |
| 11 Messages and notifications | Requests, inbox, real-time delivery, block and report in conversations, push without message text | T20, T21, T23 | 7, D-012, D-017, D-018, D-020 |
| 12 Check-ins and reviews | Evening check-ins on trip days and an after-trip check-in; private ratings and notes; "I've been here"; suggested profile updates for approval; sharing as moderated, labeled reviews | T28, T29, T30 | 5, 7, 11, D-030 to D-032 |
| 13 Pilot hardening | Accessibility pass; release builds on both platforms; kill switches for every feature, including `activity_feed`, `travelers_like_you`, `trip_partners`, `direct_messages`, `contributor_qa`, `trip_checkins`, `traveler_reviews` and `push_notifications`; deletion recheck across all social and review data; database backups proven by a restore; error monitoring; privacy, terms and community pages; a check against current app-store rules for user content. Then team dogfood, then the first 5 invited travelers | T13, T24, NFR-007 | 1–12 |
| MVP-1.1 | In-app map, offline reading, and voice if it slipped from the pilot; then up to 20 travelers | REQ-004, REQ-007, REQ-015 | 13 plus learnings from the first 5 |
| Beta expansion | The work needed before the first wave (§12), including travelers publishing whole trips; then waves of 100, 300 and 1,000 testers, each opening only when the previous one met its gates | NFR-008, NFR-009, NFR-010, T31 | MVP-1.1 plus the pilot's results; D-025 to D-029 |

## 10. Measurement plan

With at most 20 travelers, report counts next to every rate. In the waves, report every metric per city and per wave, and separately for testers who are planning a real trip (D-028). Staff and test accounts are flagged `is_internal` and excluded.

| Metric | Definition | Window | Informs |
| --- | --- | --- | --- |
| Plan activation | New travelers who create a first itinerary within 24 hours of approving their profile ÷ new travelers with an approved profile | 24 hours | Whether the journey delivers value quickly (adapted from PRD §11's first-decision activation) |
| Kept-item ratio | Items still on the trip 7 days after "Create itinerary" ÷ items in the created itinerary | 7 days | Plan quality: H1 inside the product (added) |
| Channel mix | Kept items by the channel they came from (generated plan, swap, Explore, activity, partner, contributor update) ÷ all kept items | 7 days | Shows how much the plan itself, rather than edits and social channels, supplies |
| Swipe rate | Swipes ÷ options and items shown, by category and slot | 7 days | Where the options miss the profile; tunes the planner |
| Options to itinerary | Option sets that end in "Create itinerary" ÷ option sets shown | Per request | Whether the options are good enough to commit to |
| Plan outcome | Items marked done ÷ items in the saved plan; share of done items rated "loved it" | Per trip, after it ends | The strongest signal of plan quality: what travelers actually did and liked |
| Kept places per started trip | Distinct places on the latest board snapshot ÷ started trips; show zeros and the median | 7 days | Planning depth (PRD §11) |
| Voice interview accuracy | Candidates accepted unchanged, corrected, rejected or left unknown ÷ reviewed candidates, for voice profiles | Per interview | Whether voice understands travelers well enough |
| Profile path | Voice versus survey: share chosen, completion rate, time to approval and corrections needed | Per profile | PRD H2: does voice cut effort without losing accuracy? |
| Sign-up funnel | Installs → signed in → profile approved → first plan, with drop-off at each step | Weekly | Where friction still loses people |
| Outbound intent | Distinct trip, place, provider and day clicks ÷ started trips | 7 days | Revenue-path signal (a click is not a booking) |
| Trust failures | Reports by severity ÷ exposed matches | Pilot | A critical report disables the affected path |
| Model cost per started trip | Metered model spend, including abandoned sessions ÷ started trips | Weekly | Cost hypothesis: about USD 1; investigate above USD 3 (PRD §11) |
| Relevance study (H1) | Travelers preferring a plan built from items matched to their profile over a destination-only plan | S0–S1 by hand; repeated in-product after slice 4 | Continue if at least 7 of 10 prefer matched and no critical trust failure (PRD §10) |
| Sharing rate | Trips with activity sharing on ÷ started trips | Pilot | Whether travelers accept being visible |
| Travelers-like-you effect | Keep rate for items that showed similar travelers ÷ keep rate for items that didn't | Pilot | Whether social proof helps, and how much it colors the H1 reading |
| Partner adoption | Trips with an accepted partner ÷ started trips; stops added by partners | Pilot | Whether co-planning matters for couples |
| Q&A demand | Questions ÷ itinerary opens; answer rate; median time to answer | Pilot | Whether travelers want contact with contributors |
| Messaging use | Travelers who send at least one message ÷ active travelers; share of requests accepted | Pilot | Whether open messaging earns its safety cost |
| Safety load | Reports and blocks per 100 active travelers; median time to resolve a report | Weekly | Moderation capacity; a spike pauses messaging |
| Check-in response | Evening check-ins answered ÷ sent; after-trip check-ins completed ÷ trips that ended; check-ins turned off | Per trip | Whether the prompts help or annoy |
| Review sharing | Ratings shared as reviews ÷ ratings with notes; trips published ÷ trips reviewed (from the first wave) | Pilot and waves | Whether travelers become contributors |
| Traveler-sourced supply | Published traveler reviews and itineraries per city per week | Weekly | Whether content keeps up with testers (NFR-009) |

**Events:** `signin_completed`, `profile_path_chosen`, `profile_confirmed`, `trip_request_submitted`, `options_generated`, `trip_started` (sent on "Create itinerary"), `match_exposed` (only on a visible impression), `source_opened`, `item_swapped`, `place_added`, `place_removed`, `retained_snapshot`, `outbound_clicked`, `match_feedback`, `content_reported`, `content_withdrawn`, `checkin_sent`, `checkin_answered`, `visit_recorded`, `profile_suggestion_accepted`, `review_submitted`, `review_published`, `trip_published`. Each carries the event and schema version, server-derived actor and session, trip ID when relevant, request or command ID, content or assessment version, `occurred_at` and `is_internal`. None carries raw chat text, audio, exact budgets or private notes (PRD §11).

**Social events:** `activity_sharing_changed`, `activity_item_viewed`, `peer_pick_setting_changed`, `peer_picks_shown`, `partner_invited`, `partner_joined`, `partner_left`, `stop_comment_posted`, `question_submitted`, `question_answered`, `source_update_shown`, `source_update_accepted`, `message_request_sent`, `message_request_accepted`, `message_sent`, `user_blocked` and `push_opened`. They carry IDs and counts only, never message, comment or question text.

## 11. Risks, assumptions and decisions

### Risks

| Risk | Impact | Mitigation | Gate |
| --- | --- | --- | --- |
| Not enough permissioned content in the pilot city | Matching can't be shown honestly; H1 can't be tested | Founder track starts in S0; narrow the city or cohort; honest empty state | D-006 before slice 3 |
| Matching doesn't beat destination-only suggestions | The core bet fails | Hand-run relevance study in S0–S1, before most of the code exists | Study result |
| The interview misreads a must-have | Wrong or unsafe suggestions | Recap approval, interview-accuracy metric, eval cases for contradictions | Slice 2 exit |
| Model spend overruns | Cost | Pre-call caps, metering, kill switch | D-009 before slice 2 |
| Cross-user data exposure | Trust and legal harm | Isolation lands first (slice 1); two-user tests block release (NFR-001) | Every release |
| Model-written facts shown as real (v1's failure mode) | Travelers act on invented ratings, prices or places | Facts come only from the catalog or cited content; explanations reference stored evidence; anything estimated is labeled | NFR-004 in the release eval |
| Unwanted contact or harassment through messages or comments | Harm to travelers; app-store rejection | Message requests; only people who share activity and allow messages can be reached; block, report, filter, rate limits, 18+ confirmation; a named response owner; the `direct_messages` kill switch | Safety foundation (slice 7) lands before any contact feature |
| Named activity reveals where someone will be | Physical safety | Off by default per trip; preview before sharing; never dates or companions; "this week" granularity; instant removal; blocks hide activity | AC-REQ-018-02 in the release eval |
| Activity and inbox look empty with at most 20 travelers | The feature falls flat | Invite couples as pairs and cohorts in batches; honest empty states; team activity labeled as the team's; never seed fake activity | Pilot review |
| Social channels blur the H1 test | Can't tell whether matching helped | Lineage records each item's channel; the app records which items showed similar travelers; the relevance study runs by hand before that feature exists | Channel mix and travelers-like-you effect (§10) |
| Generated plans feel generic or miss the profile | Travelers don't add or keep plans | Per-item profile matches, one-tap swaps, a relevance study before the build, and swap data to tune the planner | Kept-item ratio and swap rate |
| Thin supply leaves short plans | The plan looks empty | The plan says how many days it could fill; recruit contributors to fill the gaps that swaps reveal | D-006 |
| "Travelers like you" exposes people | Privacy harm | Off by default and needs activity sharing too; display name only; no counts of people who didn't opt in; instant removal | AC-REQ-027-02 in the release eval |
| Check-in prompts feel like nagging | Notifications turned off, or the app deleted | At most one prompt per trip evening; off for the trip in one tap; skipping is fine; turn-off rate tracked | Check-in response (§10) |
| Fake or low-effort reviews | Travelers act on misleading reviews | Honest labels; moderation before publishing; rate limits; reporting; a note is required to share | NFR-010 |
| Private notes leak | Privacy harm | Notes stay private unless the traveler shares them; never in analytics, logs or the model | AC-REQ-028-02 in the release eval |
| MVP-1 grows substantially before the first invite | Learning starts later | Core loop (slices 1–6) first; each social feature behind its own kill switch; re-estimate after slice 1 | D-015 |
| Moderation load on the founder | Slow responses leave harmful content up | Named response owner and target time; pause switches for when nobody is available | D-021 before the first external invite |

### Assumptions (reversible)

- `A-001`: TestFlight and Google Play internal testing are enough for the pilot; both stores cap internal testing at 100 testers. The waves need TestFlight external testing, which goes through Apple's Beta App Review, and Google Play closed testing (§12).
- `A-002`: Operator-entered place facts (name, address, area, website, and regular opening days and hours with the date they were last checked) are enough for MVP-1; no Places API.
  - The "closed that day" clash flag (§4 step 5) uses these hours. A place without them shows "opening days not known" instead.
  - Hours were added in draft 9, after the CMBA review found the clash flag had no data.
- `A-003`: Each invited traveler plans one pilot-city trip within a 7-day window.
- `A-004`: Copying one contributor's whole itinerary is dropped. The generated plan replaces it, and source itineraries stay viewable for context. (This replaces draft 3's whole-itinerary shortcut.)
- `A-005`: A profile needs at least a pace, two interests and must-haves (which may be "none") before matching starts; everything else can stay unknown.
- `A-006`: Items per day follow pace, counting lunch and dinner: relaxed 3, moderate 4, packed 5. Swap data will tune this.
- `A-007`: Option choices save as a draft while the traveler picks. "Create itinerary" saves the itinerary to Trips, and every later change saves as it happens. Rebuilding an existing trip needs one tap on Keep. (This replaces draft 4's "Add to my trips" button.)

### Decisions needed

| ID | Decision | Recommended default | Resolved by | Blocks |
| --- | --- | --- | --- | --- |
| D-005 | This MVP-1 scope | Approve as written, or name the cuts to reverse | **Approved** as written (founder, 2026-09-23; draft 10) | All implementation |
| D-006 | Pilot city and content supply | The city where permissioned content is fastest to secure. Target 5 contributors, 15 itineraries and 30 reviews, with at least 3 distinct suitable itineraries per invited traveler (PRD §12). No city has been chosen; v1 used Rome as its example | Permission inventory | Slices 3 onward |
| D-007 | Sign-in method | One tap with Apple or Google, no codes or passwords (founder, 2026-09-23). No email fallback in the pilot; revisit if testers ask | Slice 1 two-device test | Slice 1 |
| D-008 | Text model provider | Run 8–12 fixture interviews and trip requests through 2–3 candidates; compare accuracy and cost | Eval results | Slices 2b and 5 |
| D-009 | Spend ceiling | Founder sets global daily and per-user daily caps | Founder, from available funds | Paid calls in slices 2b and 5 |
| D-010 | API hosting | A host with long-lived WebSockets; Railway is a candidate (v1 is configured to deploy there) | Deploying the S0.1 health endpoint | First deploy |
| D-011 | Chat framework for trip requests | A plain chat box plus one server-side structured-request endpoint. Adopt CopilotKit, with server-side tools only, if the assistant grows beyond requests and changes (v1 ran 19 tools in the browser, only 2 with confirmation) | S0.1 integration effort | Slice 5 |
| D-012 | Distribution accounts | Apple Developer Program and Google Play Console. Internal testing for the pilot; TestFlight external testing and Google Play closed testing for the waves. The same accounts supply push credentials | Accounts active | Slices 11 and 13 |
| D-013 | Hotel and flight preference questions | Defer until those categories launch | Evals show matching doesn't need them | — |
| D-014 | Thanks for contributors | Attribution in the app; any payment handled outside it | Recruiting response | D-006 |
| D-015 | Team capacity | Keep the slice order; re-estimate after slice 1. v1's business plan describes a solo founder with contractors, with AI doing research, drafting and code, while PRD §9's 14-week schedule assumes two engineers | Slice 1 actuals | Dates only |
| D-016 | Revenue model and prices | No pricing or payment work in MVP-1. Before any paid release, reconcile v1's September 21 prices and advisor-first revenue ranking with the PRD, including app-store billing rules | Founder decision after the pilot | Paid release only |
| D-017 | Who can be messaged | Only travelers who share activity; message requests are on by default for them, and anyone can turn messages off | Request acceptance and report rates | Slice 11 |
| D-018 | Push notification previews | Sender name only, never message or comment text | Tester feedback | Slice 11 |
| D-019 | Account deletion with shared data | The deleted traveler's messages show as deleted; their comments and activity are removed; their memberships end; a trip they owned passes to the partner | Deletion test (T24) | Slice 9 |
| D-020 | Real-time delivery | Supabase Realtime if S0.1 confirms it enforces row policies; otherwise polling | S0.1 check | Slice 11 |
| D-021 | Safety response owner and time | The founder answers reports within 24 hours during the pilot and pauses the affected feature when unavailable. The waves need D-026 | Founder commitment | First external invite |
| D-022 | People per shared trip | Two (the owner and one partner), matching the solo-and-couples segment | Pilot requests for bigger groups | Slice 9 |
| D-023 | How plans are built | A deterministic, versioned planner fills slots from ranked items, and the model only writes explanation wording (PRD D-002) | Planner eval cases and swap rates | Slice 5 |
| D-024 | Who appears as a similar traveler | Only people who share activity and turned on "show my picks", and contributors with public-taste consent; no anonymous counts in the pilot | Opt-in rate and tester feedback | Slice 10 |
| D-025 | Cities in the beta | Open one city at a time, the pilot city first, and each only after it passes NFR-009 | Coverage reports and waitlist demand per city | Wave 1 |
| D-026 | Moderation staffing | A named rota, the founder plus at least one trained helper, meeting NFR-010 before wave 1 | Report volume in the pilot | Wave 1 |
| D-027 | Anonymous counts | Add a separate opt-in, "count my picks anonymously", shown as "kept by N travelers with similar taste" only when N is 5 or more. Making it opt-out would mean relaxing the current opt-in rule | Opt-in rate in wave 1 | Wave 2 |
| D-028 | Who gets invited | People who say they're planning a trip to an open city within the next 8 weeks. Others wait on the waitlist, and metrics report planners separately | Waitlist answers; planner versus non-planner metrics | Wave 1 |
| D-029 | Messaging by wave | Planning features open to every wave. Direct messages open to a wave only after the previous wave met NFR-010 | Moderation metrics per wave | Each wave |
| D-030 | Check-in timing | 8 pm in the trip city's time zone on each trip day, and the after-trip check-in the next morning. Without dates: "I'm back" plus one reminder 14 days after saving | Response and turn-off rates | Slice 12 |
| D-031 | Review labels | "From an XPMatch trip" for ratings made in a check-in on a trip saved in XPMatch; "Self-reported" for everything else. Nothing is called "verified" until there's real evidence (PRD REQ-010) | Whether testers understand the labels | Slice 12 |
| D-032 | What can be shared as a review | A rating with at least a short note; ratings without notes stay private | Share rate and review usefulness | Slice 12 |
| D-033 | Default trip length | 3 days when the chat request doesn't say, stated in the plan and changeable by typing | Tester requests | Slice 5 |
| D-034 | Survey length | Five one-tap screens (pace, interests, food, budget, must-haves), each skippable, with a progress bar | Completion rate and time (§10) | Slice 2 |
| D-035 | Voice in the pilot | Voice ships in the pilot if the S0.2 device test passes on both platforms. Otherwise the pilot starts with the survey only, and voice follows in MVP-1.1 | S0.2 results | Slice 2b |
| D-036 | How options are laid out | Grouped by day and time of day, with one swipeable card per slot. "Create itinerary" then orders each day by time and area. The alternative is grouping by type (eat, do, stay) and assigning days when the itinerary is created | Tester feedback and the options-to-itinerary rate | Slice 5 |
| D-037 | UI kit | React Native Reusables (shadcn/ui's React Native counterpart, MIT) on the free Uniwind edition, with Expo SDK 57 and Expo Router 57. Sheets from Expo Router's form sheet or `@gorhom/bottom-sheet`. Fallback: HeroUI Native. shadcn/ui itself only for web surfaces such as the landing page (UI plan §9) | S0.1 check: every UI plan §6 component on both platforms, accents with dark mode, no-flash start-up | S0.1 component work |
| D-038 | Canonical palette | The PRD's tokens are the default Pine theme; v1's "Serene Resort" values are retired; dark-mode values as in the UI plan §4.2 | Founder approval | — (S0.1 proceeds on the default) |
| D-039 | Appearance options | System, Light or Dark plus five accents (Pine, Ocean, Terracotta, Plum, Graphite), every pair contrast-checked; no free color picker; Android dynamic color later at most | Founder's pick; accent use in the pilot | Slice 2c |
| D-040 | Place imagery in MVP-1 | Text cards with a category icon, area and time of day. A contributor's photos only where their permission covers photos. No stock, generated or map-provider photos (A-002) | Permission inventory (D-006) | Slice 4 visuals only |
| D-041 | Taste vocabulary | Taxonomy 0.1: the 15 dimensions and values in the data shape §3.2, used by the survey, voice interview, profile, contributor tags, matching and card lines | **Approved** (founder, 2026-09-23). Revisit with the hand-run relevance study (H1) | S0.3 collection, slices 2 and 3 |
| D-042 | A must-have with unknown evidence | Strict (left out) for dietary needs and step-free access; kept with a "? not known" line for crowds, atmosphere, bookings and budget | **Approved** (founder, 2026-09-23). Revisit with tester feedback and "not enough" rates | Slice 4 |
| D-043 | Contributors' spending | Matching uses venue price facts and the contributor's range, but only venue price bands are ever shown. A contributor's own spending is never published | **Approved** (founder, 2026-09-23) | S0.3 template |
| D-044 | Slots per pace | Relaxed: lunch, afternoon, dinner. Moderate: + morning. Packed: + evening. The day-start and dinner-time preferences set the time windows (A-006) | **Approved** (founder, 2026-09-23). Tune with planner evaluations and swipe rates | Slice 5 |
| D-045 | Sensitive preferences | Dietary needs are optional, sensitive, used only by the server's filter, never sent to the model, analytics or logs, and their voice excerpts aren't kept. Allergies aren't collected in MVP-1. Explicit consent before saving; the privacy policy says so | **Approved** (founder, 2026-09-23). A privacy review is still due before the first external invite | Slice 2 |

## 12. Scaling to 1,000 beta testers

Planning assumption (founder, 2026-09-23): the beta grows to 1,000 testers. The pilot still starts with the team, then 5, then 20 travelers (§2). This section covers what the design needs so the same app can grow to 1,000 in gated waves.

For this stack, 1,000 testers is a small load. What doesn't scale is the work done by hand in the pilot: entering content, relaying questions, handling reports and managing testers. So the design keeps the PRD's architecture, builds cheap scale choices in from day one, and replaces the hand-run jobs with tools before the waves grow. Traveler check-ins and reviews (§4) are the main way content grows with the testers.

### Capacity

| Measure | Planning assumption (replace with pilot data) | Design target |
| --- | --- | --- |
| Testers | 1,000, invited in waves | — |
| Weekly active | About 30%, roughly 300 people | — |
| Peak concurrent users | About 50 | The main journey passes a load test at 150 concurrent users (NFR-008) |
| Plan builds, swaps and trip reads | Bursts at peak | p95 first plan within 5 seconds and p95 trip read within 1 second (PRD NFR-003) |

At that size, one Postgres database on Supabase and one stateless API, with a second instance for redundancy, are enough. Background work runs in one worker process that reads a job table in Postgres, which serves as the PRD's outbox. That work covers push notifications, account deletion, cached explanation wording and coverage reports. No cache server, queue service or extra services until a measured need (PRD §5).

### Built in from day one (cheap now, costly to add later)

| Choice | Why it matters at 1,000 | Lands in |
| --- | --- | --- |
| A city on every trip, item, itinerary, invite and metric | Cities can open one at a time without a migration, and supply and metrics are per city | S0.1 |
| No invite codes. The store testing programs control who can install: a TestFlight link with a tester cap per wave, and Google Play closed testing. A traveler's wave comes from their sign-up date and their city from their first request, with a waitlist for cities that aren't open | Waves stay controlled with no extra sign-up step, and metrics split by cohort | Slice 1 |
| Apple and Google sign-in instead of email codes | No email delivery to scale, and no codes to type | Slice 1 |
| Crash and error monitoring; over-the-air updates (Expo EAS Update); a minimum-version check | Fixes reach 1,000 testers without new store builds, and broken builds can be blocked | S0.1 |
| Match chips ("seafood ✓") drawn from scoring results, not the model; model sentences cached by item, matched components and model version | Model cost stays roughly flat as testers grow | Slices 4–5 |
| Assessments stored only for items shown; diagnostic snapshots expire after 30 days (PRD §7) | Matching tables don't grow with every plan build | Slice 4 |
| Cursor pagination on every list; an index on every column a row policy filters on | Activity, Inbox, conversations and Explore stay fast as data grows | Every slice |
| Real-time connections only while a conversation or shared board is open; push and refresh elsewhere | Keeps concurrent connections low | Slice 11 |
| Per-user and per-device rate limits on invites, questions, message requests, messages and plan builds | Controls abuse and cost | Slice 7 |
| Feature flags per cohort, on top of the kill switches | A feature can open to one wave at a time | Slice 13 |

### Needed before inviting beyond the 20-person pilot

These replace the pilot's hand-run jobs:

| Capability | Why | Covers |
| --- | --- | --- |
| Contributor self-serve submission with a preview, rights and an operator review queue, including travelers publishing trips they took and adding past trips | 1,000 testers need far more content than the founder can enter by hand, and traveler reviews and trips are the main way supply grows | REQ-005 (submission path), T31 |
| Contributors answer questions in the app | Relaying every question by hand doesn't scale | REQ-021 |
| A moderation console with a report queue, auto-hide once several people report the same item, account restrictions and an audit log | Scripts don't scale to 1,000 people | REQ-023, NFR-010 |
| Contact anti-abuse: message requests only from accounts with an approved profile that are at least a day old; links blocked in message requests; senders throttled after reports | Travel apps attract scams | REQ-022, REQ-023 |
| A coverage report per city: build plans for a fixed set of fixture profiles and check full days, must-have compliance and swap depth | A city opens only when it can serve its testers | NFR-009 |
| TestFlight external testing (through Apple's Beta App Review) and Google Play closed testing | Both stores cap internal testing at 100 testers | A-001, D-012 |
| In-app feedback and bug reports, an FAQ and a support address | 1,000 testers will need help | — |
| A load test at 3× the assumed peak, plus dashboards with alerts on latency, errors and spend | Finds limits before testers do | NFR-008 |
| Point-in-time database recovery and a restore drill | More real data at stake | PRD NFR-002 |
| Hosting region, privacy policy and data-access requests settled (PRD §14) | More personal data, possibly from the EU or UK | REQ-014 |

### Waves and gates

Nothing expands by calendar (PRD §13). Each wave opens only after the previous one met its gates. Features open per wave through flags, so planning can reach a wave before messaging does (D-029).

| Wave | Testers | Opens when (proposed thresholds) |
| --- | --- | --- |
| Pilot | Team, then 5, then 20 | Slices 1–13 pass (§9) |
| Wave 1 | 100 | The work above is done; the relevance study passed (at least 7 of 10); no cross-user exposure (PRD NFR-001); reports handled within NFR-010 |
| Wave 2 | 300 | Wave 1 had crash-free sessions of at least 99%, p95 latency within PRD NFR-003, model cost per started trip under USD 3, and every open city passing NFR-009 |
| Wave 3 | 1,000 | Wave 2 met the same gates, and moderation kept to NFR-010 at the higher volume |

### Cost

PRD §11's hypothesis is about USD 1 of variable spend per started trip, with anything above USD 3 investigated, and voice counted inside that figure. If each of 1,000 testers starts one trip, that's about USD 1,000 of variable spend. Deterministic chips and cached wording should keep it lower. Database, API hosting, email, push and builds add a smaller fixed monthly cost; price them from current plans when setting D-009. The global daily cap rises with each wave.

### Proposed quality requirements

- **NFR-008, capacity:** at 3× the assumed peak (150 concurrent users), a scripted load test of the main journey meets PRD NFR-003's latency targets with an error rate under 1%.
- **NFR-009, city supply gate:** a city opens to invites only when its coverage report fills every day for at least 90% of fixture profiles, with no must-have violations and at least three swap alternatives per slot.
- **NFR-010, moderation response:** reports are triaged within 24 hours, and safety-critical ones (threats, scams, anything involving minors) within 4 hours. Content reported by three different people is hidden until reviewed.

These are proposed thresholds, not measurements; pilot data should confirm or replace them (PRD §10).

### Pilot defaults this changes

- `A-001` (internal testing) holds for the pilot only.
- D-021 (the founder answers reports) holds for the pilot only; the waves need D-026.
- The operator-run contributor journey and question relay (§4) hold for the pilot only. The work above replaces them before wave 1.

## 13. Changes from source (v1.1 → v1.2)

- **Clarified:** the release type (unpaid, controlled pilot); the first working transaction (§8); operator-run supply for the pilot; the operational basics slice 13 must prove (backups with a tested restore, error monitoring, privacy and terms pages).
- **Moved to MVP-1.1:** the in-app map (REQ-007 map part) and offline reading (REQ-015 offline part). The voice interview (REQ-004) moved there in draft 1 and came back into the pilot in draft 7, provided the S0.2 spike passes.
- **Moved later:** guest browsing (PRD D-004, browse part), save and compare (REQ-009), in-app contributor submission (REQ-005 submission path), AI-proposed rearrangements (REQ-003 bulk proposals), hotel and flight interview questions (REQ-002).
- **Simplified:** import scripts instead of an internal moderation app; plans built by a deterministic planner with manual swaps, instead of AI-proposed rearrangements; daily budget counters instead of the full reservation system; no outbox until an asynchronous consumer exists; "Open in Maps" links instead of an embedded map.
- **Added:** the plan activation, kept-item ratio, swipe-rate and options-to-itinerary metrics; the `options_generated`, `item_swapped`, `match_feedback` and `content_reported` events; the relevance study moved to S0–S1 as a hand-run test; D-016, which surfaces the conflict between v1's recorded prices and the PRD's "undecided".
- **Added by founder decision (2026-09-23), in the first pilot:** contributor itinerary updates (REQ-017), opt-in named trip activity (REQ-018), trip partners (REQ-019) with stop comments (REQ-020), ask-a-contributor Q&A (REQ-021), direct messages (REQ-022), the safety controls they need (REQ-023) and notifications (REQ-024). This brings forward PRD v1.1's later timing for feeds and collaborative editing, and moves report and block (REQ-010) back into MVP-1.
- **Changed by founder decision (2026-09-23):**
  - Every traveler creates a profile once and must have an approved profile before any matching (`AC-REQ-002-03`).
  - Matching ranks the items in travelers' itineraries against that profile (`AC-REQ-006-03`).
  - The app builds each traveler a complete itinerary from those items (REQ-025). Every item shows how it matches the profile, any item can be swapped in one tap (REQ-026), and items show similar travelers who picked them, with consent (REQ-027).
  - "Add to my trips" saved the plan (A-007); draft 7 replaced it with automatic saving. Copying one contributor's whole itinerary is dropped (A-004). The similar-taste labels that draft 2 listed as later move into MVP-1.
- **Unchanged:** requirement IDs, trust and privacy rules, stack direction (Expo, TypeScript API, Supabase), rollout stages, kill switches and cost hypotheses.
- **Added for the 1,000-tester beta (founder planning assumption, 2026-09-23):** gated waves of 100, 300 and 1,000 testers after the pilot, the day-one scale choices, and NFR-008 to NFR-010 (§12). Contributor self-serve submission and in-app answers move up from later to before the first wave.
- **Added by founder decision (2026-09-23), reviews:**
  - trip check-ins during and after the trip, with private ratings (REQ-028);
  - sharing ratings as labeled, moderated reviews in the pilot (AC-REQ-010-03), which brings REQ-010's review writing into the pilot;
  - travelers publishing whole trips and adding past trips before the first wave (REQ-005 submission path).
- **Changed by founder decision (2026-09-23), draft 7:**
  - one-tap sign-in with Apple or Google, with no codes or passwords (AC-REQ-001-03), replacing email codes and invite codes;
  - profiles by voice interview or survey (AC-REQ-004-03), replacing the text interview;
  - plans requested by typing in a chat box (REQ-029), replacing the trip-length picker;
  - swipes or arrow taps to change items, replacing the swap sheet (REQ-026);
  - trips saved automatically, replacing "Add to my trips" (A-007).
- **Changed by founder decision (2026-09-23), draft 8:** the chat answers a request with options the traveler swipes or taps arrows through, changes by typing, and can undo. Only then does "Create itinerary" turn the picks into the itinerary, where the same edits keep working (REQ-025, REQ-026, REQ-029, D-036).
- **Added by founder decision (2026-09-23), draft 9:** travelers can change the app's colors: System, Light or Dark and five contrast-checked accents (REQ-030, slice 2c, T34). The UI plan (`docs/design/XPMatch-UI-plan.md`) keeps v1's design language, uses the PRD's colors and proposes the shadcn-style React Native kit. Its open choices are D-037 to D-040.
  - **Also corrected:** the proposed product wording (§2) no longer says plans come from "travelers like you".
  - **Also corrected:** operator-entered places now carry opening days and hours, so "closed that day" clashes have data (A-002, §7, T5).
- **Added in draft 10 (2026-09-23):** the data shape.
  - `docs/design/XPMatch-data-shape.md`: taxonomy 0.1, field-level shapes, matching and planner rules v0, and the option card contract.
  - The contributor capture template for S0.3.
  - Decisions D-041 to D-045.
- **Approved on 2026-09-23:** this revision as a whole (D-005, draft 10), and D-041 to D-045.
- **Unresolved:** D-006 to D-040 (§15).

## 14. Completion check

- Every build-now item supports a traveler journey step (§4), including the social journeys the founder added, or a release requirement for real users: isolation, deletion, spend caps, safety controls, or the telemetry the pilot is judged by.
- Nothing is simulated:
  - There are no payments, and links say "check price and availability".
  - Demand isn't fabricated. There is only permissioned real content, honest empty states, and real travelers in the relevance study. No activity, messages or questions are seeded, and team activity is labeled as the team's.
  - Access control isn't left for later. Isolation lands in slice 1, before any real data. Each social feature's access rules land with that feature, after the safety foundation in slice 7.
- **Scope:** the founder's social and review additions more than double what must work before the first invite. The core loop still comes first (slices 1–6), and each social feature has its own kill switch.
- **Demo versus production:** MVP-1 is production-grade for the 20-person pilot, and the §12 work readies it for waves up to 1,000 testers. It is not store-ready; store review, privacy disclosures and commercial decisions come before any public release (PRD §10).

## 15. Readiness and next action

**Readiness: READY WITH ASSUMPTIONS.** The founder approved this revision on 2026-09-23 (D-005), so S0.1 and slices 1–2 can start. D-007, D-008, D-010, D-011 and D-017 to D-040 have working defaults, and D-041 to D-045 are approved. D-009 needs the founder's cap amounts before slices 2b and 5 make paid model and voice calls. Slices 3 onward need D-006, and the first external invite needs D-021 confirmed. Waves beyond the pilot need the §12 work, NFR-008 to NFR-010, and D-025 to D-029 confirmed.

**Next action:** the factory's next task is S0.1 (project shell) on its own branch, with CI and device evidence. Any paid provider, account or credential it needs waits for the founder's explicit authorization (AGENTS.md).

**Founder, before the slices that need them:** the pilot city and content permissions (D-006, slices 3 onward), the spend caps (D-009, paid calls in slices 2b and 5), and who answers safety reports (D-021, the first external invite).
