const jwt = require("jsonwebtoken")
const {secretJWTToken} = require("../config")

module.exports.authCheck = (req, res, next) => {
  try {
    if(req.headers.authorization){
      let token = req.headers.authorization.split(" ")[1]
      let decoded = jwt.verify(token, secretJWTToken)
      res.userData = decoded
      next()
    } else {
      console.log("Missing auth headers")
      return res.status(401).json({message: "Auth failed"} )
    }
  } catch (err) {
    return res.status(401).json({message: "Auth failed"} )
  }
}