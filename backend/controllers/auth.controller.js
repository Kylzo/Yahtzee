const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};


//--------------------
// Fonction pour enregistrer un nouveau compte
//--------------------
module.exports.signUp = async (req, res) => {
  const { lastName, firstName, email, password } = req.body

  try {
    const user = await UserModel.create({ lastName, firstName, email, password });
    res.status(200).json({ user: user._id });
  }
  catch (err) {
    const errors = signUpErrors(err);
    res.status(400).send({ errors })
  }
}


//--------------------
// Fonction pour connecter un compte existant dans la DataBase
//--------------------
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id })
  } catch (err) {
    const errors = signInErrors(err);
    res.status(400).json({ errors });
  }
}


//--------------------
// Fonction pour déconnecter un compte existant dans la DataBase (avec jwt et cookie parser)
//--------------------
module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}