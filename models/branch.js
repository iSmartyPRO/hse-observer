const mongoose = require("mongoose")

const branchSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String
})

module.exports = mongoose.model('Branch', branchSchema)