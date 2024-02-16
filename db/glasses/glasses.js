const fs = require("fs/promises");
const path = require("path");

const glassesPath = path.join(__dirname, "glasses.json");

async function listGlasses() {
  const data = await fs.readFile(glassesPath);

  return JSON.parse(data);
}

module.exports = { listGlasses };
