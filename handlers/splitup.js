const Split = require("../models/splitup");
const User = require("../models/user");
exports.addSplitUp = async function (req, res) {
    try {
        const { _id, phonenumber, username } = res.locals;
        const { account_desc, initial_split, initialsplit_desc, account_members } = req.body;
        account_members.push(res.locals);
        const trans = {
            amount: initial_split,
            desc: initialsplit_desc,
            addedBy: {
                user:username
            },
         
        }
        let indi = [];
         await account_members.map((item_, index_) => {
             if (item_._id == res.locals.id) {
                 const data = {
                     username: item_.username,
                     phonenumber:item_.phonenumber,
                     amount: parseInt(initial_split)
                 }
                 indi.push(data);
                
             } else {
                 const data = {
                     username: item_.username,
                     phonenumber:item_.phonenumber,
                     amount: parseInt(0)
                }
                 indi.push(data);
             }
        })

        const split_account = new Split({
            description: account_desc,
            transactions: trans,
            members: account_members,
            total_amount: initial_split,
            admins: [res.locals._id],
            individual_amounts:indi
        })
        console.log(split_account);
        split_account.save();
        
     
        account_members.map(async(item, index) => {
            const user = await User.findOne({ _id: item._id });
            user.splitups.push(split_account._id);
            await user.save();
        })
        res.status(200).json({split_account})
        console.log(split_account)
        
    } catch (err) {
        res.status(400).json({
            message:"Error occured"})
        
        console.log(err);
    }
}
exports.addSplit = async function (req, res) {
    try{
    const { _id, phonenumber, username } = res.locals;
        const { amount, desc, account_id } = req.body;
        console.log(account_id);
        const split_account = await Split.findOne({ _id: account_id });
        console.log(split_account)
    const trans = {
        amount: amount,
        desc: desc,
        addedBy: {
            user:username
        },
        }
        let arr = split_account.individual_amounts.map((item, index) => {
            if (item.phonenumber == phonenumber) {
                item.amount = item.amount + parseInt(amount);
            }
            return {...item}
        })
        split_account.individual_amounts = null;
        split_account.individual_amounts = arr;
        split_account.transactions.push(trans);
        split_account.total_amount= parseInt(split_account.total_amount)+parseInt(amount)
    await split_account.save();
    res.status(200).json({ split_account });
    } catch (err) {
        res.status(400).json({
            message:"Error occured"})
}}

exports.members = async function (req, res) {
    try {
        console.log("addmmm")
        const { _id } = res.locals;
        const users = await User.find({_id:{$ne:_id}});
        res.status(200).json({ users });
    } catch (err) {
        res.status(400).json({
            message:"Error occured"})
        
    }
}

exports.addMember = async function (req, res) {
    try {
        const { account_id, new_members } = req.body;
        console.log(account_id)
        console.log(new_members)
        const split_account = await Split.findOne({ _id: account_id });
        console.log(split_account)
         await new_members.map(async(item_, index_) => {
            
                 const data = {
                     username: item_.username,
                     phonenumber:item_.phonenumber,
                     amount: parseInt(0)
             }
             await split_account.individual_amounts.push(data);
             
         })
        
        new Promise(async(resolve, reject) => {
            
            await new_members.map(async(item, index) => {
                const user = await User.findOne({ _id: item._id });
                const mem = {
                    _id: item._id,
                    phonenumber: item.phonenumber,
                    username: item.username,
                    isSelected: item.isSelected
                }
                await split_account.members.push(mem);
                await user.splitups.push(split_account._id);
                await user.save();
                if (index == new_members.length - 1) {
                    resolve();
                }
            })
        }).then(async () => {
            
            await split_account.save();
            res.status(200).json({split_account})
        })

    } catch (err) {
        res.status(400).json({
            message:"Error occured"})
    }
}
exports.getSliptUps = async function (req, res) {
    try {
        const { _id } = res.locals;
        const current_user = await User.findOne({ _id: _id });
        const splits = [];
        new Promise(async(resolve,reject) => {
            await current_user.splitups.map(async (item, index) => {
                console.log(item)
                const split_ = await Split.findOne({ _id: item });

                splits.push(split_);
                if (index === current_user.splitups.length - 1) {
                    resolve()
                }
            })
        }).then(() => {
      
            res.status(200).json({ splits });
        })
    } catch (err) {
        res.status(400).json({
            message:"Error occured"})
        
    }
}
