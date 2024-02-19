const { ctrlWrapper } = require("../../helpers");
const getOwn = require("./getOwn");
const deleteOwn = require("./deleteOwn");

module.exports = {
  getOwn: ctrlWrapper(getOwn),
  deleteOwn: ctrlWrapper(deleteOwn),
};
