const mongoose = require("mongoose")

const roleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  displayName: String,
  description: String
})

module.exports = mongoose.model("Role", roleSchema)