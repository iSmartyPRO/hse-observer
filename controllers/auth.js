const AD = require('activedirectory2').promiseWrapper
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const config = require("../config")

const getToken = (uId) => {
  return jwt.sign(
    {
      uId
    },
    config.secretJWTToken,
    {
      expiresIn: "12h"
    }
  )
}

module.exports.login = async (req, res, next) => {
  let {email, password} = req.body
  if(email && password){
  // check if email and password is provided
    let checkUser = await User.findOne({email}).populate("roles", "name")
    if(checkUser){
      let roles = checkUser.roles.map(item => { return item.name})
      let language = checkUser.language ? checkUser.language : "ru"
      roles.length ? roles : roles = ["standard"] // if roles doesn't exist then assign standard
      if(checkUser.authType === 'ad') {
      // if authType is Active Directory then use ADLDAP Authentication
        const ad = new AD(config.activeDirectory);
        ad.authenticate(email, password, function(err, auth) {
          if (err) {
            console.log('ERROR: '+JSON.stringify(err));
          }
          if (auth) {
            res.status(200).json({message: 'Successfully authenticated with Active Directory', uid: checkUser._id, roles, token: getToken(checkUser._id), language})
          }
          else {
            res.status(401).json({message: `Active Directory authentication failed!`, error: err})
          }
        });
      } else {
      // if authtype is other, assuming by default is local - then check by local password variables
        bcrypt.compare(password, checkUser.password, (err, checkPassword) => {
          if(err){
            res.status(500).json({message: "Error occur during checking password", error: err})
          } else {
            if(checkPassword){
              res.status(200).json({message: "You are authorized!", uid: checkUser._id, roles, token: getToken(checkUser._id), language})
            } else {
              res.status(401).json({message: "Auth failed"})
            }
          }
        })
      }
    } else {
      res.status(401).json({message: `Auth failed`})
    }
  } else {
    res.status(500).json({message: "Missing required values, such as email or password"})
  }
}

module.exports.signup = (req, res, next) => {
  res.status(200).json({message: "Signup function is underconstruction"})
}