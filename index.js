#!/usr/bin/env node

const { commit } = require("./src/commit");
const { init } = require("./src/init");

if (process.argv[2] === "init") {
    init();
} else {
    commit();
}