# XPMatch v2 UI plan (proposed)

| Field | Value |
| --- | --- |
| Status | Proposal. It goes with MVP-1 plan draft 9 (`docs/prds/XPMatch-MVP1-plan.md`); **founder approval pending** |
| Date | 2026-09-23 |
| Inputs | PRD v1.1 §4 (screens, tokens, accessibility); plan draft 8 §4 and §6; v1 read-only review (commit `28c66b6`); research on React Native UI kits and theming, checked against live docs and npm on 2026-09-23 |
| Requirements | REQ-015 (accessibility), REQ-025 and REQ-026 (options, swipe), REQ-029 (chat), **REQ-030 (appearance, new)** |
| Decisions | D-037 (UI kit), D-038 (palette), D-039 (appearance options), D-040 (place imagery) |

**Carried over from v1:** the design language (layout ideas, type pairing, patterns, lessons). **Not carried over:** v1's code (founder decision, AGENTS.md) and v1's colors (the PRD's tokens win).

### How v1 was gathered

- The founder asked for the `site-clone` skill. It isn't installed in this session, so the same job was done by hand:
  - v1's tokens were read (`src/app/globals.css`), along with its UI redesign plan (`docs/UI_REDESIGN_PLAN.md`), its mobile plan (`docs/MOBILE_PLAN.md`) and its reference mockup (`docs/design/discover-reference.webp`);
  - **67 phone screens were captured at 390 × 844**, plus one desktop view, from v1's own offline test stack, with its stand-in model and stubs and no API keys;
  - type, spacing and tap targets were measured with the browser's computed styles.
- **The captures stay out of this public repository.** v1's test fixtures pair real businesses with invented reviews, and those appear on screen.

## 1. Summary

1. **Same feel as v1, PRD colors.**
   - **What stays:** v1's look ("Serene Resort": calm warm neutrals, one deep green-teal, Inter with Source Serif 4 accents, pill buttons, chips, sheets).
   - **What changes:** the PRD's pine `#174D42`, ivory `#F7F8F5`, white and dark `#182B28` replace v1's values. They're close relatives, so the look carries over.
2. **Evidence first.** Every option card shows, before anything decorative:
   - why it fits the traveler;
   - the catch;
   - what isn't known;
   - whose trip it came from.

   v1's percentages and "Why this score" (which counted Google's rating as a reason) are dropped; percentages were already retired by the PRD.
3. **Room for the cards.** Options open full screen from the chat reply, with the chat box still at the bottom. In v1's chat only about 455 px of conversation was visible, and 516–560 px cards hid their own buttons.
4. **Travelers can change the colors.** Profile → Appearance offers:
   - System, Light or Dark;
   - five accent colors.

   Every combination passes a contrast check (136 pairs, 0 failures), and the choice follows the traveler to any phone they sign in on (REQ-030).
5. **shadcn: not directly; its React Native counterpart, yes.**
   - shadcn/ui renders web pages only.
   - React Native Reusables brings shadcn's components and copy-in model to React Native and installs through the shadcn CLI. The recommendation is to use it with Uniwind for theming (D-037).

## 2. What v1 teaches the UI

### 2.1 Keep: v1's design language, rebuilt natively

| Pattern | v1 evidence | v2 use |
| --- | --- | --- |
| Warm canvas, white cards, one deep teal accent, one easing curve `cubic-bezier(0.2, 0.8, 0.2, 1)` | `globals.css` tokens; the reference mockup | Same structure, with PRD values (§4) |
| Inter for UI, Source Serif 4 for editorial lines | `globals.css` fonts; the serif hero subtitle and prompt | Serif only where a *person's voice* appears: the recap sentence, a source traveler's note, empty-state lines |
| "Understood as" chips (preferences outlined, must-haves filled) | Capture 57 | The chat's request chips: 3 days · couple · May · slow mornings · seafood (plan §4 step 3) |
| Bottom sheet with peek, half and full heights, a drag handle, and the page usable at peek | `BottomSheet.tsx`; captures 25, 27, 30 | Item detail and editors. Dialogs become sheets on phones (v1 kept centered dialogs) |
| One main action in a bar at the bottom of the detail sheet | Capture 25 (Rate, Saved, Add to trip) | "Check price and availability" or "Official site" as the one filled button |
| Numbered stops with up and down buttons, and no drag on phones | Captures 38–39 | The itinerary. It meets PRD REQ-015 ("dragging has move-up/down alternatives") |
| Three-way rating: Loved it / It was fine / Not for me | Captures 60–61 | Exactly the check-in scale in plan §4 |
| Amber "heads-up" for downsides | Capture 21 | The catch, shown on the card instead of hidden in a tooltip, because the catch is the differentiator (`cmba-workspace/xpmatch/differentiators.md`) |
| Shimmer skeletons and motion that turns off under Reduce Motion | `globals.css` | Same, driven by the phone's Reduce Motion setting |
| Survey answers as big tap cards | Capture 06 | The profile survey (plan D-034) |

