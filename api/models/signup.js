const mongoose = require('mongoose')

const projectSignupSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        newPassword: {
            type: String,
            required: true
        },
        theme: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('SignUp', projectSignupSchema)