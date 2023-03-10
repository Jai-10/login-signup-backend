const express = require('express')
const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const saltRounds = 15

const SignUp = require('../models/signup')

const router = express.Router()

router.post('/', (req, res) => {
    if (req.body.username==='' || req.body.password==='' || req.body.email==='') {
        res.status(400).json({ message: "Enter all the credentials." })
    }
    else {
        SignUp.find({email: req.body.email})
            .then(result => {
                // if user does not exist
                if (result.length === 0) {
                    bcrypt.hash(req.body.password, saltRounds)
                        .then(hashedPass => {
                            const newUser = new SignUp({
                                // _id: mongoose.Types.ObjectId(),
                                username: req.body.username,
                                email: req.body.email,
                                password: hashedPass
                            })
                            SignUp.find({ username: req.body.username })
                                .then(usernameResult => {
                                    if (usernameResult.length === 0) {
                                        newUser.save()
                                            .then(result => res.status(201).json({ message: "User created successfully!", user: result }))
                                            .catch(err => res.status(500).json({ message: "Server error", error: err }))
                                        }
                                    else {
                                        res.status(400).json({ message: "Username already taken." })
                                    }
                                } )
                                .catch(err => res.status(500).json({ message: "Database error1", error: err }))
                        })
                }
                else {      // if user exists
                    res.status(400).json({ message: "Email already exists! Try logging in." })
                }
            })
            .catch(err => res.status(500).json({ message: "Database error", error: err }))
    }
})




module.exports = router;