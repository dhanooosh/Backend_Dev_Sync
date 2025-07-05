const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    min: 18,
    max: 64
  },
  gender:{
    type: String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new error("Invalid gender");       
      }
    }
  },
  emailID:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  skills:{
    type: [String],
    default: "javascript"
  }
},
{
  timestamps: true
});

const userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;