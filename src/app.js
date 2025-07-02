const express = require("express");

const app = express();

app.set('case sensitive routing', true);

app.use("/hello",(req,res) => {
  console.log("Hello World");
  res.send("Hello World");
});

app.listen(4444,() => {
  console.log("listening on port number 4444");
});