const jwt = require("jsonwebtoken");
const usermodel = require("../models/user");
const userAuth = async (req, res, next) => {
  const {token} = req.cookies;
  const decodeId = await jwt.verify(token, "jwtsign");
  const user = await usermodel.findById(decodeId._id);
  if(!user){
    throw new Error("Invalid User");
  }
  req.user = user;
  next();
}

module.exports = {
  userAuth
}