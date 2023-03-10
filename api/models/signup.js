const mongoose = require('mongoose')

const projectSignupSchema = new mongoose.Schema({
        // _id: mongoose.Schema.Types.ObjectId,
        username: {
            type: String,
            min: 4,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            min: 6,
            required: true
        },
        newPassword: {
            type: String
        },
        theme: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('SignUp', projectSignupSchema)