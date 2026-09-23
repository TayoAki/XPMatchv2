# XPMatch data shape (v0.1, approved)

| Field | Value |
| --- | --- |
| Status | **Approved** by the founder on 2026-09-23, with plan revision v1.2 as a whole (D-005, draft 10). Decisions D-041 to D-045 were approved the same day. Record later changes as a new version of this document |
| Date | 2026-09-23 |
| Inputs | PRD v1.1 §5 (entity groups M01–M08, state and write rules) and REQ-002, REQ-005, REQ-006, REQ-008, REQ-010. Plan §4, §6, §7, A-006 and D-033 to D-036. AGENTS.md. UI plan §6–7 |
| Defines | The taste vocabulary (taxonomy 0.1); what to collect from contributors; field-level shapes for the tables the core loop uses; the option card contract; matching and planner rules v0 |
| Decisions | D-041 to D-045 (new, §9) |
| Not in this revision | Social, messaging and moderation fields (tables named in plan §7); API endpoints; SQL (it lands in `db/migrations` from S0.1, after approval) |

## 1. Summary

1. **One vocabulary ties the product together.** Each taste "dimension" is used in five places:
   - it's asked in the survey or voice interview;
   - it's stored in the traveler's profile;
   - it's tagged on each stop of a contributor's trip;
   - it's scored by matching;
   - it's shown on the card as a ✓ fit, ⚠ catch or ? unknown line.

   Taxonomy 0.1 has 15 dimensions (§3).
2. **Unknown stays unknown.** A missing answer or a missing fact never counts as a fit. It lowers the option's *coverage*, and the card says what isn't known (PRD REQ-002, REQ-006; AGENTS.md).
3. **Must-haves filter; everything else ranks.** A must-have removes options that fail it. The other dimensions add weighted evidence. Whether unknown evidence passes a must-have depends on the kind of must-have (D-042).
4. **Cards are built from stored facts, not free AI text.**
   - Every ✓, ⚠ and ? line cites a matching component and the fact behind it.
   - The model may reword lines, but only from those components, and it never chooses or orders stops.
5. **Collect contributors' trips in this shape now.** The capture template (`XPMatch-contributor-capture-template.md`) records exactly what matching needs. Trips collected in another shape would have to be collected again.

## 2. Rules every shape follows

- **Identifiers and time:** UUID keys; UTC timestamps plus the city's IANA time zone; local dates for trips; local times for opening hours.
- **Money:** integer minor units plus an ISO 4217 currency plus a basis, for example `per_person_per_meal`.
- **Writes carry the envelope:**
  - a server-derived actor;
  - a request ID, command name and schema version;
  - an idempotency key and the expected revision.

  A repeated key with the same payload returns the original `mutation_receipt`; a different payload is a conflict.
- **Versions:** approved profile versions are immutable; trips and option drafts carry a `revision` for conflict checks.
- **Public and private are separate projections:**
  - a contributor's private fields (contact details, their own spending) never appear in a public read (REQ-005 AC-01);
  - a traveler's private notes, messages and dietary needs never reach the model, analytics or logs (AGENTS.md; D-045).
- **Access:** every owner table has a row policy on its owner column, and that column is indexed. Every list is paginated with a cursor.
- **Taxonomy:** values reference `taxonomy_version`. Changing the vocabulary makes a new version; old profiles keep theirs until they're re-approved.

## 3. The taste vocabulary (taxonomy 0.1)

### 3.1 How one dimension travels through the product

| Stage | Example: `crowds` |
| --- | --- |
| Question | Survey screen 5, "Anything that's a must?", choice **No long queues** |
| Profile | `preference_value { dimension: crowds, value: avoid, importance: must }` |
| Stop fact | Contributor Ana, for Café Lumen: queue **short**, "after 11:30" (`published_stop.queue`, `queue_when`) |
| Match | `match_component { dimension: crowds, outcome: partial }`: a short queue at a known time |
| Card | ⚠ *Short wait after 11:30* |

### 3.2 Dimensions