### 2.2 Fix: v1 phone defects, measured

| v1 defect (390 × 844) | v2 rule |
| --- | --- |
| 177 of 232 controls under 44 px on their short side; 49 under 32 px | Every control is at least 44 × 44 pt: chips, arrows, thumbs, close buttons. Checked by a test in S0.1 |
| Chat showed about 455 px of conversation; cards 516–560 px tall; "Add to trip" and the compare bar hid behind the chat box | Options and itinerary are full-screen views with the tab bar hidden. The chat box sits under the content, never on top of it |
| "Top pick" chip covered the heart and plus buttons | Nothing overlays a tappable control |
| Saved rows 511 px wide in a 390 px view | No horizontal overflow; long names wrap, then truncate with the full name in the accessibility label |
| Tabs wrapping onto 2 lines; titles cut at about 20 characters | Segmented controls with at most 4 short labels; titles get the full width |
| 16 px side margins in chat, 24 px elsewhere | One 16 pt gutter everywhere |
| Raw "Failed to fetch" shown to users; a developer message about a missing API key shown on the map | Every error has plain words and a retry; developer text never reaches the screen |
| A comparison table needing sideways scrolling | No sideways tables. Comparing waits for REQ-009 (later) |
| "Why this score" counted Google's rating as a reason next to the traveler's taste | Popularity is never shown as fit. That's the enemy in `uvp.md` |

### 2.3 Drop

- Match percentages (retired by the PRD), and the "Top pick" mark that depended on them.
- The Discover hero with Where / When / Guests / Budget fields: the chat box replaces them (plan §4 step 3).
- Two-sided destination cards: MVP-1 is one city.
- The side rail and desktop header: phones only.
- Google Places photos: MVP-1 has no Places API (plan A-002). See D-040.
- A five-tab bar: v2 has four tabs, Trips, Explore, Inbox, Profile (plan §6).

## 3. Principles

1. **Evidence before decoration.** The fit, catch, unknowns and source come first on every card, in words plus an icon, never color alone.
2. **One main action per screen**, in the bottom third, where thumbs reach it.
3. **Calm.** Warm neutrals, one accent, no gradients behind text, no photos needed.
4. **Honest states are designed screens:** "not enough good options", "city not open yet" and "source withdrawn" are layouts, not error toasts.
5. **Accessible from the first commit:**
   - text scales with the phone's text size;
   - every swipe has buttons;
   - every icon has a label;
   - Reduce Motion is honored.

## 4. Color, themes and changing the colors

### 4.1 What the traveler sees

**Profile → Appearance:**
- **Mode:** System · Light · Dark (a segmented control; System is the default).
- **Color:** five swatches with names: Pine (default), Ocean, Terracotta, Plum, Graphite.
- **Preview:** a live mini option card in the chosen colors.
- **A note:** "Your colors follow you to any phone you sign in on."

A change applies instantly, with no restart and no Save button.

This covers both readings of "users can easily change the colors":
- travelers choose their own colors in the app;
- the team changes the brand palette in one token file, because no component contains a raw color.

### 4.2 Semantic tokens

The names follow shadcn's, so React Native Reusables components work unchanged; `accent` means the soft selected fill, as in shadcn. XPMatch adds `fit`, `catch` and `unknown`.

