import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import React, { useState, useEffect, useRef, useCallback } from "react";


/* ─── CONSTANTS ─────────────────────────────────── */
const COLORS = {
  accent: "#00e5ff",
  accent2: "#7c3aed",
  accent3: "#10b981",
  bg: "#03050a",
  surface: "#0b0f1a",
  surface2: "#111827",
  text: "#eef2ff",
  muted: "#6b7a99",
  border: "rgba(255,255,255,0.06)",
};

const SKILLS = [
  { name: "Power BI", pct: 90, icon: "📊" },
  { name: "SQL", pct: 85, icon: "🗄️" },
  { name: "Python", pct: 82, icon: "🐍" },
  { name: "Excel & VBA", pct: 87, icon: "⚡" },
  { name: "Tableau", pct: 75, icon: "📈" },
  { name: "Azure", pct: 65, icon: "☁️" },
];

const BAR_DATA = [
  { name: "Power BI", value: 90 },
  { name: "Python", value: 82 },
  { name: "SQL", value: 85 },
  { name: "Tableau", value: 75 },
  { name: "Excel", value: 87 },
];

const PROJECTS = [
{
  title: "Student Performance Analytics Dashboard",
  image: "/projects/student-dashboard.png",
      linkedin: "https://www.linkedin.com/posts/shaheen-c_from-ui-to-sql-to-power-bi-one-project-activity-7401544151630286848-Esya?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD-6zuwBlovcHdJjTzU7wDKOauftY1CkSo0",

  tag: "Full Stack + BI",
  tagColor: "#00e5ff",
  desc: "End-to-end student analytics system with dashboards.",
  details: `Designed and developed a complete Student Performance Analytics System from scratch.

• Flask backend with MySQL integration
• Module-wise marks & attendance tracking
• Batch-wise data handling
• Real-time SQL integration

Power BI Dashboard:
• Custom UI designed in Figma
• Live MySQL connection
• KPI tracking, trends, and student insights`,
  tools: ["SQL", "Power BI", "Python", "React"],
  type: "chart",
  color: "linear-gradient(135deg,#0ea5e9,#22c55e)"
},

{
  title: "BMW Sales Analysis Dashboard",
  image: "/projects/bmw-dashboard.png",
  tag: "Power BI",
  tagColor: "#60a5fa",

  desc: "Interactive sales analytics dashboard built using Power BI to analyse BMW sales performance, regional trends, revenue insights, and customer behaviour through dynamic visual storytelling.",

  fullDesc: `
This dashboard was designed to analyse BMW sales data using interactive Power BI visualisations.

Features included:
• Sales trend analysis
• Regional performance tracking
• Revenue and profit insights
• Vehicle category comparisons
• KPI cards and dynamic filtering

The dashboard focused on transforming raw sales data into actionable business insights using modern dashboard design principles.
  `,

  tools: [
    "Power BI",
    "Data Analysis",
    "Dashboard Design"
  ]
},

{
  title: "India Census 2011 Analytics Dashboard",
  linkedin: "https://www.linkedin.com/posts/shaheen-c_who-said-2011-data-cant-have-a-glow-up-activity-7387786222926163968-eK9e?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD-6zuwBlovcHdJjTzU7wDKOauftY1CkSo0",
  image: "/projects/india-census-dashboard.png",
  tag: "Analytics",
  tagColor: "#34d399",

  desc: "Data analytics dashboard built using Census 2011 India dataset to visualise population trends, literacy, demographics, and state-wise insights.",

  fullDesc: `
An interactive analytics dashboard created using India's 2011 Census dataset.

Key insights included:
• Population distribution analysis
• Literacy rate comparisons
• Gender ratio analysis
• State-wise demographic insights
• Urban vs rural trends

The project focused on transforming large-scale public datasets into understandable visual insights through data storytelling techniques.
  `,

  tools: [
    "Power BI",
    "Data Visualization",
    "Analytics"
  ]
},

{
  title: "Cleanlytics",
  image: "/projects/cleanlytics.png",

  tag: "AI + Analytics",
  tagColor: "#a855f7",

  linkedin: "https://www.linkedin.com/posts/shaheen-c_every-time-i-sat-down-to-build-a-dashboard-activity-7376501766726537217-rGVT?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD-6zuwBlovcHdJjTzU7wDKOauftY1CkSo0",

  desc: "AI-powered data cleaning and preprocessing tool designed to automate raw dataset preparation for analytics workflows.",

  fullDesc: `
Cleanlytics is an AI-powered data cleaning platform built to simplify preprocessing workflows for analysts and businesses.

The system helps users clean and structure messy datasets automatically before analysis.

Core Features:
• Missing value handling
• Duplicate detection and removal
• Column standardisation
• Automated preprocessing workflows
• Smart dataset analysis
• User-friendly upload interface

The project focused on reducing manual data preparation time while improving analytics efficiency through AI-assisted workflows.
  `,

  tools: [
    "AI Tools",
    "Data Analysis",
    "Automation"
  ]
},

{
  title: "Parkiko",
  image: "/projects/parkiko.png",
    linkedin: "https://www.linkedin.com/posts/shaheen-c_parkiko-startupjourney-parkingrevolution-activity-7340951403550425088-RG_U?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD-6zuwBlovcHdJjTzU7wDKOauftY1CkSo0",

  tag: "Web App",
  tagColor: "#22c55e",
  desc: "Parking marketplace platform.",
  details: `Platform connecting drivers with parking spaces.

• Real-time availability
• Map-based booking system
• Helps property owners monetize spaces
• Includes fuel stations & public toilet finder`,
  tools: ["Web Development", "AI"],
  type: "map",
  color: "linear-gradient(135deg,#6366f1,#06b6d4)"
},

{
  title: "Swalpam Music Kelkam",
  image: "/projects/swalpam.png",
      linkedin: "https://www.linkedin.com/posts/shaheen-c_ai-webdevelopment-musictech-activity-7358412156440104961-LqCR?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD-6zuwBlovcHdJjTzU7wDKOauftY1CkSo0",

  tag: "Fun App",
  tagColor: "#8b5cf6",
  desc: "Simple browser-based music app.",
  details: `Create and play music instantly.

• No login required
• Pure browser-based experience
• Built for fun interaction`,
  tools: ["Web Development", "AI"],
  type: "music",
  color: "linear-gradient(135deg,#8b5cf6,#ec4899)"
}
];



