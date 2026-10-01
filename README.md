# Siddhant Mehta — Portfolio (Matchday theme)

A React + Vite portfolio themed on the 2016/17 – 2017/18 era:
**Home (17/18 white + sky blue)**, **Away (16/17 purple, worn in the Cardiff final)** and **Third (16/17 black with Solar Blue diagonal graphics)** kits, with gold trophy accents.

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Edit content
Everything lives in `src/data.js`. Before deploying:
1. Set your real `linkedin` and `tryhackme` URLs (marked TODO).
2. Add a **phone-free** copy of your CV as `public/Siddhant_Mehta_CV.pdf`.
3. Keep the card ratings honest — you will be asked about them.

## Deploy (free)
- **Vercel / Netlify:** import the GitHub repo → framework "Vite" → build `npm run build`, output `dist`.
- **Custom domain:** add it in the Vercel/Netlify dashboard and point your DNS records as they instruct.

## Structure
```
src/
  data.js            ← all content + kit colours
  App.jsx            ← main menu, HUD, keyboard controls
  components/Screens.jsx ← Kick-off, First Team, Finals, Attributes, Trophy Cabinet, Transfer Request, Kit Room
  components/Intro.jsx  ← tunnel walk-out intro (Esc/Enter/click to skip)
  hooks.js           ← kit state, hash router
  styles.css         ← kit tokens at the top (--primary, --gold, ...)
```
## Controls (game-menu style)
| Where | Keys |
|---|---|
| Main menu | `↑ ↓` / `W S` move · `Enter` select · `1`–`7` jump to a mode |
| Inside a screen | `Esc` back · `← →` / `Q E` previous/next screen |
| Anywhere | `K` next kit · `Shift+K` previous kit |
| Kit Room | `1` Home 17/18 · `2` Away 16/17 · `3` Third 16/17 |

Screens have their own URLs (`/#/finals`, `/#/transfer` …), so you can link straight to one.

Fan-inspired design. No club crest, wordmark or player imagery is used. Not affiliated with Real Madrid C.F.
