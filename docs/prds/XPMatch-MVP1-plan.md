# XPMatch MVP-1 plan (PRD revision v1.2, proposed)

| Field | Value |
| --- | --- |
| Source | `docs/prds/XPMatch-Build-PRD-v1.1.md` (founder's PRD v1.1, 2026-09-23); read-only review of `TayoAki/XPMatchv1`; founder answers of 2026-09-23 |
| Method | `mobile-plan-mvp` for scope; `software-factory` for intake, readiness and delivery slices |
| Readiness | **READY WITH ASSUMPTIONS**: S0 and slices 1–2 can start once this revision is approved. Slice 2's paid model calls also need D-009 (spend ceiling), slices 3 onward need D-006 (pilot city and permissioned content), and the first external invite needs D-021 (who answers safety reports) |
| Approval | **Pending**: founder |
| Revision note | Draft 2 (2026-09-23) adds the social features the founder chose for the first pilot: contributor updates, trip partners with comments, an opt-in named activity feed, ask-a-contributor Q&A and direct messages |

PRD v1.1 stays the base document. This revision changes scope and order only; everything not mentioned here (trust rules, data conventions, quality thresholds, rollout, rollback) carries over unchanged. Requirement IDs are the PRD's own.

## 1. Decision summary

- MVP-1 tests the PRD's core bet (H1: relevant human content beats destination-only suggestions) with the fewest moving parts. The loop is: text interview → approved taste → real, permissioned itineraries and reviews with honest reasons → adapt one into a private trip board → partner or official link. It covers one city, invited travelers, and iOS plus Android.
- Compared with v1.1, the voice interview, the in-app map and offline reading move to MVP-1.1, right after the first 5 invited travelers. Compare, in-app contributor publishing, guest browsing and AI-proposed rearrangements move later. No trust, privacy or cost rule is relaxed.
- The 10-traveler relevance study moves up to S0–S1 and runs by hand, so H1 is tested before most of the code exists.
- Several decisions recorded in v1's docs are retired because PRD v1.1 replaced them: web-first, selling the service first, fixed prices, match percentages, and a multi-city beta (§3). Pricing stays open (D-016).
- The first pilot also carries the social features the founder chose on 2026-09-23: contributor itinerary updates, ask-a-contributor Q&A, trip partners with stop comments, an opt-in named activity feed, and direct messages (§4, §8). They add shared access, public profiles, messaging, push notifications and moderation duties, so the first invites move later. Trips stay private unless their owner turns sharing on, travel dates are never shown to other travelers, and block, report and message requests land before any traveler can reach another.
- Founder input needed: approve this revision (D-005). Choose the pilot city and start collecting content permissions now (D-006); nothing after slice 2 can be shown honestly without them. Before the first external invite, name who answers safety reports and how fast (D-021).

## 2. Product, users and constraints

**Promise (unchanged):** Tell XPMatch how you like to travel. It helps you choose relevant travelers' itineraries, contextual reviews and places, explains the tradeoffs, and turns your choices into a private trip board.

- **First customer:** a solo traveler or couple planning a 2–4 day leisure trip to the pilot city, invited into the pilot.
- **Job to be done:** "Show me what people who travel like me actually did there, tell me honestly what won't suit me, and give me a plan I can use."
- **First measurable outcome:** a new invited traveler keeps at least one place on a trip board within 24 hours of the first planning session (PRD §11), and most kept places come from matched traveler content (a hypothesis, measured as matched-content share in §10).
- **Release type:** an unpaid, controlled pilot. It isn't a demo: real people put private data in, so sign-in, data isolation, deletion and spend caps must be production-grade. It isn't a public launch either: no store listing, no payments, and at most 20 invited travelers (team → 5 → up to 20, PRD §13).

**Confirmed constraints (supplied):**

- Native iOS and Android with React Native and Expo; PostgreSQL on Supabase (PRD D-001, §5).
- No booking, payments, subscriptions or creator payouts in the pilot (PRD §3).
- One city; solo travelers and couples; 2–4 day leisure trips (PRD §2).
- Trust rules: deterministic authorization and ranking, evidence-backed explanations, no fabricated peers, commission never affects ranking (PRD D-002, §5).
- v2 is a fresh codebase; v1 is a product reference only (founder, 2026-09-23).
- The repository is public, and the PRD and plans may be public (founder, 2026-09-23).
- The first pilot includes contributor itinerary updates, trip partners with stop comments, an opt-in named activity feed, ask-a-contributor Q&A and direct messages (founder, 2026-09-23). This brings forward PRD v1.1's later timing for feeds and collaborative editing (PRD §3). Activity sharing is an explicit per-trip opt-in. That keeps it within the PRD's rules that nothing is published implicitly (PRD §4) and that there is no automatic social posting (PRD §3).

## 3. What v1 teaches (repository evidence)

v1 is a Next.js web prototype. Its code (commit `28c66b6`) and docs were reviewed read-only on 2026-09-23. Its code is not carried over; these lessons are.

- **Onboarding length is the first known drop-off.** Most production traffic was iPhone Safari. The only outside sign-up recorded created an account, saw the six-step onboarding quiz and left (v1 `docs/MOBILE_PLAN.md`). This is one data point, not a trend, but it is the only external evidence there is. MVP-1 keeps the interview short, allows skipping straight to an editable recap, and shows matches right after approval.
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

Contributors are not paid in-app during the pilot; any thank-you is handled outside the app (D-014). Self-serve submission, preview and a moderation queue come later.

### Traveler (the value journey)

1. Install from the invite and sign in with an email code.
2. A short text interview asks one useful question at a time; the traveler can skip at any point.
3. Recap: the traveler corrects values, marks must-haves, and chooses "remember" or "this trip only", then approves.
4. Trip context: the pilot city is fixed. The traveler sets dates (or "not sure yet"), who's going and the purpose.
5. Discover: matched itineraries and reviews, each showing why it fits, its tradeoffs and its unknowns. Blocked items say why.
6. Open an itinerary: its days and stops, the contributor's context and notes, and reviews of those places.
7. Adapt: a preview shows what will be copied and what's flagged (expired dated events, must-have conflicts); the traveler accepts.
8. Trip board: remove stops, move them up or down, and add places from matched content. It saves automatically and looks the same after relaunch or on a second device.
9. On a stop, "Check price and availability" or "Official site" opens that page, and the click is recorded.
10. Quick feedback: "useful / not useful" on matches, or a report about a source.

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
2. Each place they keep then appears in Discover's Activity tab and on the place itself, for example "Maya kept this".
3. Removing the stop, turning sharing off, blocking someone or deleting the account takes the item down.

**Contributor updates**

1. The operator publishes a new revision of C's itinerary that adds a stop.
2. Anyone viewing the itinerary sees the stop marked new, and the update appears in Activity.
3. Travelers who adapted the itinerary see "1 new stop" on their board, preview it and decide whether to add it. Nothing changes by itself.

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
| Sign-in and isolation | One method (D-007); owner-only data; second-device restore; sign-out clears local data | Real private data | REQ-001 |
| Account deletion | In-app delete that revokes access and removes owned rows, with a deletion record | Real users | REQ-014 (subset) |
| Text interview | Chat asking 3–5 short questions (v1's evidence argues for fewer); extracts typed candidates linked to the user's own answers; skip to a manual recap; manual recap if the model fails | Journey step 2; baseline for voice | REQ-002, REQ-003 (subset) |
| Taste recap and profile | Editable recap covering general, dining and experience preferences, must-haves and spend ranges. Approval creates an immutable version. Trip-only overrides | Journey step 3 | REQ-002 |
| Trip context | City fixed to the pilot; optional dates; party; purpose | Journey step 4 | REQ-002 |
| Content import and rights | Operator import script with validation, permission records, publish, withdraw and an audit log; operator-entered pilot-city place catalog | Supply without fake content | REQ-005 |
| Matching and explanations | Eligibility filter, then versioned weighted components. Content fit is separate from author similarity, which only appears with contributor consent. Cited reasons, tradeoffs and unknowns; honest empty state | The core bet (H1) | REQ-006 |
| Discover and detail | Matched list, itinerary detail, reviews with context; an "Open in Maps" link per place | Journey steps 5–6 | REQ-007 (list) |
| Adapt and board | Copy with lineage plus constraint flags, then preview and accept. Remove, move up/down, add. Revisions and conflict handling | Journey steps 7–8 | REQ-008 |
| Outbound links | Allowlisted redirect; one logical click event; never shown as a booking | Journey step 9; revenue signal | REQ-011 (subset) |
| Feedback and reports | "Useful / not useful" on matches; "report a problem" goes to an operator list | Trust metric | REQ-010 (report), REQ-012 |
| Telemetry | Authoritative events from committed actions; internal accounts flagged | Measuring the pilot | REQ-012 |
| Spend caps and kill switches | Per-user and global daily model budgets checked before each call; metered usage; switches for model features, matching and outbound links | Real money | REQ-013 |
| Accessibility basics | Screen-reader labels, large text, button alternatives to drag | Main journey on both platforms | REQ-015 (subset) |
| Safety foundation | Display names; block and report on every piece of user content; a text filter; the operator queue with a response owner; community guidelines and contact details; 18+ confirmation; rate limits | Required before travelers can see or reach each other; app-store rules for user content | REQ-023, REQ-010 (report and block) |
| Contributor updates | "New" markers on updated itineraries, update previews on adapted trips, updates in Activity | Founder addition; keeps human content visibly current | REQ-017 |
| Ask-a-contributor Q&A | Question form, operator queue, published answers, an "answered" notice | Founder addition; answers resolve unknowns for every traveler | REQ-021 |
| Trip partners and comments | Invite link, shared board with "added by" and "what's changed", stop comments, remove and leave | Founder addition; couples are half the segment | REQ-019, REQ-020 |
| Opt-in trip activity | Per-trip sharing with a preview, the Activity tab, place badges, removal | Founder addition; lets travelers see what others are adding | REQ-018 |
| Direct messages | Message requests, inbox, text messages, an allow-messages setting, block and report in conversations | Founder addition | REQ-022 |
| Notifications | In-app notices and unread counts; push notifications that never include message text | Messages, answers, partner edits and updates need to reach people | REQ-024 |

### Next (MVP-1.1, before inviting more than the first 5 travelers)

| Capability | Condition | REQ |
| --- | --- | --- |
| Voice interview (Gemini Live, behind `voice_interview`) | S0.2 spike passes on physical devices | REQ-004 |
| In-app map with card-to-pin sync and list equivalents | Provider terms and keys verified | REQ-007 |
| Offline reading of saved trips, with age labels | Pilot trips happen during the cohort window | REQ-015 |

### Later (each needs its own approval)

- Contributor self-serve submission, preview and submission review (REQ-005 submission path).
- Shortlist and compare up to three with price bases (REQ-009).
- AI-proposed rearrangements with an exact preview (REQ-003 bulk proposals).
- Live offer refresh, then hotel, flight and experience providers (REQ-011 refresh, REQ-016).
- Guest browsing without an account (PRD D-004).
- Hotel and flight preference questions (D-013).
- Numeric match scores, trips with more than two people and group preference matching, the web companion, more cities, creator payouts and subscriptions (PRD §3 expansion gates).
- Similar-taste labels on activity, which need peer-matching consent from both people.
- Photos or attachments in messages and comments; contributors answering questions inside the app.

## 6. Screens and states

Bottom navigation: Discover, Trips, Inbox, Profile. Inbox is new, for messages, requests, answers and updates; the PRD had three tabs. Colors: pine `#174D42`, ivory `#F7F8F5`, white surfaces and dark `#182B28` text (PRD §4).

| Screen | Main decision | States that change the experience |
| --- | --- | --- |
| Sign in | Get in with an email code | Code sent; wrong or expired code; too many attempts; offline |
| Interview | Answer one question or skip | Thinking; model error (retry or skip to recap); daily budget reached (manual recap) |
| Taste recap | Correct and approve; remember or this trip only | Uncertain values flagged; unknowns stay unknown; newer version approved on another device (reload); saving |
| Trip context | Dates, party, purpose, overrides | Invalid dates; dates unknown; currency and price basis shown |
| Discover | Which itinerary or review to open | Loading; partial failure; no suitable content (honest empty state); blocked by a must-have (reason shown) |
| Itinerary or review detail | Does this fit me, and what's the catch? | Reasons, tradeoffs, unknowns; author similarity hidden without consent; source withdrawn; dated event expired |
| Adaptation preview | Accept or reject the copy | Flags per stop; stale preview (source changed or withdrawn) needs a new preview |
| Trip board | Keep, move, remove or add | Empty; saving; conflict (load the latest); stop whose source was withdrawn; unknown travel times left unknown |
| Add a place | Pick from matched places | Nothing suitable |
| Trips | Resume a trip | No trips yet; network failure |
| Profile and privacy | Update taste, delete account, sign out | Edits create a new version; deletion in progress or failed with retry |
| Report a problem | Say what's wrong with a source | Submitted; offline |
| Activity (a tab in Discover; matches stay the default) | Which shared place or update to look at | Empty ("No shared activity yet"); item removed since loading; blocked people hidden |
| Traveler profile | Who is this, and can I message them? | Messages off; blocked; account deleted |
| Share activity (on a trip) | Turn sharing on after seeing exactly what others will see | Preview; on; off, which removes shared items |
| Trip partners | Invite, accept, remove or leave | Invite expired or used; already a member; removed; owner deleted their account |
| Stop comments | Discuss a stop with a partner | Empty; posting; blocked by the filter; deleted; offline |
| Ask a question | Send a question about an itinerary | Submitted; answered; not published; rate-limited |
| Inbox | Open a conversation, request or notice | Empty; requests waiting; unread counts; offline |
| Conversation | Read and send messages | Request pending; accepted; blocked; reported; blocked by the filter; rate-limited; other person deleted their account |
| Report or block | Report content or a person, or block them | Submitted; already blocked; unblock from Profile |
| Community guidelines and contact | What's allowed and how to reach the team | — |

Activity badges ("Maya kept this") appear in the Activity tab and on place detail, not on match cards, so the matching test stays readable (§10).

## 7. Data and access boundaries

**Entities** (subset of PRD §5 groups M01–M08; names follow the PRD):

- Identity and profile (M01): `app_user` bound to the auth provider's verified subject, `private_profile`, `private_profile_version` (immutable once approved), `preference_value`, `spend_range` (minor units, currency, basis), `preference_evidence`.
- Interview and commands (M02 subset): interview `conversation` and messages, and `mutation_receipt` for idempotency. No outbox until an asynchronous consumer exists.
- Content and catalog (M03): `place` (operator-entered: name, area, category, coordinates, official or partner URL), the contributor's public profile and consented public taste, `community_content`, `content_revision`, `content_permission`, `published_itinerary`/`day`/`stop`, and `review` with context.
- Matching (M04): trip context snapshot, `match_model_version`, `match_run`, `match_assessment`, and `match_component` with evidence and explanation; `feedback_event`.
- Trips (M05): `trip`, `trip_revision`, `trip_day`, `trip_stop`, `trip_source` (lineage, including the channel each stop came from: matched content, activity, partner, contributor update or manual).
- Operations (M07/M08 subset): `partner_handoff`, `usage_event`, budget counters, `decision_event`, `content_report`, `moderation_action`, deletion record.
- Social (founder additions):
  - a traveler `public_profile` (display name and allow-messages setting; no photo);
  - `trip_share_setting` (off by default);
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
| Traveler | Own profile, versions, trips and receipts; published content with a current permission | Own profile, trips, feedback and reports | API authorization plus row policies |
| Trip partner | The shared trip: its stops, comments, change history and the other member's display name | Stops and comments on that trip | Row policies on current membership |
| Other travelers | Display names, shared activity, published Q&A, and conversations they take part in; nothing from anyone who blocked them | Message requests (only to people who allow them), reports, blocks | API authorization plus row policies; blocks apply everywhere |
| Operator (founder) | Content, permissions, reports, and the reported items attached to each report | Import, publish, withdraw, publish answers, hide content, suspend accounts | Service scripts with an audit log; operator tools never read private profiles, trips or unreported conversations |
| Model | Only what the API passes for one request: a profile summary and candidate content. Never messages, comments, questions or activity | Nothing directly; returns schema-validated output that the API checks | API boundary; no database credentials |

**External services:**

| Service | Used for | Note |
| --- | --- | --- |
| Supabase | Auth, Postgres, row policies | Separate development and production projects |
| Text model provider | Interview extraction, explanation wording | Chosen in S0 (D-008); metered and capped |
| Expo EAS | Builds and internal distribution | Needs Apple and Google developer accounts (D-012) |
| API host | `services/api` | Must support long-lived WebSockets later for voice (D-010) |
| Push notifications | Messages, requests, answers, partner edits, updates | Expo's push service with APNs and FCM credentials (D-012); previews never include message text (D-018) |
| Real-time delivery | Messages and shared boards | Supabase Realtime is the candidate; confirm in S0.1 that it enforces row policies, with polling as the fallback (D-020) |

Not in MVP-1: the Google Maps SDK or Places API (MVP-1.1), Gemini Live (MVP-1.1), partner APIs. Place facts are operator-entered, which avoids provider retention limits.

## 8. First working transaction: acceptance

Scenario: contributor C's 3-day itinerary for the pilot city and two of C's reviews are imported with a permission record. T and U are invited travelers. Each check maps to PRD v1.1 criteria.

| # | Observable result | PRD criteria | Evidence |
| --- | --- | --- | --- |
| T1 | C's content can be published only with a current permission record, and appears in matching once published. | AC-REQ-005-01 | Import tests; public projection check |
| T2 | T answers the interview, corrects one recap value and approves: exactly one approved version exists, and a retried approval returns the same version. | AC-REQ-002-01, AC-REQ-002-02 | Transaction tests; device run |
| T3 | For T's 3-day trip with a must-have, Discover shows C's itinerary with at least one cited reason, a tradeoff (or "no evidenced tradeoff") and its unknowns. Items failing the must-have show as blocked or needs-check, never as fits. | AC-REQ-006-01, AC-REQ-006-02 | Deterministic ranking tests; eval cases |
| T4 | Without C's public-taste consent, no author-similarity claim appears. | AC-REQ-006-02 | Permission test |
| T5 | Accepting the preview creates a private trip with C's stops and lineage; flagged stops were shown before acceptance. | AC-REQ-008-01, AC-REQ-008-02 | Transaction tests; device run |
| T6 | After T removes one stop, moves another, force-quits and signs in on a second device, both devices show the same latest revision. Two conflicting edits produce a conflict, not a silent overwrite. | AC-REQ-008-01, AC-REQ-008-02, AC-REQ-001-01 | Concurrency tests; two-device run |
| T7 | "Check price and availability" opens the allowlisted page and records exactly one outbound event. A tampered URL is refused, and nothing says "booked". | AC-REQ-011-01, AC-REQ-011-02 | Redirect tests; device run |
| T8 | U requesting T's profile or trip by ID is denied by both the API and row policies. | AC-REQ-001-02, NFR-001 | Two-user negative tests |
| T9 | After C withdraws, C's itinerary leaves T's Discover immediately. T's trip keeps T's own edits and shows C's stops as "source withdrawn", without C's notes. | AC-REQ-005-02 | Withdrawal fixture; device check |
| T10 | When T's daily model budget is used up, the interview offers the manual recap and the board keeps working. | AC-REQ-013-01, AC-REQ-013-02 | Forced-budget test |
| T11 | After the scripted journey, each authoritative event appears once per logical action, and internal accounts are flagged. | AC-REQ-012-01, AC-REQ-012-02 | Event reconciliation script |
| T12 | After T deletes the account, T can't sign in and T's rows are gone; the deletion is recorded. | AC-REQ-014-01 (subset) | Deletion test |
| T13 | T completes T2–T7 with VoiceOver and with TalkBack at 200% text size. | AC-REQ-015-01, NFR-005 | Device checklist |

### New requirements for the social features

PRD v1.1 stops at REQ-016. These continue its numbering and are pending approval with this revision.

- **REQ-017, contributor itinerary updates.** A new revision of a published itinerary shows what changed, and travelers who adapted it can choose whether to add the new stops.
  - `AC-REQ-017-01`: When revision 2 of C's itinerary adds a stop, viewers see it marked new, and a traveler who adapted revision 1 gets a preview. Accepting adds the stop, with lineage to revision 2, as one trip revision; dismissing changes nothing.
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
  - `AC-REQ-024-01`: Messages, requests, answers, partner edits and contributor updates create in-app notices with unread counts. Push notifications are sent only after the traveler allows them.
  - `AC-REQ-024-02`: Push previews never contain message or comment text. Each notice type can be turned off, and signing out stops push to that device.

### Social checks

Scenario: T and partner P plan a trip together, U is another invited traveler, and C's itinerary is published.

| # | Observable result | Criteria | Evidence |
| --- | --- | --- | --- |
| T14 | The operator publishes revision 2 of C's itinerary. U sees the new stop marked; T previews and accepts it, and a second device shows exactly one new trip revision. Dismissing leaves the trip unchanged. | AC-REQ-017-01, AC-REQ-017-02 | Revision fixtures; device run |
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

## 9. Delivery slices

Each slice is an end-to-end, demonstrable outcome; split it into 0.5–2 day tickets when it becomes Ready (PRD §9). No dates until slice 1 has been measured.

| Slice | Demonstrable outcome | Covers | Depends on |
| --- | --- | --- | --- |
| S0.1 Project shell | Expo app opens on iOS and Android development builds; API health endpoint; shared contracts package; migration runner; CI runs typecheck, lint and tests; versions pinned from current official docs | REQ-015 baseline | D-005 |
| S0.2 Voice spike (throwaway, time-boxed) | Two-way audio with interruption on a physical iPhone and Android phone; latency and cost per minute measured | REQ-004 feasibility | Devices, development credentials |
| S0.3 Founder track (no code) | Pilot city chosen, permissions collected, hand-run relevance study, spend ceiling, developer accounts | D-006, D-009, D-012, H1 | — |
| 1 Sign-in and ownership | Sign in on two devices; U can't read T's data; account deletion | T8, T12 | S0.1, D-007 |
| 2 Interview to approved profile | Type, correct, approve; trip-only overrides; budget fallback | T2, T10 | 1, D-008, D-009, D-011 |
| 3 Content import and rights | Real permissioned itinerary imported, published and withdrawn | T1, T9 (read gate) | S0.1, D-006 |
| 4 Matching and Discover | Traceable matches or an honest empty state; deterministic eval baseline | T3, T4 | 2, 3 |
| 5 Adapt and board | Adapt, edit, restore, conflict | T5, T6, T9 (trip side) | 4 |
| 6 Links, feedback, telemetry | Outbound click, reports, reconciled events | T7, T11 | 5 |
| 7 Safety foundation | Display names; block and report on every piece of user content; text filter; operator queue with a response owner; community guidelines and contact details; 18+ confirmation; rate limits | T22 | 1, D-021 |
| 8 Contributor updates and Q&A | Revision diffs, "new" markers and update previews on boards; questions to the operator queue and published answers | T14, T15 | 3, 5, 7 |
| 9 Trip partners and comments | Invites, shared board with attribution and "what's changed", comments, remove and leave | T16, T17 | 5, 7, D-019, D-022 |
| 10 Opt-in activity | Per-trip sharing with a preview, the Activity tab, place badges, removal | T18, T19 | 5, 7 |
| 11 Messages and notifications | Requests, inbox, real-time delivery, block and report in conversations, push without message text | T20, T21, T23 | 7, D-012, D-017, D-018, D-020 |
| 12 Pilot hardening | Accessibility pass; release builds on both platforms; kill switches for every feature, including `activity_feed`, `trip_partners`, `direct_messages`, `contributor_qa` and `push_notifications`; deletion recheck across all social data; database backups proven by a restore; error monitoring; privacy, terms and community pages; a check against current app-store rules for user content. Then team dogfood, then the first 5 invited travelers | T13, T24, NFR-007 | 1–11 |
| MVP-1.1 | Voice (if S0.2 passed), in-app map, offline reading; then up to 20 travelers | REQ-004, REQ-007, REQ-015 | 12 plus learnings from the first 5 |

## 10. Measurement plan

With at most 20 travelers, report counts next to every rate. Staff and test accounts are flagged `is_internal` and excluded.

| Metric | Definition | Window | Informs |
| --- | --- | --- | --- |
| First-decision activation | New travelers keeping at least one place on a board within 24 hours of their first planning session ÷ new travelers who started a planning session | 24 hours | Whether the journey delivers value quickly (PRD §11) |
| Matched-content share | Kept places whose lineage is a matched itinerary or review ÷ all kept places, on the latest board snapshot | 7 days | H1 inside the product (added) |
| Channel mix | Kept places by the channel they came from (matched content, activity, partner, contributor update, manual) ÷ all kept places | 7 days | Keeps H1 readable now that social channels also add places |
| Kept places per started trip | Distinct places on the latest board snapshot ÷ started trips; show zeros and the median | 7 days | Planning depth (PRD §11) |
| Interview accuracy | Candidates accepted unchanged, corrected, rejected or left unknown ÷ reviewed candidates | Per interview | Extraction quality; the baseline voice must beat |
| Outbound intent | Distinct trip, place, provider and day clicks ÷ started trips | 7 days | Revenue-path signal (a click is not a booking) |
| Trust failures | Reports by severity ÷ exposed matches | Pilot | A critical report disables the affected path |
| Model cost per started trip | Metered model spend, including abandoned sessions ÷ started trips | Weekly | Cost hypothesis: about USD 1; investigate above USD 3 (PRD §11) |
| Relevance study (H1) | Travelers preferring the matched set over destination-only suggestions | S0–S1 by hand; repeated in-product after slice 4 | Continue if at least 7 of 10 prefer matched and no critical trust failure (PRD §10) |
| Sharing rate | Trips with activity sharing on ÷ started trips | Pilot | Whether travelers accept being visible |
| Partner adoption | Trips with an accepted partner ÷ started trips; stops added by partners | Pilot | Whether co-planning matters for couples |
| Q&A demand | Questions ÷ itinerary opens; answer rate; median time to answer | Pilot | Whether travelers want contact with contributors |
| Messaging use | Travelers who send at least one message ÷ active travelers; share of requests accepted | Pilot | Whether open messaging earns its safety cost |
| Safety load | Reports and blocks per 100 active travelers; median time to resolve a report | Weekly | Moderation capacity; a spike pauses messaging |

**Events:** `profile_confirmed`, `trip_started`, `match_exposed` (only on a visible impression), `source_opened`, `adaptation_accepted`, `place_added`, `place_removed`, `retained_snapshot`, `outbound_clicked`, `match_feedback`, `content_reported`, `content_withdrawn`. Each carries the event and schema version, server-derived actor and session, trip ID when relevant, request or command ID, content or assessment version, `occurred_at` and `is_internal`. None carries raw chat text, audio or exact budgets (PRD §11).

**Social events:** `activity_sharing_changed`, `activity_item_viewed`, `partner_invited`, `partner_joined`, `partner_left`, `stop_comment_posted`, `question_submitted`, `question_answered`, `source_update_shown`, `source_update_accepted`, `message_request_sent`, `message_request_accepted`, `message_sent`, `user_blocked` and `push_opened`. They carry IDs and counts only, never message, comment or question text.

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
| Social channels blur the H1 test | Can't tell whether matching helped | Lineage records each stop's channel; badges stay off match cards | Channel mix (§10) |
| MVP-1 grows substantially before the first invite | Learning starts later | Core loop (slices 1–6) first; each social feature behind its own kill switch; re-estimate after slice 1 | D-015 |
| Moderation load on the founder | Slow responses leave harmful content up | Named response owner and target time; pause switches for when nobody is available | D-021 before the first external invite |

### Assumptions (reversible)

- `A-001`: TestFlight and Google Play internal testing are enough to reach the first cohort.
- `A-002`: Operator-entered place facts (name, address, area, website) are enough for MVP-1; no Places API.
- `A-003`: Each invited traveler plans one pilot-city trip within a 7-day window.

### Decisions needed

| ID | Decision | Recommended default | Resolved by | Blocks |
| --- | --- | --- | --- | --- |
| D-005 | This MVP-1 scope | Approve as written, or name the cuts to reverse | Founder approval | All implementation |
| D-006 | Pilot city and content supply | The city where permissioned content is fastest to secure. Target 5 contributors, 15 itineraries and 30 reviews, with at least 3 distinct suitable itineraries per invited traveler (PRD §12). No city has been chosen; v1 used Rome as its example | Permission inventory | Slices 3 onward |
| D-007 | Sign-in method | Supabase email one-time code; revisit Apple and Google sign-in before public launch | Slice 1 two-device test | Slice 1 |
| D-008 | Text model provider | Run 8–12 fixture interviews through 2–3 candidates; compare extraction accuracy and cost | Eval results | Slice 2 |
| D-009 | Spend ceiling | Founder sets global daily and per-user daily caps | Founder, from available funds | Paid calls in slice 2 |
| D-010 | API hosting | A host with long-lived WebSockets; Railway is a candidate (v1 is configured to deploy there) | Deploying the S0.1 health endpoint | First deploy |
| D-011 | Chat framework for the interview | A plain chat screen plus one server-side structured-extraction endpoint. Adopt CopilotKit, with server-side tools only, when the assistant does more than the interview (v1 ran 19 tools in the browser, only 2 with confirmation) | S0.1 integration effort | Slice 2 |
| D-012 | Distribution accounts | Apple Developer Program and Google Play Console, using TestFlight and internal testing; the same accounts supply push credentials | Accounts active | Slices 11–12 |
| D-013 | Hotel and flight preference questions | Defer until those categories launch | Evals show matching doesn't need them | — |
| D-014 | Thanks for contributors | Attribution in the app; any payment handled outside it | Recruiting response | D-006 |
| D-015 | Team capacity | Keep the slice order; re-estimate after slice 1. v1's business plan describes a solo founder with contractors, with AI doing research, drafting and code, while PRD §9's 14-week schedule assumes two engineers | Slice 1 actuals | Dates only |
| D-016 | Revenue model and prices | No pricing or payment work in MVP-1. Before any paid release, reconcile v1's September 21 prices and advisor-first revenue ranking with the PRD, including app-store billing rules | Founder decision after the pilot | Paid release only |
| D-017 | Who can be messaged | Only travelers who share activity; message requests are on by default for them, and anyone can turn messages off | Request acceptance and report rates | Slice 11 |
| D-018 | Push notification previews | Sender name only, never message or comment text | Tester feedback | Slice 11 |
| D-019 | Account deletion with shared data | The deleted traveler's messages show as deleted; their comments and activity are removed; their memberships end; a trip they owned passes to the partner | Deletion test (T24) | Slice 9 |
| D-020 | Real-time delivery | Supabase Realtime if S0.1 confirms it enforces row policies; otherwise polling | S0.1 check | Slice 11 |
| D-021 | Safety response owner and time | The founder answers reports within 24 hours during the pilot and pauses the affected feature when unavailable | Founder commitment | First external invite |
| D-022 | People per shared trip | Two (the owner and one partner), matching the solo-and-couples segment | Pilot requests for bigger groups | Slice 9 |

## 12. Changes from source (v1.1 → v1.2)

- **Clarified:** the release type (unpaid, controlled pilot); the first working transaction (§8); operator-run supply for the pilot; the operational basics slice 12 must prove (backups with a tested restore, error monitoring, privacy and terms pages).
- **Moved to MVP-1.1:** the voice interview (REQ-004), the in-app map (REQ-007 map part), offline reading (REQ-015 offline part). The S0 voice spike still runs first.
- **Moved later:** guest browsing (PRD D-004, browse part), save and compare (REQ-009), in-app contributor submission (REQ-005 submission path), AI-proposed rearrangements (REQ-003 bulk proposals), hotel and flight interview questions (REQ-002).
- **Simplified:** import scripts instead of an internal moderation app; adaptation as copy-with-lineage plus flags plus manual edits; daily budget counters instead of the full reservation system; no outbox until an asynchronous consumer exists; "Open in Maps" links instead of an embedded map.
- **Added:** the matched-content share metric; the `adaptation_accepted`, `match_feedback` and `content_reported` events; the relevance study moved to S0–S1 as a hand-run test; D-016, which surfaces the conflict between v1's recorded prices and the PRD's "undecided".
- **Added by founder decision (2026-09-23), in the first pilot:** contributor itinerary updates (REQ-017), opt-in named trip activity (REQ-018), trip partners (REQ-019) with stop comments (REQ-020), ask-a-contributor Q&A (REQ-021), direct messages (REQ-022), the safety controls they need (REQ-023) and notifications (REQ-024). This brings forward PRD v1.1's later timing for feeds and collaborative editing, and moves report and block (REQ-010) back into MVP-1.
- **Unchanged:** requirement IDs, trust and privacy rules, stack direction (Expo, TypeScript API, Supabase), rollout stages, kill switches and cost hypotheses.
- **Unresolved:** D-005 to D-022.

## 13. Completion check

- Every build-now item supports a traveler journey step (§4), including the social journeys the founder added, or a release requirement for real users: isolation, deletion, spend caps, safety controls, or the telemetry the pilot is judged by.
- Nothing is simulated:
  - There are no payments, and links say "check price and availability".
  - Demand isn't fabricated. There is only permissioned real content, honest empty states, and real travelers in the relevance study. No activity, messages or questions are seeded, and team activity is labeled as the team's.
  - Access control isn't left for later. Isolation lands in slice 1, before any real data. Each social feature's access rules land with that feature, after the safety foundation in slice 7.
- **Scope:** the founder's social additions roughly double what must work before the first invite. The core loop still comes first (slices 1–6), and each social feature has its own kill switch.
- **Demo versus production:** MVP-1 is production-grade for up to 20 invited travelers. It is not store-ready; store review, privacy disclosures and commercial decisions come before any public release (PRD §10).

## 14. Readiness and next action

**Readiness: READY WITH ASSUMPTIONS.** S0.1 and slices 1–2 can start once D-005 is approved. D-007, D-008, D-010, D-011 and D-017 to D-022 have working defaults. D-009 needs the founder's cap amounts before slice 2 makes paid model calls. Slices 3 onward need D-006, and the first external invite needs D-021 confirmed.

**Next action (founder):** approve revision v1.2 as written, or list the changes you want. After approval, the factory's next task is S0.1 (project shell) on its own branch, with CI and device evidence.