const TICKER_ITEMS = [
  "Power BI", "Python Analytics", "SQL & Data Modeling",
  "Tableau", "Azure Data Factory", "Data Engineering",
  "AI Automation", "Business Intelligence",
];

const INTRO_LINES = [
  "Hi there!",
  "I'm here to introduce me to you",
  "If you have any doubt i will be here, feel free to ask me",
];

const SYSTEM_PROMPT = `You are Nova, the AI clone of Shaheen C — a Data Analyst based in Doha, Qatar. You speak in first person AS Shaheen, with a professional but friendly and confident tone.

ABOUT YOU (Shaheen):
- Based in Doha, Qatar (originally from Malappuram, Kerala, India)
- Data Analyst at Happe Toys
- BSc Computer Science, University of Calicut; Data Analytics training from Haris and Co Academy

SKILLS: Power BI (90%), SQL (85%), Python (82%), Excel/VBA (87%), Tableau (75%), Azure (65%)
- 4 Power BI dashboards used in management meetings
- Learning Azure Data Factory, dbt, Apache Airflow, Synapse, ADLS Gen2

PROJECTS:
- Cleanlytics: AI-powered data cleaning (Python, Pandas, OpenAI) — used daily
- Student Analytics System: Supabase + Power BI + Lovable
- LinkedIn Analytics Automation: pipeline into Notion with weekly email reports
- Second Mind: JARVIS-inspired Android AI assistant in Kotlin/Jetpack Compose
- Won 1st place at Resolve Hackathon with "Get It Done" app

CAREER GOALS: Transitioning to Data Engineering, DP-203 Azure certification, targeting Data Analyst/BI/Data Engineering roles in Qatar and GCC

PERSONALITY: Builder mindset, loves AI apps and automation, entrepreneurial, freelances on Fiverr (Power BI, Excel, Python), competitive hackathon participant

INSTRUCTIONS: Always respond as Shaheen in first person. Professional, confident, warm. Concise answers. If unsure, say "That's something I'd love to discuss in person!"`;

