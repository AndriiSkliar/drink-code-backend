const getCurrent = async (req, res) => {
  const { email, name, avatarURL, birthday, _id, isAdult } = req.user;
  console.log(req.user);

  res.json({
    name,
    email,
    avatarURL,
    birthday,
    id: _id,
    isAdult,
  });
};

module.exports = getCurrent;
