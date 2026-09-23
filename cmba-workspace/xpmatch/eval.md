# Evaluation ledger — XPMatch (`cmba-eval`)

Graded on 2026-09-23 by an independent agent that hadn't written the artifacts:
- **Method:** blind first, against each skill's rubric; then verified against the upstream artifacts, the plan and the PRD.
- **Re-fetched:** xpmatchme.com, /guide and /about, and mindtrip.ai (GET only; no sign-ups or forms).
- **Checked afterwards:** this session re-fetched the v1 pages and confirmed the findings that depend on them.

**Grader bias:** the session that wrote the artifacts commissioned the grade. Every change the grader made after verification lowered a score.

## `cmba-content` × XPMatch — 2026-09-23

- **Footprint sources:** xpmatchme.com, /guide, /about (fetched). Wanderlog and Mindtrip Rome itineraries and three AI-planner blog checklists (seen in search results only).
- **Scores:** Faithfulness 2 · Teachability 3 · Hook quality 3 · Voice match 1 · Falsifiability 3 = **12/20** (13/20 blind).
- **Kill check: FIRED.**
  1. **A citation to a file that doesn't contain the quote.** "I have to double check everything" (2 likes) was attributed to `validation.md`, which doesn't contain it. It came from the validation research pass's outreach table, with a YouTube URL, and was never re-checked.
  2. **Unsourced numbers and majority claims in post copy:**
     - "Checking it takes 10 minutes, and most people skip it."
     - "Most trip reports are useless to the next traveler."
     - "the one most people leave out"
- **Substitution test: FAIL.**
  - The posts never showed how XPMatch works, so they read as true for Wanderlog or Mindtrip.
  - The hub's format (a 3-day city plan from one traveler's trip) already exists at both.
  - Post 1's checklist already exists on AI-planner blogs.
- **Control:** v1's weekend guide ("Ten habits of people who never waste a weekend") teaches just as concretely, cites research, and got to three of the same ideas first. The output fits the new job (short city trips) better.
- **Verdict: FAIL** (0/20 because the kill check fired; 12/20 on the rubric).
- **Weakest dimension:** 4, voice match (1).
  - The run read one page and declared there was no other content, yet the guide was one click away in v1's navigation.
  - The artifact had said: "So voice can't be matched: the register below follows `uvp.md`".

**PATCH (proposed for `.claude/skills/cmba-content/SKILL.md`, not applied):** a required "Existing content inventory" table before any other section.
- **Columns:** URL, type, date, read in full?, voice trait with a verbatim quote.
- **What to open:** every link in the site's navigation and footer, plus every social account the site links to.
- **Minimum reading:** at least 5 pieces, or a stated count if fewer exist.
- **Label:** posts carry `DRAFT: VOICE UNMATCHED` when fewer than 3 voice traits are quoted.

**Fixes made to `content.md` after the grade:**
- The YouTube quote is re-cited to its URL and marked `UNVERIFIED`.
- "10 minutes" and every "most …" claim are removed from the posts, the hooks, and the headline and asset titles.
- An existing-content inventory was added (3 pages read in full), with a voice fingerprint from v1's guide. The posts are marked **DRAFT: VOICE PARTLY MATCHED**.
- Post 1 now teaches "ask whose trip each stop came from", which is the differentiator. It replaces "count the famous names".
- The hub is retitled "3 days in [pilot city] for three kinds of traveler, built from real trips, with every stop's catch and what we still don't know", so it no longer matches rivals' existing format.
- Post 3's reasoning cites A-006 (items per day by pace), not D-036.
- Two quotes are re-labeled as weak or misapplied evidence.

**Re-run result:** pending. See `_run.md`.

## `cmba-profile` × XPMatch — 2026-09-23

