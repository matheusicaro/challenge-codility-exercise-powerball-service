module.exports = class ApiResponse {
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
