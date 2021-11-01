module.exports = class ApiErrorResponse {
  constructor(message) {
    this.message = message
  }

  getMessage() {
    return this.message
  }

  setMessage(message) {
    this.message = message
  }
}
