const bcrypt = require("bcrypt");
const {nanoid} = require("nanoid");

const { User } = require("../../models/user");

const { HttpError, sendEmail } = require("../helpers");

const { BASE_URL } = process.env;

const signUp = async (req, res) => {
    const {email, password } = req.body;
    const user = await User.findOne({email});

    if(user){
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    // const avatarURL = gravatar.url(email);
    const avatarURL = 'https://res.cloudinary.com/dk6hnmt4s/image/upload/f_auto,q_auto/v1/avatar/xclhvbf8zl0rllwgrbck'
    console.log(avatarURL);
    const verificationToken = nanoid();

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });
    
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`
    };

    await sendEmail(verifyEmail);
    
    res.status(201).json({
        "user": {
            "name": newUser.name,
            "email": newUser.email,
            "avatarURL": newUser.avatarURL,
            "birthday": newUser.birthday,
        }
    })

}

module.exports = signUp;
