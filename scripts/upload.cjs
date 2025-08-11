#!/usr/bin/env node
const config = require("../widget.config.cjs");

const { widgetName, uploadScript, file, server } = config;

console.log(widgetName, uploadScript, file, server);
const open = require("open");
const path = require("path");

const fileUrl = `fmp://${server}/${file}?script=${uploadScript}&param=`;

const thePath = path.join(__dirname, "../", "dist", "index.html");
const params = { widgetName, thePath };
const url = fileUrl + encodeURIComponent(JSON.stringify(params));
open(url);
