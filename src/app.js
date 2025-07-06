const express = require("express");
const {connectDB} = require("./config/database");
const app = express();
const userModel = require("./models/user");
const { validateSignUp } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookie());

app.get("/feed",async (req,res)=>{
  try{
    const user = await userModel.find({
      emailID: req.body.emailID,
    });
    res.send(user);
  }
  catch(err){
    res.send(err);
  }
  
});

app.post("/login",async (req,res) => {
  try{
    const isValidUser = await userModel.findOne({emailID: req.body.emailID});
    if(!isValidUser){
      throw new Error("Not a valid user");
    }
    const jwtsign = await jwt.sign({_id: isValidUser._id}, "jwtsign");
    // console.log(jwtsign);
    const hashed = isValidUser.password;
    const isPasswordValid = await bcrypt.compare(req.body.password, hashed);
    if(!isPasswordValid){
      throw new Error("Password or emailId incorect");
    }
    res.cookie("token", jwtsign);
    res.send("Login successfully");
  }
  catch(err){
    res.status(400).send(err.message);
  }
});

app.get("/profile",async (req,res) => {
  try{
    const jwtverify = jwt.verify(req.cookies.token,"jwtsign");
    const user = await userModel.findById(jwtverify._id);
    if(!user){
      throw new Error("Invalid user");
    }
    res.send(user);
  }
  catch(err){
    res.status(400).send(err.message);
  }
});

app.post("/user",async (req,res)=>{

  try{
    validateSignUp(req);
    const hashedPass = await bcrypt.hash(req.body.password,10);
    console.log(hashedPass);
    const user = new userModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailID: req.body.emailID,
      password: hashedPass
    });
    await user.save();
    res.send("user created!!");
  }
  catch(err){
    res.status(400).send(err.message);
  }

});

app.patch("/userupdate/:userid",async (req,res) =>{
  try{
    const allowedUpdate = ["age","gender","skills"];
    const isUpdateAllowed = Object.keys(req.body).every((key) => allowedUpdate.includes(key));
    
    if(!isUpdateAllowed){
      res.status(400).send("Bad body request");
      return;
    }

    const updatedUser = await userModel.findByIdAndUpdate(req.params.userid, req.body,{
      new: true,
      runValidators: true,
    });
    console.log(updatedUser);
    res.send("Updated successfully!");
  }
  catch(err){
    res.status(400).send(err);
  }
});

app.delete("/userdelete",async (req,res)=>{
  console.log(req.body._id);
  try{
    const deletedUser = await userModel.findByIdAndDelete(req.body._id);
    console.log(deletedUser);
    res.send("user deleted");
  }
  catch(err){
    console.log("Invalid User");
  }
  
});


connectDB().then(() => {
  console.log("connected to cluster0");
  app.listen(4444,() => {
    console.log("listening on port number 4444");
  });
}).catch((err)=>{
  console.log(err);
});