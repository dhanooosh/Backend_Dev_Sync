const userAuth = (req, res, next) => {
  const userAuth = "xzx";
  if("xzx" == userAuth){
    next();
  }
  else{
    res.send("Invalid User");
  }
}

module.exports = {
  userAuth
}