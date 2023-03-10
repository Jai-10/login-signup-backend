const express = require('express')

const bcrypt = require('bcrypt')
const saltRounds = 15

const SignUp = require('../models/signup')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ message: "GET request to /login", loggedInUserDetails: req.session.user })
})


router.post('/', (req, res) => {
    if (req.body.username==='' || req.body.password==='') {
        res.status(400).json({ message: "Enter all the credentials." })
    }
    else {
        SignUp.find({username: req.body.username})
            .then(result => {
                // if user does not exist
                if (result.length === 0) {
                    res.status(400).json({ message: "Seems like you're new here. Create an account to move further!" })
                }

                // if user exists
                else {
                    bcrypt.compare(req.body.password, result[0].password)
                        .then(cmp => {
                            if (cmp) {
                                const loggedInUser = {
                                    username: req.body.username,
                                    email: req.body.email,
                                    password: req.body.password
                                }
                                req.session.user = loggedInUser
                                req.session.save()

                                res.status(200).json({ message: "Authentication successful! You're logged in.", userDetails: loggedInUser })
                            }
                            else {
                                res.status(400).json({ message: "Authentication unsuccessful! Incorrect password." })
                            }
                        })
                        .catch(err => res.status(500).json({ message: "Database error", error: err }))
                }
            })
            .catch(err => res.status(500).json({ message: "Database error", error: err }))
    }
})




router.patch('/', (req, res) => {
    const userUsername = req.body.username
    const oldPassword = req.body.password

    SignUp.find({ username: userUsername })
        .then(result => {
            if (result.length === 0) {
                // user does not exist
                res.status(400).json({ message: "User does not exist!" })
            }
            else {
                bcrypt.compare(oldPassword, result[0].password)
                    .then(cmp => {
                        if (cmp) {
                            if (req.body.newPassword === oldPassword) {
                                res.status(400).json({ message: "Old and new password cannot be the same." })
                            }
                            else {
                                bcrypt.hash(req.body.newPassword, saltRounds)
                                    .then(newPass => {
                                        const updatedUser = new SignUp({
                                            _id: result[0].id,
                                            username: result[0].username,
                                            password: newPass
                                        })
                                        SignUp.findByIdAndUpdate(result[0]._id, updatedUser)
                                            // id found and updating password
                                            .then(updatedResult => res.status(200).json({ message: "Password updated!", update: updatedResult })) 
                                            .catch(err => res.status(500).json({ message: "Database error", error: err }))
                                    })
                                    .catch(err => res.status(500).json({ message: "Database error. Can't find user", error: err }))
                            }
                        }
                        else {
                            res.status(400).json({ message: "Authentication failed! Incorrect password" })
                        }
                    })
                    .catch(err => res.status(500).json({ message: "Database error. Can't find user", error: err }))
            }
        })
        .catch(err => res.status(500).json({ message: "Database error. Can't find user", error: err }))
})




module.exports = router;