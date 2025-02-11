#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require('readline');
const { setupDirectory, processFile } = require("./helpers");

const ignored = ["node_modules"];

function processNewApp(name) {
  const staticFiles = [];

  setupDirectory(name);

  function readStaticDir(currentPath) {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory() && !ignored.includes(file)) {
        readStaticDir(filePath);
      } else if (stats.isFile()) {
        staticFiles.push(filePath);
      }
    });
  }

  readStaticDir(path.join(__dirname, "static"));

  for (const file of staticFiles) {
    processFile(file, name);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter application name: ', (userInput) => {
  console.log(`Creating fastify application "${userInput}"`);
  processNewApp(userInput);
  rl.close();
});
