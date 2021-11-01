const { ResultLotteryTicket, TotalWon } = require('../models/result-lotery-ticket.model')

/**
 * Class to handle powerball-related business rules
 *
 */
class PowerballService {
  /**
   * Method to calculate game results by date of the draw
   *
   * @param  {date} drawDate: date of the draw
   * @param  {Array.<string>} picks: Picks to be rated
   * @returns {ResultLotteryTicket} result: returns the result of picks whether they are awarded or not and their prize values.
   */
  static async getResults(drawDate, picks) {
    return new ResultLotteryTicket(drawDate, new TotalWon(0, '$0'), [])
  }

  static isAnInvalidBet(pick) {
    return true
  }
}

module.exports = PowerballService
