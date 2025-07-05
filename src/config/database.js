const mongoose = require("mongoose");
const {url} = require("./url");

const connectDB = async ()=>{
  await mongoose.connect(url);
}

module.exports = {
  connectDB,
}