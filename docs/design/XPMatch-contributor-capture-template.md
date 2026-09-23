# Contributor capture template (v0.1)

**Purpose:** collect real travelers' trips for the pilot city in the shape matching needs (`XPMatch-data-shape.md` §4), so nothing has to be collected twice. Use it as a Google Form, a spreadsheet, or a guided 30-minute call where you fill it in.

**Status:** proposal, with taxonomy 0.1 (D-041).

- **Consent wording:** a plain-language draft. Have it reviewed before real use (this isn't legal advice).
- **What never goes here:** the answers are the contributor's data, so they never go in this public repository. Store them in the founder's private workspace.

## Part A — Permission (first, before anything else)

Read this to the contributor, or show it, and record each answer with the date.

> XPMatch builds trip plans only from real trips that travelers chose to share. We'd like to use yours.
>
> 1. **Use in XPMatch plans.** Stops from your trip can be suggested to travelers they fit, with the notes you give us. **Required.**
> 2. **Show your first name.** Plans show "From [name]'s trip · couple · 3 days · May 2026". If you say no, it shows "From a traveler's trip". *(yes / no)*
> 3. **Show your travel taste.** A short summary of how you like to travel, next to your trip. *(yes / no)*
> 4. **Use your photos.** Only photos you took yourself. *(yes / no)*
> 5. **Publish on our website.** Your trip may appear in a city guide on XPMatch's website. *(yes / no)*
>
> **What we never show:** your exact dates, who you traveled with, what you spent, or how to contact you.
>
> **Withdrawing:** you can withdraw any time by messaging us, and we stop showing it straight away.
>
> **Confirm:** you took this trip yourself, and the notes are your own. *(confirm)*

Record the answers in `content_permission.scopes`, as `in_app_matching`, `show_name`, `public_taste`, `photos` and `web_publication`.

## Part B — About the trip

| # | Question | Answers | Field |
| --- | --- | --- | --- |
| B1 | Which city? | The pilot city | `city_id` |
| B2 | Month and year of the trip | For example May 2026. Not the dates | `month`, `year` |
| B3 | How many days? | 1–7 | `length_days` |
| B4 | Who did you travel with? | Solo · With my partner · Friends · Family | `party` (the pilot uses solo and couple trips first) |
| B5 | What kind of trip was it? | First visit · Return visit · Celebration · Food trip · Culture trip · Slow break | `purpose` |
| B6 | How full were your days? | Relaxed (about 3 stops a day) · Moderate (4) · Packed (5+) | `pace` |
| B7 | *(Optional, only with permission 3)* Your travel taste: what you'd cross town for, food you love, famous sights or local favorites | The same chips travelers see (taxonomy 0.1) | `contributor.public_taste` |

## Part C — Each stop, in order (repeat for every stop)

**Required for a stop to count:** C1–C6 and C8. The rest can be "don't know", which is fine and far better than a guess.

| # | Question | Answers | Field |
| --- | --- | --- | --- |
| C1 | Which day, and which stop of that day? | Day 1, stop 2 | `day_index`, `position` |
| C2 | When in the day? | Morning · Lunch · Afternoon · Dinner · Evening | `time_of_day` |
| C3 | Where? | The place name, plus a map link or address | Resolved by the operator to `place_id` |
| C4 | What kind of place? | Café · Bakery · Restaurant · Bar · Market · Museum · Gallery · Landmark · Place of worship · Park or garden · Viewpoint · Beach · Shop · Neighborhood walk · Tour or activity · Show or music venue · Spa · Other | `category` |
| C5 | What's it good for? Pick 1–3 | Food & drink · History & architecture · Art & museums · Nature & parks · Markets & shopping · Neighborhoods & walks · Views & photos · Nightlife & music · Live shows · Wellness · Crafts & workshops | `interest_tags` |
| C6 | How was it for you? | Loved it · It was fine · Not for me | `rating` |
| C7 | *(Food places)* What kind of food or drink? | Seafood · Local classics · Street food · Coffee & bakeries · Wine bar · Cocktail bar · Fine dining · Vegetarian-focused · International | `cuisine_tags` |
| C8 | What's the catch? The one thing the next person should know | One line, for example "Only six tables; short wait after 11:30". Or tick "No catch that I noticed" | `the_catch` / `catch_none` |
| C9 | Why did it work for you? | One or two lines, in your own words. Shown as your note | `why_it_fit` |
| C10 | Best time to go, or a tip | For example "Go before 11" | `best_time_tip` |
| C11 | Would you skip it next time? | No · Yes, because… | `would_skip`, `skip_reason` |
| C12 | How busy was it when you went? | Quiet · Moderate · Busy · Don't know. Queue: None · Short · Long, and when | `crowd_level`, `queue`, `queue_when` |
| C13 | Did you need to book? | Booking needed (how far ahead?) · Recommended · Just walked in · Don't know | `booking`, `booking_lead_days` |
| C14 | What did it cost per person, roughly? | A range, for example €20–30, and what it covered (a meal or a ticket). **Never shown publicly**; only the venue's price band is shown | `price_range` (private) |
| C15 | Did you notice any diet options? | Vegetarian · Vegan · Gluten-free · Halal · Kosher: each Yes · No · Didn't notice | Contributor-reported `place_fact` (`dietary`) |
| C16 | Getting in and around | Step-free entrance: Yes · No · Didn't notice. Lots of stairs or a steep hill: Yes · No | `place_fact` (`step_free`), `walking_effort` |
| C17 | What was the feel? Pick any | Quiet & cozy · Lively · Romantic · Casual | `atmosphere_tags` |
| C18 | Who is it good for? | Solo · Couples · A special occasion | `suits` |
| C19 | *(Optional, only with permission 4)* Photos you took | Upload | `media_asset` |

## Part D — What the operator adds (not asked of the contributor)

- **The place:** the catalog place, its area and coordinates, and its official website.
- **Opening days and hours,** and the date you checked them (plan A-002). Kitchen closing time for restaurants.
- **The venue's listed prices,** with the date checked.
- **Fame:** landmark · well known · local favorite. Base it on what you know and what contributors say, not on ratings sites.
- **Facts checked with the venue:** step-free access and diet options. These override the contributor's report.
- **Moderation:** read every free-text answer (C8–C11) before publishing, and remove names of other people and anything private.

## Spreadsheet columns

These are in order, if you collect in a sheet. Put each stop on its own row, and repeat the trip columns.

```
trip_id, contributor_first_name, contributor_contact_PRIVATE, consent_in_app_matching, consent_show_name, consent_public_taste, consent_photos, consent_web, consent_date, city, trip_month, trip_year, length_days, party, purpose, pace, public_taste,
day_index, position, time_of_day, place_name, place_map_link, category, interest_tags, rating, cuisine_tags, the_catch, catch_none, why_it_fit, best_time_tip, would_skip, skip_reason, crowd_level, queue, queue_when, booking, booking_lead_days, price_per_person_range_PRIVATE, price_covers, diet_vegetarian, diet_vegan, diet_gluten_free, diet_halal, diet_kosher, step_free, stairs_or_hills, atmosphere_tags, suits, photo_links
```

**Before you share the sheet with anyone,** remove or hide the columns marked `PRIVATE`.

## Supply target (plan D-006)

**Target:** 5 contributors, 15 itineraries and 30 reviews, with at least 3 suitable itineraries for each invited traveler.

**Before inviting testers:** run the coverage report (plan NFR-009). Check that plans fill every day for at least 90% of the test profiles, without breaking a must-have.
