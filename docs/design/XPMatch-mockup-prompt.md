# XPMatch screen mockups: prompt for an AI design tool

**How to use:**
- **Pasting:** paste everything below the "copy from here" line into the tool (v0, Figma Make, Google Stitch, Uizard, Claude or similar).
- **If the tool limits prompt length:**
  1. paste Part 1 (brief and design system) first;
  2. then paste Part 2 one section at a time, each time saying "same design system as before";
  3. then paste Part 3 to finish.
- **Sample data:** it's fictional on purpose: a made-up city, places and people. Keep it that way. These mockups may be shown to testers, and nothing fake may look real (AGENTS.md).
- **Where the details come from:**
  - screens and states: plan §4 and §6;
  - design system: `XPMatch-UI-plan.md`;
  - card fields: `XPMatch-data-shape.md` §7.

**Check the results against this list:**
- Every option card shows ✓ why it fits, ⚠ the catch, ? what isn't known, and whose trip it came from.
- There are no percentages, star ratings or "verified" badges anywhere.
- There's one main button per screen, in the bottom third.
- Every swipeable card also has ‹ › arrow buttons.
- Tap targets are at least 44 pt.
- The tab bar is hidden on full-screen flows (options, itinerary, voice, survey, check-ins).

---- COPY FROM HERE ----

# Design brief: XPMatch mobile app, high-fidelity screens

## Part 1 — What we're making and why

### Deliverable

Design the high-fidelity phone screens listed in Part 2:
- **Phone size:** iPhone at 390 × 844 pt. Frame 11 is also required on Android (Pixel) at 412 × 915.
- **Default theme:** light mode with the "Pine" accent. Frames 26–27 are the dark-mode and large-text variants.
- **Copy:** use the exact copy given. Where copy isn't given, write short, plain, specific text in the same voice.
- **Sample data:** keep every place, person and review fictional, as supplied.
- **Frame titles:** give each frame its number and name, for example "11 · Options, Day 1".

### The product in one paragraph

XPMatch plans 2–4 day city trips from what real travelers actually did.
1. **The traveler creates a taste profile once,** by talking to an AI for 3–5 questions or by tapping through a 5-screen survey, and approves it.
2. **They type the trip they want into a chat box,** for example "3 days in Porto Clara with my partner in May, slow mornings, lots of seafood".
3. **The chat answers with options for every time slot of every day.** Each option is a stop from a real traveler's trip, matched to *this traveler's* profile.
4. **Every option shows four things:**
   - why it fits them;
   - the catch;
   - what isn't known;
   - whose trip it came from.
5. **They swipe any option, or tap its arrows,** to see up to 3 alternatives. The option showing is the one kept.
6. **They can type changes** ("cheaper dinner on day 2") and undo anything.
7. **"Create itinerary"** turns the choices into a day-by-day plan that saves automatically.
8. **During the trip,** an evening check-in asks how each stop was. The ratings stay private unless the traveler chooses to share them.

### Who it's for

Couples and solo travelers planning 2–4 days in one city, who choose places by fit, not fame. In their own words:
- AI planners put them "on the same itinerary as it seems everyone else is on";
- reviews come from "a person you know nothing about".

### The promise the screens must make visible

**Every stop earns its slot.**
- Each card leads with evidence: why it fits you, the catch, and what isn't known, in words with an icon.
- Each card names the real trip the stop came from.
- When there aren't enough good options, the app says so plainly instead of padding the day.

That honesty is the product's difference. It must look deliberate and calm, never like an error.

### Design principles, and why

1. **Evidence before decoration.** No photos are needed. Cards are typographic, with a category icon, because MVP-1 has no place photos, and the evidence is what travelers can't get elsewhere.
2. **One main action per screen,** in the bottom third, because travelers use this one-handed while out.
3. **Calm:** warm neutral backgrounds, one accent color, and generous spacing. No gradients behind text, no confetti, no badges competing for attention.
4. **Honest states are designed screens.** "Not enough good options", "not in this city yet" and "source withdrawn" get real layouts with a helpful next step.
5. **Accessible from the first frame:**
   - tap targets of 44 pt or more;
   - text that still works at large sizes;
   - every swipe also has buttons;
   - color is never the only signal.

