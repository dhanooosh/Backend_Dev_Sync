const express = require("express");
const {connectDB} = require("./config/database");
const app = express();
const userModel = require("./models/user");

app.use(express.json());

app.get("/feed",async (req,res)=>{
  const user = await userModel.find({
    emailID: req.body.emailID,
  });
  res.send(user);
});

app.post("/user",async (req,res)=>{
  const user = new userModel(req.body);

  await user.save();

  res.send("user created!!");

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