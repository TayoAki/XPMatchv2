# XPMatch — Product Requirements and Engineering Delivery Plan

Version 1.1 · September 23, 2026 · Factory preflight recorded; repository needed

**Product promise:** Tell XPMatch how you like to travel. It helps you choose relevant travelers’ itineraries, contextual reviews and places, explains the tradeoffs, and turns your choices into a private trip board.

**Build direction:** React Native + Expo for iOS and Android; a shared decision engine and PostgreSQL data model behind the app. Conversation gathers intent, cards and the map support decisions, and the trip board is the saved result.

**First delivery:** A controlled, one-city mobile beta completing the profile → matched human content → adapted trip → partner-link journey. Full universal live inventory and a desktop companion follow separate gates.

## 1. Document control and source reconciliation

| Field | Value |
| --- | --- |
| Source | XP-match-Product-and-Design-Plan.md, supplied version 7, dated September 23, 2026; stable source ID libfile_43714161aa788191b0b442fcf2f2c4b6 |
| Product decision owner | Founder; named engineering and design owners assigned in Sprint 0 |
| Current evidence | Founder-described product direction and early usage; no inspected repository, customer study, deployed schema or device-test results |
| Authorized work here | Create this PRD and delivery plan; implementation is a subsequent task |
| Requirements status | Proposed and testable; none marked implemented |
| Delivery estimate | Conditional planning range, recalibrated after Sprint 1 |
| Evidence handling | This single PRD contains the evidence ledger, decision record, prototype brief, agent contract and evaluation plan; separate discovery packets would duplicate this focused handoff |

This is a separate execution document. The original plan remains the historical design record. Within this PRD, the mobile-first decision takes precedence over older web-first/manual-service recommendations. The earlier USD 79 concierge offer is a separate business experiment, not the mobile app price. Historical cost examples are not current quotations or measured economics. Choose and record an available Live model and package versions in Sprint 0; no model name embedded in an older draft becomes a permanent architectural dependency.

Changes from source: ordered delivery slices; explicit beta boundaries; stable requirement/acceptance/evidence IDs; implementation loops; source-supply work; release gates; measurable cost and outcome instrumentation. Full flights/hotels, numeric peer scores and web parity remain on the roadmap rather than being silently removed or claimed complete.

## 2. Problem, users and hypotheses

A leisure traveler can collect attractive options yet still struggle to judge whether they suit their pace, interests, expectations and current trip. XPMatch’s hypothesis is that relevant firsthand context plus honest tradeoffs helps that traveler decide faster and with greater confidence. This has not been demonstrated with external users.

Proposed starting segment: solo travelers and couples planning a 2–4-day leisure trip to one selected city. This bounds supply and evaluation, not the long-term audience. The city is selected by permissioned content coverage and participant access, not founder preference alone.

| Actor | Job | Allowed scope |
| --- | --- | --- |
| Traveler | Explain taste, assess fit, compare, save and adapt | Own profile, conversations, assessments and private trips; permitted public content |
| Contributor | Publish an itinerary or firsthand review | Own drafts and explicitly approved public projection; separate consent for public taste descriptors |
| Moderator/content operator | Review submissions, reports and source rights | Submitted/reported public content and permission records; no general access to private chats or profiles |
| Backend/model worker | Retrieve, rank, explain and propose | Request-scoped authorized records and bounded tools; no independent publication or unrestricted database access |

Hypotheses to test: H1 relevant human content improves selection over destination-only ordering; H2 a short voice interview reduces onboarding effort without reducing profile accuracy; H3 retained selections and useful partner handoffs lead to next-trip return; H4 variable costs can fit a viable revenue model. No hypothesis is treated as proven.

### Evidence and decision ledger

All records below were reviewed September 23, 2026. Source-plan statements indicate intent, not implementation evidence.

