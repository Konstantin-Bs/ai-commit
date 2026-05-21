#!/usr/bin/env node

const { execSync } = require("child_process");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const diff = execSync("git diff --cached").toString();

if (!diff) {
  console.log("No stage changes. Run git add first");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const response = await model.generateContent(
      `Generate a concise single-line git commit message for this diff, no explanation, just the message:\n\n${diff}`,
    );

    console.log(response.response.text());
  } catch (error) {
    console.error(error);
  }
}

run();
