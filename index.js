const fs = require("fs");
const path = require("path");
const { setupDirectory, processFile } = require("./helpers");

const ignore = ['node_modules'];

function readFilesRecursively(name) {
  const staticFiles = [];

  setupDirectory(name);

  function readStaticDir(currentPath) {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        if (!ignore.includes(file)) {
          readStaticDir(filePath);
        }
      } else if (stats.isFile()) {
        staticFiles.push(filePath);
      }
    });
  }

  readStaticDir("static");

  for (const file of staticFiles) {
    // console.log(file);
    processFile(file, name);
  }
}

// createApplication("just-another-app");
readFilesRecursively("just-another-app");