/* ─── STYLES ─────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --accent: #00e5ff;
    --accent2: #7c3aed;
    --accent3: #10b981;
    --bg: #03050a;
    --surface: #0b0f1a;
    --text: #eef2ff;
    --muted: #6b7a99;
    --border: rgba(255,255,255,0.06);
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; cursor: none; }

  .display { font-family: 'Syne', sans-serif; }

  /* CURSOR */
  .cursor-dot { position: fixed; width: 10px; height: 10px; background: var(--accent); border-radius: 50%; pointer-events: none; z-index: 9999; transform: translate(-50%,-50%); mix-blend-mode: screen; transition: transform .1s; }
  .cursor-ring { position: fixed; width: 32px; height: 32px; border: 1px solid rgba(0,229,255,.35); border-radius: 50%; pointer-events: none; z-index: 9998; transform: translate(-50%,-50%); }

  /* GRID BG */
  .grid-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: .018; background-image: linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px); background-size: 56px 56px; }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 4px; }

  /* NAV */
  .nav { position: fixed; top: 0; left: 0; right: 0; display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 3rem; background: rgba(3,5,10,.88); backdrop-filter: blur(24px); border-bottom: 1px solid var(--border); z-index: 500; animation: slideDown .7s ease both; }
  @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .nav-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.4rem; background: linear-gradient(135deg, var(--accent), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .nav-links {
  display:flex;
  gap:2rem;
  align-items:center;
}

.menu-btn{
  display:none;
  width:30px;
  height:22px;
  flex-direction:column;
  justify-content:space-between;
  cursor:pointer;
  z-index:10001;
}

.menu-btn span{
  width:100%;
  height:3px;
  background:white;
  border-radius:20px;
  transition:0.3s ease;
}

.menu-btn.open span:nth-child(1){
  transform:translateY(9px) rotate(45deg);
}

.menu-btn.open span:nth-child(2){
  opacity:0;
}

.menu-btn.open span:nth-child(3){
  transform:translateY(-9px) rotate(-45deg);
}
  .nav-links a { font-size: .82rem; font-weight: 500; letter-spacing: .08em; color: var(--muted); text-decoration: none; transition: color .3s; text-transform: uppercase; }
  .nav-links a:hover { color: var(--accent); }
  .nav-cta { padding: .55rem 1.4rem; background: linear-gradient(135deg, var(--accent), var(--accent2)); border: none; border-radius: 8px; color: #fff; font-size: .82rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .3s; }
  .nav-cta:hover { transform: translateY(-2px); box-shadow: 0 0 30px rgba(0,229,255,.3); }

  /* HERO */
  .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 8rem 3rem 4rem; max-width: 1200px; margin: 0 auto; position: relative; }
  .hero-bg { position: fixed; inset: 0; pointer-events: none; background: radial-gradient(ellipse 55% 45% at 72% 38%, rgba(109,40,217,.13) 0%, transparent 70%), radial-gradient(ellipse 38% 38% at 18% 62%, rgba(0,229,255,.07) 0%, transparent 70%); z-index: 0; }
  .hero-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(0,229,255,.07); border: 1px solid rgba(0,229,255,.18); padding: 5px 16px; border-radius: 100px; font-size: .75rem; font-weight: 600; color: var(--accent); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 1.8rem; animation: fadeUp .8s .4s ease both; opacity: 0; }
  .pulse-dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; animation: blink 2s infinite; flex-shrink: 0; }
  @keyframes blink { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(1.6); } }
  .hero-title { font-family: 'Syne', sans-serif; font-size: clamp(2.8rem,5.5vw,5.2rem); font-weight: 800; line-height: 1.06; letter-spacing: -2px; animation: fadeUp .8s .55s ease both; opacity: 0; }
  .grad { background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 55%, #f472b6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero-sub { margin-top: 1.4rem; max-width: 520px; font-size: 1rem; line-height: 1.75; color: var(--muted); animation: fadeUp .8s .7s ease both; opacity: 0; }
  .hero-cta { display: flex; gap: 1rem; margin-top: 2.2rem; animation: fadeUp .8s .85s ease both; opacity: 0; flex-wrap: wrap; }
  .stats-row { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 3.5rem; animation: fadeUp .8s 1s ease both; opacity: 0; }
  .stat-num { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, var(--accent), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .stat-label { font-size: .72rem; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; margin-top: 2px; }
  .stat-div { width: 1px; background: var(--border); align-self: stretch; margin: 0 .8rem; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }

  /* BUTTONS */
  .btn { padding: .8rem 1.9rem; border-radius: 8px; font-size: .88rem; font-weight: 600; text-decoration: none; cursor: pointer; transition: all .3s; font-family: 'DM Sans', sans-serif; border: none; display: inline-block; }
  .btn-primary { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; box-shadow: 0 0 28px rgba(0,229,255,.2); }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 45px rgba(0,229,255,.38); }
  .btn-ghost { background: transparent; color: var(--text); border: 1px solid var(--border); }
  .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

  /* TICKER */
  .ticker-wrap { overflow: hidden; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: .9rem 0; }
  .ticker { display: flex; gap: 2.5rem; animation: tick 22s linear infinite; white-space: nowrap; width: max-content; }
  .ticker-item { font-size: .75rem; color: var(--muted); display: flex; align-items: center; gap: 7px; text-transform: uppercase; letter-spacing: .1em; }
  .ticker-dot { width: 4px; height: 4px; background: var(--accent); border-radius: 50%; flex-shrink: 0; }
  @keyframes tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* SECTION */
  .section { padding: 6rem 3rem; max-width: 1200px; margin: 0 auto; }
  .section-label { display: inline-flex; align-items: center; gap: 8px; font-size: .72rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; color: var(--accent); margin-bottom: .8rem; }
  .section-label::before { content: ''; display: block; width: 22px; height: 1px; background: var(--accent); }
  .section-title { font-family: 'Syne', sans-serif; font-size: clamp(1.9rem,3.5vw,2.9rem); font-weight: 800; letter-spacing: -.5px; margin-bottom: .9rem; }
  .section-sub { color: var(--muted); max-width: 520px; line-height: 1.75; }

  /* CHART BOX */
  .chart-box { background: var(--surface); border-radius: 18px; padding: 2rem; border: 1px solid var(--border); }
  .chart-title { font-size: .75rem; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 1.5rem; }

  /* SKILL CARDS */
  .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px,1fr)); gap: 1rem; margin-top: 2.5rem; }
  .skill-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 1.4rem; transition: all .3s; position: relative; overflow: hidden; cursor: default; }
  .skill-card::before { content: ''; position: absolute; inset: 0; background: rgba(0,229,255,.06); opacity: 0; transition: opacity .3s; }
  .skill-card:hover { border-color: rgba(0,229,255,.28); transform: translateY(-4px); }
  .skill-card:hover::before { opacity: 1; }
  .skill-icon { font-size: 1.7rem; margin-bottom: .6rem; display: block; }
  .skill-name { font-weight: 600; font-size: .9rem; margin-bottom: .5rem; }
  .skill-bar-wrap { height: 3px; background: rgba(255,255,255,.07); border-radius: 3px; overflow: hidden; }
  .skill-bar { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent2)); border-radius: 3px; transition: width 1.3s cubic-bezier(.34,1,.56,1); }
  .skill-pct { font-size: .72rem; color: var(--accent); font-weight: 600; margin-top: 5px; }

  /* PROJECTS */
  .project-image-wrapper{
  width:100%;
  height:220px;
  overflow:hidden;
}

.project-image{
  width:100%;
  height:100%;
  object-fit:cover;
  transition:0.4s ease;
}

.project-card:hover .project-image{
  transform:scale(1.05);
}

.project-modal-overlay{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.75);
  backdrop-filter:blur(10px);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:9999;
  padding:20px;
}

.project-modal{
  width:100%;
  max-width:920px;
  max-height:70vh;
  overflow-y:auto;
  background:#0b0f1a;
  border-radius:24px;
  border:1px solid rgba(255,255,255,0.08);
  animation:modalPop .3s ease;
}

.project-modal-image{
  width:100%;
  height:240px;
  object-fit:cover;
}

.project-modal-content{
  padding:22px;
}

.project-modal-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:20px;
}

.project-modal-header h2{
  font-size:28px;
  color:white;
}

.close-modal{
  background:none;
  border:none;
  color:white;
  font-size:24px;
  cursor:pointer;
}

.project-modal-desc{
  color:#cbd5e1;
  line-height:1.8;
  white-space:pre-line;
  margin-bottom:24px;
}

.linkedin-project-link{
  display:inline-block;
  margin-top:20px;
  color:#60a5fa;
  text-decoration:none;
  font-weight:600;
}

@keyframes modalPop{
  from{
    opacity:0;
    transform:scale(0.9);
  }
  to{
    opacity:1;
    transform:scale(1);
  }
}
  .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px,1fr)); gap: 1.4rem; margin-top: 2.5rem; }
  .project-card { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; overflow: hidden; transition: all .4s; }
  .project-card:hover { transform: translateY(-6px); border-color: rgba(0,229,255,.22); box-shadow: 0 18px 55px rgba(0,0,0,.4); }
.project-image-wrapper{
  width:100%;
  height:220px;
  overflow:hidden;
  border-radius:18px 18px 0 0;
  background:#111827;
}

.project-image{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
  transition:0.4s ease;
}

