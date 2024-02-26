const { User } = require("../../models/user");

const getCurrent = async (req, res) => {
  const { email } = req.user;
  console.log(email);
  const user = await User.findOne({ email });

  res.json({
    name: user.name,
    email,
    avatarURL: user.avatarURL,
    birthday: user.birthday,
    id: user._id,
    isAdult: user.isAdult,
  });
};

module.exports = getCurrent;