| Token | Role | Light | Dark |
| --- | --- | --- | --- |
| `background` | App canvas | `#F7F8F5` (PRD ivory) | `#0E1816` |
| `card`, `popover` | Cards, sheets, menus | `#FFFFFF` | `#162320` |
| `foreground` | Main text | `#182B28` (PRD dark) | `#EEF2EF` |
| `muted` | Chips, inputs, quiet sections | `#EDF0EB` | `#1F2F2B` |
| `muted-foreground` | Secondary text, inactive tab icons | `#4D5E5A` | `#A7B6B1` |
| `border` | Dividers (decorative) | `#D8DDD6` | `#2C3C38` |
| `input` | Outlines of fields and controls (≥ 3:1) | `#7E8B87` | `#6E7F7A` |
| `primary`, `primary-foreground`, `accent`, `ring` | The traveler's chosen color | §4.3 | §4.3 |
| `fit`, `fit-soft` | "✓ matches your profile" | `#1E6B47`, `#E4F2EA` | `#7FD3A4`, `#16332A` |
| `catch`, `catch-soft` | "⚠ the catch" | `#8A4B00`, `#FBEEDC` | `#F2B878`, `#3A2A16` |
| `unknown`, `unknown-soft` | "? not known" | `#4F5B66`, `#ECEFF2` | `#B7C2CC`, `#26303A` |
| `destructive`, `destructive-soft`, `destructive-foreground` | Errors, delete | `#B3261E`, `#FBE9E7`, `#FFFFFF` | `#F2A39B`, `#3D1D1A`, `#3D1D1A` |

### 4.3 Accent colors

Each accent has a light and a dark variant: primary / text on primary / soft fill (`accent`) / focus ring.

| Accent | Light | Dark |
| --- | --- | --- |
| **Pine** (default, PRD) | `#174D42` / `#FFFFFF` / `#E2EEEA` / `#1F7A67` | `#86D1BB` / `#0B2B24` / `#1C3A33` / `#86D1BB` |
| Ocean | `#1D4F8A` / `#FFFFFF` / `#E3ECF7` / `#2A64A8` | `#9EC5F2` / `#0D2744` / `#1B2E45` / `#9EC5F2` |
| Terracotta | `#9A3F24` / `#FFFFFF` / `#F6E6E0` / `#B04B2C` | `#F0A68C` / `#3D1609` / `#3A231C` / `#F0A68C` |
| Plum | `#6A3877` / `#FFFFFF` / `#F0E6F3` / `#7E4A8C` | `#D6B0E2` / `#35163F` / `#2F2236` / `#D6B0E2` |
| Graphite | `#2E3437` / `#FFFFFF` / `#E8EAEB` / `#4A5358` | `#D3D8DB` / `#1A1E20` / `#2A3033` / `#D3D8DB` |

- **What the accent changes:** buttons, links, the selected tab, selected chips, focus rings and progress.
- **What it never changes:** fit, catch, unknown and error colors keep their meaning in every theme.
- **Terracotta sits near the error red,** which is safe only because errors always carry an icon and words.

### 4.4 Contrast evidence

Method: WCAG 2.x contrast ratios for every foreground and background pair that a screen can show, in each mode × accent.
- **Scope:** text and background; muted text on chips; field outlines against surfaces; labels on primary and destructive buttons; fit, catch and unknown text on their soft fills and on the page; focus rings.
- **Thresholds:** text ≥ 4.5:1; outlines and focus rings ≥ 3:1.

| Result (2026-09-23) | Value |
| --- | --- |
| Pairs checked | 136 |
| Failures | 0 |
| Tightest pairs | Field outline on ivory 3.32:1 (needs 3:1); field outline on dark cards 3.84:1; Terracotta text on its soft chip 5.57:1 (needs 4.5:1) |
| PRD brand pairs (independent check) | `#182B28` on white 14.84:1 and on ivory 13.92:1; pine on white 9.65:1 and on ivory 9.05:1 |

- **How it was run:** a scratch script; this repository has no code yet (AGENTS.md).
- **What S0.1 must add:** the same check as a CI test that fails the build on any failing pair. None of the UI kits checks contrast itself.

### 4.5 How it's built

**Engine:** Uniwind (§9).
- It has built-in `light`, `dark` and `system` themes; `Uniwind.setTheme` drives the Mode setting.
- Each accent is applied by overriding the accent tokens for both themes with `Uniwind.updateCSSVariables('light' | 'dark', …)`. This keeps React Native Reusables' `dark:` classes and System mode working.
- **Custom named themes are avoided:** whether `dark:` applies under a custom theme is `UNVERIFIED`.

