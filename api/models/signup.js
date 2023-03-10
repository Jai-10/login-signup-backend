const mongoose = require('mongoose')

const projectSignupSchema = {
    _id: mongoose.Schema.Types.ObjectId,
    username: mongoose.Schema.Types.String,
    email: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    newPassword: mongoose.Schema.Types.String,
    theme: mongoose.Schema.Types.String
}

module.exports = mongoose.model('SignUp', projectSignupSchema)