# Shaheen C — Data Analyst Portfolio

A production-grade React portfolio with:
- 🤖 **Nova Bot Intro** — slides in on load, types a welcome message, transitions to the main site
- 💬 **AI Chatbot Clone** — floating bottom-right, powered by Claude API, responds AS Shaheen
- 📊 **Animated Data Visualizations** — live line charts (canvas), bar charts (recharts), skill bars
- ✨ **Scroll animations, custom cursor, ticker, counter stats**

---

## Quick Start

```bash
cd shaheen-portfolio
npm install
npm start
```

Opens at http://localhost:3000

---

## Build for Production

```bash
npm run build
```

Then deploy the `/build` folder to Vercel, Netlify, or GitHub Pages.

---

## Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

---

## Customise

| What | Where |
|------|-------|
| Your name / bio | `App.jsx` → hero section |
| Skills & percentages | `App.jsx` → `SKILLS` constant |
| Projects | `App.jsx` → `PROJECTS` constant |
| AI clone personality | `App.jsx` → `SYSTEM_PROMPT` constant |
| Bot intro lines | `App.jsx` → `INTRO_LINES` constant |
| Contact email | `App.jsx` → contact section |
| Colors | `App.jsx` → `COLORS` constant + `:root` CSS |

---

## AI Chatbot

The chatbot calls the Anthropic Claude API directly. Make sure you have:
1. An Anthropic API key
2. Either a proxy or the API key injected via environment variable

For production, set up a simple backend proxy to protect your API key:

```
REACT_APP_API_URL=https://your-proxy.vercel.app/api/chat
```

---

## Tech Stack

- React 18
- Recharts (bar & line charts)
- Canvas API (live animated line chart, project bar chart)
- Anthropic Claude API (AI chatbot clone)
- CSS-in-JS (injected `<style>` tag for zero build config)
- Google Fonts: Syne + DM Sans

---

Built with code, caffeine, and curiosity. — Shaheen C
