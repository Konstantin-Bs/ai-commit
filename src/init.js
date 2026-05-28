import readline from "readline";
import fs from "fs";
import os from "os";

export async function init() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Type your Gemini API key here: ", (answer) => {
    const key = answer;
    rl.close();
    const path = os.homedir() + "/.ai-commit";
    fs.mkdirSync(path, { recursive: true });
    fs.writeFileSync(path + "/config.json", JSON.stringify({ key }));
    console.log("API key saved");
  });
}