### Visual system

**Colors: light mode, "Pine" accent (default)**

| Token | Hex | Use |
| --- | --- | --- |
| background | #F7F8F5 | App canvas (warm ivory) |
| card | #FFFFFF | Cards, sheets, chat bubbles from the app |
| foreground | #182B28 | Main text |
| muted | #EDF0EB | Chips, inputs, quiet sections |
| muted-foreground | #4D5E5A | Secondary text, inactive tab icons |
| border | #D8DDD6 | Dividers |
| input | #7E8B87 | Outlines of fields and outlined buttons |
| primary | #174D42 | Main buttons, links, selected tab, selected chips (text on it: #FFFFFF) |
| accent (soft selected fill) | #E2EEEA | Selected chip or segment background; text on it in primary |
| ring | #1F7A67 | Focus ring |
| fit | #1E6B47 on #E4F2EA | ✓ "why it fits" lines |
| catch | #8A4B00 on #FBEEDC | ⚠ "the catch" lines |
| unknown | #4F5B66 on #ECEFF2 | ? "not known" lines |
| destructive | #B3261E | Delete account, errors |

**Colors: dark mode, "Ocean" accent** (frame 26 only)

| Token | Hex |
| --- | --- |
| background | #0E1816 |
| card | #162320 |
| muted | #1F2F2B |
| foreground | #EEF2EF |
| muted-foreground | #A7B6B1 |
| border | #2C3C38 |
| input | #6E7F7A |
| primary | #9EC5F2 (text on it: #0D2744) |
| accent | #1B2E45 |
| fit | #7FD3A4 on #16332A |
| catch | #F2B878 on #3A2A16 |
| unknown | #B7C2CC on #26303A |

The fit, catch and unknown colors never change with the accent. Their meaning stays fixed.

**Typography**
- **UI font:** Inter.
  - Title 1: 28/34, semibold (screen titles).
  - Title 2: 22/28, semibold.
  - Headline: 17/22, semibold (card titles).
  - Body: 16/22.
  - Callout: 15/20 (evidence lines).
  - Footnote: 13/18, medium (area · category · price; slot labels in uppercase with +0.06em tracking).
  - Caption: 12/16 (only for non-essential labels).
- **Editorial font:** Source Serif 4, 17/24, regular or italic. Use it *only* where a person's voice appears:
  - the recap sentence;
  - a source traveler's note;
  - empty-state lines.