.project-card:hover .project-image{
  transform:scale(1.05);
}  .project-body { padding: 1.4rem; }
  .project-tag { display: inline-block; padding: 3px 11px; border-radius: 100px; font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .09em; margin-bottom: .7rem; background: rgba(255,255,255,.07); }
  .project-title { font-family: 'Syne', sans-serif; font-size: 1.15rem; font-weight: 700; margin-bottom: .45rem; }
  .project-desc { font-size: .83rem; color: var(--muted); line-height: 1.65; }
  .project-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 1.1rem; padding-top: 1.1rem; border-top: 1px solid var(--border); }
  .tool-chips { display: flex; gap: 6px; flex-wrap: wrap; }
  .tool-chip { font-size: .67rem; padding: 3px 9px; background: rgba(255,255,255,.05); border-radius: 5px; color: var(--muted); }
  .project-link { font-size: .78rem; color: var(--accent); font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 4px; transition: gap .2s; cursor: pointer; background: none; border: none; }
  .project-link:hover { gap: 8px; }

  /* CONTACT */
  .contact-box { background: var(--surface); border: 1px solid var(--border); border-radius: 22px; padding: 3.5rem; text-align: center; position: relative; overflow: hidden; }
  .contact-box::before { content: ''; position: absolute; width: 500px; height: 500px; background: radial-gradient(circle, rgba(109,40,217,.14), transparent 70%); top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none; }
  .contact-email { font-family: 'Syne', sans-serif; font-size: clamp(1.4rem,2.8vw,2.3rem); font-weight: 800; margin: 1.3rem 0; background: linear-gradient(135deg, var(--accent), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

  /* REVEAL */
  .reveal { opacity: 0; transform: translateY(36px); transition: all .75s cubic-bezier(.34,1,.64,1); }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* ── BOT OVERLAY ── */
  .bot-overlay { position: fixed; inset: 0; z-index: 2000; background: rgba(3,5,10,.97); display: flex; align-items: center; justify-content: center; transition: opacity .8s ease; }
  .bot-overlay.exit { opacity: 0; pointer-events: none; }
  .bot-stage { display: flex; flex-direction: column; align-items: center; }
  .bot-avatar { width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg,#0b0f1a,#111827); border: 2px solid rgba(0,229,255,.3); display: flex; align-items: center; justify-content: center; position: relative; animation: botIn .9s cubic-bezier(.34,1.56,.64,1) .3s both; box-shadow: 0 0 40px rgba(0,229,255,.15); }
  @keyframes botIn { from { opacity:0; transform:translateY(60px) scale(.7); } to { opacity:1; transform:translateY(0) scale(1); } }
  .bot-avatar-inner { width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent2)); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; }
  .bot-ring { position: absolute; inset: -8px; border-radius: 50%; border: 1.5px solid rgba(0,229,255,.2); animation: spin 6s linear infinite; }
  .bot-ring2 { position: absolute; inset: -16px; border-radius: 50%; border: 1px solid rgba(109,40,217,.2); animation: spin 10s linear infinite reverse; }
  @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
  .speech-bubble { background: var(--surface); border: 1px solid rgba(0,229,255,.2); border-radius: 20px; border-top-left-radius: 4px; padding: 1.5rem 2rem; max-width: 420px; margin-top: 1.5rem; animation: bubbleIn .8s cubic-bezier(.34,1.56,.64,1) 1.1s both; box-shadow: 0 20px 60px rgba(0,0,0,.5); position: relative; }
  .speech-bubble::before { content: ''; position: absolute; top: -10px; left: 28px; border-left: 10px solid transparent; border-bottom: 10px solid rgba(0,229,255,.2); }
  .speech-bubble::after { content: ''; position: absolute; top: -8px; left: 29px; border-left: 9px solid transparent; border-bottom: 9px solid var(--surface); }
  @keyframes bubbleIn { from { opacity:0; transform:scale(.85) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
  .bot-label { font-size: .72rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); margin-bottom: .5rem; display: flex; align-items: center; gap: 6px; }
  .bot-text { font-family: 'Syne', sans-serif; font-size: 1.2rem; font-weight: 600; line-height: 1.55; color: var(--text); min-height: 60px; }
  .bot-cta { width: 100%; margin-top: 1.5rem; padding: .75rem 2rem; background: linear-gradient(135deg, var(--accent), var(--accent2)); border: none; border-radius: 10px; color: #fff; font-size: .9rem; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .3s; }
  .bot-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,229,255,.25); }

  /* TYPING DOTS */
  .typing-dots { display: inline-flex; gap: 5px; align-items: center; }
  .typing-dots span { width: 7px; height: 7px; background: var(--accent); border-radius: 50%; animation: dot .8s infinite; }
  .typing-dots span:nth-child(2) { animation-delay: .15s; }
  .typing-dots span:nth-child(3) { animation-delay: .3s; }
  @keyframes dot { 0%,80%,100% { transform:scale(.6); opacity:.4; } 40% { transform:scale(1); opacity:1; } }

  /* ── FAB ── */
  .fab { position: fixed; bottom: 2rem; right: 2rem; width: 62px; height: 62px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent2)); border: none; cursor: pointer; z-index: 1000; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px rgba(0,229,255,.3); transition: all .3s; }
  .fab:hover { transform: scale(1.1); box-shadow: 0 0 50px rgba(0,229,255,.5); }
  .fab-pulse { position: absolute; inset: -4px; border-radius: 50%; border: 2px solid rgba(0,229,255,.4); animation: fabPulse 2s ease-out infinite; }
  @keyframes fabPulse { 0% { transform:scale(1); opacity:.8; } 100% { transform:scale(1.5); opacity:0; } }
  .fab-icon { width: 26px; height: 26px; fill: #fff; }

  /* ── CHAT WINDOW ── */
  .chat-window { position: fixed; bottom: 6.5rem; right: 2rem; width: 380px; background: var(--surface); border: 1px solid rgba(0,229,255,.18); border-radius: 20px; overflow: hidden; z-index: 999; box-shadow: 0 25px 80px rgba(0,0,0,.6); transform: scale(.85) translateY(20px); transform-origin: bottom right; opacity: 0; transition: all .35s cubic-bezier(.34,1.56,.64,1); pointer-events: none; display: flex; flex-direction: column; max-height: 520px; }
  .chat-window.open { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }
  .chat-header { padding: 1rem 1.2rem; background: linear-gradient(135deg,rgba(0,229,255,.08),rgba(109,40,217,.08)); border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
  .chat-avatar { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent2)); display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
  .chat-info strong { display: block; font-size: .88rem; font-family: 'Syne', sans-serif; }
  .chat-info span { font-size: .72rem; color: var(--accent); display: flex; align-items: center; gap: 4px; }
  .chat-online { width: 5px; height: 5px; background: var(--accent3); border-radius: 50%; animation: blink 2s infinite; }
  .chat-close { background: none; border: none; cursor: pointer; color: var(--muted); font-size: 1.2rem; line-height: 1; transition: color .2s; margin-left: auto; }
  .chat-close:hover { color: var(--text); }
  .chat-messages { flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: .75rem; scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.1) transparent; }
  .msg { max-width: 85%; font-size: .85rem; line-height: 1.6; padding: .65rem 1rem; border-radius: 14px; animation: msgIn .3s ease; }
  @keyframes msgIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  .msg-bot { background: rgba(255,255,255,.05); border: 1px solid var(--border); border-bottom-left-radius: 4px; align-self: flex-start; color: var(--text); }
  .msg-user { background: linear-gradient(135deg,rgba(0,229,255,.18),rgba(109,40,217,.18)); border: 1px solid rgba(0,229,255,.2); border-bottom-right-radius: 4px; align-self: flex-end; color: var(--text); }
  .chat-chips { display: flex; gap: .4rem; flex-wrap: wrap; padding: .5rem 1rem 0; }
  .chip-btn { font-size: .72rem; padding: 5px 11px; border-radius: 100px; background: rgba(0,229,255,.07); border: 1px solid rgba(0,229,255,.18); color: var(--accent); cursor: pointer; transition: all .2s; font-family: 'DM Sans', sans-serif; }
  .chip-btn:hover { background: rgba(0,229,255,.15); }
  .chat-footer { padding: .75rem 1rem; border-top: 1px solid var(--border); display: flex; gap: .5rem; align-items: center; }
  .chat-input { flex: 1; background: rgba(255,255,255,.05); border: 1px solid var(--border); border-radius: 10px; padding: .6rem .9rem; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: .85rem; outline: none; transition: border-color .2s; }
  .chat-input:focus { border-color: rgba(0,229,255,.3); }
  .chat-input::placeholder { color: var(--muted); }
  .send-btn { width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, var(--accent), var(--accent2)); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s; flex-shrink: 0; }
  .send-btn:hover { transform: scale(1.08); }
  .send-btn svg { width: 16px; height: 16px; fill: #fff; }

  footer { text-align: center; padding: 2.5rem; color: var(--muted); font-size: .78rem; border-top: 1px solid var(--border); }
  main { position: relative; z-index: 1; }

 /* =========================
   MOBILE RESPONSIVE
========================= */



 @media (max-width:768px){

  .nav{
    padding:16px 20px;
  }

  .menu-btn{
    display:flex;
  }

  .nav-links{
    position:fixed;
    top:0;
    right:-100%;
    width:250px;
    height:100vh;
    background:#050816;
    flex-direction:column;
    justify-content:center;
    align-items:flex-start;
    padding:40px;
    gap:30px;
    transition:0.4s ease;
    z-index:9999;
  }

  .nav-links.active{
    right:0;
  }

  .nav-links a{
    font-size:18px;
  }

  .nav .btn{
    display:none;
  }

  .hero-flex{
    flex-direction:column;
    gap:40px;
  }

  .hero-left{
    width:100% !important;
    transform:none !important;
  }

  .hero-title{
    font-size:58px !important;
    line-height:0.95;
  }

  .hero-sub{
    font-size:15px;
    line-height:1.8;
  }

  .hero-right{
    width:100% !important;
    justify-content:center !important;
  }

  .hero-right img{
    width:280px !important;
    transform:none !important;
  }

  .hero-cta{
    flex-wrap:wrap;
  }

  .stats-row{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:20px;
    margin-top:40px;
  }

  .stat-div{
    display:none;
  }

  .contact-email{
    font-size:20px;
    word-break:break-word;
  }

  .contact-box{
    padding:32px 20px;
  }

  .projects-grid{
    grid-template-columns:1fr;
  }

  .chat-window{
    width:92%;
    right:4%;
    bottom:90px;
  }

  .fab{
    width:58px;
    height:58px;
    right:20px;
    bottom:20px;
  }
}

`;

/* ─── CUSTOM TOOLTIP ─────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#111827", border: "1px solid rgba(0,229,255,.2)", borderRadius: 8, padding: "8px 12px", fontSize: ".8rem", color: "#eef2ff" }}>
        <p style={{ color: "#6b7a99", marginBottom: 2 }}>{label}</p>
        <p style={{ color: "#00e5ff", fontWeight: 600 }}>{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

/* ─── PROJECT VISUALIZATIONS ─────────────────────── */
const ProjectViz = ({ type, color }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (type === "bar") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = 185;
      let pa = 0;
      const data = [45, 62, 38, 71, 55, 80, 67, 90, 75, 85, 92, 78];
      const draw = () => {
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        const bw = W / data.length - 5;
        data.forEach((v, i) => {
          const h = (v / 100) * (H - 16) * Math.min(1, pa / 55);
          const x = i * (bw + 5) + 2;
          const g = ctx.createLinearGradient(0, H - h, 0, H);
          g.addColorStop(0, "rgba(0,229,255,.85)"); g.addColorStop(1, "rgba(0,229,255,.1)");
          ctx.fillStyle = g; ctx.fillRect(x, H - h, bw, h);
        });
        if (pa < 55) pa++;
        animRef.current = requestAnimationFrame(draw);
      };
      draw();
      return () => cancelAnimationFrame(animRef.current);
    }
  }, [type]);

  if (type === "bar") return <canvas ref={canvasRef} style={{ width: "100%", display: "block" }} />;

  if (type === "line") {
    const lineData = [
      { m: "Jan", v: 62 }, { m: "Feb", v: 75 }, { m: "Mar", v: 58 },
      { m: "Apr", v: 88 }, { m: "May", v: 72 }, { m: "Jun", v: 95 },
    ];
    return (
      <div style={{ width: "90%", height: 150 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.05)" />
            <XAxis dataKey="m" tick={{ fill: "#6b7a99", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="v" stroke={COLORS.accent} strokeWidth={2} dot={{ fill: COLORS.accent, r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === "node") {
    return (
      <svg width="85%" height="145" viewBox="0 0 300 145">
        <circle cx="150" cy="72" r="22" fill="rgba(109,40,217,.25)" stroke="#7c3aed" strokeWidth="1.5">
          <animate attributeName="r" values="22;27;22" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <text x="150" y="77" textAnchor="middle" fontSize="9" fill="#a78bfa" fontFamily="monospace">NOVA</text>
        {[[65, 32, "#00e5ff"], [235, 32, "#00e5ff"], [55, 112, "#10b981"], [245, 112, "#10b981"]].map(([cx, cy, stroke], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="13" fill={`${stroke}22`} stroke={stroke} strokeWidth="1" />
            <line x1="150" y1="72" x2={cx} y2={cy} stroke={`${stroke}55`} strokeWidth="1" strokeDasharray="5 4">
              <animate attributeName="strokeDashoffset" values="0;-9" dur="1s" repeatCount="indefinite" />
            </line>
          </g>
        ))}
      </svg>
    );
  }
  return null;
};

/* ─── BOT OVERLAY ────────────────────────────────── */
const BotOverlay = ({ onDone }) => {
  const [displayText, setDisplayText] = useState("");
  const [linesDone, setLinesDone] = useState(0);
  const [showCta, setShowCta] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let timeout;
    const allText = INTRO_LINES.join("\n");
    let idx = 0;
    let built = "";

    const typeNext = () => {
      if (idx < allText.length) {
        built += allText[idx];
        setDisplayText(built);
        idx++;
        timeout = setTimeout(typeNext, idx === 1 ? 600 : 36);
      } else {
        setTimeout(() => setShowCta(true), 400);
      }
    };

    timeout = setTimeout(typeNext, 1800);
    return () => clearTimeout(timeout);
  }, []);

  const handleMeet = () => {
    setExiting(true);
    setTimeout(onDone, 900);
  };

  return (
    <div className={`bot-overlay${exiting ? " exit" : ""}`}>
      <div className="bot-stage">
        <div className="bot-avatar">
  <div className="bot-ring" />
  <div className="bot-ring2" />

  <div
    style={{
      width: "70px",
      height: "70px",
      borderRadius: "50%",
      background: "linear-gradient(135deg,#00e5ff,#7c3aed)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "28px",
      fontWeight: "bold",
      color: "white",
      fontFamily: "Syne"
    }}
  >
    SC
  </div>
</div>
        <div className="speech-bubble">
          <div className="bot-label">
            <span className="pulse-dot" />
            Shaheen's Clone
          </div>
          <div className="bot-text">
            {displayText ? (
              displayText.split("\n").map((line, i) => (
                <span key={i}>{line}{i < displayText.split("\n").length - 1 ? <br /> : null}</span>
              ))
            ) : (
              <div className="typing-dots"><span /><span /><span /></div>
            )}
          </div>
          {showCta && (
            <button className="bot-cta" onClick={handleMeet}>
               Meet Shaheen →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── CHATBOT ────────────────────────────────────── */
const ChatBot = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hey! I'm Shaheen" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const msgsRef = useRef(null);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages]);

  const askGemini = useCallback(async (question) => {
    await new Promise(resolve => setTimeout(resolve, 500));
  setMessages(prev => [...prev, { role: "user", text: question }]);
  setLoading(true);

  try {
    const response = await fetch(
  "https://shaheen-ai.onrender.com/chat",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: question
    })
  }
);

const result = await response.json();

const reply = result.reply;

setMessages(prev => [
  ...prev,
  { role: "bot", text: reply }
]);

  } catch (err) {
    console.error(err);

    setMessages(prev => [
      ...prev,
      {
        role: "bot",
        text: "Something went wrong. Please try again."
      }
    ]);
  }

  setLoading(false);
}, []);

  const send = async () => {
  const v = input.trim();

  if (!v || loading) return;

  setInput("");

  await askGemini(v);
};

  const quickQuestions = [
    ["Skills", "Tell me about your skills and tools"],
    ["Projects", "What projects have you built?"],
    ["Hiring?", "Are you open to work?"],
    ["Goals", "What are your career goals?"],
  ];

  return (
    <div className={`chat-window${isOpen ? " open" : ""}`}>
      <div className="chat-header">
        <div className="chat-avatar">🤖</div>
        <div className="chat-info">
          <strong>  Shaheen</strong>
          <span><span className="chat-online" />Online now</span>
        </div>
        <button className="chat-close" onClick={onToggle}>✕</button>
      </div>

      <div className="chat-messages" ref={msgsRef}>
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role === "bot" ? "msg-bot" : "msg-user"}`}>{m.text}</div>
        ))}
        {loading && (
          <div className="msg msg-bot">
            <div className="typing-dots"><span /><span /><span /></div>
          </div>
        )}
      </div>

      <div className="chat-chips">
        {quickQuestions.map(([label, q]) => (
          <button key={label} className="chip-btn" onClick={() => { if (!loading) askGemini(q); }}>{label}</button>
        ))}
      </div>

      <div className="chat-footer">
        <input
          className="chat-input"
          value={input}
          placeholder="Ask anything about Shaheen…"
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") send(); }}
        />
        <button
  className="send-btn"
  onClick={send}
  disabled={loading}
