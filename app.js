const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: ['secret_key']
}))


app.use(cors({origin: '*'}))
app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))



mongoose.connect("mongodb+srv://jai:jai@cluster0.3wvybhi.mongodb.net/?retryWrites=true&w=majority")
    .then(console.log("Connection successfully established"))
    .catch(err => console.log(err))


const loginRoute = require('./api/routes/login')
const signupRoute = require('./api/routes/signup')
const logoutRoute = require('./api/routes/logout')
const session = require('express-session')

app.use('/login', loginRoute)
app.use('/signup', signupRoute)
app.use('/logout', logoutRoute)


app.use((req, res) => {
    res.status(404).json({ message: "The page you're looking for does not exist!" })
})

module.exports = app;