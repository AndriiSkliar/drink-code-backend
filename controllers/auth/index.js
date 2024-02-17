const { ctrlWrapper } = require("../../helpers");

const signUp = require("../signUp");
const signIn = require("./signIn");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateUser = require("./updateUser");
const subscribe= require("./subscribe");

module.exports = {
    signUp: ctrlWrapper(signUp),
    signIn: ctrlWrapper(signIn),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),

    logout: ctrlWrapper(logout),
    getCurrent: ctrlWrapper(getCurrent),

    updateUser: ctrlWrapper(updateUser),
    subscribe: ctrlWrapper(subscribe),

}