const fs = require("fs");
const path = require("path");
const { processPackageJson, setupDirectory, processFile } = require("./helpers");

function createApplication(name) {
  const projectPath = path.join(process.cwd(), name);

  if (fs.existsSync(projectPath)) {
    fs.rmSync(projectPath, { recursive: true });
  }
  fs.mkdirSync(projectPath);

  const staticDir = path.join(__dirname, "static");
  const files = fs.readdirSync(staticDir);

  files.forEach((file) => {
    const filePath = path.join(staticDir, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile() && file !== "package.json") {
      //   console.log(`processing file ${file}`);

      fs.copyFileSync(filePath, path.join(projectPath, file));
    } else if (stats.isFile() && file === "package.json") {
      const packageJson = processPackageJson(filePath, name);

      fs.writeFileSync(
        path.join(projectPath, file),
        JSON.stringify(packageJson, null, 2)
      );
    } else if (stats.isDirectory()) {
      console.log(`processing directory ${file}`);

      const directory = path.join(projectPath, file);
      fs.mkdirSync(directory);

      const subFiles = fs.readdirSync(filePath);

      subFiles.forEach((subFile) => console.log(subFile));
    }
  });
}

function readFilesRecursively(name) {
  const staticFiles = [];

  setupDirectory(name);

  function readStaticDir(currentPath) {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        readStaticDir(filePath);
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
