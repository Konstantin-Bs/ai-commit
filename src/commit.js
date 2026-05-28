const { execSync } = require("child_process");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const os = require("os");

async function commit() {
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

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const response = await model.generateContent(
      `Generate a concise single-line git commit message in ${lang} for this diff.
       The entire message including the conventional commit prefix (feat, fix, etc.) should be in ${lang}.
       No explanation, just the message, no backticks or special formatting:\n\n${diff}`,
    );

    console.log(response.response.text());
  } catch (error) {
    console.error(error);
  }
}

module.exports = { commit };
