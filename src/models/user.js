const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName:{
    type:String
  },
  lastName:{
    type:String
  },
  age:{
    type:Number
  },
  gender:{
    type:String
  },
  emailID:{
    type:String
  }
});

const userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;