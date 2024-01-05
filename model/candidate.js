const mongoose = require("mongoose") ;
const Schema = mongoose.Schema; 


const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobInterest: {
        type: String,
        required: true
    },
    joinedAt: {
        type: Date,
        required: true
    },
    month:{
        type:String,
        required:true
    },
    isActive: {
        type: Boolean,
        required: true
    }
});


const candidateModel = mongoose.model('candidate',candidateSchema);

module.exports = candidateModel;






