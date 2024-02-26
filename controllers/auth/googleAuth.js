const queryString = require("querystring");
const axios = require("axios");
const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const { fullYearsCount } = require("../../helpers");
// const { url } = require("inspector");
// const URL = require("url");

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

const googleRedirect = async (req, res) => {                      
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const urlObj = new URL(fullUrl);
    const code = urlObj.searchParams.get("code");
    console.log(code)

    const tokenData = await axios({
        url: 'https://oauth2.googleapis.com/token',
        method: 'post',
        data: {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
            grant_type: 'authorization_code',
            code,
        },
    });

    const userData = await axios({
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
        method: "get",
        headers: {
            Authorization: `Bearer ${tokenData.data.access_token}`,
        },
    });
    
    console.log(userData.data);
    const { id, email, name, picture } = userData.data;
    const user = await User.findOne({email});

    if (!user) {
        const hashPassword = await bcrypt.hash( id, 10);
        const avatarURL = picture;
        const birthday = Date.now();
        console.log(user);
        const fullYears = await fullYearsCount(birthday);
        const isAdult = (fullYears >= 18);

        await User.create({ name, email, birthday, password: hashPassword, avatarURL, verify: true, isAdult });
        
        const token = tokenData;
        console.log(token);
        await User.findByIdAndUpdate(user._id, { token });

        res.json({
            token,
            user: {
                name: user.name,
                email: user.email,
                avatarURL: user.avatarURL,
                birthday: user.birthday,
            },
        });
    };

    const token = tokenData.data.access_token;
    console.log(token);
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: {
            name: user.name,
            email: user.email,
            avatarURL: user.avatarURL,
            birthday: user.birthday,
        },
    });
};

module.exports = {
    googleAuth,
    googleRedirect,
}