- **Footprint sources:** xpmatchme.com and /about (fetched). The founder's LinkedIn was not readable.
- **Scores:** Faithfulness 3 · UVP lineage 4 · Shippability 1 · Restraint 3 · Falsifiability 2 = **13/20** (15/20 blind).
- **Kill check:** clear. No social-proof numbers.
- **Substitution test:** pass, narrowly. The city scope and the "not enough" promise make the copy false for Wanderlog and Mindtrip; the headline alone doesn't.
- **Control comparison:**
  - The rewrite is sharper on who the product is for and what it refuses to do.
  - It overstated what's new: v1's live example card already shows a fit reason, a tradeoff and "Elsa, books like you".
  - The origin story it left blank is public on /about.
- **Verdict: FAIL** (13/20; shippability below 2).
- **Weakest dimension:** 3, shippability (1).
  - Nearly everything waited on unresolved placeholders.
  - The live-site fix list was incomplete.
  - The copy said plans come from "travelers whose taste matches yours", which contradicts plan §5 and AGENTS.md.

**PATCH (proposed for `.claude/skills/cmba-profile/SKILL.md`, not applied):** a required "Ship-today check" table, one row per asset.
- **Each row gives:** a version with no brackets and no claim that depends on an open decision; the open decision it waits on; and the footprint searched for founder-only content before a placeholder is allowed.

**Fixes made to `profile.md` after the grade:**
- **Copy that ships today, with no brackets:** banner, tagline, About, company page, headline, subhead and CTA.
- **The About's origin** now uses the founder's published MileMatch line.
- **"Matched stop by stop to how you travel"** replaces the taste-matching-authors claim.
- **"Is being rebuilt as a phone app"** replaces "is now a phone app".
- **The form drops "Who with?"** (8 fields, 5 required).
- **The control comparison is corrected.**
- **The live-site fix list gains:**
  - the "In seconds… anywhere" and "tag @XPMatch… balance everyone's standards" lines, which closely follow Mindtrip's copy;
  - the Inspiration-page line;
  - the example card with specific ratings and a named reviewer.

**Re-run result:** pending.

## `cmba-offer` × XPMatch — triage only, 2026-09-23

- **Scores:** Faithfulness 3 · Model fit 3 · Achievement specificity 3 · Proof honesty 4 · Falsifiability 4 = **17/20**. Kill check clear.
- **Defects found:**
  - the ladder missed v1's live "For business" (Venues, Hosts, Packages, Book a demo) and "For creators" offers;
  - the achievement statement let either outcome count as success;
  - the outreach template repeated the "travelers with your taste" claim.
- **Fixed:**
  - both v1 offers added to the ladder, with their status to confirm;
  - an unfilled day now counts as a miss;
  - the template reworded.

## Were `content.md` and `profile.md` the two weakest?

**Among the three graded: yes.** Content is weakest, then profile, then offer.

**Across all eleven: not established.** `journey.md` and `email.md` weren't graded and shared some of the same defects, now fixed:
- a "ten minutes" duration nobody measured;
- a chain contradiction: journey post 2's "fail at the scheduling, not the choosing" against email 2's "The slots are easy";
- the author-similarity claim.

**The run log's reasons were wrong.** It named gaps the run had declared itself. It missed what verification found:
- a mis-cited quote;
- untimed numbers in post copy;
- existing content and a public origin that were never read;
- a core claim about how matching works that contradicted the plan.

## Findings beyond the graded artifacts (all fixed on 2026-09-23)

| # | Finding | Severity | Where fixed |
| --- | --- | --- | --- |
| 1 | "Travelers whose taste matches yours" misstates how matching works. Plan §5 and AGENTS.md match items to the traveler's own profile, and similarity to the source traveler appears only with consent | **High** | `uvp.md`, `profile.md`, `journey.md`, `email.md`, `offer.md`, the UI plan, and the plan's proposed product wording (§2) |
| 2 | "Closed that day" clash flags had no data: the plan's place record held no opening hours | Medium | Plan A-002, §7 and T5: operator-entered opening days and hours with a last-checked date, and "opening days not known" when missing |
| 3 | The untimed "10 minutes" spread into the magnet, email and journey | Medium | Removed everywhere |
| 4 | Journey chain contradiction (post 2 vs email 2) | Medium | Post 2 now says the shape comes first and choosing is harder |
| 5 | `idea.md` called the founder's origin a `GAP` without checking the site | Low | `idea.md`: sources 3/4 |
| 6 | More copy on the live v1 site follows Mindtrip closely, and an example card shows specific ratings and a named reviewer | Medium (brand, trust) | Added to `profile.md`'s blocking fixes |

