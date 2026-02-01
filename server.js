import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyCe2omEelgrlEgNJe54OGJ7F-ITzKkxgvo"; 
app.post("/get-colleges", async (req, res) => {
  const { course, state, city } = req.body;

  const prompt = `List the top 10 colleges in ${city}, ${state}, India offering ${course}. 
  For each college include:
  1. College Name
  2. Short Description
  3. Scholarship Availability (Yes/No)
  4. Scholarship Criteria (Merit, Need-based, Sports, etc.)
  Format response in a step-by-step numbered list.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }]
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("✅ Server running at http://localhost:3000"));
