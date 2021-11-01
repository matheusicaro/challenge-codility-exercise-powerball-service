const Logger = require('../config/logger')
const ApiErrorResponse = require('../models/api-error-response.model')
const ProcessingFailureException = require('../exceptions/processing-failure.exception')
const DateUtil = require('../utils/date.util')

const { MESSAGES } = require('../constants')
const PowerballService = require('../services/powerball')

module.exports = class PowerBallController {
  /**
   * Method to return the result of the request received through the service to get results from the powerall service.
   *
   * @param  {Request} req
   * @param  {Response} res
   * @returns {Promise<ResultLotteryTicket> | Promise<ApiErrorResponse>}
   */
  static async checkResult(req, res) {
    try {
      if (!req.body) return res.status(400).json(new ApiErrorResponse(MESSAGES.INVALID_BODY))

      const drawDate = _getDrawDate(req.body)
      const picks = _getPicks(req.body)

      const result = await PowerballService.getResults(drawDate, picks)

      return res.status(200).json(result)
    } catch (error) {
      if (error instanceof ProcessingFailureException) return res.status(error.httpStatusCode).json(new ApiErrorResponse(error.message))

      Logger.error(error)
      return res.status(500).json(new ApiErrorResponse(MESSAGES.INTERNAL_ERROR))
    }
  }
}

/**
 * Function to extract picks from received body
 *
 * @param  {Object{draw_date:<string>}} body: body containing the attribute "draw_date"
 * @returns  {Date} date: returns the date instantiated as date
 * @throw {ProcessingFailureException} exception: If bets are in invalid format an exception will be thrown.
 */
const _getDrawDate = (body) => {
  try {
    return DateUtil.buildDateFrom(body['draw_date'])
  } catch (error) {
    const expectedDateFormat = DateUtil.formatDateWithoutTime(new Date())
    throw new ProcessingFailureException(`${MESSAGES.INVALID_INPUT_DRAW_DATE} ${expectedDateFormat}`, 400)
  }
}

/**
 * Function to extract picks from received body
 *
 * @param   {Object{picks:Array.<string>}} body: body containing the attribute "picks"
 * @returns  {Array.<number>} picks: return picks as an array of numbers
 * @throw {ProcessingFailureException} exception: If bets are in invalid format an exception will be thrown.
 */
const _getPicks = (body) => {
  try {
    const picks = body['picks']
    let isThereAnyInvalidBet = false

    const picksAsNumber = picks.map((pick) => {
      isThereAnyInvalidBet = PowerballService.isAnInvalidPick(pick)
      return pick
    })

    if (isThereAnyInvalidBet) throw new Error('Invalid bet')

    return picksAsNumber
  } catch (error) {
    throw new ProcessingFailureException(MESSAGES.INVALID_INPUT_PICKS, 400)
  }
}
