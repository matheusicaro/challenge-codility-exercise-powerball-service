/**
 * Exception to handle non-processing rules for request with http status attribute.
 * @constructor
 * @param @type {string} message - Exception cause message
 * @param @type {number} httpStatusCode - status code for request return
 */
class ProcessingFailureException extends Error {
  constructor(message, httpStatusCode) {
    super(message)
    this.httpStatusCode = httpStatusCode || 500
  }
}

module.exports = ProcessingFailureException
