const express = require("express")

const config = require("./config")
const app = require("./app")
const port = process.env.PORT || config.APP_PORT

app.listen(port, () => { console.log(`Server is running - ${config.APP_URL}:${port}/api`)})