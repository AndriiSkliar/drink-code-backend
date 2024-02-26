const bcrypt = require("bcrypt");
const {nanoid} = require("nanoid");

const { User } = require("../../models/user");

const { HttpError, sendEmail, fullYearsCount } = require("../../helpers");

// const { BASE_URL } = process.env;
const BASE_URL = 'https://andriiskliar.github.io/drink-code-frontend/';

const signUp = async (req, res) => {
    const {email, password } = req.body;
    const user = await User.findOne({email});

    if(user){
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    // const avatarURL = gravatar.url(email);
    const avatarURL = 'https://res.cloudinary.com/dk6hnmt4s/image/upload/f_auto,q_auto/v1/avatar/xclhvbf8zl0rllwgrbck';
    const verificationToken = nanoid();
    console.log(user);
    const fullYears = await fullYearsCount(req.body.birthday);
    const isAdult = (fullYears >= 18);

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken, isAdult});
    
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        // html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`
        html: `<a target="_blank" href="${BASE_URL}user/${verificationToken}">Click verify email</a>`
    };

    await sendEmail(verifyEmail);
    
    res.status(201).json({
        "user": {
            "name": newUser.name,
            "email": newUser.email,
            "avatarURL": newUser.avatarURL,
            "birthday": newUser.birthday,
            "isAdult": newUser.isAdult,
        }
    })

}

module.exports = signUp;
