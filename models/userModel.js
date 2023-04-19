const mongoose = require('mongoose');
const userScham = mongoose.Schema({
    email: {type : String, require: true, unique:true},
    password :{type : String, require: true}
})

const userModel = mongoose.model("user", userScham)

module.exports = userModel;