**Saved:**
- **On the account:** `account_settings.appearance_mode` (`system` | `light` | `dark`) and `account_settings.accent` (`pine` | `ocean` | `terracotta` | `plum` | `graphite`), plus a revision.
  - Owner-only row policy.
  - Written through the standard command envelope: actor, request ID, idempotency key, expected revision (AGENTS.md).
  - Separate from the taste profile: appearance never affects matching and isn't versioned with taste.
- **On the device:** cached, and applied while the splash screen is still showing, so a returning traveler never sees the default colors flash.
  - Whether `updateCSSVariables` can run before the first render is `UNVERIFIED`; S0.1 tests it.
  - A new device uses System + Pine until sign-in, then switches.

**Guardrails:**
- A lint rule rejects raw hex colors in components.
- The contrast test runs in CI.
- Deleting the account deletes the setting.

### 4.6 Not offered, on purpose

- **A free color picker.** It can't guarantee contrast, and a green or red "accent" would blur the fit and error meanings.
- **Per-screen colors, custom fonts, or photo themes.**
- **Android "Match my wallpaper" dynamic color.** A maintained library exists (`@pchmn/expo-material3-theme`, one maintainer, needs a development build), but it would replace the brand color. At most a later option on Android 12+ (D-039).

## 5. Type, spacing, shape, motion, icons

**Type.** Inter (400, 500, 600) and Source Serif 4 (400, 400 italic), bundled as static weights. All sizes scale with the phone's text size; only tab-bar labels are capped, at 1.3×.

| Style | Size / line (pt) | Weight | Used for |
| --- | --- | --- | --- |
| Title 1 | 28 / 34 | 600 | Screen titles (v1 page title: 28) |
| Title 2 | 22 / 28 | 600 | Section titles, sheet titles |
| Headline | 17 / 22 | 600 | Card and stop titles (v1 used 14–15; raised for legibility) |
| Body | 16 / 22 | 400 | Chat, descriptions |
| Callout | 15 / 20 | 400 | Evidence lines on cards |
| Footnote | 13 / 18 | 500 | Area, category and price basis; slot labels |
| Caption | 12 / 16 | 400 | Non-essential labels only. Nothing needed to decide is smaller than 13 (v1 went down to 10–11) |
| Editorial (serif) | 17 / 24 | 400 | The recap sentence, a source traveler's note, empty states |

**Spacing:** a 4 pt grid (4, 8, 12, 16, 20, 24, 32, 40, 48); a 16 pt gutter; 16 pt card padding; 12 pt between cards; 24–32 pt between sections.

**Shape:** 12 pt for fields and small cards; 16 pt for cards; 24 pt for sheets; full pills for buttons and chips.

**Depth:** light mode uses a soft card shadow and a floating shadow for the chat bar and sheets. Dark mode uses no shadows, only surface steps.

**Motion:**

| Change | Duration |
| --- | --- |
| Press | 150 ms |
| Chips and menus | 200 ms |
| Swipe settle | 250 ms |
| Sheets | 300 ms |

- **Easing:** v1's `cubic-bezier(0.2, 0.8, 0.2, 1)` for everything.
- **Haptics:** a selection tick when an option changes; success when "Create itinerary" saves.
- **Reduce Motion:** crossfades instead of slides, and a still skeleton.

**Icons:** Lucide (`lucide-react-native`, which React Native Reusables uses; v1 used Lucide on the web), 20–24 pt inside 44 pt targets.

## 6. Components (MVP-1)

**From React Native Reusables:** Text, Button, Card, Badge, Input, Textarea, Tabs, Toggle Group, Switch, Select, Dialog, Alert Dialog, Popover, Tooltip, Avatar, Progress, Skeleton and Separator. All are in its registry (checked 2026-09-23).

**Bottom sheet:** React Native Reusables has none. Use Expo Router's form sheet (native, draggable heights) or `@gorhom/bottom-sheet` 5.x. Decide in S0.1.

**XPMatch components**, built on the above:

