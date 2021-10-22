const CustomAPIError = require('./custom-error')
const {StatusCodes: stc} = require('http-status-codes')

class BadReuest extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = stc.BAD_REQUEST;
  }
}

module.exports = BadReuest;