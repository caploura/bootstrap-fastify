const fs = require("fs");
const path = require("path");

function processPackageJson(file, appName) {
  const data = fs.readFileSync(file, "utf8");
  const packageJson = JSON.parse(data);
  packageJson.name = appName;
  return packageJson;
}

function setupDirectory(name) {
  const projectPath = path.join(process.cwd(), name);

  if (fs.existsSync(projectPath)) {
    fs.rmSync(projectPath, { recursive: true });
  }
  fs.mkdirSync(projectPath);
}

function processFile(file, name) {
  const p = file.split('static/')[1];
  const newFile = path.join(process.cwd(), name, p);

  console.log('processing file', newFile);
  
  if (!p.includes('package.json')) {
    fs.mkdirSync(path.dirname(newFile), { recursive: true });
    fs.copyFileSync(file, newFile);
  } else {
    const packageJson = processPackageJson(file, name);
    fs.writeFileSync(newFile, JSON.stringify(packageJson, null, 2));
  }
}

module.exports = {
  processPackageJson,
  setupDirectory,
  processFile,
};
