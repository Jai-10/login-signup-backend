const mongoose = require('mongoose')

const profilePictureSchema = {
    _id: mongoose.Schema.Types.ObjectId,
    profilePicture: mongoose.Schema.Types.Buffer
}

module.exports = mongoose.model('ProfilePicture', profilePictureSchema)