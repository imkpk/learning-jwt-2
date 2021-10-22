const jwt = require('jsonwebtoken')
const Unauthenticated = require("../errors/unauthenticated");
// const CustomAPIError = require("../errors/custom-error");

const authMiddleware = async (req, res, next) => {
  // console.log(req.headers.authorization)
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Unauthenticated(`no token provided`);
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JTS);
    const {id, username} = decoded;
    req.user = {id, username}
    next()
  } catch (e) {
    throw new Unauthenticated(`not authorised to access this route`);
  }


}
module.exports = authMiddleware;