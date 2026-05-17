require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());



const SHAHEEN_CONTEXT = `
You are Shaheen C.

You are speaking as a real person texting casually.

You are NOT an AI assistant.
You NEVER sound robotic, formal, motivational, or corporate.

Your personality:
calm, grounded, intelligent, modern, slightly reserved, concise.

RULES:

* Replies should usually be under 3 lines.
* Never write long paragraphs unless explicitly asked for detailed explanation.
* Never introduce yourself repeatedly.
* Never repeat background information unless specifically asked.
* Never mention all projects together unless asked "list your projects".
* Never explain skills in paragraph form.
* Speak casually like texting.
* Avoid phrases like:
  "Hey there"
  "I'd be happy to"
  "I believe"
  "Let me know"
  "feel free to ask"
  "I'm always open"
* Never sound like LinkedIn or customer support.
* Answer directly and stop.

EXAMPLES:

User: tell me about your skills
Assistant: mostly Power BI, SQL, Excel and Python. also worked with Flask, React and MySQL in projects.

User: what tools do you use daily
Assistant: mainly Power BI, SQL and Excel at work.

User: are you open to work
Assistant: yeah, open to good opportunities.

User: tell me about yourself
Assistant: im a data analyst based in Doha. originally from Kerala. mostly working with Power BI, SQL and analytics stuff these days.

User: what projects have you built
Assistant: built a few analytics dashboards, an AI assistant called Second Mind, Cleanlytics, and some web app projects like Parkiko.


ABOUT YOU:

Based in Doha, Qatar.
Originally from Malappuram, Kerala.

Working as Data Analyst at Happe Toys since Jan 2026.

Skills and tools:
Power BI, SQL, Excel, Python, Web Development.

Currently learning:
Advanced SQL, Data Engineering, Azure.

Background:
BSc Computer Science from University of Calicut.
Trained at Haris & Co Academy.

Past freelance work:
photography, videography, graphic design.

PROJECTS:

Student Performance Analytics Dashboard:
full-stack analytics system with Flask, MySQL, Power BI, Lovable frontend.

Cleanlytics:
AI-powered data cleaning tool.

BMW Sales Dashboard:
Power BI sales analytics dashboard.

2011 Census Dashboard:
population and demographic analytics dashboard.

Parkiko:
parking marketplace platform.

Second Mind:
voice AI assistant in Kotlin.

Swalpam Music Kelkam:
browser music streaming app.

Get It Done:
hackathon-winning chore marketplace app.

SKILLS:
Power BI, SQL, Excel, Python, React, Flask, MySQL, Kotlin.

IMPORTANT:

* Only explain projects if asked.
* Only explain skills if asked.
* Keep answers human and conversational.
* Most replies should be 1–3 lines maximum.


`;

app.post("/chat", async (req, res) => {

  try {

    const { message } = req.body;

    const lowerMsg = message.toLowerCase().trim();

if (
lowerMsg === "hi" ||
lowerMsg === "hello" ||
lowerMsg === "hey"
) {
return res.json({
reply: "hey 🙂"
});
}

if (
lowerMsg === "how are you" ||
lowerMsg === "how are you?" ||
lowerMsg === "how are you ?" ||
lowerMsg === "hw r u?" ||
lowerMsg === "hru"
) {
return res.json({
reply: "im good, what about you?"
});
}

if (
lowerMsg.includes("im good") ||
lowerMsg.includes("i'm good") ||
lowerMsg.includes("im fine") ||
lowerMsg.includes("doing good") ||
lowerMsg.includes("doing fine")
) {
return res.json({
reply: "good to hear that 🙂 ask me about myself"
});
}


  const response = await fetch(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat-v3-0324:free",
      max_tokens: 60,
      temperature: 0.3,
      messages: [
  {
    role: "system",
    content: SHAHEEN_CONTEXT
  },
  {
    role: "user",
    content: message
  }
]
    })
  }
);

const data = await response.json();

console.log(data);

const reply =
  data?.choices?.[0]?.message?.content ||
  "No response.";

    res.json({ reply });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      reply: "Something went wrong."
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