>
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
        </button>
      </div>
    </div>
  );
};

/* ─── SKILL CARD ─────────────────────────────────── */
const SkillCard = ({ icon, name, pct, visible }) => (
  <div className="skill-card reveal" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)" }}>
    <span className="skill-icon">{icon}</span>
    <div className="skill-name">{name}</div>
    <div className="skill-bar-wrap">
      <div className="skill-bar" style={{ width: visible ? `${pct}%` : "0%" }} />
    </div>
    <div className="skill-pct">{pct}%</div>
  </div>
);

/* ─── COUNTER ────────────────────────────────────── */
const Counter = ({ target, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 2000, start = Date.now();
        const step = () => {
          const p = Math.min((Date.now() - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(ease * target));
          if (p < 1) requestAnimationFrame(step);
          else setCount(target);
        };
        step();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <div ref={ref} className="stat-num">{count}{suffix}</div>;
};

/* ─── LIVE LINE CHART ────────────────────────────── */
const LiveLineChart = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.parentElement.offsetWidth; canvas.height = 165; };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const W = canvas.width, H = canvas.height, o = offsetRef.current;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,.03)"; ctx.lineWidth = 1;
      for (let y = 0; y < H; y += 28) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      const pts = [], pts2 = [];
      for (let x = 0; x <= W + 10; x += 7) {
        pts.push({ x, y: H / 2 + Math.sin((x + o) * .016) * 32 + Math.sin((x + o) * .031) * 14 + Math.cos((x + o) * .009) * 18 });
        pts2.push({ x, y: H / 2 + Math.cos((x + o) * .019) * 24 + Math.sin((x + o) * .027) * 16 });
      }
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "rgba(0,229,255,.18)"); g.addColorStop(1, "rgba(0,229,255,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(pts[0].x, H);
      pts.forEach(p => ctx.lineTo(p.x, p.y)); ctx.lineTo(pts[pts.length - 1].x, H); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#00e5ff"; ctx.lineWidth = 2; ctx.shadowBlur = 8; ctx.shadowColor = "#00e5ff";
      ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.stroke();
      ctx.shadowBlur = 0; ctx.strokeStyle = "rgba(124,58,237,.65)"; ctx.lineWidth = 1.5; ctx.globalAlpha = .8;
      ctx.beginPath(); pts2.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.stroke();
      ctx.globalAlpha = 1;
      offsetRef.current += 1.4;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", display: "block" }} />;
};