| Component | What it does |
| --- | --- |
| `RequestChips` | The understood request, each chip tappable to edit (v1 capture 57 pattern) |
| `OptionCard` | Slot label, "n of m", ‹ › arrows (44 pt), title, meta, fit chips (up to 3, then "+n"), one catch line, one unknown line, source line (serif), similar travelers (consented only). The next alternative peeks 12 pt at the right edge to show it can swipe |
| `EvidenceRow` | Icon + words for fit ✓, catch ⚠ or unknown ?. Never color alone |
| `SourceLine` | "From Ana's trip · couple · 3 days · May". The source traveler's context, per plan §4 |
| `SimilarTravelers` | Display names of people who opted in, plus "similar taste". Never a count of people who didn't (AGENTS.md) |
| `ReviewSnippet` | Label "From an XPMatch trip" or "Self-reported" (D-031); never "verified" |
| `StopRow` | Number, time of day, title, area, fit line, clash flag, ‹ ›, ↑ ↓ and a "⋯" menu (Move to day, Remove, Details) |
| `ClashFlag` | "Closed on Mondays · swap?" in catch colors, with a button |
| `UndoBar` | "Dinner on day 2 changed · Undo" after every change |
| `ChatComposer` | Text box and send; "Type a change, e.g. cheaper dinner on day 2" when a plan is open |
| `VoiceSession` | Speaking and listening state, a live caption of what was heard, "2 of 5", and Mute, End and "Switch to survey" always visible |
| `SurveyStep` | One question, large answer cards, progress dots, Back and Skip |
| `RatingButtons` | Loved it / Fine / Not for me, plus "Didn't do it" |
| `HonestEmpty` | Title, one plain sentence and one action: "Not enough good options for day 3" with "Try a different area" |
| `AppearancePicker` | The mode control, five swatches and a live preview (§4.1) |

## 7. Screens, mapped to the journey (plan §4 and §6)

**Tabs:** Trips, Explore, Inbox, Profile. The tab bar hides on full-screen flows: options, itinerary, voice, survey, check-ins.

**Sign in (step 1):**
- the wordmark and one line of promise, "Only real travelers' trips, matched to how you travel" (`uvp.md`);
- "Continue with Apple" and "Continue with Google", each in its platform's required style;
- a legal line: continuing confirms 18+ and accepts the Terms.
- There is nothing else on the screen.

**Profile: voice or survey (step 2):** two large cards, "Talk it through" and "Take the survey". The mic permission is asked only after "Talk it through".
- *Voice:* `VoiceSession`, full screen.
- *Survey:* five `SurveyStep` screens (D-034).
- *Recap:* the serif summary sentence, then editable rows with "not sure" flags and a must-have pin on each. "Looks right" is the one button, at the bottom.

**Trips home (step 3):**

```
┌───────────────────────────────────┐
│ Trips                             │
│ ┌───────────────────────────────┐ │
│ │ Where to, and how do you      │ │  ChatComposer as a card
│ │ like it?                   ↑  │ │
│ └───────────────────────────────┘ │
│ (3 days with my partner…) (Slow…) │  suggestion chips, scroll sideways
│ Your trips                        │
│ ┌───────────────────────────────┐ │
│ │ [pilot city] · 3 days · May   │ │  trip card
│ │ 12 stops · saved              │ │
│ └───────────────────────────────┘ │
│  Trips   Explore   Inbox  Profile │
└───────────────────────────────────┘
```

- **After sending**, the chat thread shows the traveler's message, then the reply: `RequestChips`, "Options for 3 days are ready", Day 1's four slot titles as a preview, and two buttons, **See options** and **Create itinerary**.
- **City not open:** a clear sentence and "Join the waitlist" instead of options.

**Options (step 4)** open full screen from the reply. The chat box stays at the bottom, so typed changes continue the same conversation.

```
┌───────────────────────────────────┐
│ ←  3 days in [pilot city]     ⋯   │
│ 3 days · couple · May · seafood   │  RequestChips
│ [ Day 1 ]  Day 2   Day 3          │  segmented control
│ MORNING CAFÉ               ‹ 1/3 ›│
│ ┌───────────────────────────────┐▌│  next option peeks
│ │ [Place]                       │▌│
│ │ Alfama · café · €             │ │
│ │ ✓ slow mornings  ✓ under €15  │ │
│ │ ⚠ Small; queue after 10:00    │ │
│ │ ? Holiday hours not known     │ │
│ │ From Ana's trip · couple ·    │ │  serif
│ │ 3 days · May                  │ │
│ └───────────────────────────────┘ │
│ LUNCH                      ‹ 1/3 ›│
│ …                                 │
│ [       Create itinerary       ]  │  sticky, 52 pt
│ ┌ Type a change… ─────────── ↑ ┐  │
└───────────────────────────────────┘
```

