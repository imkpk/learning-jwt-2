// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard

require('dotenv').config()
const jwt = require('jsonwebtoken');
// const CustomAPIError = require("../errors/custom-error");
const { BadRequestError } = require('../errors')

const jwtSecret = process.env.JTS

const login = async (req, res) => {
  const {username, password} = req.body;
  if (!username || !password) {
    throw new BadRequestError(`please add user-name and password`)
  }
  const id = new Date().getDate()
  const token = jwt.sign({id, username}, jwtSecret, {expiresIn: '30d'})
  res.status(200).json({msg: 'user created', token})
}

//dashboard
const dashBoard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}

module.exports = {login, dashBoard}