/* ─── REVEAL WRAPPER ─────────────────────────────── */
const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)", transition: `all .75s cubic-bezier(.34,1,.64,1) ${delay}ms` }}>
      {children}
    </div>
  );
};

/* ─── CURSOR ─────────────────────────────────────── */
const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = e => { pos.current = { x: e.clientX, y: e.clientY }; dotRef.current.style.left = e.clientX + "px"; dotRef.current.style.top = e.clientY + "px"; };
    document.addEventListener("mousemove", onMove);
    let raf;
    const anim = () => { ring.current.x += (pos.current.x - ring.current.x) * .13; ring.current.y += (pos.current.y - ring.current.y) * .13; ringRef.current.style.left = ring.current.x + "px"; ringRef.current.style.top = ring.current.y + "px"; raf = requestAnimationFrame(anim); };
    anim();
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (<><div ref={dotRef} className="cursor-dot" /><div ref={ringRef} className="cursor-ring" /></>);
};

/* ─── APP ────────────────────────────────────────── */
export default function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openProject, setOpenProject] = useState(null);
  const [botDone, setBotDone] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef(null);
 

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSkillsVisible(true); }, { threshold: 0.2 });
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const handleBotDone = () => {
    setBotDone(true);
    setTimeout(() => { setChatOpen(true); }, 1000);
  };

  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <>
      <style>{styles}</style>
      <Cursor />
      <div className="grid-bg" />

      {!botDone && <BotOverlay onDone={handleBotDone} />}

      {/* FAB */}
      {botDone && (
        <button className="fab" onClick={() => setChatOpen(v => !v)} aria-label="Chat with Shaheen's AI clone">
          <div className="fab-pulse" />
          <svg className="fab-icon" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.82.487 3.53 1.338 5.003L2.5 21l4.232-.826A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-1 14H7v-2h4v2zm6-4H7v-2h10v2zm0-4H7V6h10v2z" /></svg>
        </button>
      )}

      <ChatBot isOpen={chatOpen} onToggle={() => setChatOpen(v => !v)} />

      {/* NAV */}
      <nav className="nav">
  <div className="nav-logo">SC.</div>

  <div className={`nav-links ${mobileMenu ? "active" : ""}`}>
    <a href="#about" onClick={() => setMobileMenu(false)}>About</a>
    <a href="#skills" onClick={() => setMobileMenu(false)}>Skills</a>
    <a href="#projects" onClick={() => setMobileMenu(false)}>Projects</a>
    <a href="#contact" onClick={() => setMobileMenu(false)}>Contact</a>
  </div>

  <div
    className={`menu-btn ${mobileMenu ? "open" : ""}`}
    onClick={() => setMobileMenu(!mobileMenu)}
  >
    <span></span>
    <span></span>
    <span></span>
  </div>
        <a
  href="https://www.linkedin.com/in/shaheen-c/"
  className="btn btn-primary"
  style={{
    padding: "10px 18px",
    fontSize: "14px"
  }}