## A seam row to add to the `cmba-run` coherence checklist (proposed, not applied)

| Seam | Question |
| --- | --- |
| Copy ↔ product mechanism | Does any public copy describe *how the product works* differently from the plan? Check every "built from", "matched to" and "never" claim against the plan's requirements |

## Re-grade (review cycle 2) — 2026-09-23, revision `ca81dec`

This was graded independently, with the same protocol: blind first, then verified, and v1 pages fetched by GET only.

| Artifact | Before | After | Verdict | Change |
| --- | --- | --- | --- | --- |
| `content.md` | 0/20 (kill check); 12/20 rubric | **14/20** (14 blind); kill check clear | **FAIL**: below 15, and the substitution test fails | Faithfulness 2→3, voice 1→2 |
| `profile.md` | 13/20 (15 blind) | **15/20** (15 blind); kill check clear | **PASS at the threshold**; substitution passes narrowly | Shippability 1→2, falsifiability 2→3 |

**Did the fixes land?**
- Most of the 22 claimed fixes landed.
- **Partly landed:**
  - one D-036 citation remained;
  - asset 9's quote was re-justified instead of re-labeled;
  - the ship-today list included a form with a bracketed option.

**Residual defects the grader found:**
- **Implied source-traveler similarity:** journey email 2, the magnet's wide problem and its template column, and content post 4.
- **Untimed durations:** "30 seconds", "2-minute", "takes evenings".
- **Two v1 quotes placed in the wrong section of the page.**
- **New defects introduced by the fixes:**
  - the ship-today list's errors;
  - a tagline that lost its audience;
  - a headline generic enough to read true for rivals;
  - unverified claims about what rivals' guides don't do;
  - the habit-05 rule not applied to post 2;
  - a wrong optional-field count.

### Fixes after the re-grade (review cycle 3 edits, not re-graded)

**Removed:** "30 seconds", "2-minute", "takes evenings", "an evening, or three" and "evenings of open tabs".

**Changed:**
- **Email 2 and the lead magnet** no longer imply XPMatch judges each source traveler's similarity. The template column now asks "what kind of trip were they on?".
- **Email 3** swaps its unsourced "built to give everyone the same answer" for a sourced traveler quote (Judy, `validation.md`).
- **Headline:** "*Only* real travelers' trips, matched to how you travel." "Only" is what rivals can't claim.
- **The LinkedIn tagline** names its audience: couples and solo travelers on 2–4 day city trips.
- **The ship-today list** is corrected:
  - the form and waitlist lines wait for a waitlist page and a provider;
  - the D-005, D-006 and D-035 dependencies are named.
- **The live-site fix list** adds v1's own "people like you" claims.
- **The hub:**
  - its reasoning no longer claims what rivals don't do;
  - it needs at least 3 trips per version;
  - the content now teaches the refusal. Post 3 says to leave a slot empty rather than fill it, and that line carries through the journey and the email track.
- **Post 2** credits v1's habit 05.
- **Also corrected:** the misplaced quote locations, the last D-036 citation, the field count, and the Play testing track (internal for the pilot).

**Not fixable without the founder:** voice match needs 5 of the founder's own posts (LinkedIn was unreadable). It will cap `content.md`'s voice score until then.

**Status:**
- `content.md` was last graded at 14/20 (FAIL) and `profile.md` at 15/20 (PASS).
- Both were edited after that grade.
- A third grade would be review cycle 3 of the repository's maximum of 5 (AGENTS.md). It wasn't run.