- **Picking:**
  - swipe a card sideways, or tap ‹ ›; the card showing is the one kept;
  - `UndoBar` after each change;
  - the draft saves as the traveler goes.
- **States:**
  - building (skeleton cards);
  - partial failure (the failed slot says so, with a retry);
  - "not enough good options for day 3" (`HonestEmpty`, never filler);
  - source withdrawn (the card is replaced, with a note).

**Itinerary (step 5)** has the same day control. Each stop is a `StopRow` in time order; each day shows the area names. There are no walking times: MVP-1 has no routing provider, only "Open in Maps".
- Clashes appear as a `ClashFlag` on the stop.
- The header menu holds Share activity, Invite a partner and Rebuild.
- A rebuild shows the Keep / Undo banner (plan step 8).

**Item detail (steps 4–6):** a sheet at half height, dragged to full.
1. Title, area, category and price basis.
2. **Why it fits you:** each ✓ with its reason.
3. **The catch.**
4. **Not known.**
5. **From Ana's trip:** her note in serif, with context.
6. **Travelers like you:** only people who consented.
7. **Reviews:** labeled.
8. **Bottom bar:** the one filled button ("Check price and availability" or "Official site", which opens outside the app and is recorded), then "Useful / Not useful" and "⋯" (Report).

**Explore:** a segmented control, *For you · Activity*. Matched items and itineraries as cards, each with "Add to a day". Honest empty and blocked-by-must-have states (plan §6).

**Inbox:** sections for Requests, Messages, and Answers & updates, with unread badges. Conversation screens have Block and Report in the header menu.

**Profile:**
- the taste summary (serif), with Edit;
- **Appearance**;
- Privacy: activity sharing, travelers like you, messages;
- Notifications, Blocked people, Community guidelines;
- Delete account, Sign out.

**Evening check-in (from the notification):** "How was today?" lists today's stops, each with `RatingButtons` and an optional note, plus "Add something else" and "Done". The after-trip check-in uses the same layout for the whole trip, then asks: Keep private (the default), Share as reviews, or Share the whole trip.

## 8. Accessibility

- **Targets:** 44 × 44 pt minimum.
- **Text size:**
  - the layout reflows at the largest accessibility size;
  - chips wrap;
  - evidence lines never truncate on cards;
  - no fixed heights around text.
- **Swipes:**
  - arrows and custom VoiceOver and TalkBack actions ("Next option", "Previous option") on every `OptionCard` and `StopRow`, because a screen reader's own swipe gestures would otherwise collide;
  - announcements such as "Day 1 morning, option 2 of 3".
- **Color:** never the only signal. The tokens pass the checks in §4.4, and photos, when there are any, never carry text without a solid backing.
- **Settings honored:** Reduce Motion, Reduce Transparency and Bold Text. Haptics are optional.
- **Proof:** on physical iPhones and Android phones (AGENTS.md): VoiceOver, TalkBack, the largest text size and Reduce Motion, each with captures. Simulators only supplement.

## 9. UI kit: shadcn and React Native (D-037)

**Can we use shadcn? Not directly.**
- shadcn/ui builds web pages. Its docs list Next.js, Vite, Laravel, React Router, Astro and TanStack Start, and its components now default to Base UI, with Radix and React Aria as options. All three are web (DOM) libraries, and nothing in the docs mentions React Native or Expo (checked 2026-09-23).

**Its React Native counterpart:** React Native Reusables (MIT, `founded-labs/react-native-reusables`).
- **What it is:** a copy-in port of shadcn/ui, with the same component names and the same copy-in workflow.
- **How it installs:** through the shadcn CLI, from its own registry.
- **What it's built on:** the accessible `@rn-primitives`.
- **Theming engines:** NativeWind v4 or Uniwind.
- **Coverage:** every component listed in §6 is in its registry (checked 2026-09-23).
- **What it lacks:** a bottom sheet, toast or drawer.

**Recommendation:**

