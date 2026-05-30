import { execSync } from "child_process";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import os from "os";
import ora from "ora";

export async function commit(flag) {
  const diff = execSync("git diff --cached").toString();

  if (!diff) {
    console.log("No staged changes. Run git add first");
    process.exit(1);
  }

  let apiKey;
  let lang = "english";

  try {
    const configPath = os.homedir() + "/.ai-commit/config.json";
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    apiKey = config.key;
    lang = config.language || "english";
  } catch {
    console.log("No API key found. Run 'ai-commit init' first.");
    process.exit(1);
  }

  const genAI = new GoogleGenAI({ apiKey: apiKey });
  const spinner = ora("Generating commit message...").start();

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a concise single-line git commit message in ${lang} for this diff.
       The entire message including the conventional commit prefix (feat, fix, etc.) should be in ${lang}.
       No explanation, just the message, no backticks or special formatting:\n\n${diff}`,
    });
    spinner.succeed(response.text);
    if (flag === "--auto") {
      execSync(`git commit -m "${response.text}"`);
    }
  } catch (error) {
    spinner.fail("Something went wrong");
    console.error(error);
  }
}
