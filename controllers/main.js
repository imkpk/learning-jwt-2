require('dotenv').config()
const jwt = require('jsonwebtoken')

const CustomAPIError = require("../errors/custom-error");
const jwtSecret = process.env.JTS

const login = async (req, res) => {
  const {username, password} = req.body;
  console.log(username, password)
  if (!username || !password) {
    throw new CustomAPIError(`please add user-name and password`, 400)
  }
  const id = new Date().getDate()
  const token = jwt.sign({id, username}, jwtSecret, {expiresIn: '30d'})

  res.status(200).json({msg: 'user created', token})
}

//dashboard
const dashBoard = async (req, res) => {
  const authHeader = req.headers.authorization;
  console.log('header values---', authHeader)

  if (!authHeader) {
    throw new CustomAPIError('No token Provided', 401)
  }
  console.log('------')
  const token = authHeader.split(' ')[1]
  // console.log(token)
  try {
    const decoded = jwt.verify(token, jwtSecret)
    console.log(decoded)

    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({msg: `Hello ${decoded.username}`, secret: `Your lucky number-- ${luckyNumber}`})

  } catch (e) {
    console.log(e)
    throw new CustomAPIError(`not authored to access this routes`, 401)
  }
}

module.exports = {login, dashBoard}