const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    phonenumber: {
        type: String,
        required:true
    },
    username: {
        type: String,
    
    },
    splitups: {
        type:Array
    }
})

const User = mongoose.model("User", UserSchema);
module.exports = User;