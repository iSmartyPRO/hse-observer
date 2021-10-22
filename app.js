const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")

const config = require("./config")
const apiRoutes = require("./routes/api")

const errorHandler = require("./helpers/errorHandler")
const corsHandler = require("./helpers/corsHandler")

// HELPERS
const {authCheck}           = require('./helpers/auth')

const app = express()

mongoose.connect(config.MongoDBUri)

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/uploads', authCheck, express.static('uploads'))
app.use(morgan('combined'))

app.use(corsHandler)
app.set('etag', false)

// API Route
app.use("/api/", apiRoutes)

// Error Handlers
app.use(errorHandler.defaultError)
app.use(errorHandler.customError)

module.exports = app