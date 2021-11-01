module.exports = class LoterryApiResponse {
  constructor(data) {
    if (data) {
      this.drawDate = new Date(data['draw_date'])
      this.winningNumbers = data['winning_numbers']
      this.multiplier = parseInt(data['multiplier'])
    }
  }

  getDrawDate() {
    return this.drawDate
  }

  getWinningNumbers() {
    return this.winningNumbers
  }

  getMultiplier() {
    return this.multiplier
  }
}
