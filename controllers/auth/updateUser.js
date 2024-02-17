const { User } = require("../../models/user");

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
module.exports = updateUser;
