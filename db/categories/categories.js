const fs = require("fs/promises");
const path = require("path");

const categoriesPath = path.join(__dirname, "categories.json");
console.log("categoriesPath",categoriesPath)
async function listCategories() {
  const data = await fs.readFile(categoriesPath);

  return JSON.parse(data);
}

module.exports = { listCategories };
