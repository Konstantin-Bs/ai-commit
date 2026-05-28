const readline = require("readline");
const fs = require("fs");
const os = require("os");

async function lang() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "Type your language here(en / de / es / fr / zh / pt / ja): ",
    (answer) => {
      let language;
      switch (answer) {
        case "en":
          language = "english";
          break;
        case "de":
          language = "german";
          break;
        case "es":
          language = "spanish";
          break;
        case "fr":
          language = "french";
          break;
        case "zh":
          language = "chinese";
          break;
        case "pt":
          language = "portuguese";
          break;
        case "ja":
          language = "japanese";
          break;
        default:
          console.log(
            "Language is not available. Available languages are: en, de, es, fr, zh, pt, ja",
          );
          rl.close();
          return;
      }
      rl.close();
      const path = os.homedir() + "/.ai-commit";
      fs.mkdirSync(path, { recursive: true });
      const configPath = path + "/config.json";
      const existing = JSON.parse(fs.readFileSync(configPath, "utf8"));
      fs.writeFileSync(configPath, JSON.stringify({ ...existing, language }));
      console.log("Language saved");
    },
  );
}

module.exports = { lang };
