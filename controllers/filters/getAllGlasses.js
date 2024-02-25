const { glasses } = require("../../db/glasses");

const getAllGlasses = async (req, res) => {
  const glassesList = await glasses.listGlasses();

  if (!glassesList || glassesList.length === 0) {
    return res.status(404).json({ message: "No glasses found" });
  }

  res.status(200).json(glassesList);
};

module.exports = getAllGlasses;