| ID | Classification and claim | Source / scope | Confidence and limit |
| --- | --- | --- | --- |
| E-001 | Supplied intent: private taste profile drives itinerary/review matching | User conversation; source mobile-first and data-model sections | High confidence in intent; outcome unproven |
| E-002 | Supplied context: almost nobody beyond the founders has used it | User statement; no independent usage export | Low evidence for market demand or retention |
| E-003 | Supplied intent: interview onboarding, chat/cards/map/board, five category expectations | User conversation and source voice/profile sections | High intent confidence; feasibility/effectiveness pending |
| E-004 | Documented capability: CopilotKit provides a native SDK and server-runtime connection | [CopilotKit native quickstart](https://docs.copilotkit.ai/react-native) | Official documentation; XPMatch integration untested |
| E-005 | Documented capability: Expo development builds support project-specific native integration | [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/) | Official documentation; specific audio adapter undecided |
| E-006 | Documented capability: Gemini Live supports bidirectional WebSocket interaction | [Google Live WebSockets](https://ai.google.dev/gemini-api/docs/live-api/get-started-websocket) | Official documentation; target-device latency/cost unmeasured |
| E-007 | Documented capability: Supabase supports database row-level access policies | [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security) | Capability only; policies must be implemented and tested |
| D-001 | Proposed delivery decision: native first, one city, controlled beta | Latest source architecture; narrow validation scope | Founder confirms city/cohort in S0 |
| D-002 | Proposed trust decision: deterministic authorization and ranking components; evidence-backed explanations | Source data model and explicit honest-tradeoff goal | Engineering owner records implementation choices |
| D-003 | Proposed operating decision: bounded spending, staged rollout, rollback and meaningful verification | Source cost controls plus delivery risk | Budget owner sets real spending ceiling in S0 |
| D-004 | Proposed scope decision: account required to retain private data; browse/skip remains possible | Simplifies first beta identity while preserving exploration | Guest cross-device draft migration follows beta |

## 3. Release scope

| Capability | Controlled mobile beta | Expansion gate |
| --- | --- | --- |
| Private profile | Hotel, flight, dining, experience and general preferences; typed ranges, purpose, hard needs, trip overrides | Improve taxonomy from actual corrections |
| Onboarding | Voice interview plus text/skip; editable recap; remember versus trip-only | Additional languages after evaluation |
| Matched human content | Permissioned itineraries and contextual reviews; separate content-fit and author-fit reasoning | Broader contributor coverage and cities |
| Universal search | Common search contract; city/place/dining/experience discovery where sourced; category availability shown | Live hotels and flights only after provider access, quote and freshness tests |
| Match explanation | Evidence-backed strengths, tradeoffs, unknowns; eligible/blocked/needs-check | Numeric peer/content scores only after evaluation; never enjoyment probability |
| Save/compare/board | Private shortlist, up to three comparable options, itinerary adaptation, manual edits | Collaborative editing after owner-only flows pass |
| Booking continuation | Clearly labeled provider page or refreshed supported offer; record outbound click | Verified booking/commission only with partner confirmation |
| Community supply | Operator-assisted import with permission; contributor review/itinerary submission, moderation, withdrawal | Open growth, feed and creator payouts later |
| Platforms | Native iOS and Android; minimal internal moderation interface | Desktop planning companion with shared accounts/data |
| Offline | Previously saved, permitted first-party trip details readable with stale indicator | Offline mutations/sync deferred |

Not in beta: booking/payment execution, ticket issuance, guaranteed prices/availability, broad global inventory, automatic social posting, group preference aggregation, advertising ranking, creator payments, subscription checkout, background listening, camera/avatar interview, unbounded agents. Pricing, affiliate contracts and operating region remain separate decisions before commercial launch.

## 4. Product journey and screen contract

Primary path: Explore → Talk or type → Review taste recap → Set trip context → Inspect matches → Open source/reviews → Adapt or add → Compare → Save trip → Continue to partner → Return and give feedback.

Contributor path: Choose own completed trip or create a draft → Select public fields and rights → Preview sanitized itinerary/review → Submit → Moderation decision → Publish → Edit as new revision or withdraw. Publishing private future dates, private spending ranges or companions is never implicit.

| Screen | Main decision | Required alternate states |
| --- | --- | --- |
| Welcome / Explore | Talk, type or browse | No microphone permission needed to browse; limited context-only results |
| Interview | Answer one useful question | Connecting, listening, speaking, interrupted, paused, reconnecting; visible mute/end/type |
| Profile recap | Correct meaning; choose memory scope | Uncertain values, unanswered fields, stale recap conflict; nothing pre-published |
| Trip context | Dates, destination, party, purpose and overrides | Invalid dates; unknown date supported for inspiration; currency/basis explicit |
| Discover | Inspect relevant itineraries/reviews/places | Loading, partial source failure, no suitable evidence, blocked hard need |
| Source / match detail | Understand why it fits and what does not | Missing public taste, unavailable source, expired occurrence, unknown fact |
| Map | Select a place and inspect its card | No location permission fallback to destination; provider unavailable; list equivalent |
| Shortlist / compare | Compare equivalent options | Different price bases, stale quotes, missing terms; avoid false cheapest claims |
| Trip board | Keep, move, replace or remove a stop | Empty board, save pending, conflict, offline saved view, unavailable event |
| Changes preview | Accept a proposed adaptation or replacement | Exact affected stops, reject, expired proposal, source withdrawn |
| Profile / privacy | Update expectations and consent | Changes produce versions; deletion progress/retry; public taste separate |
| Review / publish | Share explicitly chosen content | Draft, submitted, rejected with reason, published, withdrawn; report/block |
| Trips | Resume a saved trip | No trips, archived trips, network failure with permitted cache |

Use source tokens: pine #174D42, ivory #F7F8F5, white surfaces and dark #182B28 text. Validate actual contrast and native text scaling. Bottom navigation: Discover, Trips, Profile; conversation accessible from decision screens. Support VoiceOver/TalkBack, native large text, reduced motion and labeled controls. Dragging has move-up/down alternatives; map-only actions also exist in a list.

**Prototype brief:** test whether five recruited travelers can correct a recap, distinguish author fit from itinerary fit, identify a tradeoff, adapt a plan and recover from microphone denial. Record observed failures and severity, not invented quotes. Five participants provide formative findings, not conversion estimates. Design owner supplies actual screen references; earlier unavailable competitor screenshots are not reviewed evidence.

## 5. Architecture and engineering boundaries

Recommended structure, adapted if an existing repository is supplied:

- `apps/mobile`: Expo/React Native screens, native media adapter, authenticated API client and permitted local cache.
- `services/api`: TypeScript modular application; identity, profile, content, catalog, matching, trips, commands, search and telemetry.
- `services/voice`: persistent WebSocket connection handling and budgeted audio relay; may share deployment code but requires a runtime supporting long-lived connections.
- `packages/contracts`: versioned request/response schemas, enums, validators and domain IDs shared by mobile/web/server.
- `db/migrations`: executable PostgreSQL schema, row policies, constraints and migration checks.
- `evals`: versioned matching/explanation/extraction cases and results; no raw private production data by default.

CopilotKit native manages conversational interaction with the server runtime. Gemini Live has a separate audio adapter. Both use one active conversation controller and the same authorized command services. The model interprets and phrases; services own permissions, score components, source freshness, persistence and cost limits. No model-generated SQL or arbitrary HTTP tool is exposed.

Retain PostgreSQL/Supabase for auth, application data and permitted storage. Start with SQL filters and a bounded candidate pool; embeddings are optional derived retrieval data after a measured recall problem. No all-user pairwise similarity table. Matching first filters eligibility, then computes versioned weighted components over explicit preference dimensions. Missing evidence reduces coverage rather than becoming perfect fit. Content fit remains separate from author similarity; commission is not a ranking input. Defer Sanity, Redis and service proliferation until an observed need justifies them.

Use `react-native-maps` with Google provider on both platforms under the existing Places design; verify current provider terms and platform configuration before integrating. Store owned/permissioned catalog facts separately from provider data subject to retention restrictions. Map, Places, offers, routing and media have separate cost/freshness policies. No Google Places response is automatically a permanent shared catalog record.

### Data implementation order

Names below reuse the source model; migrations must not create duplicate legacy concepts.

| Migration group | Canonical entities | Constraints and first consumer |
| --- | --- | --- |
| M01 identity/profile | app_user, user_consent, consent_event, private_profile, private_profile_version, category_expectation, preference_value, spend_range, preference_evidence | Unique owner/profile; typed values; currency/basis; immutable approved version; owner access. S1 |
| M02 execution shell | conversation, conversation_message/parts, agent_run, tool_call, change_proposal, proposal_decision, mutation_receipt, outbox_event | One active run; unique actor/command/key; hash and revision checks; atomic receipt. Minimal spine in S1, extend as needed |
| M03 content/catalog | catalog_item, place/destination/category subtypes, source_provider/listing, item_fact, media_asset, community_content, content_revision, content_permission, public_profile/taste, published_itinerary/day/stop, review/detail/aspect | Same-author and subtype integrity; current publication/rights checked at reads; private evidence separate. S2 |
| M04 matching | search_context, context_snapshot, match_model_version, match_run, match_assessment, match_component/evidence/explanation, feedback_event | Exactly one typed target; viewer scope; versioned inputs; null score for inadequate evidence. S2 |
| M05 trip/compare | trip, trip_revision, trip_context_snapshot, trip_day/stop, trip_source, shortlist/items, comparison_session | Ordered stops; same-trip FK integrity; copied source lineage; no silent source updates. Minimal trip in S1, complete S3/S5 |
| M06 voice | interview_session/turn, voice_session, preference_candidate, voice_usage_sample | Final user turns only as evidence; draft/recap hash; one live controller; deduplicated usage. S4 after S0 spike |
| M07 search/handoff | search_session/provider_run/result, offer_snapshot/category details, value_assessment, partner_handoff | Quote tied to exact context/variant; unknown not zero; per-provider partial status. S5, extend in S8+ |
| M08 operations | decision_event, usage_event, cost_reservation, provider_rate_version, deletion_job/steps, content_report, user_block, moderation_action | Meter from S0/S1; privacy controls with each feature; complete recovery S6 |

Use UUID identifiers, UTC instants plus IANA place timezones, local trip dates, integer minor-unit money plus currency and price basis. Cross-row subtype/ownership integrity needs transactions/FKs/triggers where appropriate; a row CHECK alone cannot validate another table. Apply row policies and service authorization; privileged workers still enforce object scope.

### State and transaction rules

Profile: draft → user-approved immutable version → superseded or redacted. Trip-only preferences change a context snapshot, not global taste. Content: draft → submitted → published, with hidden/withdrawn separate. Match: running → complete/partial/failed/cancelled; changed context creates a new run. Proposal: pending → applied/rejected/expired/stale. Voice: connecting → live/paused/reconnecting → closed/failed.

Write envelope: authenticated actor derived server-side, request ID, command name, schema version, idempotency key, expected revision and validated payload. A reused key with identical hash returns the original receipt; a different payload conflicts. Commit domain revision, root pointer, receipt and outbox together. External model/provider calls occur outside the database transaction. At-least-once outbox delivery requires idempotent consumers.

Recovery: after a lost response, query/retry the receipt; never replay side effects from rendered conversation history. Stale proposals require a new preview. Fenced run ownership prevents a timed-out worker applying late changes. Permission revocation gates reads immediately, then removes derived text, media and embeddings asynchronously.

## 6. Functional requirements and acceptance criteria

Each requirement lists rationale, actor/context, observable acceptance and planned evidence. All evidence is **Pending**. IDs are permanent even if a requirement moves sprints.

### REQ-001 — Private identity and persistence

Rationale E-001/E-007/D-004. Signed-in traveler owns retained data; browse is permitted without a durable profile. Beta authentication method is selected in S0, with one method initially. If Supabase Auth is chosen, bind app_user to the verified issuer/subject or an explicit auth-user mapping; row policies must not assume unrelated UUIDs are equal.

- **AC-REQ-001-01:** Sign in, save a private trip, cold-start and authenticate on a second device; the same owned trip is returned.
- **AC-REQ-001-02:** Another actor's IDs, expired credentials and signed-out cache cannot expose private profile/chat/trip data; return a safe denial or reauthentication state.
- Verification **EV-001**: auth/API negative tests plus two-device native journey. S1.

### REQ-002 — Approved taste and trip context

Rationale E-001/E-003. Traveler supplies typed expectations and ranges across all five scopes; importance and hard requirements are explicit.

- **AC-REQ-002-01:** Editing a recap then confirming creates one approved profile version; choosing trip-only leaves the prior general profile unchanged.
- **AC-REQ-002-02:** Unknown fields stay unknown; invalid range/basis fails validation; stale/double confirmation cannot overwrite another device's newer version or create duplicate versions.
- Verification **EV-002**: profile transaction tests and native recap correction task. S1; voice extends S4.

### REQ-003 — Conversational tools and action control

Rationale E-004/D-002. Signed-in traveler can type intent and see authoritative cards/proposals. UI selection IDs are resolved server-side.

- **AC-REQ-003-01:** A supported request renders stored result IDs; direct Save executes with visible feedback/undo; AI bulk replacement requires an exact preview and user acceptance.
- **AC-REQ-003-02:** Prompt injection in a review, forged resource IDs, stale selection references or a cancelled worker cannot change scope or trigger unauthorized writes; retry returns the committed receipt.
- Verification **EV-003**: command/injection/replay cases and native streaming/reconnect capture. S1–S3.

### REQ-004 — Native voice interview

Rationale E-003/E-005/E-006. Traveler explicitly starts microphone capture; text remains available.

- **AC-REQ-004-01:** On physical iOS and Android, a short interview produces editable evidence-linked draft preferences; interrupt, mute, end and backgrounding stop the applicable capture/playback; approval uses REQ-002.
- **AC-REQ-004-02:** Denied permission, lost network, call/Bluetooth interruption or exhausted budget preserves confirmed work and offers text; reconnect cannot duplicate turns or confirmation; partial/assistant speech cannot establish a user preference.
- Verification **EV-004**: device matrix plus extraction/adversarial cases, measured delay and cost. S0 feasibility; S4 complete.

### REQ-005 — Genuine source supply and publication

Rationale E-001/D-002. Contributor/operator can submit permissioned material with attribution, context and separately approved public taste.

- **AC-REQ-005-01:** A submitted itinerary/review appears in public retrieval only after rights and moderation checks; private fields are absent from the public projection.
- **AC-REQ-005-02:** A withdrawn/expired/blocked source stops new reads and adaptations immediately, including cached explanation access; derived cleanup runs and existing private copies remove restricted source material while retaining permitted user edits.
- Verification **EV-005**: publication/withdrawal fixtures, projection review and cleanup receipt. S2/S6.

### REQ-006 — Separate, explainable matching

Rationale E-001/D-002. Traveler with profile/context requests eligible content and places.

- **AC-REQ-006-01:** Stored assessments distinguish itinerary fit, review relevance, catalog fit and optional author similarity; each displayed reason cites an authorized component/source; at least one supported tradeoff or explicit “no evidenced tradeoff” appears.
- **AC-REQ-006-02:** Missing author taste or absent current peer-matching consent never yields a fabricated peer match; hard-constraint failures are blocked/needs-check; insufficient evidence withholds numbers; no suitable content yields an honest empty state.
- Verification **EV-006**: deterministic ranking/eligibility tests, permission cases and human relevance comparison. S2.

### REQ-007 — Cards, search and map agreement

Rationale E-003/D-001. Traveler browses the configured pilot catalog; cards/map reference the same canonical IDs.

- **AC-REQ-007-01:** Selecting a card highlights its map place and vice versa; filters apply to a new versioned search; category capability and source freshness are visible.
- **AC-REQ-007-02:** Partial provider failure differs from no results; old responses cannot overwrite new filters; denied location uses destination search; map failure leaves the list usable.
- Verification **EV-007**: adapter contract tests and both-platform map/list journey. S3.

### REQ-008 — Adaptation and private trip board

Rationale E-001/E-003/D-002. Traveler adapts an authorized source to their context, then manually edits.

- **AC-REQ-008-01:** Accepting an adaptation creates a private, independently editable trip with source lineage; add/move/remove survives restart and creates one committed revision per logical command.
- **AC-REQ-008-02:** Expired event dates, impossible overlap or unresolved critical needs are flagged before acceptance; unknown travel times remain unknown; concurrent edit returns a conflict; source changes never silently rewrite the trip.
- Verification **EV-008**: transaction/concurrency/timezone fixtures plus complete native adaptation journey. S3.

### REQ-009 — Save and compare

Rationale E-003. Traveler saves content/places and compares up to three options within a meaningful category.

- **AC-REQ-009-01:** Saved items restore after restart; compare shows price basis/currency, sourced terms, fit reasons, tradeoffs and unknowns.
- **AC-REQ-009-02:** Duplicate save is idempotent; incompatible bases are labeled instead of totaled; stale/unavailable sources cannot appear as current quotes or best-value claims.
- Verification **EV-009**: comparison fixtures and native shortlist task. S5.

### REQ-010 — Contextual reviews and community controls

Rationale E-001/E-003/D-002. Contributor writes a firsthand review with optional public trip purpose/context; traveler reads, reports or blocks.

- **AC-REQ-010-01:** Author previews public context before submitting; readers see relevant context and self-reported versus evidenced verification labels; publication follows moderation.
- **AC-REQ-010-02:** Private booking evidence is never public; booking confirmation does not claim attendance; reports enter an operator queue and blocking removes applicable content from retrieval/serialization.
- Verification **EV-010**: public projection/role tests and submit-report-withdraw journey. S5/S6.

### REQ-011 — Partner continuation with honest availability

Rationale E-003/D-002. Traveler chooses an allowed provider destination.

- **AC-REQ-011-01:** Current supported offers are refreshed for exact context before handoff; otherwise display “Check price and availability with partner”; a safe redirect records one logical outbound event.
- **AC-REQ-011-02:** Changed price/terms require renewed selection; refresh failure never displays a booking success; tampered destination URLs are rejected; click, verified booking and commission stay distinct.
- Verification **EV-011**: redirect allowlist/freshness tests plus partner sandbox or permitted live link check. S5.

### REQ-012 — Decisions and cost telemetry

Rationale E-002/D-003. Product/engineering owners can inspect useful actions and spend without raw private transcript analytics.

- **AC-REQ-012-01:** Adds/removals derive from receipts; snapshots support retained-place counts; every provider attempt and voice session has rate-versioned usage tied to actor/session/trip where known.
- **AC-REQ-012-02:** Retries cannot inflate logical decisions; provider attempts still incur usage; abandoned/no-trip spend and unknown actual charges remain visible; founder traffic is separate.
- Verification **EV-012**: event reconciliation with scripted journeys and provider billing samples. S0 onward; complete S6.

### REQ-013 — Cost limits and graceful degradation

Rationale D-003. Backend enforces owner-approved allowances before provider dispatch.

- **AC-REQ-013-01:** Concurrent calls reserve bounded estimated cost atomically across run/user/trip scopes; settling/reconciliation occurs once; voice closes at its configured limit.
- **AC-REQ-013-02:** New trip IDs cannot bypass user limits; timeout is not assumed free; exhausted quota preserves manual board editing and permitted saved reading while disabling paid enrichment.
- Verification **EV-013**: parallel reservation/crash tests and forced-budget native task. S1 onward.

### REQ-014 — Privacy, deletion and recovery

Rationale E-001/D-002. Traveler controls memory, transcripts, published content and account deletion separately.

- **AC-REQ-014-01:** Deletion revokes access/cancels active runs immediately; a tracked job covers database, media, retrieval, caches and framework state, with completion only after required stores acknowledge.
- **AC-REQ-014-02:** Failed cleanup is retryable and visible to operations; sign-out clears local private cache; no raw audio is saved by default; restored backups reapply deletion records before user access.
- Verification **EV-014**: multi-store deletion and restore rehearsal with seeded private data. S1 controls; S6 complete.

### REQ-015 — Accessible, resilient mobile delivery

Rationale D-001/D-003. Traveler can complete the main journey on both supported platforms.

- **AC-REQ-015-01:** VoiceOver/TalkBack and large text support recap, match inspection, add/remove and partner continuation; equivalent list/buttons cover map and drag actions.
- **AC-REQ-015-02:** Offline mode labels cached trip age and prevents unconfirmed writes; interrupted app/reconnect restores authoritative state; release builds pass the target device matrix.
- Verification **EV-015**: native accessibility/network/lifecycle checklist and release-build captures. Every sprint; gate S6/S7.

### REQ-016 — Full-category expansion

Rationale E-003. After beta, travelers can search destinations, hotels, flights, restaurants and experiences through supported adapters.

- **AC-REQ-016-01:** Each enabled category passes provider contract, context, attribution, rate-limit, retention, freshness and handoff tests; hotel occupancy and flight legs/fare/baggage remain explicit.
- **AC-REQ-016-02:** Unsupported categories are clearly unavailable, not simulated inventory; cancellation, stale quotes and partial results are covered; a failing adapter can be disabled independently.
- Verification **EV-016**: provider-specific test suites and permitted end-to-end handoffs. S8+; blocked on provider selection/access.

## 7. Human-and-agent interface contract

| Action | Authority and confirmation | Result / recovery |
| --- | --- | --- |
| get_my_profile / find_matching_content / explain_match | Authenticated read; source and owner checks on each call | Bounded authorized records; partial/empty/denied distinct |
| suggest_profile_update | Draft only, tied to finalized user evidence | Editable candidates; never changes approved taste |
| confirm_profile_from_interview / accept_profile_update | Explicit user recap decision, selected versions and recap hash | New approved version + receipt; stale recap requires review |
| save_content / add_trip_stop / move_trip_stop | Clear user action, current revision; no repetitive confirmation | Visible committed result and undo command |
| propose_itinerary_adaptation / apply_trip_proposal | Source adaptation rights; exact preview for generated bulk change | Proposal then transaction; reject/expire/stale safely |
| publish_content | Explicit sanitized preview, publish authority and moderation | Submitted versus published states; withdrawal supported |
| refresh_and_handoff | User-selected allowlisted partner/context | Fresh terms or unavailable; no purchase tool |

One active controller per conversation spans text/voice. Switching modes stops the prior active generation and checks receipts before continuing. A spoken “the second one” resolves against a versioned displayed selection; ambiguous or changed cards require clarification. Tool schemas cap candidates, payload size, retries and results. Provider/review text is data, never trusted instructions. Do not store hidden reasoning. Logs contain IDs, timing, redacted errors and minimal usage.

Proposed lifecycle defaults carried from source: guest browse/session drafts expire after 24 hours; unconfirmed interview candidates after seven days; diagnostic/input snapshots after 30 days; saved conversations only when explicitly saved. Approved preferences and owned trips persist until changed/deleted. Provider retention and backup expiry must be separately documented before beta; these application defaults do not assert provider-side deletion.

## 8. Engineering loops

### Loop A — One ticket to one verified behavior

1. **Contract:** choose a 0.5–2 engineering-day slice, linked REQ/AC IDs, entry/exit state, exclusions and risk. Larger work is split before coding.
2. **Inspect:** read repository instructions, relevant code and current dependency docs; record baseline and any source-plan conflict. Do not rebuild existing working functionality without inspection.
3. **Isolate:** use a task worktree/branch, with independent ports/test data where needed. Check overlapping changes and migration order.
4. **Implement:** complete the thin UI → API → persistence path. Use typed contracts and the repository’s established architecture.
5. **Verify:** run targeted unit/integration checks for rules and state; exercise the real runtime for UI/device claims. Mocks alone cannot pass live integration gates.
6. **Review:** inspect authorization, migration, error states, accessibility, cost and scope; fix concrete findings. Default maximum five review iterations, then record the blocker rather than loop indefinitely.
7. **Integrate:** submit a small PR with AC-to-evidence links, actual commit/device/build, checks, limitations and rollback. Human reviewer owns merge; release approval is separate.
8. **Measure:** after an authorized cohort release, compare decisions, failures and usage against the ticket hypothesis; feed one concrete next action into backlog.

Stop optional testing once relevant risk is resolved. Documentation-only changes need document validation, not invented runtime tests. Failed runtime checks are recorded as failed/blocked, never relabeled passing because a screenshot looks correct.

### Loop B — Sprint learning and delivery

Use two-week sprints except S0/S7 below. Day 1: one outcome and capacity check; days 2–7: small end-to-end slices with daily demos; days 8–9: integration/device/user tasks; day 10: evidence review, retrospective and next-sprint decision. Verification occurs throughout, not only at sprint end. Reserve roughly 25% of capacity for integration, fixes and unknowns; re-estimate using completed work, not generated code volume.

Daily update: demonstrated outcome, failing evidence, next experiment and blocker owner. WIP default: one implementation ticket per engineer; finish/review before starting another. One migration owner coordinates schema changes. Work that misses acceptance returns to backlog with its actual state.

### Loop C — Matching and model improvement

Version dataset, taxonomy, scoring weights, prompt, model and retrieval policy. Establish destination-only/content-only baselines. Run deterministic constraints plus held-out human judgments. Inspect specific failures, change one causal factor, rerun affected evals and release behind a flag only if guardrails pass. User corrections become evidence; a click/save never silently rewrites approved preferences. Model scores are advisory, not a substitute for human calibration.

### Loop D — Economics and reliability

Weekly: reconcile provider usage, inspect unallocated spend, slow sessions, poor-fit reports and support work. Segment voice/text and successful/abandoned trips. Identify the largest avoidable cost, change a bounded policy and check whether decisions worsen. Maintain independent kill switches for voice, AI adaptation, provider enrichment and publication.

## 9. Sprint roadmap and ordered work

**Planning assumption:** two full-time engineers (mobile and backend, sharing integration), fractional product/design, and founder-led content/research. S0 = one week; S1–S6 = two weeks each; S7 = one week: **14 weeks to a controlled-beta decision**, not a guaranteed launch. Provider access, source rights, staffing and voice feasibility can change this. A solo engineer should keep the order and re-estimate after the first slice rather than promise the same schedule. Acquisition of content/participants runs alongside engineering and is a release dependency.

| Sprint | User outcome / ordered tickets | Dependencies | Demo and exit gate |
| --- | --- | --- | --- |
| S0 · week 1 | S0.1 inspect repo or record greenfield; choose versions/environments. S0.2 native audio/CopilotKit device spike with temporary fixtures and metering. S0.3 choose pilot city/cohort; permission inventory; source rubric | Device/build access, provider development credentials, accountable owners | Physical iOS + Android bidirectional audio and interruption evidence; authenticated native runtime call; feasible content supply and actual spend ceiling. If voice fails, keep text path and resolve spike before voice commitment |
| S1 · weeks 2–3 | S1.1 auth/owner isolation + basic telemetry/limits. S1.2 text interview, recap and profile/context commit. S1.3 create/save/reopen an owned empty/manual trip; CI/release-build baseline | S0 architecture decisions | Traveler types → approves profile → saves trip → restores it; cross-user and duplicate/stale commands denied. EV-001/002 and initial EV-003/012/013/014 |
| S2 · weeks 4–5 | S2.1 permissioned catalog/content ingestion and public projections. S2.2 candidate retrieval, deterministic matching and source-linked explanation. S2.3 show first real itinerary/review matches; evaluation baseline | S1; usable contributor supply | A real user profile produces traceable matches or honest insufficient coverage; withdrawal denies reread; EV-005/006. No fabricated seed travelers in demo presented as real |
| S3 · weeks 6–7 | S3.1 native cards/map/search state. S3.2 adaptation preview, trip revisions and manual board edits. S3.3 cancellation/replay/concurrency and retained-place telemetry | S2; permitted maps/catalog integration | Select a genuine itinerary, adapt it, move/remove a stop and restore the board on both platforms; EV-003/007/008 |
| S4 · weeks 8–9 | S4.1 production native voice adapter + session budgets. S4.2 finalized-turn extraction, editable recap and approved-memory integration. S4.3 lifecycle/network/Bluetooth recovery and voice-versus-text research | S0 audio proof; S1 profile; S3 board | Voice → approved profile → matched content → saved choice; denied mic switches to text with progress intact; EV-004 plus repeated EV-002/013/015 |
| S5 · weeks 10–11 | S5.1 shortlist/compare and source freshness. S5.2 provider handoff/redirect attribution. S5.3 review and sanitized itinerary submission; moderation workflow | S3 core; source/partner policy | Compare supported options, continue to partner, write a contextual review and submit a sanitized itinerary; EV-009/010/011. No click presented as booking |
| S6 · weeks 12–13 | S6.1 deletion/withdrawal/blocking across stores and derived content. S6.2 device accessibility, offline read and failure recovery. S6.3 cost reconciliation, load/backup-restore and release candidate | S1–S5 | Passing relevant EV-001–015; documented remaining limits; rollback/feature flags rehearsed; support owner ready |
| S7 · week 14 | S7.1 controlled distribution to invited travelers. S7.2 observe complete journeys and reconcile decisions/cost. S7.3 assess expand/revise/pause | Beta release gate passed; rights/cohort ready | Cohort report with counts, failure evidence, spend and decision. This week can start learning; it cannot prove long-term retention |
| S8+ · re-estimated | First chosen hotel/flight adapter; remaining category adapters; web companion; further cities/collaboration | Demonstrated core usefulness, permitted inventory access and sustainable cost hypothesis | EV-016 per adapter; independent rollout gates. No fixed dates until dependencies exist |

### Ticket sizing and readiness

Every sprint table item is an epic slice; split into reviewable tickets. Example first implementation ticket:

**S1.2a — Confirm a typed profile recap.** Depends on S1.1 actor boundary and profile migration. Input: validated typed candidate values and recap hash. Output: approved version ID and receipt. Include recap loading/error/conflict screen, transaction and owner checks, idempotent retry, analytic event. Exclude voice/public taste. Accept with AC-REQ-002-01/02; evidence EV-002. Estimated size is set after repository inspection; target no more than two engineering days.

Ticket template: ID/title; user outcome; dependencies; source REQ/AC; data/API/UI change; negative paths; migration; test/eval; runtime evidence; feature flag/rollback; status/owner. Statuses: Planned → Ready → In progress → Review → Verified → Released, or Blocked. “Verified” requires recorded evidence; “Released” requires actual cohort/build details.

### Definition of ready / done

Ready: actor/behavior/permissions clear; dependencies available; acceptance/failure cases specified; necessary design state and data contract supplied; missing credentials/provider access called out. Done: approved behavior implemented, targeted checks passing, required device evidence captured, no unresolved release-blocking finding, instrumentation/rollback documented and reviewer acceptance recorded. Passing a sprint demo alone does not satisfy all release requirements.

## 10. Evaluation, quality targets and release gates

Targets below are proposed acceptance thresholds, not observations, service-level promises or industry benchmarks. Revisit unrealistic values with measured evidence and a documented decision.

| ID / evidence | Quality and proposed threshold | Verification / rationale |
| --- | --- | --- |
| NFR-001 / EV-N01 | Zero cross-user disclosure, unauthorized mutation, silent publication or duplicate logical commits in the fixed test suite | Two-user API/row-policy/worker tests and replay/concurrency fixtures; D-002. Any failure blocks release |
| NFR-002 / EV-N02 | Explicit offline/error state; no loss of a confirmed profile/trip after restart/reconnect | Kill app/connection before and after commit on both platforms; D-001 |
| NFR-003 / EV-N03 | p95 owned-board API read ≤1 second; first usable match page ≤5 seconds; voice end-of-turn to first audible response target ≤2 seconds | Measure ≥30 samples per relevant path/device/network, report sample count and distribution; pilot targets only. Provider/network failure separately reported; D-003 |
| NFR-004 / EV-N04 | Zero unsupported critical claims or hard-constraint violations in release eval set; every explanation has source references | Deterministic source/constraint check plus human review; D-002 |
| NFR-005 / EV-N05 | Main journey usable on VoiceOver/TalkBack and 200% text scaling without hidden required controls | Native manual tasks on recorded device/OS/build; E-003/D-001 |
| NFR-006 / EV-N06 | All paid attempts metered or explicitly unreconciled; configured scope limits enforced under concurrency | Billing/request reconciliation and forced-limit tests; D-003 |
| NFR-007 / EV-N07 | Native release builds, not only development builds, pass the critical path on both platforms | Build/package/OS versions recorded; E-004/E-005 |

**Initial evaluation set:** 40 versioned cases assembled during S0–S2: 12 ordinary travel contexts, 8 incomplete/contradictory profiles, 8 source/freshness/constraint failures, 6 authorization/injection attempts and 6 replay/lifecycle/budget failures. Label synthetic cases as fixtures. Split 24 development and 16 held-out cases; expand with every production failure. This is a useful starting corpus, not statistical assurance.

Human relevance study: recruit 10 external travelers from the proposed segment, record context/coverage, randomize the presentation order of matched versus destination-only results, and ask which options they would keep and why. Report paired selections and qualitative reasons; do not claim significance from this small convenience sample. Proposed decision rule: continue the matching direction if at least 7/10 prefer the matched set and there are no critical trust failures; otherwise inspect coverage/ranking/interview errors before broadening scope. Task success is assessed separately from preference.

Device matrix: physical iPhone and physical Android, plus at least one lower-memory Android and supported small/large screen configurations; chosen OS support range recorded in S0. Cover denied permissions, interrupted calls, Bluetooth changes, foreground/background, network switch/loss, force quit, large text and screen reader. Simulator evidence supplements physical voice tests.

Release gate for controlled beta: relevant REQ-001–015 criteria verified or an explicitly scoped exclusion removes the feature from the cohort; no NFR-001/NFR-004 blocker; source permissions and useful coverage confirmed; accountable support/moderation owner; cost ceiling, metering, deletion and rollback functioning; native distribution reviewed. Public store release additionally needs current platform-policy review, actual privacy/provider disclosures and commercial scope decisions. This PRD does not claim those reviews occurred.

## 11. Product measurement and cost economics

Baseline for every metric is **unknown**. Exclude staff/test accounts from product cohorts; retain them separately for operational diagnostics. Report sample counts and trip duration/intent. A meaningful two-stop weekend is not worse merely because another trip has more stops.

| Metric | Definition, window and instrumentation | Owner / decision |
| --- | --- | --- |
| Retained places per started trip | Sum of distinct canonical place IDs on the latest board snapshot per eligible trip / all non-test started trips in cohort; show zeros and median; 7-day planning window | Product; assess weekly against destination-only or prior cohort, not raw add count |
| Outbound booking intent per trip | Distinct trip/place/provider/day redirect clicks / same eligible trip cohort; transport retries deduplicated | Product; separate repeated human clicks, confirmed bookings and paid commissions |
| First decision activation | New eligible users retaining ≥1 place within 24h of first planning session / all new eligible users starting that session | Product; first 20 invited-user outcomes establish a baseline; diagnose drop-off before buying acquisition |
| Time to first retained choice | First retained-add timestamp minus planning-session start, plus abandonment rate | Product; compare voice/text by comparable context; shorter is useful only if quality holds |
| Interview accuracy | Accepted without correction, corrected, rejected and unknown candidate counts / reviewed candidates | Product/design; prioritize misinterpreted hard requirements; no hidden inferred preferences |
| Next-trip return | Users starting a distinct later trip / activated cohort with 30/90/180 days of follow-up; show eligible counts and reported next-trip opportunity | Product; report later, never infer long-term retention from S7 |
| Poor-fit / trust failures | Reports of incorrect facts, hidden tradeoffs, source issues and constraint failures / exposed assessments, with severity/counts | Engineering/content; critical incidents disable affected path |
| Variable cost per started trip | All attributed API/model/voice/compute usage plus allocated abandoned/no-trip cohort spend / started trips | Engineering; weekly reconciliation, plus cost per retained decision |

Authoritative events: profile_confirmed, trip_started, match_exposed, source_opened, place_added, place_removed, retained_snapshot, outbound_clicked, review_submitted and content_withdrawn. Each has event/schema version, server actor/session scope, trip ID when applicable, command/request ID, content/assessment version, occurred_at and is_internal. Never include raw voice, private chat or exact private budget in analytics. Exposure requires an actual visible impression rule, not merely API retrieval. Persist writes from receipts; keep telemetry separate from learning consent.

Proposed investigation thresholds from the source: average variable technology spend around USD 1 per started planning trip; investigate trips above USD 3; voice onboarding target around USD 0.25. These are research-budget hypotheses, not fixed prices or approved hard caps. In S0, owner sets real global/day and user/session ceilings from available funds. Meter voice inside total trip spend to avoid double counting. Historical web map-load examples must be recalculated for native SDKs and actual rate versions.

Monthly economics: all variable spend, fixed infrastructure, build/distribution services, moderation/content/support effort and acquisition costs; separate development/founder costs. A booking click generates no assumed revenue. Net contribution uses actual collected app revenue/confirmed payable commissions minus attributable costs. Pricing is tested separately; no subscription or paid launch depends on invented lifetime value.

## 12. Content operations and cold-start dependency

Founder/content owner begins in S0. Proposed starting supply target, inherited from the source: five independent contributors, 15 adaptable itineraries and 30 firsthand reviews in one city. Counts are planning inputs; they do not establish relevance. Record rights scope, attribution, authorship, public taste consent, dates/context, authenticity state and withdrawal contact.

Before inviting a traveler, check whether at least three meaningfully distinct suitable itineraries and relevant review evidence exist for their needs. If not, narrow recruitment or explicitly offer content-only discovery with limited coverage. Do not fabricate peers or treat one prolific creator as consensus. Product progress is blocked if the promised matched-human-content experience has no valid supply, even when every screen works.

Moderator queue must support submit, approve, request changes, hide, withdraw and report resolution. Source withdrawal is a product event with immediate permission enforcement, not only a periodic cleanup task. The operator records real disposition; no fictional moderation history.

## 13. Delivery, migration and rollback

Development, staging and production use distinct credentials/data. No copied private production data in fixtures. CI performs type/lint checks, relevant deterministic tests, migration checks and release bundle builds; device runs provide additional evidence. Pin dependencies after the native integration spike, not from memory.

Deploy schema changes using expand → compatible code → backfill if necessary → verify → later contract. Run migrations from empty and prior supported schema; verify constraints and row policies with two actors. Keep old mobile clients working across a documented minimum supported version window. Destructive migrations wait until clients/data have moved; rolling back application code cannot safely undo arbitrary data loss.

Feature flags: voice_interview, matched_content, ai_adaptation, category/provider search, public_submission. Rollout: team dogfood → invited 5 → up to 20 controlled-beta travelers → reassess expansion. Do not auto-expand by calendar. Keep prior compatible server/build available; mobile binary rollback distribution differs from server rollback, so prefer disabling a failing feature safely while preparing a corrected build.

Rollback triggers: unauthorized access/publication, corrupted approved state, fabricated critical claims, sustained command failures or runaway spend. On-call owner disables the affected feature/provider, preserves manual trip access, cancels runaway runs, reconciles committed receipts and fixes the cause. Use forward repair for incompatible data changes. Re-enable only after the failing case joins the regression suite and passes. Record actual cohort, build, incident and resolution; no silent resetting of metrics.

## 14. Dependencies, assumptions and decisions

| Item | Owner / due | Proposed default | Effect if unresolved |
| --- | --- | --- | --- |
| Existing repository and real implemented scope | Engineering / S0 day 1 | Audit before scaffolding; preserve useful work | Estimate remains provisional |
| Team capacity and named reviewer | Founder / S0 | Two engineers plus fractional design/content support | Re-estimate sprint duration; no fixed launch promise |
| Pilot city and participant/content supply | Founder/content / S0, gate S2 | One city meeting source-coverage criteria | Blocks matched-content beta |
| Native audio adapter, model availability and provider terms | Engineering / S0 | Measured development-build spike; replaceable provider | Blocks voice completion, not text/profile development |
| Hosting region, retention and privacy disclosures | Founder/engineering / before external-data beta | Document actual services and processing; no compliance claims | Blocks external-data release |
| Budget ceiling and rate ledger | Founder/engineering / S0 | Explicit global and actor caps; real paid-provider rates | Blocks unbounded paid execution |
| Auth method and account lifecycle | Engineering/product / S0 | One supported method with session recovery | Blocks S1 identity integration |
| Hotel/flight/experience inventory and partner permissions | Product/integrations / before S8 | One adapter at a time; no unsupported availability | Blocks relevant category, not core beta |
| Public numeric match policy | Product / post-S2 eval | Reason statements; internal versioned index | Numbers remain hidden pending evidence |
| App price, affiliates and store commercial flow | Founder / before paid release | Controlled beta as a capped research cohort | No payment/subscription implementation until decided |

## 15. Traceability and implementation handoff

| Source/rationale | Requirement | Acceptance | Evidence | Sprint | Current result |
| --- | --- | --- | --- | --- | --- |
| E-001/E-007/D-004 | REQ-001 | AC-REQ-001-01/02 | EV-001 | S1 | Pending |
| E-001/E-003 | REQ-002 | AC-REQ-002-01/02 | EV-002 | S1/S4 | Pending |
| E-004/D-002 | REQ-003 | AC-REQ-003-01/02 | EV-003 | S1–S3 | Pending |
| E-003/E-005/E-006 | REQ-004 | AC-REQ-004-01/02 | EV-004 | S0/S4 | Pending |
| E-001/D-002 | REQ-005 | AC-REQ-005-01/02 | EV-005 | S2/S6 | Pending |
| E-001/D-002 | REQ-006 | AC-REQ-006-01/02 | EV-006 | S2 | Pending |
| E-003/D-001 | REQ-007 | AC-REQ-007-01/02 | EV-007 | S3 | Pending |
| E-001/E-003/D-002 | REQ-008 | AC-REQ-008-01/02 | EV-008 | S3 | Pending |
| E-003 | REQ-009 | AC-REQ-009-01/02 | EV-009 | S5 | Pending |
| E-001/E-003/D-002 | REQ-010 | AC-REQ-010-01/02 | EV-010 | S5/S6 | Pending |
| E-003/D-002 | REQ-011 | AC-REQ-011-01/02 | EV-011 | S5 | Pending |
| E-002/D-003 | REQ-012 | AC-REQ-012-01/02 | EV-012 | S0–S6 | Pending |
| D-003 | REQ-013 | AC-REQ-013-01/02 | EV-013 | S1–S6 | Pending |
| E-001/D-002 | REQ-014 | AC-REQ-014-01/02 | EV-014 | S1/S6 | Pending |
| D-001/D-003 | REQ-015 | AC-REQ-015-01/02 | EV-015 | All; gate S6/S7 | Pending |
| E-003 | REQ-016 | AC-REQ-016-01/02 | EV-016 | S8+ | Pending provider access |

Evidence receipt template: EV ID; REQ/AC IDs; commit/build; environment/device/OS; data/fixture version; expected behavior; actual result; capture/log location; reviewer; date; pass/fail/blocked. This connects observed results back to source intent without claiming that passing engineering checks proves demand.

**Readiness: READY WITH ASSUMPTIONS for Sprint 0 feasibility and planning.** Full implementation commitment and external beta release remain gated by the named dependencies above. No app code, device test, deployment, customer study or provider purchase was performed for this document. Before starting implementation, record the PRD revision accepted by the founder, actual repository/capacity and S0 owners. The first work item is S0.1; the first product slice is S1.2a after the identity boundary exists.


## 16. Software-factory execution receipt — S0.1

September 23, 2026. The user requested use of the software-factory skill after receiving this PRD. Proceed with factory preflight and preparation of the first implementation slice. This does not approve production deployment, provider spending or unresolved commercial decisions.

### Task contract

| Field | Contract |
| --- | --- |
| Source | XPMatch-Build-PRD.md v1.1, preserving v1.0 product scope |
| First task | S0.1: inspect the application repository and establish the native development baseline |
| Outcome | An isolated, reviewable task checkout with a verified repository-native build/check procedure and a scoped next ticket |
| Traceability | Supports REQ-003/004/015 and EV-003/004/015; S0.1 alone does not satisfy those product acceptance criteria |
| In scope | Repository instruction/code/dependency audit; existing feature inventory; native build capability check; task isolation; gap-based implementation plan |
| Out of scope | Recreating an existing app blindly, bulk implementation of all sprints, public release, new paid services, live customer data |
| Risk | Low for read-only preflight; reassess before auth, schema, media or provider changes |
| Required evidence | Repository/default branch/worktree identity; exact baseline check commands/results; installed versions; native runtime availability; known implementation versus PRD gaps |
| Stop condition | No repository supplied; ambiguous overlap; credentials/runtime needed for a specific check; material conflict with approved product direction |

### Observed preflight results

| Check | Result | Evidence / consequence |
| --- | --- | --- |
| PRD available | Passed | Read local XPMatch-Build-PRD.md and its dependency table |
| Application checkout | Blocked | git status --short --branch reports that /workspace/scratch/907214e0b239 is not a Git repository |
| Project instruction/manifests | Not found in available workspace search | No AGENTS.md, package.json, Expo app configuration or workspace manifest found by the targeted file search |
| Default branch, active changes and overlapping PRs | Untested | Requires the actual application repository |
| Isolated worktree | Not created | Repository source is missing |
| Build, tests, native audio, device validation | Untested | No application project available; no runtime correctness claim |
| External actions | None | No push, PR, merge, deployment or provider purchase |

**Current execution status: BLOCKED on repository selection.** This is a missing implementation input, not a request to reapprove the existing stack. The software-factory preflight requires inspecting the actual code and using its conventions before changes. The earlier founder-used prototype has not been supplied, so absence of code here is not evidence that no code exists.

### Resume procedure

1. Receive the existing repository URL/checkout/project archive, or an explicit instruction to start a new project.
2. Inspect repository instructions, working state, existing mobile/backend code, dependency lockfiles, checks and related active changes. Run the factory doctor for the actual repository.
3. Preserve existing work; create/verify an isolated task worktree. Record actual baseline checks and unavailable native tooling.
4. Reconcile the result with S0.2 and the first functional slice. For a new project, establish the Expo/TypeScript shell and shared contracts first; for an existing project, implement only the missing prerequisites.
5. Complete the smallest coherent change, collect evidence on the tested revision, review the diff, and present the result and remaining device/provider checks. External distribution remains a separate action.
