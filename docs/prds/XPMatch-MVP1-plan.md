# XPMatch MVP-1 plan (PRD revision v1.2, proposed)

| Field | Value |
| --- | --- |
| Source | `docs/prds/XPMatch-Build-PRD-v1.1.md` (founder's PRD v1.1, 2026-09-23); read-only review of `TayoAki/XPMatchv1`; founder answers of 2026-09-23 |
| Method | `mobile-plan-mvp` for scope; `software-factory` for intake, readiness and delivery slices |
| Readiness | **READY WITH ASSUMPTIONS**: S0 and slices 1–2 can start once this revision is approved; slices 3–7 also need D-006 (pilot city and permissioned content) |
| Approval | **Pending**: founder |

PRD v1.1 stays the base document. This revision changes scope and order only; everything not mentioned here (trust rules, data conventions, quality thresholds, rollout, rollback) carries over unchanged. Requirement IDs are the PRD's own.

## 1. Decision summary

- MVP-1 tests the PRD's core bet (H1: relevant human content beats destination-only suggestions) with the fewest moving parts. The loop is: text interview → approved taste → real, permissioned itineraries and reviews with honest reasons → adapt one into a private trip board → partner or official link. It covers one city, invited travelers, and iOS plus Android.
- Compared with v1.1, the voice interview, the in-app map and offline reading move to MVP-1.1, right after the first 5 invited travelers. Compare, in-app contributor publishing, guest browsing and AI-proposed rearrangements move later. No trust, privacy or cost rule is relaxed.
- The 10-traveler relevance study moves up to S0–S1 and runs by hand, so H1 is tested before most of the code exists.
- Founder input needed: approve this revision (D-005). Choose the pilot city and start collecting content permissions now (D-006); nothing after slice 2 can be shown honestly without them.

## 2. Product, users and constraints

**Promise (unchanged):** Tell XPMatch how you like to travel. It helps you choose relevant travelers' itineraries, contextual reviews and places, explains the tradeoffs, and turns your choices into a private trip board.

- **First customer:** a solo traveler or couple planning a 2–4 day leisure trip to the pilot city, invited into the pilot.
- **Job to be done:** "Show me what people who travel like me actually did there, tell me honestly what won't suit me, and give me a plan I can use."
- **First measurable outcome:** a new invited traveler keeps at least one place on a trip board within 24 hours of the first planning session (PRD §11), and the kept places mostly come from matched traveler content (§10).
- **Release type:** an unpaid, controlled pilot. It isn't a demo: real people put private data in, so sign-in, data isolation, deletion and spend caps must be production-grade. It isn't a public launch either: no store listing, no payments, and at most 20 invited travelers (team → 5 → up to 20, PRD §13).

**Confirmed constraints (supplied):**

- Native iOS and Android with React Native and Expo; PostgreSQL on Supabase (PRD D-001, §5).
- No booking, payments, subscriptions or creator payouts in the pilot (PRD §3).
- One city; solo travelers and couples; 2–4 day leisure trips (PRD §2).
- Trust rules: deterministic authorization and ranking, evidence-backed explanations, no fabricated peers, commission never affects ranking (PRD D-002, §5).
- v2 is a fresh codebase; v1 is a product reference only (founder, 2026-09-23).
- The repository is public, and the PRD and plans may be public (founder, 2026-09-23).

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
- **Ideas worth keeping (as behavior, not code):**
  - review answers that cite quotes by index, so the quote shown is always verbatim;
  - prompt rules that require honest downsides;
  - fake-provider test servers, so journeys can be tested without paid APIs. Fixtures must be labeled as fixtures, never recorded into demos as real reviews.

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

### Next (MVP-1.1, before inviting more than the first 5 travelers)

| Capability | Condition | REQ |
| --- | --- | --- |
| Voice interview (Gemini Live, behind `voice_interview`) | S0.2 spike passes on physical devices | REQ-004 |
| In-app map with card-to-pin sync and list equivalents | Provider terms and keys verified | REQ-007 |
| Offline reading of saved trips, with age labels | Pilot trips happen during the cohort window | REQ-015 |

### Later (each needs its own approval)

- Contributor self-serve submission, preview, moderation queue and user blocking (REQ-005 submission path, REQ-010).
- Shortlist and compare up to three with price bases (REQ-009).
- AI-proposed rearrangements with an exact preview (REQ-003 bulk proposals).
- Live offer refresh, then hotel, flight and experience providers (REQ-011 refresh, REQ-016).
- Guest browsing without an account (PRD D-004).
- Hotel and flight preference questions (D-013).
- Numeric match scores, collaboration, the web companion, more cities, creator payouts and subscriptions (PRD §3 expansion gates).

## 6. Screens and states

Bottom navigation: Discover, Trips, Profile. Colors: pine `#174D42`, ivory `#F7F8F5`, white surfaces and dark `#182B28` text (PRD §4).

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

## 7. Data and access boundaries

**Entities** (subset of PRD §5 groups M01–M08; names follow the PRD):

- Identity and profile (M01): `app_user` bound to the auth provider's verified subject, `private_profile`, `private_profile_version` (immutable once approved), `preference_value`, `spend_range` (minor units, currency, basis), `preference_evidence`.
- Interview and commands (M02 subset): interview `conversation` and messages, and `mutation_receipt` for idempotency. No outbox until an asynchronous consumer exists.
- Content and catalog (M03): `place` (operator-entered: name, area, category, coordinates, official or partner URL), the contributor's public profile and consented public taste, `community_content`, `content_revision`, `content_permission`, `published_itinerary`/`day`/`stop`, and `review` with context.
- Matching (M04): trip context snapshot, `match_model_version`, `match_run`, `match_assessment`, and `match_component` with evidence and explanation; `feedback_event`.
- Trips (M05): `trip`, `trip_revision`, `trip_day`, `trip_stop`, `trip_source` (lineage).
- Operations (M07/M08 subset): `partner_handoff`, `usage_event`, budget counters, `decision_event`, `content_report`, `moderation_action`, deletion record.
- Deferred: voice (M06), search sessions and offers (M07), shortlist and compare (M05), user blocks.

**Access:**

| Actor | Reads | Writes | Enforced by |
| --- | --- | --- | --- |
| Traveler | Own profile, versions, trips and receipts; published content with a current permission | Own profile, trips, feedback and reports | API authorization plus row policies |
| Operator (founder) | Content, permissions, reports | Import, publish, withdraw | Service scripts with an audit log; operator tools never read private profiles or trips |
| Model | Only what the API passes for one request: a profile summary and candidate content | Nothing directly; returns schema-validated output that the API checks | API boundary; no database credentials |

**External services:**

| Service | Used for | Note |
| --- | --- | --- |
| Supabase | Auth, Postgres, row policies | Separate development and production projects |
| Text model provider | Interview extraction, explanation wording | Chosen in S0 (D-008); metered and capped |
| Expo EAS | Builds and internal distribution | Needs Apple and Google developer accounts (D-012) |
| API host | `services/api` | Must support long-lived WebSockets later for voice (D-010) |

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
| 7 Pilot hardening | Accessibility pass, release builds on both platforms, kill switches, deletion recheck; then team dogfood, then the first 5 invited travelers | T13, NFR-007 | 1–6 |
| MVP-1.1 | Voice (if S0.2 passed), in-app map, offline reading; then up to 20 travelers | REQ-004, REQ-007, REQ-015 | 7 plus learnings from the first 5 |

## 10. Measurement plan

With at most 20 travelers, report counts next to every rate. Staff and test accounts are flagged `is_internal` and excluded.

| Metric | Definition | Window | Informs |
| --- | --- | --- | --- |
| First-decision activation | New travelers keeping at least one place on a board within 24 hours of their first planning session ÷ new travelers who started a planning session | 24 hours | Whether the journey delivers value quickly (PRD §11) |
| Matched-content share | Kept places whose lineage is a matched itinerary or review ÷ all kept places, on the latest board snapshot | 7 days | H1 inside the product (added) |
| Kept places per started trip | Distinct places on the latest board snapshot ÷ started trips; show zeros and the median | 7 days | Planning depth (PRD §11) |
| Interview accuracy | Candidates accepted unchanged, corrected, rejected or left unknown ÷ reviewed candidates | Per interview | Extraction quality; the baseline voice must beat |
| Outbound intent | Distinct trip, place, provider and day clicks ÷ started trips | 7 days | Revenue-path signal (a click is not a booking) |
| Trust failures | Reports by severity ÷ exposed matches | Pilot | A critical report disables the affected path |
| Model cost per started trip | Metered model spend, including abandoned sessions ÷ started trips | Weekly | Cost hypothesis: about USD 1; investigate above USD 3 (PRD §11) |
| Relevance study (H1) | Travelers preferring the matched set over destination-only suggestions | S0–S1 by hand; repeated in-product after slice 4 | Continue if at least 7 of 10 prefer matched and no critical trust failure (PRD §10) |

**Events:** `profile_confirmed`, `trip_started`, `match_exposed` (only on a visible impression), `source_opened`, `adaptation_accepted`, `place_added`, `place_removed`, `retained_snapshot`, `outbound_clicked`, `match_feedback`, `content_reported`, `content_withdrawn`. Each carries the event and schema version, server-derived actor and session, trip ID when relevant, request or command ID, content or assessment version, `occurred_at` and `is_internal`. None carries raw chat text, audio or exact budgets (PRD §11).

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

### Assumptions (reversible)

- `A-01`: TestFlight and Google Play internal testing are enough to reach the first cohort.
- `A-02`: Operator-entered place facts (name, address, area, website) are enough for MVP-1; no Places API.
- `A-03`: Each invited traveler plans one pilot-city trip within a 7-day window.

### Decisions needed

| ID | Decision | Recommended default | Resolved by | Blocks |
| --- | --- | --- | --- | --- |
| D-005 | This MVP-1 scope | Approve as written, or name the cuts to reverse | Founder approval | All implementation |
| D-006 | Pilot city and content supply | The city where permissioned content is fastest to secure. Target 5 contributors, 15 itineraries and 30 reviews, with at least 3 distinct suitable itineraries per invited traveler (PRD §12) | Permission inventory | Slices 3–7 |
| D-007 | Sign-in method | Supabase email one-time code; revisit Apple and Google sign-in before public launch | Slice 1 two-device test | Slice 1 |
| D-008 | Text model provider | Run 8–12 fixture interviews through 2–3 candidates; compare extraction accuracy and cost | Eval results | Slice 2 |
| D-009 | Spend ceiling | Founder sets global daily and per-user daily caps | Founder, from available funds | Paid calls in slice 2 |
| D-010 | API hosting | A host with long-lived WebSockets; Railway is a candidate (v1 is configured to deploy there) | Deploying the S0.1 health endpoint | First deploy |
| D-011 | Chat framework for the interview | A plain chat screen plus one server-side structured-extraction endpoint. Adopt CopilotKit, with server-side tools only, when the assistant does more than the interview (v1 ran 19 tools in the browser, only 2 with confirmation) | S0.1 integration effort | Slice 2 |
| D-012 | Distribution accounts | Apple Developer Program and Google Play Console, using TestFlight and internal testing | Accounts active | Slice 7 |
| D-013 | Hotel and flight preference questions | Defer until those categories launch | Evals show matching doesn't need them | — |
| D-014 | Thanks for contributors | Attribution in the app; any payment handled outside it | Recruiting response | D-006 |
| D-015 | Team capacity | Keep the slice order; re-estimate after slice 1 | Slice 1 actuals | Dates only |

## 12. Changes from source (v1.1 → v1.2)

- **Clarified:** the release type (unpaid, controlled pilot); the first working transaction (§8); operator-run supply for the pilot.
- **Moved to MVP-1.1:** the voice interview (REQ-004), the in-app map (REQ-007 map part), offline reading (REQ-015 offline part). The S0 voice spike still runs first.
- **Moved later:** guest browsing (D-004 browse), save and compare (REQ-009), in-app contributor submission, the moderation queue and user blocking (REQ-005 submission path, REQ-010), AI-proposed rearrangements (REQ-003 bulk proposals), hotel and flight interview questions (REQ-002).
- **Simplified:** import scripts instead of an internal moderation app; adaptation as copy-with-lineage plus flags plus manual edits; daily budget counters instead of the full reservation system; no outbox until an asynchronous consumer exists; "Open in Maps" links instead of an embedded map.
- **Added:** the matched-content share metric; the `adaptation_accepted`, `match_feedback` and `content_reported` events; the relevance study moved to S0–S1 as a hand-run test.
- **Unchanged:** requirement IDs, trust and privacy rules, stack direction (Expo, TypeScript API, Supabase), rollout stages, kill switches and cost hypotheses.
- **Unresolved:** D-005 to D-015.

## 13. Completion check

- Every build-now item supports a traveler journey step (§4) or a release requirement for real users: isolation, deletion, spend caps, or the telemetry the pilot is judged by.
- Nothing is simulated. There are no payments, and links say "check price and availability". Demand isn't fabricated: only permissioned real content, honest empty states, real travelers in the relevance study. Access control isn't left for later: isolation lands in slice 1, before any real data.
- **Demo versus production:** MVP-1 is production-grade for up to 20 invited travelers. It is not store-ready; store review, privacy disclosures and commercial decisions come before any public release (PRD §10).

## 14. Readiness and next action

**Readiness: READY WITH ASSUMPTIONS.** S0.1 and slices 1–2 can start once D-005 is approved; D-007 to D-011 have working defaults. Slices 3–7 also need D-006.

**Next action (founder):** approve revision v1.2 as written, or list the changes you want. After approval, the factory's next task is S0.1 (project shell) on its own branch, with CI and device evidence.