>
  Connect with me
</a>
      </nav>

      <main>
 {/* HERO */}
<section className="hero" id="about">
  <div className="hero-bg" />

  <div
  className="hero-flex"
   style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",  // 👈 change this
    width: "100%",
  }}
>

    {/* LEFT SIDE */}
    <div className="hero-left"
    style={{
    width: "60%",
    transform: "translateX(-40px)",  // 👈 THIS is what moves it left
  }}>
      

      <h1 className="hero-title">
        Make <br/>Your Data<br/>
        <span className="grad">Work For You.</span>
      </h1>

      <p className="hero-sub">
        Data Analyst based in <strong>Doha, Qatar</strong> — specialising in Power BI dashboards, Python automation, and SQL analytics. Originally from Malappuram, building a career across the GCC.
      </p>

      <div className="hero-cta">
        <a href="#projects" className="btn btn-primary">View My Work</a>
        <a href="#contact" className="btn btn-ghost">Get In Touch</a>
      </div>

      {/* ✅ MOVE STATS INSIDE HERO */}
      <div className="stats-row">
        <div><Counter target={4} /><div className="stat-label">Power BI Dashboards</div></div>
        <div className="stat-div" />
        <div><Counter target={1} /><div className="stat-label">Years Experience</div></div>
        <div className="stat-div" />
        <div><Counter target={10} /><div className="stat-label">Projects Delivered</div></div>
        <div className="stat-div" />
        <div><Counter target={1} suffix=" 🏆" /><div className="stat-label">Hackathon Win</div></div>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div
  className="hero-right"
  style={{
    position: "relative",
    width: "10%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    overflow: "visible"
  }}
