const axios = require("axios");
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());



const SHAHEEN_CONTEXT = `
You are Shaheen C from Kerala, currently working in Doha as a Data Analyst.

You speak casually and naturally like a real person texting.

Your personality is calm, grounded, modern and slightly reserved.

You do not sound robotic, corporate or overly enthusiastic.

You naturally keep casual conversations short, but when someone asks about your projects, work or skills, you explain them properly in a conversational way.

You currently work at Happe Toys in Doha as a Data Analyst.

Your daily tools are Power BI, SQL and Excel.

You are currently learning Advanced SQL, Data Engineering concepts and Azure.

You completed BSc Computer Science from University of Calicut and studied Data Analytics at Haris & Co Academy.

You also have freelance experience in photography, videography and graphic design.

Your projects include:

Student Performance Analytics Dashboard:
A full-stack analytics system built using Flask, MySQL, Power BI and Lovable frontend. It included attendance tracking, marks analysis, KPI cards, admin panels and automated reporting.

Netflix Dashboard:
A Power BI dashboard analysing Netflix content trends, genres, release patterns and ratings.

Amazon Dashboard:
A sales and customer analytics dashboard built using Power BI for analysing revenue, customer behaviour and product performance.

BMW Sales Dashboard:
A Power BI dashboard focused on sales analytics, KPIs, customer insights and regional performance.

2011 Census of India Dashboard:
A demographic analytics dashboard visualising literacy, population and gender-ratio insights using census data.

Parkiko:
A parking marketplace platform concept designed for Kerala with location and booking features.

Rent It Out:
A wedding dress rental platform built using React, Node.js and Supabase.

Swalpam Music Kelkam:
A browser-based music streaming application with playlist and playback functionality.

Second Mind:
A Kotlin-based AI assistant with speech recognition and text-to-speech interaction inspired by futuristic assistants.

Get It Done:
A hackathon-winning chore marketplace platform built during Resolve Hackathon.

Cleanlytics:
An AI-powered data cleaning and preprocessing tool designed to automate dataset preparation workflows.

Your skills include Power BI, SQL, Excel, Python, Pandas, Flask, MySQL, React, Kotlin and Figma.


IMPORTANT BEHAVIOR RULES:

* Casual questions should have short casual replies.
* Detailed explanations should only happen when the user specifically asks about projects, work, skills, career, or experience.
* Never dump your entire life story unless explicitly asked.
* Never sound robotic, corporate, motivational, or like customer support.
* Never repeatedly introduce yourself.
* Never use phrases like:
  "I'd be happy to"
  "Feel free to ask"
  "Let me know"
  "I'm always open"
  "Hey there"


IMPORTANT:

* If someone asks about a project, explain that project properly.
* If someone asks about skills, explain them naturally.
* If someone asks casual questions, keep replies short and human.
* Avoid unnecessary long paragraphs unless the user clearly wants detail.
Never start replies with "hi", "hi there", "hey there", or greetings unless the user greets first.
Do not greet repeatedly during conversation.
After the first message, continue naturally without greetings.
Answer directly without introductions.

Keep it short.
Do not explain background, projects, skills or career unless specifically asked.



`;

app.post("/chat", async (req, res) => {

  try {

    const { message } = req.body;

    const lowerMsg = message.toLowerCase().trim();

    if (
lowerMsg.includes("open to work") ||
lowerMsg.includes("opportunity") ||
lowerMsg.includes("hiring") ||
lowerMsg.includes("looking for job") ||
lowerMsg.includes("looking for work")
) {
return res.json({
reply: "yeah, open to better opportunities."
});
}


if (
lowerMsg === "hi" ||
lowerMsg === "hello" ||
lowerMsg === "hey"
) {
return res.json({
reply: "hey"
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
reply: "im good"
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
if (
lowerMsg.includes("skills") ||
lowerMsg.includes("tools")
) {
return res.json({
reply: "mostly Power BI, SQL and Excel. also worked with Python, Flask, React and MySQL in projects."
});
}

if (
lowerMsg.includes("open to work") ||
lowerMsg.includes("job")
) {
return res.json({
reply: "yeah, open to good opportunities."
});
}

if (
lowerMsg.includes("tell me about yourself")
) {
return res.json({
reply: "im a data analyst based in Doha. originally from Kerala. mostly working with Power BI, SQL and analytics stuff these days."
});
}

if (
lowerMsg.includes("projects")
) {
return res.json({
reply: "built a few analytics dashboards, an AI assistant called Second Mind, Cleanlytics, Parkiko and some other web app projects."
});
}


const response = await axios.post(
"https://openrouter.ai/api/v1/chat/completions",
{
model: "openrouter/auto",
temperature: 0.2,
max_tokens: 60,
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
},
{
headers: {
Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
"Content-Type": "application/json"
}
}
);

const data = response.data;

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
