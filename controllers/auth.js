const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
// const path = require("path");
// const fs = require("fs/promises");
const {nanoid} = require("nanoid");

const { User } = require('../models/user');

const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");

const { SECRET_KEY, BASE_URL } = process.env;

// const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const signUp = async (req, res) => {
    const {email, password } = req.body;
    const user = await User.findOne({email});

    if(user){
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
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

const verifyEmail = async(req, res)=> {
    const { verificationToken } = req.params;
    console.log(verificationToken);
    
    const user = await User.findOne({verificationToken});
    if(!user){
        throw HttpError(404, "User not found")
    }
    await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: ""});

    res.json({
        message: "Verification successful"
    })
}

const resendVerifyEmail = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "User not found");
    }
    if(user.verify) {
        throw HttpError(401, "Verification has already been passed");
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.json({
        message: "Verification email sent"
    })
}

const signIn = async (req, res) => { 
    const {email, password} = req.body;
    const user = await User.findOne({email});

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!user || !passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    if (!user.verify) {
        throw HttpError(401, "Email not verified");  
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
        "user": {
            "name": user.name,
            "email": user.email,
            "avatarURL": user.avatarURL,
            "birthdate": user.birthdate,
        }
    })
}

const getCurrent = async(req, res)=> {
    const { email } = req.user;
    console.log(email)
    const user = await User.findOne({email});

    res.json({
        name: user.name,
        email,
        avatarURL: user.avatarURL,
        birthday:user.birthday
    })
}

const logout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.status(204).json({
        message: "Logout success"
    })
}

const updateUser = async (req, res) => {

    let newUserName, newAvatarURL;
    
    const { _id, name: currentUserName } = req.user;                                                  
    const { name } = req.body;
    if (!name) { newUserName = currentUserName }
    else { newUserName = name };
    
    if (!req.file)
    {
        const usr = await User.findByIdAndUpdate(_id, { name: newUserName }, { new: true });              
        res.json({ name: usr.name, avatarURL: usr.avatarURL });
    }
    else                                                                                                {
        newAvatarURL = req.file.path;
        const usr = await User.findByIdAndUpdate(_id, { name: newUserName, avatarURL: newAvatarURL }, { new: true });
        res.json({ name: usr.name, avatarURL: usr.avatarURL });
    }
};
// const updateAvatar = async(req, res)=> {
//     const {_id} = req.user;
//     const {path: tempUpload, originalname} = req.file;
//     const filename = `${_id}_${originalname}`;
//     const resultUpload = path.join(avatarsDir, filename);
//     await fs.rename(tempUpload, resultUpload);
//     const avatarURL = path.join("avatars", filename);
//     await User.findByIdAndUpdate(_id, {avatarURL});

//     res.json({
//         avatarURL,
//     })
// }


module.exports = {
    signUp: ctrlWrapper(signUp),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    signIn: ctrlWrapper(signIn),

    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateUser: ctrlWrapper(updateUser),

}