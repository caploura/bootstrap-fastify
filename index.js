const fs = require("fs");
const path = require("path");
const { setupDirectory, processFile } = require("./helpers");

const ignored = ["node_modules"];

function readFilesRecursively(name) {
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

  readStaticDir("static");

  for (const file of staticFiles) {
    processFile(file, name);
  }
}

readFilesRecursively("just-another-app");
