const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, emailID, password } = req.body;
  if(!firstName || !lastName){
    throw new error("Name not valid");
  }
  else if(!validator.isEmail(emailID)){
    throw new error("email not valid");
  }
  else if(!validator.isStrongPassword(password)){
    throw new error("Not a strong password");
  }
}

module.exports = {
  validateSignUp
}