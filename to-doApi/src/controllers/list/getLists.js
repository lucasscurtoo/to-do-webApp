const List = require('../../models/list')
const User = require('../../models/user')

const getUserLists = async (req,res) => {
    console.log(req.query.username)
    if(!req.query.username) return res.status(400).json({error: true, message: "Username dont send", status:400})

    const userExists = await User.findOne({username: req.query.username})
    if (!userExists) return res.status(404).json({error: true, message: "User doesnt exists", status: 404})

    const lists = await List.find({user:{username: req.query.username}})
    if (lists.length === 0) return res.status(400).json({error:true, message: "User doesnt have lists", status: 400})
    
    res.json({
        status: 200,
        data: lists
    })
}

module.exports = getUserLists;
