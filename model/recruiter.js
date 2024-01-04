const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Candidate = require("./candidate"); // Import the candidate model

const recruiterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    recruitedCandidates: [
        {
            type: Schema.Types.ObjectId,
            ref: 'candidate'
        }
    ]
});

const recruiterModel = mongoose.model('Admin', recruiterSchema);

module.exports = recruiterModel;
