
const mongoose = require("mongoose")

const userData = new mongoose.Schema({
    Company_Name:{
        type: String
    },
    Requirement:{
        type: Number
    },
    Target_Completed:{
        type: Number
    }
})

const User = mongoose.model("User", userData)
module.exports = User