| Choice | Pick | Why |
| --- | --- | --- |
| Components | React Native Reusables | shadcn's API and ownership model on native |
| Styling and theming | **Uniwind**, free MIT edition | Tailwind v4, like current shadcn. Built-in light, dark and system themes; `updateCSSVariables` for accents; 1.12.0 (2026-09-04). The paid Pro edition isn't needed |
| App framework | Expo SDK 57 (React Native 0.86, New Architecture always on), Expo Router 57 | Current SDK; RNR's templates pin SDK 56, so S0.1 verifies 57 |
| Sheets | Expo Router form sheet, or `@gorhom/bottom-sheet` 5.x | RNR has none |
| Fallback | HeroUI Native (Apache-2.0, built on Uniwind, runs on Expo 57) | If RNR stalls |
| Conservative engine | NativeWind 4.2.7 (Tailwind v3; v5 is a release candidate) | If Uniwind disappoints. v5 deprecates `vars()` and rejects `.dark:root`, so a migration is coming either way |
| Web surfaces | shadcn/ui itself | The beta landing page (`profile.md`) and any later operator console can use real shadcn/ui with the same token names, so web and app stay one brand |

**Risks, with the S0.1 checks for each:**
- **RNR is mostly one maintainer** (64 of 74 commits in the last year), and its CLI calls `shadcn@latest` unpinned.
  - Pin both CLI versions.
  - Own the copied code; after installation it's ours.
- **SDK 57 support is `UNVERIFIED`.** Render every §6 component on both platforms.
- **Whether accent overrides and `dark:` classes compose is `UNVERIFIED`.** Test Dark + Ocean.
- **No-flash startup is `UNVERIFIED`.** Test it on a cold start.
- **Screen-reader behavior is claimed in RNR's docs, not proven.** Test on devices.

## 10. Build order (plan §9)

| Slice | UI work |
| --- | --- |
| **S0.1** | Tokens (§4.2) with light and dark themes; fonts; the React Native Reusables base set; the sheet choice; a development-only component gallery; the CI contrast test; the no-raw-colors lint rule; tap-target and text-scale smoke tests; D-037's checks |
| 1 | Sign in |
| 2, 2b | Survey, recap, profile choice; voice session |
| **2c (new)** | Appearance: mode, accents, account sync, no-flash start (REQ-030, T34) |
| 4 | Explore list and the item detail sheet |
| 5 | Chat reply, the Options view, the itinerary, `UndoBar`, the rebuild banner |
| 7–12 | Report and block surfaces, Inbox, partners, Activity, check-ins |
| 13 | Device accessibility pass with before and after captures |

## 11. Decisions needed

| ID | Decision | Recommended default |
| --- | --- | --- |
| D-037 | UI kit | React Native Reusables on free Uniwind, Expo SDK 57 and Expo Router 57, with sheets from Expo Router or `@gorhom/bottom-sheet`. Fallback: HeroUI Native |
| D-038 | Canonical palette | The PRD's tokens are the default Pine theme; v1's "Serene Resort" values are retired; the dark values are in §4.2 |
| D-039 | Appearance options | System, Light or Dark plus five accents (Pine, Ocean, Terracotta, Plum, Graphite), every pair contrast-checked. No free color picker; Android dynamic color later at most |
| D-040 | Place imagery in MVP-1 | Text cards with a category icon, area and time of day. A contributor's photos only where their permission covers photos. No stock, generated or provider photos in MVP-1 |

## 12. Evidence and what's untested

**Evidence:**
- **v1 captures:** 68 PNGs, 67 at 390 × 844 and one at 1440 × 900, from v1's own test stack at commit `28c66b6`, run on 2026-09-23.
  - Blocked: all outside requests, including the model provider (a local stand-in answered) and maps.
  - Photos are v1's placeholders.
  - Kept in the session scratchpad, not committed: the fixtures show real businesses with invented reviews.
- **Measurements:** computed styles and tap sizes from the same run.
- **Contrast:** 136 pairs, 0 failures, from a scratch script (§4.4).
- **UI kit facts:** npm registry and live docs, 2026-09-23 (§9).

**Untested:** everything that needs the app, because there is no app code yet (AGENTS.md: never claim it ran):
- device behavior;
- Dynamic Type and font scale;
- VoiceOver and TalkBack;
- startup without a color flash;
- React Native Reusables on SDK 57.
