const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    const loggedInUser = req.session.user

    req.session.destroy()

    res.status(200).json({ message: "Logged out successfully!", loggedOutUser: loggedInUser })
})


module.exports = router;