const mongoose = require("mongoose")

const ListSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    todo:{ 
        type : Array , 
        "default" : [] 
    },
    user: {
        username: String
    }
})

module.exports = mongoose.model('List', ListSchema)