**Shape, spacing and depth**
- **Grid:** 4 pt. Side gutter 16 pt everywhere. Card padding 16 pt; 12 pt between cards; 24–32 pt between sections.
- **Corner radius:** 12 for fields and small cards, 16 for cards, 24 for bottom sheets. Buttons and chips are fully rounded pills.
- **Shadows (light mode):** cards get a very soft shadow (0 2 8, #182B28 at 6%). The chat bar and sheets get a floating shadow (0 −4 16 at 12%).
- **Dark mode:** no shadows, only surface steps.
- **Icons:** Lucide line icons, 20–24 pt, always inside a 44 pt target.

**Components** (build these once and reuse them)

| Component | Spec |
| --- | --- |
| Primary button | Full-width pill, 52 pt tall, primary fill, white semibold 16 |
| Secondary button | Outlined pill, 1 pt input-colored border |
| Text button | Primary-colored text, no fill |
| Chip | 36 pt tall (44 pt tap area), footnote text |
| Request chip | Outlined; shows what the app understood from the chat |
| Must-have chip | Accent fill with a small pin icon |
| Segmented control | For days: pill track in muted; selected segment in accent with primary text |
| Evidence row | Icon + text in the fit, catch or unknown color, on its soft background, 8 pt radius. ✓ uses circle-check, ⚠ uses triangle-alert, ? uses circle-help |
| Source line | Serif italic 15, muted-foreground: "From Ana's trip · couple · 3 days · May 2026" |
| Similar travelers | A 20 pt initial avatar plus "Maya kept this · similar taste". Only people who opted in; never a count of anyone else |
| Option card | Detailed in frame 11 |
| Stop row | Detailed in frame 15 |
| Undo bar | A dark snackbar above the chat bar: "Lunch on Day 1 changed · Undo" |
| Bottom sheet | Handle bar; 24 pt top radius; peek, half and full heights |
| Chat bar | A pill text field with a placeholder and a 44 pt circular send button in primary |
| Tab bar | 4 tabs with labels, primary when active: **Trips** (route icon), **Explore** (compass), **Inbox** (inbox, with an unread dot), **Profile** (user). Hidden on full-screen flows |

### Sample data (all fictional)

- **City:** Porto Clara, a fictional coastal city. Areas: Old Town, Harbor, Alto (a hill district), Riverside. Currency EUR.
- **The traveler:** Sam, planning with a partner.
  - Trip: Sun 16 – Tue 18 May 2027 in Porto Clara.
  - What Sam types: "3 days in Porto Clara with my partner in May, slow mornings, lots of seafood"
- **Sam's approved taste profile:**

  | Setting | Value |
  | --- | --- |
  | Pace | Moderate (4 stops a day) |
  | Start | Late ("slow mornings") |
  | Interests | Food & drink · Neighborhoods & walks · Art & museums |
  | Food | Seafood · Local classics · Wine bars |
  | Famous sights | Local favorites |
  | Dinner budget | €20–40 per person |
  | Tickets | Under €15 |
  | Must-have | No long queues |

- **Contributors** (real travelers whose trips are used, shown with permission):
  - Ana (couple · 3 days · May 2026);
  - Tomás (solo · 2 days · April 2026);
  - Priya (couple · 4 days · March 2026).
- **A traveler with similar taste who opted in to be shown:** Maya.
- **Places, with card content:**
  - **Café Lumen.** Old Town · Café · €. Morning.
    - ✓ Slow mornings: opens 10:30 · ✓ A local favorite
    - ⚠ Only six tables; short wait after 11:30
    - ? Step-free access not known
    - From Ana's trip. Ana's note: "We went back twice. Order the custard toast."
    - Maya kept this.
    - Alternatives: **Forno Velho** (Old Town · Bakery · €) and **Tide Coffee** (Harbor · Café · €).
  - **Harbor Nine.** Harbor · Seafood · €€ · €20–30 per person. Lunch.
    - ✓ Seafood · ✓ €20–30 per person
    - ⚠ Busy 13:00–14:00; go at 12:15
    - From Tomás's trip.
    - Alternatives: **Casa Sardinha** (Old Town · Local classics · €€) and **Riverside Market stalls** (Riverside · Street food · €).
  - **Tilehouse Gallery.** Old Town · Gallery · €8 ticket. Afternoon.
    - ✓ Art & museums · ✓ Under €15
    - ⚠ Closed Mondays
    - ? Step-free access not known
    - From Priya's trip.
  - **Laranja Wine Bar & Kitchen.** Alto · Wine bar · €€ · €30–40 per person. Dinner.
    - ✓ Wine bars · ✓ Quiet enough to talk
    - ⚠ Steep climb up to the terrace
    - From Ana's trip. Ana's note: "Sunset from the terrace, then we stayed three hours."
  - **Sol Terrace.** Alto · Viewpoint · Free. Morning, Day 3.
    - ✓ Neighborhoods & walks · ✓ Free
    - ⚠ Steep climb; bring water
    - From Priya's trip.
- **Reviews on Harbor Nine:** 3 reviews, labeled "From an XPMatch trip" (2) or "Self-reported" (1). Never "verified". No star ratings; ratings are "Loved it", "Fine" or "Not for me".

### Words to use, and words never to use

**Use:**
- "Check price and availability" or "Official site", never "Book now" (XPMatch doesn't sell bookings);
- "Create itinerary";
- "Swipe or tap the arrows for other options";
- "Not known";
- "From [name]'s trip".

**Never show:**
- match percentages, scores or stars;
- "verified";
- "#1" or "best";
- counts of people who didn't opt in;
- stock photos of places;
- fake urgency;
- exact dates, companions or spending of other travelers.

## Part 2 — The journey, screen by screen

Each frame lists why it exists, its layout from top to bottom, its copy, how it behaves, and the states to show.

### A. Getting in and the taste profile (once per traveler)

**Frame 1 · Sign in**
- **Why:** no codes and no passwords. The only barrier is two taps, because friction kills first use.
- **Layout:**
  1. The "XPMatch" wordmark near the top.
  2. The headline, Title 1: "Only real travelers' trips, matched to how you travel."
  3. A serif line: "Tell us how you like to travel once. Plan any trip in a message."
  4. At the bottom, two full-width buttons: "Continue with Apple" (black, Apple logo) and "Continue with Google" (white, outlined, Google "G").
  5. Under them, in caption size: "By continuing you confirm you're 18 or older and agree to the Terms and Privacy Policy."
- **Behavior:** a returning traveler lands on Trips. A new one goes to frame 2.

**Frame 2 · Get to know you**
- **Why:** the profile is created once and every plan is built from it. Talking suits some people; tapping suits others.
- **Layout:**
  1. Title: "How should we get to know you?"
  2. Subline: "You do this once. You can change it any time."
  3. Two large tappable cards:
     - **"Talk it through":** microphone icon, "Answer 3–5 questions out loud. You check everything we heard before it's saved."
     - **"Take the survey":** list icon, "Five quick screens of taps."
  4. Footnote: "Nothing is planned until you approve your profile."
- **Behavior:** microphone permission is asked only after "Talk it through" is tapped, never before.

**Frame 3 · Voice interview: listening**
- **Why:** the traveler must always feel in control of the microphone.
- **Layout:**
  1. Top: "Question 2 of 5" with a thin progress bar.
  2. The question, in large text: "How do you like your mornings and evenings when you travel?"
  3. Center: a calm, softly pulsing primary-colored circle marked "Listening".
  4. Below the circle: a live caption in serif italic, "Heard: late mornings, a long lunch, somewhere quiet for dinner".
  5. A bottom bar with three always-visible controls: **Mute**, **End**, **Switch to survey**.
- **States:** connecting, listening (shown), speaking, paused, reconnecting.

**Frame 4 · Voice interview: microphone off**
- **Why:** voice failing must never lose work.
- **Layout:** a sheet over frame 3.
  1. Title: "No problem, let's use the survey."
  2. Body: "Your answers so far are kept."
  3. Primary button: "Continue with the survey".

**Frame 5 · Survey 1 of 5: Pace**
- **Layout:**
  1. Progress dots (1 of 5), with **Back** and **Skip** as text buttons.
  2. Title: "How full should your days be?" Three large cards: "Relaxed · about 3 stops a day", "Moderate · about 4", "Packed · 5 or more". Show "Moderate" selected.
  3. Second question: "When do you like to start?" Three chips: "Early (before 9)", "Around 9–10", "Late: slow mornings". Show "Late" selected.
  4. Bottom: primary button "Next".
- **Behavior:** Skip leaves the answer unknown, never a default.

**Frame 6 · Survey 5 of 5: Must-haves**
- **Layout:**
  1. Title: "Anything that's a must?"
  2. Subline: "We'll never show you options that break a must-have."
  3. Chips: "No long queues" (selected, shown with the pin icon), "Quiet places", "Step-free access", "Walk-in, no bookings", "Stay within my budget", "Nothing else".
  4. Bottom: primary button "See my profile".

**Frame 7 · Taste recap**
- **Why:** the traveler corrects and approves what was understood. Nothing counts until they do.
- **Layout:**
  1. Title: "Here's what we heard."
  2. A serif paragraph: "You like slow mornings, seafood and wine bars, and local favorites over famous sights. You'd rather skip long queues."
  3. Editable rows, each with an "Edit" chevron: Pace · Start · Interests · Food · Famous sights · Dinner budget ("€20–40 per person") · Tickets ("Under €15", with a small "Not sure" tag in unknown colors) · Must-haves ("No long queues", with a pin).
  4. Bottom: primary button "Looks right".
  5. Text button above it: "Something's off? Tap any line to fix it."
- **States:** saving; a newer version approved on another device ("Your profile changed on another device. Review the latest?").

### B. Asking for a trip and choosing options (the core loop)

**Frame 8 · Trips home, first time**
- **Why:** the only thing to do is say what trip you want, in your own words.
- **Layout:**
  1. Title: "Trips".
  2. A large chat card with the placeholder "Where to, and how do you like it?" and a send button.
  3. Under it, suggestion chips that scroll sideways: "3 days in Porto Clara with my partner", "A slow weekend, lots of seafood", "2 days of art and wine bars".
  4. A quiet empty state in serif: "Your trips will appear here."
  5. A footnote: "Open now: Porto Clara. Other cities: join the waitlist."
  6. The tab bar, with Trips active.

**Frame 9 · Chat: request understood, options ready**
- **Why:** show exactly what was understood before anything is planned. Chips make it checkable at a glance.
- **Layout:**
  1. Header: "Porto Clara trip", with a back arrow.
  2. The traveler's message as a right-aligned bubble in primary.
  3. The app's reply card:
     - "Got it."
     - A row of request chips: "3 days", "couple", "May", "slow mornings", "seafood".
     - "Options for 3 days are ready. 11 of 12 slots are filled. Day 3 dinner needs your call."
     - A mini preview listing Day 1's four slot titles, each with its place name.
     - Two buttons: primary "See options" and secondary "Create itinerary".
  4. The chat bar at the bottom.
- **States (show small insets):**
  - **building:** skeleton cards with "Building options from real trips…";
  - **one follow-up question** when something important is missing: "Which month are you going?";
  - **a request without a length:** the chips show "3 days" plus the note "We planned 3 days. Say a number to change it."

**Frame 10 · Chat: city not open**
- **Layout:**
  1. The traveler's bubble: "4 days in Lisbon in June".
  2. The reply: "We're not in Lisbon yet. XPMatch only plans from real travelers' trips, and right now that's Porto Clara."
  3. Two buttons: "Join the Lisbon waitlist" and "Plan Porto Clara instead".
- **Why:** an honest "not here yet" beats a generic plan.

**Frame 11 · Options, Day 1** (full screen, no tab bar; also on Android)
- **Why:** this is the heart of the product. Every card must earn its slot with evidence, and changing a slot must be effortless.
- **Layout, top to bottom:**
  1. **Header:** back arrow, "3 days in Porto Clara", a "⋯" menu.
  2. **The request chips row.**
  3. **The day control:** Day 1 · Day 2 · Day 3, with Day 1 selected. Day 3 carries a small catch-colored dot because it needs attention.
  4. **Slot sections, one per slot of the day:** Morning café, Lunch, Afternoon, Dinner. Each has:
     - a slot header with the uppercase slot label on the left, and "1 of 3" with ‹ › arrow buttons (44 pt) on the right;
     - an **option card** (white, 16 pt radius, 16 pt padding):
       - title (Headline): "Café Lumen";
       - meta (Footnote, muted): "Old Town · Café · €";
       - evidence rows: ✓ "Slow mornings: opens 10:30" · ✓ "A local favorite" · ⚠ "Only six tables; short wait after 11:30" · ? "Step-free access not known";
       - a thin divider;
       - the source line in serif italic: "From Ana's trip · couple · 3 days · May 2026";
       - similar travelers: "M · Maya kept this · similar taste".
     - the right edge of the *next* alternative's card peeks 12 pt past the card, to show it can be swiped.
  5. **A sticky bottom area:**
     - the primary button "Create itinerary";
     - under it, the chat bar with the placeholder "Type a change, e.g. cheaper dinner on day 2".
- **Behavior:**
  - Swiping a card left or right, or tapping ‹ ›, moves through that slot's alternatives (up to 3). The card showing is kept, saved as a draft instantly.
  - Tapping a card opens frame 14.
  - Typed changes update only the slots they name.
  - Every change can be undone.
  - The draft saves as you go.

**Frame 12 · Options: mid-swipe on lunch**
- Same screen as frame 11.
- **The lunch card** is shown sliding left, with the next alternative sliding in:
  - it reads "Casa Sardinha · Old Town · Local classics · €€", "2 of 3";
  - ✓ "Local classics" · ✓ "€15–25 per person";
  - ⚠ "Cash only";
  - "From Ana's trip".
- **The undo bar** above the chat bar: "Lunch on Day 1 changed · Undo".

**Frame 13 · Options: Day 3 with an honest gap**
- Day 3 is selected.
- **Morning:** Sol Terrace (from Priya's trip).
- **Dinner** is an honest empty card, in muted with dashed borders:
  - title: "Not enough good options for Day 3 dinner";
  - body: "Nothing in Alto fits 'no long queues' on a Tuesday evening.";
  - three chips: "Allow a short wait this trip", "Try another area", "Leave the evening free".
- **Why:** refusing to pad the day is the promise. This state should feel considered, not broken.

**Frame 14 · Item detail** (bottom sheet at half height over frame 11, with a drag handle)
- **Why:** everything needed to decide, in one place, with the source traveler's own words.
- **Layout:**
  1. Title "Harbor Nine" and meta "Harbor · Seafood · €€ · €20–30 per person".
  2. **Why it fits you:** ✓ "Seafood: you love it, and Tomás says the grilled fish is the reason to go" · ✓ "€20–30 per person, within your budget".
  3. **The catch:** ⚠ "Busy 13:00–14:00; go at 12:15".
  4. **Not known:** ? "Step-free access". Food places also show "Check allergies with the venue".
  5. **From Tomás's trip:** a card with his note in serif, "Sat at the counter and watched the boats come in.", and his context, "solo · 2 days · April 2026".
  6. **Reviews:** 3 short reviews, each with its label ("From an XPMatch trip" or "Self-reported"), a month and trip type, and a rating word. No stars.
- **Bottom action bar (fixed):**
  - the primary button "Check price and availability" (opens the venue's site outside the app);
  - "Useful" and "Not useful" icon buttons;
  - a "⋯" menu with "Report a problem".

**Frame 15 · Itinerary, Day 2, with a clash**
- **Why:** the itinerary is the saved plan. Editing must stay as easy as choosing, and problems must be flagged before the traveler finds them in the street.
- **Layout:**
  1. Header: "Porto Clara · 16–18 May", a "Saved" check, and a "⋯" menu with **Invite a partner**, **Share activity**, **Rebuild with my profile** and **Another version**.
  2. The day control, with Day 2 selected: "Mon 17 May".
  3. Stop rows in time order. Each shows a number badge; a time and slot ("10:30 · Morning"); the title; area and category; one fit line; ‹ › alternatives; ↑ ↓ move buttons; and a "⋯" menu (Move to day, Remove, Details).
  4. **The clash on Tilehouse Gallery,** which the traveler moved to Day 2: a catch-colored flag, "Closed on Mondays. Day 2 is Monday 17 May," and a "See alternatives" text button.
  5. The chat bar at the bottom for typed changes.
- **Behavior:** every edit saves immediately, and an undo bar appears after each change.

**Frame 16 · Itinerary: rebuilt after a profile change**
- A banner at the top: "We rebuilt this trip with your updated profile. 3 stops changed."
- Two buttons: "Keep" (primary) and "Undo".
- The changed stops are marked "New".
- **Why:** nothing replaces a trip without the traveler's say.

### C. Browsing, people and messages

**Frame 17 · Explore: For you**
- **Layout:**
  1. Title "Explore".
  2. A segmented control: For you · Activity.
  3. A list of matched stops and itineraries as compact cards, each with one ✓ line, a source line and "Add to a day".
  4. One itinerary card: "Priya's 4 days in Porto Clara · couple · March 2026".
  5. The tab bar.
- **Honest empty state:** "Nothing new fits your profile in Porto Clara yet."

**Frame 18 · Explore: Activity**
- A feed from people who chose to share:
  - "Maya kept Tilehouse Gallery · Porto Clara · this week";
  - "Ana added a new stop to her Porto Clara trip".
- **Why:** it's social proof without exposure. Never dates, companions, spending or notes.

**Frame 19 · Inbox**
- **Sections:**
  - **Requests (1):** "Maya wants to message you", with Accept, Ignore and Block;
  - **Answers:** "Ana answered your question about Harbor Nine";
  - **Updates:** "Ana added a stop you might like".
- Unread dots, and the tab bar with an Inbox badge.

**Frame 20 · Profile**
- **Layout:**
  1. Initial avatar "S" and the name "Sam".
  2. A "Your travel taste" card: the serif summary sentence, with "Edit".
  3. Rows:
     - Appearance;
     - Privacy: "Share my activity" (off by default); "Show my picks to travelers with similar taste" (off by default);
     - Notifications;
     - Blocked people;
     - Community guidelines;
     - Delete account (destructive);
     - Sign out.
- **Why:** everything about being visible to others is opt-in, and it's visible here.

**Frame 21 · Appearance**
- **Layout:**
  1. Title "Appearance".
  2. "Mode": a segmented control, System · Light · Dark.
  3. "Color": five round swatches with names below them: Pine (selected), Ocean, Terracotta, Plum, Graphite.
  4. A live preview of a mini option card in the chosen colors.
  5. A note: "Your colors follow you to any phone you sign in on."
- **Behavior:** changes apply instantly, with no save button.
- **Swatch colors, light mode:** Pine #174D42, Ocean #1D4F8A, Terracotta #9A3F24, Plum #6A3877, Graphite #2E3437.

**Frame 22 · Share activity: preview sheet**
- A bottom sheet:
  1. "Share what you keep on this trip?"
  2. A preview row: "Sam kept Harbor Nine · Porto Clara · this week".
  3. The line "Never shown: your dates, who you're with, what you spend, your notes".
  4. Buttons: primary "Share activity" and text "Not now".
- **Why:** travelers see exactly what others will see before they agree.

**Frame 23 · Invite a partner: sheet**
- A bottom sheet:
  1. "Plan this trip together."
  2. "Send a link that works once and expires in 7 days. Your partner can see and edit this trip. You can remove them any time."
  3. Primary button: "Share invite link".

### D. During and after the trip

**Frame 24 · Evening check-in** (opened from an 8 pm notification on Sun 16 May)
- **Layout:**
  1. Title: "How was today?"
  2. A list of the day's 4 stops. Each has three buttons (Loved it · Fine · Not for me) and a text button "Didn't do it".
  3. Harbor Nine is shown marked "Loved it", with an optional note field "Add a private note".
  4. An "Add something else" text button, and the primary button "Done".
  5. A footnote: "Private unless you choose to share. You can turn check-ins off for this trip."

**Frame 25 · After-trip check-in: what next**
- **Layout:**
  1. Title: "How was Porto Clara?"
  2. A summary of the 11 planned stops (Day 3 dinner was left free): 9 done, with the evening answers already filled in, and 2 skipped, each with its reason, for example "Closed".
  3. A choice of three cards:
     - **"Keep private"** (selected by default): "Your ratings shape your next plans.";
     - **"Share as reviews"**: "Each rated stop with a note becomes a review under your name. We show the month and trip type, never your dates. You'll see a preview first.";
     - **"Share the whole trip"**: "Coming soon: turn your trip into an itinerary others can be matched with."
  4. Primary button: "Save".

## Part 3 — Variants and rules for every frame

**Frame 26 · Options, Day 1, in dark mode with the Ocean accent**
- The same content as frame 11, using the dark-mode colors.
- Fit, catch and unknown keep their meaning.

**Frame 27 · One option card at the largest accessibility text size**
- The Café Lumen card from frame 11, with text scaled to about 200%.
- The evidence lines wrap and are never truncated. The card grows taller.
- The ‹ › arrows stay 44 pt.
- Nothing overlaps.

**Rules for every frame:**
- **Full-screen flows hide the tab bar:** options, itinerary, voice, survey and check-ins. The chat bar sits *below* the content and never covers a card's buttons.
- **No horizontal scrolling of content,** except chip rows and the swipe between alternatives.
- **Dialogs are bottom sheets.** Errors are plain sentences with a "Try again" button, never raw error text.
- **At most one filled primary button per screen.**
- **Placeholder photos:** if the tool wants to add photos, don't. Cards stay typographic, with a category icon (café: coffee; seafood: fish; gallery: frame; viewpoint: mountain; wine bar: wine glass).
- **Consistency:** every screen uses the same components and tokens from Part 1.