>
  <img
    src="/profile.png"
    alt="Shaheen"
    style={{
      width: "600px",                 // 🔥 bigger
      height: "auto",
      objectFit: "cover",

      // ❌ REMOVE box look
      borderRadius: "0px",

      // 🔥 move right + up
      transform: "translate(100px, -100px)",

      // 🔥 blend edges
      maskImage: "linear-gradient(to top, transparent 0%, black 50%)",
      WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 50%)",

      // 🔥 subtle polish
      filter: "brightness(0.95) contrast(1.1)"
    }}
  />
</div>

  </div>
</section>

        {/* TICKER */}
        <div className="ticker-wrap">
          <div className="ticker">
            {tickerItems.map((item, i) => (
              <span key={i} className="ticker-item"><span className="ticker-dot" />{item}</span>
            ))}
          </div>
        </div>

        {/* SKILLS */}
        <section className="section" id="skills">
  <Reveal>
    <div className="section-label">Expertise</div>
    <h2 className="section-title">Tools & Technologies</h2>
    <p className="section-sub">
      Tools I use to build data-driven solutions and scalable systems.
    </p>
  </Reveal>

  <div className="skills-grid" style={{ marginTop: "2rem" }}>
    {["Power BI", "SQL", "Python", "Excel", "Tableau", "Azure"].map((tool, i) => (
      <Reveal key={tool} delay={i * 80}>
        <div className="skill-card">
          <div className="skill-name">{tool}</div>
        </div>
      </Reveal>
    ))}
  </div>
</section>

{/* Experience */}
<section className="section" id="experience">
  <Reveal>
    <div className="section-label">Experience</div>
    <h2 className="section-title">Professional Experience</h2>
  </Reveal>

  <Reveal delay={100}>
    <div className="chart-box" style={{ marginTop: "2rem" }}>
      <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>
        Data Analyst
      </h3>
      <p style={{ color: "#6b7a99", marginTop: "4px" }}>
        Happe Toys · Full-time
      </p>
      <p style={{ color: "#6b7a99" }}>
        Jan 2026 - Present · Doha, Qatar · On-site
      </p>

      <ul style={{ marginTop: "1rem", lineHeight: 1.8 }}>
        <li>Developing interactive Power BI dashboards to track sales and inventory performance</li>
        <li>Analysing business data to surface actionable insights for stakeholders</li>
      </ul>
    </div>
  </Reveal>
</section>

        {/* PROJECTS */}
        <section className="section" id="projects">
          <Reveal><div className="section-label">Portfolio</div><h2 className="section-title">Featured Projects</h2><p className="section-sub">Real solutions built to drive insight, automate decisions, and impress stakeholders.</p></Reveal>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
                <div
  className="project-card"
  onClick={() => setOpenProject(p)}
  style={{ cursor: "pointer" }}
>
                  <div className="project-image-wrapper">
  <img
    src={p.image}
    alt={p.title}
    className="project-image"
  />
</div>
                  <div className="project-body">
                    <span className="project-tag" style={{ color: p.tagColor }}>{p.tag}</span>
                    <div className="project-title">{p.title}</div>
                    <p className="project-desc">{p.desc}</p>


                    <div className="project-footer">
                      <div className="tool-chips">{p.tools.map(t => <span key={t} className="tool-chip">{t}</span>)}</div>
                      
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="section" id="contact">
          <Reveal>
            <div className="contact-box">
              <div className="section-label" style={{ justifyContent: "center", display: "flex" }}>Let's Connect</div>
              <p style={{ color: "#6b7a99", marginTop: ".9rem", maxWidth: 480, margin: ".9rem auto 0", lineHeight: 1.75 }}>If you value data-driven decision making, let’s create something meaningful.</p>
              <div className="contact-email">shaheenshanu246@gmail.com</div>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1.8rem" }}>
                <a
  href="/cv.pdf"
  download
  className="btn btn-primary"
>
  Download CV
</a>
<a
  href="https://github.com/Shaheen-C"
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-ghost"
>
  GitHub
</a>
                <a
  href="https://www.linkedin.com/in/shaheen-c/"
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-ghost"
>
  LinkedIn Profile
</a>
              </div>
            </div>
          </Reveal>
        </section>
        {openProject && (
  <div
    className="project-modal-overlay"
    onClick={() => setOpenProject(null)}
  >
    <div
      className="project-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <img
        src={openProject.image}
        alt={openProject.title}
        className="project-modal-image"
      />

      <div className="project-modal-content">

        <div className="project-modal-header">
          <h2>{openProject.title}</h2>

          <button
            className="close-modal"
            onClick={() => setOpenProject(null)}
          >
            ✕
          </button>
        </div>

        <p className="project-modal-desc">
          {openProject.fullDesc || openProject.details}
        </p>

        <div className="tool-chips">
          {openProject.tools.map(tool => (
            <span key={tool} className="tool-chip">
              {tool}
            </span>
          ))}
        </div>

        {openProject.linkedin && (
          <a
            href={openProject.linkedin}
            target="_blank"
            rel="noreferrer"
            className="linkedin-project-link"
          >
            LinkedIn Post →
          </a>
        )}

      </div>
    </div>
  </div>
)}
      </main>

      <footer>
        <p>© 2026 Shaheen C · Data Analyst · Doha, Qatar</p>
      </footer>
    </>
  );
}
