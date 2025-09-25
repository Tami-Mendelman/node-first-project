function logger(req, res, next) {
     console.log("a call was made");
  next();
}
module.exports = logger;