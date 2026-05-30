#!/usr/bin/env node

import { commit } from "./src/commit.js";
import { init } from "./src/init.js";
import { lang } from "./src/lang.js";

if (process.argv[2] === "--help") {
  console.log(`
    Usage: ai-commit [command]

    Commands:
      ai-commit           generate a commit message
      ai-commit --auto    generate and commit automatically
      ai-commit --push    git add, commit and push automatically
      ai-commit init      set your Gemini API key
      ai-commit lang      set commit message language
      ai-commit --help    show this help message
  `);
} else if (process.argv[2] === "init") {
  init();
} else if (process.argv[2] === "lang") {
  lang();
} else if (process.argv[2] === "--auto") {
  commit("--auto");
} else if (process.argv[2] === "--push") {
  commit("--push");
} else {
  commit("");
}
