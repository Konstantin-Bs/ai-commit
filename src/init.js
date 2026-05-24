const readline = require("readline");
const fs = require("fs");
const os = require("os");

async function init() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

    rl.question('Type your Gemini API key here: ', (answer) => {
        const key = answer;
        rl.close();
        const path = os.homedir() + "/.ai-commit";
        fs.mkdirSync(path, { recursive: true });
        fs.writeFileSync(path + "/config.json", JSON.stringify({ key }))
        console.log("API key saved")
    })
}

module.exports = { init };