const express = require("express");

const app = express();

const {userAuth} = require("./middlewares/UserAuth");

// app.set('case sensitive routing', true);

app.use("/", userAuth);

app.get("/home",(req, res) =>{
  res.send("posted in the home");
});



app.listen(4444,() => {
  console.log("listening on port number 4444");
});