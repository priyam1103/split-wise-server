const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.authUser = async function (req, res) {
    try {
        const { phonenumber, username } = req.body;
        console.log(req.body)
        const user = await User.findOne({ phonenumber: phonenumber });
console.log(user)
        if (user) {
            const token = jwt.sign({username:user.username,phonenumber:user.phonenumber,id:user._id}, "abcdefghcons")
            res.status(200).json({user,token})
        } else {
            const new_user = new User({
                phonenumber: phonenumber,
                username: username
            });
            new_user.save();
            const token = jwt.sign({username:new_user.username,phonenumber:new_user.phonenumber,id:new_user._id}, "abcdefghcons")
            res.status(200).json({new_user,token})
        }
    } catch (err) {
        console.log(err);
    }
}

exports.addUsername = async function (req, res) {
    try {
        const { _id } = res.locals;
        const user = await User.findOne({ _id: _id });
        user.username = req.body.username;
        await user.save();
        const token = jwt.sign({username:user.username,phonenumber:user.phonenumber,id:user._id}, "abcdefghcons")
        res.status(200).json({user,token})

    } catch (err) {
        console.log(err);
    }
}