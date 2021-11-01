const DateUtil = require('../../utils/date.util')

class LoterryApiResponse {
  constructor(data) {
    this.results = data
  }

  getResultByDate(date) {
    for (let result of this.results) {
      if (DateUtil.formatDateWithoutTime(new Date(result['draw_date'])) === DateUtil.formatDateWithoutTime(date))
        return new LotteryResult(result)
    }
  }
}

class LotteryResult {
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

module.exports = {
  LoterryApiResponse,
  LotteryResult,
}
