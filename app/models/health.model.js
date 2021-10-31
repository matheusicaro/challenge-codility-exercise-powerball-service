module.exports = class Health {
  constructor(status, date) {
    this.time = date
    this.status = status
  }

  getDate() {
    return this.date
  }

  setDate(date) {
    this.time = date
  }

  getStatus() {
    return this.status
  }

  setStatus(status) {
    this.status = status
  }
}
