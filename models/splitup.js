const mongoose = require("mongoose");

const SplitSchema = new mongoose.Schema({
    description: {
       type:String
    },
    transactions: {
        type:Array
    },
    members: {
        type:Array
    },
    total_amount: {
        type:Number
    },
    admins: {
        type:Array
    },
    individual_amounts: {
        type:Array
    }
})

const Split = mongoose.model("Split", SplitSchema);
module.exports = Split;