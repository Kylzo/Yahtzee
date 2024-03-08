const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");



//--------------------
// Fonction pour voir quels sont les utiliseurs connectés en décodant le token présent dans le cookie avec "cookie parser"
//--------------------
module.exports.checkUser = (req, res, next) => {
  console.log("checkUser")
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        res.locals.isAdmin = 6;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  console.log("requireAuth")
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.send(404).json('no token')
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
  }
};
