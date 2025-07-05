const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, emailID, password } = req.body;
  if(!firstName || !lastName){
    throw new Error("Name not valid");
  }
  else if(!validator.isEmail(emailID)){
    throw new Error("email not valid");
  }
  else if(!validator.isStrongPassword(password)){
    throw new Error("Not a strong password");
  }
}

module.exports = {
  validateSignUp
}