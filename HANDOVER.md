# HANDOVER.md

## 1. Project Overview
A Rabbit R1 soundboard creation featuring iconic *Aliens* (1986) quotes, hosted on GitHub Pages and installable on the R1 via QR code.

**Tech stack:** Vanilla HTML/CSS/JS, no build tools. Static site hosted on GitHub Pages.
**Repos:** `https://github.com/muadibbles/r1_soundboard` (main), migrated from `https://github.com/muadibbles/gfx_pipeline` branch `claude/rabbit-r1-soundboard-AKUzH`.

---

## 2. What We Did This Session

- Migrated soundboard code from `gfx_pipeline` branch into the new `r1_soundboard` repo
- Removed all original R1 UI placeholder `.wav` files (startup_chime, lam_processing, etc.)
- Downloaded 6 *Aliens* (1986) sound clips; went through multiple rounds of fixing mismatches
- Redesigned UI for the R1's **240×282px** fixed viewport
- Added R1 hardware controls: scroll wheel navigates list, side button (PTT) plays, long press stops
- Created `install.html` with a QR code (via `api.qrserver.com`) for R1 sideloading
- Fixed `game_over.mp3` — trimmed 1.3s of UI noise from the head (source: 101soundboards)
- Fixed `express_elevator.mp3` — wrong source replaced; trimmed 1.75s from new source (101soundboards `wlpzao.mp3`)
- Renamed files to match actual audio content (e.g. `game_over.mp3` was actually "get away from her")
- Merged a user worktree that removed the bad `iq_drop.mp3`

**Files created/modified:**
- `index.html` — redesigned for 240×282px
- `style.css` — full rewrite for R1 fixed canvas
- `app.js` — rewritten with R1 hardware event listeners
- `sounds.js` — updated to match final 6 clips
- `install.html` — QR code installer page
- `sounds/` — 6 final MP3 files

---

## 3. Current State

**Working:**
- All 6 buttons play the correct clips at https://muadibbles.github.io/r1_soundboard/
- QR install page at https://muadibbles.github.io/r1_soundboard/install.html
- R1 hardware controls coded (scroll wheel + side button + long press)
- GitHub Pages enabled and serving latest commit

**6 clips:**
| Button | File |
|--------|------|
| Game Over, Man! | `sounds/game_over.mp3` |
| Nuke the Site | `sounds/nuke_the_site.mp3` |
| Get Away From Her! | `sounds/get_away_from_her.mp3` |
| Express Elevator to Hell | `sounds/express_elevator.mp3` |
| Mostly at Night | `sounds/mostly_at_night.mp3` |
| I Hate This Job | `sounds/i_hate_this_job.mp3` |

**Not yet verified:**
- R1 hardware controls (scroll wheel, side button) haven't been tested on a physical device — only coded based on SDK docs
- The QR code manifest format (`{ title, url, description, iconUrl, themeColor }`) was inferred from the `rabbit-hmi-oss/creations-sdk` repo — not officially confirmed

---

## 4. Key Decisions & Rationale

- **240×282px fixed viewport** — matches R1 creation window per official SDK docs
- **Scrollable list UI** — fits all buttons in the tiny screen; scroll wheel maps naturally to list navigation
- **GitHub Pages hosting** — simplest static host; R1 creations work with any public HTTPS URL
- **QR manifest format** — used `rabbit-hmi-oss/creations-sdk` as reference since official docs say "coming soon"
- **Source for clips** — ended up using `moviesoundclips.net` for nuke/mostly-at-night, `101soundboards.com` for the rest; moviesoundclips.net IDs were unreliable for most clips
- **ffmpeg trimming** — used to remove UI notification sounds baked into clips from 101soundboards

---

## 5. Pitfalls & Lessons Learned

- **moviesoundclips.net IDs are unreliable** — the page descriptions don't always match the actual audio served for a given ID. Only `id=696` (nuke) and `id=1648` (mostly at night) were correct.
- **101soundboards bakes UI sounds into clips** — every download from `hoovers.101soundboards.com` had ~1.5–1.75s of notification noise at the start. Always trim.
- **GitHub Pages caches aggressively** — users need Ctrl+Shift+R after updates; the audio files especially get cached.
- **Browser cache caused false mismatch reports** — several "wrong clip" reports were actually stale cache, not bad files. Always confirm with hard refresh before re-downloading.
- **Don't scan ID ranges blindly** — tried scanning thousands of movie-sounds.org IDs to find clips; user interrupted this. Better to search by known quote text.

---

## 6. Next Steps

1. **Test on physical R1** — scan QR from `install.html`, verify scroll wheel navigation and side button playback work as expected
2. **Add more clips** — user may want to expand beyond 6; good candidates from the moviesoundclips.net list: "Game over" variants, Vasquez quotes, Apone quotes
3. **Consider adding categories** — if clip count grows, grouping by character would help navigation on the small screen
4. **Git config** — local repo uses `muadibbles@users.noreply.github.com` as email (set to avoid GitHub push privacy block)
