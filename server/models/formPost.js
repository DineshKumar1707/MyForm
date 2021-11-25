const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const FormPostSchema = new Schema( {
    name: String,
    email: String,
    dob: String,
    phoneNo: Number,
    address: String,
    pinCode: Number,
    profilePic: {
        type: String,
    },
    resume: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now()
    }
});

// Model
const FormPost = mongoose.model('FormPost', FormPostSchema);

module.exports = FormPost;