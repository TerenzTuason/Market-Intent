import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import { OpenAI } from "openai";

const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: "YOUR_OPENAI_API_KEY",
});

app.get("/extract", async (req, res) => {
  try {
    const { website, prompt } = req.query;
    if (!website || !prompt) {
      return res.status(400).json({ error: "Website URL and prompt are required" });
    }

    // Fetch website content
    const response = await axios.get(website as string);
    const html = response.data;

    // Parse HTML with cheerio
    const $ = cheerio.load(html);
    
    // Extract text content from relevant elements
    const textContent = $('body').text().trim();
    
    // Clean up the text (remove extra whitespace, etc.)
    const cleanedText = textContent
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .trim();

    // Send to OpenAI for extraction
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that analyzes website content and provides insights."
        },
        {
          role: "user",
          content: `Analyze the following website content based on this prompt: ${prompt}\n\nContent: ${cleanedText.substring(0, 3000)}`
        }
      ],
    });

    // Send the analysis result
    res.json({
      analysis: gptResponse.choices[0].message.content,
      websiteContent: cleanedText.substring(0, 1000) // Send first 1000 chars of content for reference
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: "Failed to process the request",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
