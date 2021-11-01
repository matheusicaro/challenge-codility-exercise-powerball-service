const { ResultLotteryTicket, Ticket, TotalWon } = require('./model/result-lotery-ticket.model')
const LotteryApi = require('../../integration/lottery-api.integration')
const DateUtil = require('../../utils/date.util')
const { MESSAGES, POWERBALL_PRIZES } = require('../../constants')
const ProcessingFailureException = require('../../exceptions/processing-failure.exception')
const StringUtil = require('../../utils/string.util')
const ServiceUtil = require('./util/powerball.util')

const TOTAL_LENGTH_OF_A_VALID_PICK_AS_STRING = 17

/**
 * Class to handle powerball-related business rules
 *
 */
class PowerballService {
  /**
   * Method to calculate game results by date of the draw
   *
   * @param  {date} drawDate: date of the draw
   * @param  {Array.<string>} picks: array of numbers
   * @returns {ResultLotteryTicket} result: returns the result of picks whether they are awarded or not and their prize values.
   */
  static async getResults(drawDate, picks) {
    const results = await LotteryApi.getLotteryResults()
    const drawDateResult = results.getResultByDate(drawDate)
    const drawDateFormatted = DateUtil.formatDateWithoutTime(drawDate)

    if (!drawDateResult) throw new ProcessingFailureException(`${MESSAGES.DRAW_DATE_NOT_FOUND} ${drawDateFormatted}`, 404)

    const winningNumbers = ServiceUtil.convertPickStringToNumberList(drawDateResult.getWinningNumbers())
    const ticketsValidated = []

    for (let pick of picks) ticketsValidated.push(buildTicket(pick, winningNumbers, drawDateResult.getMultiplier()))

    if (ticketsValidated.some(ticketAwardedAsGrandPrize)) {
      const totalWon = new TotalWon(POWERBALL_PRIZES.FIRST_PRIZE.VALUE_AS_NUMBER, POWERBALL_PRIZES.FIRST_PRIZE.VALUE_FORMATTED)
      return new ResultLotteryTicket(drawDateFormatted, drawDateResult.getWinningNumbers(), totalWon, ticketsValidated)
    }

    let totalWonValue = 0
    for (let ticket of ticketsValidated) totalWonValue += ticket.getTicketResult().getValue()

    const totalWon = new TotalWon(totalWonValue, StringUtil.formatNumberToUSACurrency(totalWonValue))
    return new ResultLotteryTicket(drawDateFormatted, drawDateResult.getWinningNumbers(), totalWon, ticketsValidated)
  }

  /**
   * Method to return if pick is valid according to powerball rules for sequence and number range
   *
   * @param  {string} pick: pick as string like "05 20 10 30 50 25"
   * @returns {boolean}
   */
  static isAnInvalidPick(pick) {
    if (!pick || pick.length !== TOTAL_LENGTH_OF_A_VALID_PICK_AS_STRING) return true

    const pickSplited = pick.split(' ').map((e) => parseInt(e))
    const containsDuplicateElements = [...new Set(pickSplited)].length !== pickSplited.length

    if (containsDuplicateElements) return true

    const redPowerball = parseInt(pickSplited[5])
    let isInvalidWhiteBall = pickSplited.some(ServiceUtil.invalidWhiteBall)

    return containsDuplicateElements || isInvalidWhiteBall || ServiceUtil.invalidRedBall(redPowerball)
  }
}

module.exports = PowerballService

/**
 * Function to build ticket from the result of hits between the pick and winning numbers with the value multiplied by the factor provided
 *
 * @param  {Ticket} pick: pick informed to validate if you are awarded
 * @param  {Ticket} winningNumbers: winning numbers set
 * @param  {Ticket} multiplier: Multiplication factor for award
 * @returns {Ticket} return: ticket with the result for the pick provided
 */
const buildTicket = (pick, winningNumbers, multiplier) => {
  const pickAsNumberList = ServiceUtil.convertPickStringToNumberList(pick)

  const redBallFromPick = pickAsNumberList[5]
  const redBallFromDrawDateResult = winningNumbers[5]

  const totalMatchsWhiteBall = ServiceUtil.getTotalWhiteBall(winningNumbers, pickAsNumberList)
  const isMatchRedPowerBall = redBallFromPick === redBallFromDrawDateResult

  const ticketResult = ServiceUtil.buildTicketResult(totalMatchsWhiteBall, isMatchRedPowerBall, multiplier)

  return new Ticket(pick, ticketResult)
}

/**
 * Function to validate if the ticket is awarded as the grand prize
 *
 * @param  {Ticket} ticket
 * @returns {boolean}
 */
const ticketAwardedAsGrandPrize = (ticket) => ticket.getTicketResult().getValueFormatted() === POWERBALL_PRIZES.FIRST_PRIZE.VALUE_FORMATTED
