const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const passportstategy = require('./middleware/passport-stategy')
const authRoutes = require('./routes/auth.routes')


const keys = require('./keys')
const app = express()

mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.error(error))

app.use(passport.initialize())
passport.use(passportstategy)


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)



module.exports = app
