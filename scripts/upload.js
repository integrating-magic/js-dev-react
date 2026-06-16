#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";
import open from "open";
import config from "../widget.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const { widgetName, uploadScript, file, server } = config;

if (!widgetName || !uploadScript || !file || !server) {
  throw new Error(
    "widget.config.js is missing required keys: widgetName, uploadScript, file, server"
  );
}

const fileUrl = `fmp://${server}/${file}?script=${uploadScript}&param=`;
const thePath = path.join(rootDir, "dist", "index.html");
const params = { widgetName, thePath };
const url = fileUrl + encodeURIComponent(JSON.stringify(params));

await open(url);
