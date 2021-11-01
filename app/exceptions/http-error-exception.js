const Logger = require("../config/logger")

/**
 * Exception to handle with Http error
 * @constructor
 * @param @type {number} statusCode - request status code
 * @param @type {data} message - request body response
 */
class HttpErrorException extends Error {
  constructor(httpStatusCode, data, message = 'Error on requesting data') {
    super(message)
    this.httpStatusCode = httpStatusCode
    this.data = data

    Logger.error(`${message} - HttpStatusCode: ${httpStatusCode}, data: ${JSON.stringify(data)}`)
  }
}

module.exports = HttpErrorException
