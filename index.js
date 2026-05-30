#!/usr/bin/env node

import { commit } from "./src/commit.js";
import { init } from "./src/init.js";
import { lang } from "./src/lang.js";

if (process.argv[2] === "init") {
  init();
} else if (process.argv[2] === "lang") {
  lang();
} else if (process.argv[2] === "--auto") {
  commit("--auto");
} else {
  commit("");
}