**Importance** is one of:
- **must:** a hard filter;
- **prefer:** weighted;
- **avoid:** a dealbreaker (weighted negative, or a filter when it's also a must);
- **neutral.**

**Captured by:**
- **S** means survey screen n (D-034), and **V** means the voice interview;
- **C** means chat, as a trip-only override;
- **L** means learned: a suggestion from ratings that the traveler approves.

| # | Key | What it means | Values | Captured by | Must-have? | Stop evidence | Card lines |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `pace` | How full a day is | `relaxed` · `moderate` · `packed` | S1, V, C | No | Planner input only (3, 4 or 5 stops a day, A-006) | Plan header: "Relaxed pace · 3 stops a day" |
| 2 | `day_start` | When the day starts | `early` (before 9) · `standard` (9–10) · `late` (after 10, "slow mornings") | S1, V, C | No | Place hours; the contributor's best time to go | ✓ Slow mornings: opens 10:30 · ⚠ Best before 9 · ? Morning hours not confirmed |
| 3 | `dinner_time` | When dinner happens | `early` (by 19:00) · `standard` (19:00–20:30) · `late` (after 20:30) | V, C, L (default `standard`) | No | Kitchen hours | ⚠ Kitchen closes at 21:00 |
| 4 | `interests` | What they'd cross town for (up to 5) | `food_drink` · `history_architecture` · `art_museums` · `nature_parks` · `markets_shopping` · `neighborhoods_walks` · `views_photography` · `nightlife_music` · `live_performance` · `wellness` · `crafts_workshops` | S2, V, C | No | `interest_tags` (1–3 per stop) | ✓ Art & museums |
| 5 | `food_styles` | Food they love on a trip | `seafood` · `local_classics` · `street_food` · `coffee_bakeries` · `wine_bars` · `cocktail_bars` · `fine_dining` · `vegetarian_forward` · `international` | S3, V, C | No | `cuisine_tags` (food stops only) | ✓ Seafood |
| 6 | `dietary_needs` | Diets they need. **Sensitive** (D-045) | `vegetarian` · `vegan` · `gluten_free` · `halal` · `kosher` | S3 (optional), V | Yes: **must** by default | `dietary` per need: `yes` · `limited` · `no` · `unknown`, with a source and a checked date | ✓ Vegetarian options (menu checked Sep 2026) · ? Vegan options not confirmed: ask the venue |
| 7 | `budget_meal` | What a meal out costs per person | A range in minor units and currency, basis `per_person_per_meal`. Survey bands come from the city's config | S4, V, C | Yes | The venue's price range per person (`place_fact`) | ✓ €20–30 per person · ⚠ Above your usual dinner budget (€40–60) · ? Price not known |
| 8 | `budget_activity` | What a ticket or activity costs per person | Same, basis `per_person_per_ticket` | S4, V, C | Yes | Listed ticket price | ✓ Free · ⚠ €38 ticket, above your usual · ? Price not known |
| 9 | `fame` | Famous sights versus local favorites | `classics` · `mix` · `local_favorites` | S2, V, C | No | `place.fame`: `landmark` · `well_known` · `local_favorite` (the operator sets it) | ✓ A local favorite · ✓ One of the classics · ⚠ Very popular with visitors |
| 10 | `crowds` | Tolerance for crowds and queues | `avoid` · `fine` · `lively_ok` | S5 (as must), V, C, L | Yes (flagged path, D-042) | `crowd_level` at the recommended time; `queue` (`none` · `short` · `long`) and when | ✓ Quiet at that time · ⚠ Long queue after 10:00 · ? Crowds not known |
| 11 | `atmosphere` | The feel they want | `quiet_cozy` · `lively` · `romantic` · `casual` | S5 ("Quiet places"), V, C, L | Yes (flagged path) | `atmosphere_tags` | ✓ Quiet enough to talk · ⚠ Lively and loud |
| 12 | `walking` | How much walking and climbing | `lots` · `some` · `minimal` | V, C, L (default `some`) | No | `walking_effort`: `easy` · `moderate` · `strenuous` | ✓ Easy walk · ⚠ Steep climb up to the terrace |
| 13 | `step_free` | Needs step-free access | `needed` (a flag) | S5, V | Yes: **must**, strict (D-042) | `step_free`: `yes` · `no` · `unknown`, with a source and date | ✓ Step-free access (checked Sep 2026) |
| 14 | `bookings` | Booking style | `book_ahead_ok` · `walk_in_preferred` | S5, V, C, L | Yes (flagged path) | `booking`: `required` · `recommended` · `walk_in`; lead days | ✓ Walk-in friendly · ⚠ Book about 14 days ahead · ? Booking needs not known |
| 15 | `trip_context` | Who's going and why (per trip, never in the profile) | Party: `solo` · `couple`. Purpose: `first_visit` · `return_visit` · `celebration` · `food_trip` · `culture_trip` · `slow_break` | C (the trip request) | No | The stop's `suits` tags (`solo`, `couples`, `special_occasion`) | ✓ Good for couples · ✓ Good for a celebration |

**The source line** under every option is built from the contributor's trip, not from the vocabulary:
> From Ana's trip · couple · 3 days · May 2026

- It shows only the fields the contributor's permission covers.
- It never shows exact dates, companions' names or spending (§8).

### 3.3 The survey (D-034: five one-tap screens, each skippable)

| Screen | Questions | Dimensions |
| --- | --- | --- |
| 1 Pace | "How full should your days be?" Relaxed (3 stops a day) · Moderate (4) · Packed (5). "When do you like to start?" Early (before 9) · Around 9–10 · Late: slow mornings | `pace`, `day_start` |
| 2 Interests | "What would you cross town for? Pick up to 5" (11 chips). "Famous sights?" Yes, the classics · A mix · Skip the famous stuff | `interests`, `fame` |
| 3 Food | "What do you love eating on a trip?" (9 chips). "Any dietary needs?" (optional; five chips). Text under the chips: "Only used to filter places for you. Never shared, and never sent to our AI." | `food_styles`, `dietary_needs` |
| 4 Budget | "Dinner out, per person": four bands in the city's currency. "A ticket or activity, per person": four bands | `budget_meal`, `budget_activity` |
| 5 Must-haves | "Anything that's a must?" No long queues · Quiet places · Step-free access · Walk-in, no bookings · Stay within my budget · (dietary needs chosen on screen 3 are already on) · Nothing else | `crowds`, `atmosphere`, `step_free`, `bookings`, budget importance |

- **Skipping:** a skipped question is stored as `answer_status: skipped`. It's never filled with a default that counts as a fit.
- **Defaults:** `dinner_time` and `walking` start as defaults marked `not_asked`. They're used by the planner but never shown as a fit.

### 3.4 The voice interview (3–5 questions, REQ-004)

| Question (spoken) | Dimensions it can fill |
| --- | --- |
| "Tell me about a day on a trip that you loved. What made it good?" | `interests`, `pace`, `atmosphere`, `fame` |
| "How do you like your mornings and evenings when you travel?" | `day_start`, `dinner_time` |
| "What do you love eating, and is there anything you can't eat?" | `food_styles`, `dietary_needs` |
| "Roughly what's a normal dinner for one person when you travel?" | `budget_meal` |
| "Anything that spoils a trip for you?" | Must-haves: `crowds`, `bookings`, `step_free`, `atmosphere` |

- **How answers become a profile:**
  - each extracted value is a candidate linked to the traveler's final spoken turn (`preference_evidence`);
  - partial or assistant speech never counts (AC-REQ-004-02);
  - the recap shows the candidates for correction and approval, exactly like the survey.
- **Dietary needs heard by voice:** reach the recap as candidates, but the audio excerpt and transcript for them are not stored as evidence (D-045).

### 3.5 Left out of 0.1, on purpose

- **Allergies.** XPMatch can't confirm allergy safety, so it doesn't ask. Cards for food stops always say "Check allergies with the venue" in the detail sheet.
- **Children, pets, group size.** The pilot is solo travelers and couples.
- **Hotels and flights.** Not in MVP-1 (plan D-013).
- **Detailed accessibility** beyond step-free access. It's a candidate for 0.2, with advice from people who need it, rather than guessed.
- **Free-text "vibes".** Anything the vocabulary can't hold stays in the chat as a trip-only note and doesn't affect matching until 0.2 adds a dimension for it.

## 4. Contributor capture (collect in this shape now)

The form itself is `docs/design/XPMatch-contributor-capture-template.md`. It maps to the fields below.

**The minimum for a stop to be matchable:**
- the place;
- the day and order;
- the time of day;
- the category;
- at least one interest tag;
- the contributor's rating;
- a catch, or "no catch noticed".

Everything else may be `unknown`. Unknowns only lower that stop's coverage.

| Template question | Field |
| --- | --- |
| Trip: month and year, length, who with, purpose, pace | `published_itinerary.month`, `year`, `length_days`, `party`, `purpose`, `pace` |
| Trip: your travel taste (optional, public only with consent) | `contributor.public_taste`, using the same vocabulary |
| Stop: day, order, time of day, rough start time, time spent | `published_stop.day`, `position`, `time_of_day`, `start_time_local`, `duration_band` |
| Stop: place name and map link | Resolved by the operator to `place.id` |
| Stop: what kind of place, what it's good for, food style | `category`, `interest_tags`, `cuisine_tags` |
| Stop: rating (loved it / fine / not for me) | `published_stop.rating` |
| Stop: why it worked for you | `why_it_fit` (public, with permission) |
| Stop: the catch | `the_catch` or `catch_none` |
| Stop: best time or tip | `best_time_tip` |
| Stop: would you skip it next time? | `would_skip`, `skip_reason` |
| Stop: crowds and queue | `crowd_level`, `queue`, `queue_when` |
| Stop: booking | `booking`, `booking_lead_days` |
| Stop: dietary options noticed | Contributor-sourced `place_fact` rows (`dietary`) |
| Stop: step-free access, stairs or hills | `place_fact` (`step_free`), `walking_effort` |
| Stop: atmosphere | `atmosphere_tags` |
| Stop: what it cost per person (a range) | `price_range` (matching evidence only; never published as the contributor's spending, D-043) |
| Stop: photos you took (optional) | `media_asset`, only with a photo permission |
| Permissions | `content_permission.scopes` |

**What the operator adds** (not asked of contributors):
- the catalog place and its area;
- opening hours with a checked date;
- the venue's listed prices;
- `fame`;
- step-free and dietary facts checked with the venue.

## 5. Entities and fields: the core loop

Every table has `id uuid`, `created_at` and `updated_at`. Roots that can be edited concurrently also carry `revision int`.

The **Type** column uses these conventions:
- `enum(…)` values come from §3 or are listed inline;
- `money` means `{min_minor int, max_minor int, currency char(3), basis enum}`;
- `?` means nullable.

### 5.1 Identity, profile and settings (M01)

| Table | Field | Type | Notes |
| --- | --- | --- | --- |
| `app_user` | `auth_provider` | enum(apple, google) | With `auth_subject`: unique; bound to the verified subject (REQ-001) |
| | `auth_subject` | text | |
| | `age_confirmed_at` | timestamptz | The 18+ confirmation at sign-in |
| | `terms_version` | text | |
| | `home_currency` | char(3)? | For showing budgets |
| | `is_internal` | bool | Staff and test accounts are excluded from metrics |
| | `deleted_at` | timestamptz? | Deletion record kept separately |
| `account_settings` | `user_id` | uuid, primary key | REQ-030 |
| | `appearance_mode` | enum(system, light, dark) | |
| | `accent` | enum(pine, ocean, terracotta, plum, graphite) | |
| | `revision` | int | |
| `private_profile` | `user_id` | uuid, unique | |
| | `current_version_id` | uuid? | The approved version matching uses |
| `private_profile_version` | `profile_id`, `version_number` | uuid, int | Unique together |
| | `status` | enum(draft, approved, superseded, redacted) | Approved versions are immutable |
| | `source` | enum(survey, voice, edit, rating_suggestion) | |
| | `taxonomy_version` | text | "0.1" |
| | `recap_hash` | text | Confirming a stale recap fails (AC-REQ-002-02) |
| | `approved_at` | timestamptz? | |
| `preference_value` | `profile_version_id`, `dimension_key` | uuid, text | Unique together |
| | `value_keys` | text[] | Empty when unknown |
| | `importance` | enum(must, prefer, avoid, neutral) | |
| | `answer_status` | enum(answered, skipped, not_asked) | Unknown stays unknown |
| | `uncertain` | bool | Flagged "not sure" in the recap |
| | `sensitive` | bool | True for `dietary_needs` (D-045) |
| `spend_range` | `profile_version_id`, `category` | uuid, enum(meal, activity) | Unique together |
| | `range` | money | Basis `per_person_per_meal` or `per_person_per_ticket` |
| | `importance`, `answer_status` | as above | |
| `preference_evidence` | `preference_value_id` or `spend_range_id` | uuid | Exactly one is set |
| | `kind` | enum(survey_answer, voice_turn, chat_message, rating) | |
| | `source_ref` | uuid | The answer, final voice turn, message or visit |
| | `excerpt` | text? | Private. Not stored for sensitive values (D-045) |

### 5.2 Trip requests and the options draft (M02 subset)

| Table | Field | Type | Notes |
| --- | --- | --- | --- |
| `conversation` | `user_id`, `trip_id?`, `kind` | uuid, uuid, enum(planning, interview) | |
| `conversation_message` | `conversation_id`, `role` | uuid, enum(traveler, assistant) | |
| | `body` | text | **Private user content:** never sent to analytics or logs. Only the current request text reaches the model, to structure it |
| `plan_request` | `conversation_message_id` | uuid | What the traveler typed |
| | `city_id`, `length_days`, `length_defaulted` | uuid, int, bool | 3 days when unsaid (D-033), and the chips say so |
| | `start_date?`, `end_date?` | date | Local trip dates |
| | `party`, `purpose?` | enum | §3.2 #15 |
| | `trip_preferences` | jsonb: `[{dimension_key, value_keys, importance}]` | Trip-only overrides, validated against the taxonomy. Never written to the profile |
| | `change_target?` | jsonb: `{day_index?, slot_kind?}` | For typed changes like "cheaper dinner on day 2" |
| | `status` | enum(understood, needs_follow_up, city_not_open, invalid) | |
| | `parser_model_version`, `schema_version` | text | |
| `plan_proposal` | `plan_request_id`, `trip_id?` | uuid | `trip_id` is set for a rebuild |
| | `profile_version_id`, `context_snapshot_id` | uuid | |
| | `planner_version`, `match_run_id` | text, uuid | |
| | `status` | enum(draft, created, superseded, expired, kept, undone) | "created" means the itinerary was made from it |
| | `revision` | int | |
| `proposal_slot` | `proposal_id`, `day_index`, `slot_kind` | uuid, int, enum(morning, lunch, afternoon, dinner, evening) | |
| | `window_start`, `window_end` | time | Local, from pace, `day_start` and `dinner_time` |
| | `chosen_option_id?` | uuid | The option showing |
| | `fill_status` | enum(filled, not_enough_options) | The honest empty slot |
| `proposal_option` | `slot_id`, `rank` | uuid, int (1–4) | 1 is the default; 2–4 are alternatives (REQ-026: up to three) |
| | `place_id`, `source_stop_id`, `assessment_id` | uuid | |
| `proposal_event` | `proposal_id`, `slot_id` | uuid | Every change, for undo |
| | `from_option_id?`, `to_option_id` | uuid | |
| | `cause` | enum(swipe, arrow, typed_change, rebuild, undo) | |
| `mutation_receipt` | `actor_user_id`, `command`, `idempotency_key` | uuid, text, text | Unique together |
| | `request_hash`, `result_ref` | text, uuid | |

### 5.3 Places and contributors' content (M03)

| Table | Field | Type | Notes |
| --- | --- | --- | --- |
| `city` | `name`, `country_code`, `time_zone` | text, char(2), text (IANA) | |
| | `currency` | char(3) | |
| | `status` | enum(open, waitlist) | A city that isn't open gets a waitlist answer |
| | `price_bands` | jsonb | Survey bands per category, in minor units |
| `area` | `city_id`, `name` | uuid, text | |
| | `adjacent_area_ids` | uuid[] | Lets the planner keep half-days together |
| `place` | `city_id`, `area_id`, `name` | uuid, uuid, text | Operator-entered (A-002) |
| | `category` | enum(cafe, bakery, restaurant, bar, market, museum, gallery, landmark, place_of_worship, park_garden, viewpoint, beach, shop, neighborhood_walk, tour_activity, performance_venue, spa, other) | |
| | `lat`, `lng`, `address`, `official_url`, `partner_url?` | numeric, numeric, text, text, text | |
| | `fame` | enum(landmark, well_known, local_favorite, unknown) | |
| | `status` | enum(active, closed_permanently, unverified) | |
| | `hours_checked_on` | date? | "Opening days not known" when null |
| `place_hours` | `place_id`, `weekday` | uuid, int (0–6) | |
| | `opens`, `closes` | time (local) | |
| | `kitchen_closes?` | time | For `dinner_time` clashes |
| `place_fact` | `place_id`, `dimension_key`, `value_key` | uuid, text, text | Objective facts and contributor reports |
| | `detail` | jsonb | For example the price range as money |
| | `source` | enum(venue_listed, operator_checked, contributor_reported) | |
| | `source_stop_id?`, `checked_on?` | uuid, date | |
| `contributor` | `display_name` | text | Shown with permission |
| | `user_id?` | uuid | Operator-entered contributors may not have an account |
| | `public_taste?` | jsonb | Vocabulary values, only with the `public_taste` scope |
| | `contact` | text | Private: the operator only |
| `community_content` | `kind` | enum(itinerary, review, answer) | |
| | `contributor_id`, `current_revision_id` | uuid | |
| | `status` | enum(draft, submitted, published, hidden, withdrawn) | Reads check the status and a current permission |
| `content_revision` | `content_id`, `revision_number` | uuid, int | |
| | `public_body`, `private_body` | jsonb | Only `public_body` is ever served (REQ-005 AC-01) |
| | `moderation_status`, `published_at?` | enum, timestamptz | |
| `content_permission` | `content_id` | uuid | |
| | `scopes` | text[] | `in_app_matching`, `show_name`, `public_taste`, `web_publication`, `photos` |
| | `granted_at`, `withdrawn_at?`, `evidence_ref` | timestamptz, timestamptz, text | Withdrawal blocks reads at once |
| `published_itinerary` | `content_revision_id`, `city_id` | uuid | |
| | `month`, `year`, `length_days` | int | Never exact dates |
| | `party` | enum(solo, couple, friends, family) | The contributor's real party. The pilot matches solo and couple trips first |
| | `purpose?`, `pace` | enum | |
| `published_stop` | `itinerary_id`, `day_index`, `position` | uuid, int, int | |
| | `time_of_day` | enum(morning, lunch, afternoon, dinner, evening) | |
| | `start_time_local?`, `duration_band?` | time, enum(under_1h, 1_2h, 2_3h, half_day) | |
| | `place_id` | uuid | |
| | `rating` | enum(loved, fine, not_for_me) | The contributor's own |
| | `why_it_fit`, `the_catch?`, `catch_none`, `best_time_tip?` | text, text, bool, text | Public with permission, after moderation |
| | `would_skip`, `skip_reason?` | bool, text | |
| | `crowd_level?`, `queue?`, `queue_when?` | enum(quiet, moderate, busy), enum(none, short, long), text | |
| | `booking?`, `booking_lead_days?` | enum(required, recommended, walk_in), int | |
| | `interest_tags`, `cuisine_tags`, `atmosphere_tags` | text[] | Taxonomy keys |
| | `walking_effort?` | enum(easy, moderate, strenuous) | |
| | `suits` | text[] | `solo`, `couples`, `special_occasion` |
| | `price_range?` | money | Private: matching evidence only (D-043) |
| `review` | `content_revision_id`, `place_id` | uuid | |
| | `rating`, `text` | enum, text | |
| | `month`, `year`, `trip_type` | int, int, text | Never the visit date |
| | `label` | enum(from_xpmatch_trip, self_reported) | Never "verified" (D-031) |

### 5.4 Matching (M04)

| Table | Field | Type | Notes |
| --- | --- | --- | --- |
| `taxonomy_dimension` | `taxonomy_version`, `key` | text, text | Reference data |
| | `label`, `kind` | text, enum(planning, fit, context) | |
| | `values` | jsonb: `[{key, label}]` | |
| | `fit_text`, `catch_text`, `unknown_text` | text templates | The card lines |
| | `must_have_allowed`, `strict_when_unknown`, `sensitive` | bool | D-042, D-045 |
| | `default_weight` | numeric | |
| `context_snapshot` | `profile_version_id`, `plan_request_id` | uuid | |
| | `resolved` | jsonb | The profile plus trip-only overrides |
| | `hash` | text | Same inputs give the same hash |
| `match_model_version` | `version`, `weights`, `rules_hash` | text, jsonb, text | Versioned. Commission is never an input |
| `planner_version` | `version`, `params` | text, jsonb | Slot templates, windows, alternatives = 3 |
| `match_run` | `context_snapshot_id`, `match_model_version_id` | uuid | |
| | `status`, `candidate_count` | enum(running, complete, partial, failed, cancelled), int | |
| `match_assessment` | `match_run_id`, `target_kind`, `target_id` | uuid, enum(stop, place, itinerary, review), uuid | Exactly one typed target |
| | `eligible`, `ineligible_reason?` | bool, enum(fails_must_have, must_have_unknown, closed, withdrawn, other_city) | |
| | `coverage` | numeric (0–1) | |
| | `score?` | numeric | Null when coverage is too low (REQ-006: "withholds numbers"). Never shown to travelers as a percentage |
| `match_component` | `assessment_id`, `dimension_key` | uuid, text | |
| | `outcome` | enum(fit, partial, mismatch, unknown, not_applicable) | |
| | `weight`, `contribution` | numeric | |
| | `evidence_fact_ids` | uuid[] | Every card line cites these |
| `explanation` | `assessment_id` | uuid | |
| | `lines` | jsonb: `[{kind: fit/catch/unknown, text, component_id}]` | |
| | `wording_model_version?` | text | Optional model wording, validated to cite only given components |
| | `cache_key` | text | Built from the stop plus component outcomes, not the traveler, so it's reusable across travelers (AGENTS.md) |
| `feedback_event` | `user_id`, `target` | uuid, typed ref | |
| | `kind` | enum(useful, not_useful, report) | |

### 5.5 Trips and visits (M05, plus the founder's visit additions)

| Table | Field | Type | Notes |
| --- | --- | --- | --- |
| `trip` | `owner_user_id`, `city_id` | uuid | |
| | `title`, `length_days` | text, int | |
| | `start_date?`, `end_date?` | date | Check-ins need dates |
| | `party`, `purpose?` | enum | |
| | `current_revision_id`, `revision` | uuid, int | |
| | `status` | enum(active, archived, deleted) | |
| `trip_revision` | `trip_id`, `revision_number`, `parent_revision_id?` | uuid, int, uuid | Snapshots, so undo and Keep are exact |
| | `cause` | enum(create_itinerary, swap, move, remove, add_from_explore, typed_change, rebuild_keep, partner_edit, undo) | |
| | `actor_user_id` | uuid | |
| `trip_day` | `revision_id`, `day_index`, `local_date?` | uuid, int, date | |
| `trip_stop` | `day_id`, `position`, `slot_kind` | uuid, int, enum | |
| | `planned_start?` | time | |
| | `place_id`, `source_stop_id?`, `assessment_id?` | uuid | |
| | `clash_flags` | text[] | `closed_that_day`, `outside_dates`, `hours_unknown` |
| | `added_by_user_id` | uuid | "Added by" for partners |
| | `private_note?` | text | Private |
| `trip_source` | `trip_stop_id` | uuid | |
| | `channel` | enum(generated_plan, swap, explore, activity, partner, contributor_update) | |
| | `source_content_revision_id` | uuid | Lineage; sources never rewrite a trip silently |
| `visit` | `user_id`, `place_id`, `trip_stop_id?` | uuid | Private to its owner |
| | `local_date` | date | |
| | `status`, `skip_reason?` | enum(done, skipped), enum(ran_out_of_time, closed, didnt_appeal, other) | |
| | `rating?` | enum(loved, fine, not_for_me) | |
| | `private_note?` | text | Never sent to the model, analytics or logs |
| | `source` | enum(evening_checkin, after_trip, ive_been_here) | |
| `checkin_schedule` | `trip_id`, `local_date`, `send_at` | uuid, date, timestamptz | 8 pm in the city's time zone (D-030) |

**Named, fields in the next revision:**
- social tables: `public_profile`, `trip_share_setting`, `peer_pick_setting`, `activity_item`, `trip_member`, `trip_invite`, `stop_comment`, `contributor_question`;
- messaging: `conversation_participant`, `message`;
- operations and safety: `user_block`, `notification`, `push_token`, `partner_handoff`, `usage_event`, `content_report`, `moderation_action`, deletion records.

## 6. Matching and planning rules v0

These defaults are for the first evaluation. The relevance study and the planner evaluations tune them, and every change bumps `match_model_version` or `planner_version`.

### 6.1 Eligibility (filters)

A stop is left out when:
- its place is closed permanently, or its content is withdrawn, or its permission has expired;
- it's in another city;
- it fails a must-have: the evidence says `no`, or the price is above the maximum on a budget must-have.

A must-have with **unknown** evidence (D-042):
- **Strict** for `dietary_needs` and `step_free`: excluded, recorded as `must_have_unknown`.
- **Flagged** for `crowds`, `atmosphere`, `bookings` and budget: kept, with a ? line.

### 6.2 Components and weights

| Dimension | Default weight | Outcome rule |
| --- | --- | --- |
| `interests` | 3 | Any overlap: fit. No overlap: mismatch |
| `food_styles` (food stops) | 3 | Overlap: fit. None: mismatch |
| `budget_meal` / `budget_activity` | 2 | Stop's range within the traveler's: fit. Overlapping: partial. Above: mismatch. No price: unknown |
| `fame` | 2 | `local_favorites` with a local favorite, or `classics` with a landmark: fit. `local_favorites` with a landmark: mismatch. `mix`: fit for any |
| `crowds` | 2 | Judged at the slot's planned time when the report says when:<br>• `avoid` with quiet or no queue: fit.<br>• A short queue, or a busy period outside the planned time: partial, with a timing tip ("go at 12:15").<br>• Busy or a long queue at the planned time: mismatch.<br>• No report: unknown |
| `atmosphere` | 1 | Tag overlap: fit. A conflict (quiet wanted, lively place): mismatch |
| `day_start` / `dinner_time` | 1 | Open and good inside the slot's window: fit. Closes before the window: excluded from that slot |
| `walking` | 1 | `minimal` with strenuous: mismatch |
| `bookings` | 1 | `walk_in_preferred` with booking required: mismatch |
| `trip_context` | 1 | `suits` includes the party or purpose: fit |

- **Coverage** is the weight of components that have evidence, divided by the weight of all applicable components.
- **Score** is Σ(weight × outcome value) ÷ the weight with evidence, where fit = 1, partial = 0.5 and mismatch = 0. Unknowns are left out of the score and lower coverage instead.
- **The threshold:** an option needs coverage ≥ 0.5.
- **Ties break by:** coverage, then the contributor's rating (loved > fine), then the more recent trip, then the stable ID. That order is deterministic.
- **The same place in several itineraries is one result.** Its evidence is combined:
  - objective facts: operator or venue facts win;
  - subjective ones: the majority of contributor reports from the last 12 months;
  - an even split: partial.

### 6.3 Slots and the planner (D-044)

| Pace | Slots per day |
| --- | --- |
| Relaxed | lunch, afternoon, dinner |
| Moderate | morning, lunch, afternoon, dinner |
| Packed | morning, lunch, afternoon, dinner, evening |

**Which places fill which slots:**
- morning: café, bakery, market, museum, gallery, landmark, park, viewpoint, walk;
- lunch and dinner: restaurant or market;
- afternoon: any non-food category;
- evening: bar, performance venue, viewpoint.

**How a day is assembled:**
- **Time windows:** `day_start` and `dinner_time` set the windows. A late start moves the morning slot to 10:30–12:00.
- **Areas:** each half-day prefers one area, then an adjacent one.
- **Alternatives:** each slot takes the best eligible option and up to 3 alternatives. A stop is never used twice in one plan.
- **Too few options:** if a slot has none above the threshold, it's `not_enough_options`. The chat says how many slots it could fill (AC-REQ-025-02).
- **Clashes** on the itinerary: closed that day by the listed hours; outside the trip dates; or "opening days not known" when there are no hours.
- **Deterministic:** the same snapshot hash and versions give the same options and order (AC-REQ-025-01).

### 6.4 Card lines

1. **✓ fit:** up to 3 fit components, highest weight first, using each dimension's `fit_text`.
2. **⚠ catch:** the contributor's own catch when there is one; otherwise the highest-weight mismatch or partial `catch_text`; otherwise "No catch reported". There's always one (AC-REQ-006-01).
3. **? unknown:** the highest-weight applicable component with `unknown`, using `unknown_text`. It's left off when there's none.

## 7. The option card contract

This is what the app renders, per slot. It goes into `packages/contracts` in S0.1.

```ts
type SlotKind = 'morning' | 'lunch' | 'afternoon' | 'dinner' | 'evening';

type EvidenceLine = {
  kind: 'fit' | 'catch' | 'unknown';
  text: string;                 // from the dimension's template, or validated model wording
  dimensionKey: string | null;  // null only for the contributor's own catch
  source: 'venue' | 'operator' | 'contributor';
  componentId: string | null;   // every fit and unknown line cites its component
};

type OptionCard = {
  slotId: string;
  dayIndex: number;
  slotKind: SlotKind;
  slotLabel: string;            // "Morning café", "Lunch", "Dinner"
  position: { index: number; of: number };   // "1 of 3"
  status: 'filled' | 'not_enough_options';
  option?: {
    optionId: string;
    placeId: string;
    title: string;              // the place name
    meta: string;               // "Old Town · Café · €"
    fit: EvidenceLine[];        // at most 3 on the card
    catch: EvidenceLine;        // always present, possibly "No catch reported"
    unknown?: EvidenceLine;     // at most 1 on the card
    source: {
      contributorName: string;  // only with the show_name scope
      context: string;          // "couple · 3 days · May 2026"
      note?: string;            // the contributor's why_it_fit, with permission
    };
    similarTravelers?: { displayName: string }[];  // consented people only; never a count of others (REQ-027)
    reviewCount?: number;       // published reviews, labeled in detail
    clash?: { kind: 'closed_that_day' | 'outside_dates' | 'hours_unknown'; text: string };
    links: { official?: string; partnerRedirectId?: string };  // always "Check price and availability", never "Book"
  };
  notEnough?: { message: string; suggestions: string[] };  // "Relax 'no long queues' for this trip" · "Leave the evening free"
};
```

A sample, as fixture data: a fictional city and place, not real.

```json
{
  "slotId": "fx-slot-d1-morning",
  "dayIndex": 1,
  "slotKind": "morning",
  "slotLabel": "Morning café",
  "position": { "index": 1, "of": 3 },
  "status": "filled",
  "option": {
    "optionId": "fx-opt-1",
    "placeId": "fx-place-cafe-lumen",
    "title": "Café Lumen",
    "meta": "Old Town · Café · €",
    "fit": [
      { "kind": "fit", "text": "Slow mornings: opens 10:30", "dimensionKey": "day_start", "source": "operator", "componentId": "fx-c1" },
      { "kind": "fit", "text": "A local favorite", "dimensionKey": "fame", "source": "operator", "componentId": "fx-c2" }
    ],
    "catch": { "kind": "catch", "text": "Only six tables; short wait after 11:30", "dimensionKey": null, "source": "contributor", "componentId": null },
    "unknown": { "kind": "unknown", "text": "Step-free access not known", "dimensionKey": "step_free", "source": "operator", "componentId": "fx-c4" },
    "source": { "contributorName": "Ana", "context": "couple · 3 days · May 2026", "note": "We went back twice. Order the custard toast." },
    "similarTravelers": [{ "displayName": "Maya" }],
    "links": { "official": "https://example.test/cafe-lumen" }
  }
}
```

## 8. Privacy and access by field class

| Field class | Examples | Who can read | Never sent to |
| --- | --- | --- | --- |
| Traveler private | Profile values, spend ranges, private notes, visits, trips | The owner (and trip partners for that trip's stops and comments) | Other travelers, the operator. The model gets only a profile summary for one request, without sensitive values |
| Sensitive | `dietary_needs` | The owner; the server's eligibility filter | The model, analytics, logs (D-045) |
| Private user content | Chat messages, comments, questions, private review notes | Participants | The model (except the current request text to structure it), analytics, logs |
| Contributor private | Contact details, the contributor's own spending, exact dates | The operator | Everyone else |
| Contributor public (with permission) | Display name, trip context (month, length, party, purpose), stop notes, the catch, public taste | Signed-in travelers while the permission is current | — |
| Catalog facts | Place, hours, listed prices, fame | Everyone signed in | — |

## 9. Decisions

| ID | Decision | Recommended default | Resolved by | Blocks |
| --- | --- | --- | --- | --- |
| D-041 | Taste vocabulary 0.1 | The 15 dimensions and values in §3.2, as `taxonomy_version` "0.1" | **Approved** (founder, 2026-09-23). Revisit with the hand-run relevance study (H1) | S0.3 content collection, slices 2 and 3 |
| D-042 | A must-have with unknown evidence | Strict (left out) for dietary needs and step-free access; flagged with a ? line for crowds, atmosphere, bookings and budget | **Approved** (founder, 2026-09-23). Revisit with tester feedback and "not enough" rates | Slice 4 |
| D-043 | Contributors' spending | Match on venue price facts and the contributor's range, but publish only venue price bands. A contributor's own spending is never published | **Approved** (founder, 2026-09-23) | S0.3 template |
| D-044 | Slots per pace | Relaxed: lunch, afternoon, dinner. Moderate: + morning. Packed: + evening. `day_start` and `dinner_time` set the windows | **Approved** (founder, 2026-09-23). Tune with planner evaluations and swipe rates | Slice 5 |
| D-045 | Sensitive preferences | Dietary needs are optional, sensitive, and used only by the server's filter. They're never sent to the model, analytics or logs, and their voice excerpts aren't kept. Allergies aren't collected in MVP-1 ("check allergies with the venue"). The privacy policy says so, and explicit consent is asked before saving them | **Approved** (founder, 2026-09-23). A privacy review is still due before the first external invite | Slice 2 |

## 10. Next revision

- Fields for the social, messaging, moderation and operations tables named in plan §7.
- The trip request's typed-change grammar (which phrases map to which slots and dimensions), with evaluation cases.
- `taxonomy_version` 0.2, from recap corrections, swipe reasons and the relevance study.
- The API command list (names, payloads, receipts), written into `packages/contracts` in S0.1.
