#!/usr/bin/env node

const { commit } = require("./src/commit");
const { init } = require("./src/init");
const { lang } = require("./src/lang");

if (process.argv[2] === "init") {
  init();
} else if (process.argv[2] === "lang") {
  lang();
} else {
  commit();
}
