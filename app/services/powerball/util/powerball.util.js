const { TicketResult } = require('../model/result-lotery-ticket.model')
const StringUtil = require('../../../utils/string.util')

const { POWERBALL_PRIZES } = require('../../../constants')

const TOTAL_WHITE_BALL_BY_PICK = 5
const FIRST_NUMBER_OF_THE_WHITE_BALL_BALL = 1
const LAST_NUMBER_OF_THE_WHITE_BALL_BALL = 69
const FIRST_NUMBER_OF_THE_RED_POWERBALL = 1
const LAST_NUMBER_OF_THE_RED_POWERBALL = 26

/**
 * Function to validate if number for white ball is within estimated limit
 *
 * @param  {number} ball: selected number for white ball
 * @returns {boolean}
 */
const invalidWhiteBall = (ball) => !ball || ball < FIRST_NUMBER_OF_THE_WHITE_BALL_BALL || ball > LAST_NUMBER_OF_THE_WHITE_BALL_BALL

/**
 * Function to validate if number for red ball is within estimated limit
 *
 * @param  {number} ball: selected number for red ball
 * @returns {boolean}
 */
const invalidRedBall = (ball) => !ball || ball < FIRST_NUMBER_OF_THE_RED_POWERBALL || ball > LAST_NUMBER_OF_THE_RED_POWERBALL

/**
 * Function to convert prick as string to an number list
 *
 * @param  {string} pick: "05 20 10 30 50 25"
 * @returns {Array.<number>} return: [5, 20, 10, 30, 50, 25]
 */
const convertPickStringToNumberList = (pick) =>
  pick
    ? pick
        .split(' ')
        .map((e) => parseInt(e))
        .filter((e) => !!e)
    : []

/**
 * Function to return total hits between list of winners numbers and list of pick numbers
 *
 * @param  {Array.<number>} winningNumbers: [5, 20, 10, 30, 50, 25]
 * @param  {Array.<number>} pick: [5, 8, 20, 21, 26, 20]
 * @returns {number} return: 2
 */
const getTotalWhiteBall = (winningNumbers, pick) => {

  if (!Array.isArray(winningNumbers) || !Array.isArray(pick)) return 0

  const winningNumbersWhiteBall = winningNumbers.slice(0)
  const pickWhiteBall = pick.slice(0)

  let totalMatch = 0

  for (let index = 0; index < TOTAL_WHITE_BALL_BY_PICK; index++) {
    if (winningNumbersWhiteBall.includes(pickWhiteBall[index])) totalMatch++
  }

  return totalMatch
}

/**
 * Function to build the result of the ticket as awarded or not and the amount received according to determined rules of Powerball
 *
 * @param  {number} totalMatchsWhiteBall
 * @param  {boolean} isMatchRedPowerBall
 * @param  {number} multiplier
 * @returns {TicketResult}
 */
const buildTicketResult = (totalMatchsWhiteBall, isMatchRedPowerBall, multiplier) => {
  const multiply = (value) => value * multiplier
  let wonValue = 0

  if (gotFirstPrize(totalMatchsWhiteBall, isMatchRedPowerBall))
    return new TicketResult(true, POWERBALL_PRIZES.FIRST_PRIZE.VALUE_AS_NUMBER, POWERBALL_PRIZES.FIRST_PRIZE.VALUE_FORMATTED)
  else if (gotSecondPrize(totalMatchsWhiteBall, isMatchRedPowerBall)) wonValue = multiply(POWERBALL_PRIZES.SECOND_PRIZE.VALUE_AS_NUMBER)
  else if (gotThirdPrize(totalMatchsWhiteBall, isMatchRedPowerBall)) wonValue = multiply(POWERBALL_PRIZES.THIRD_PRIZE.VALUE_AS_NUMBER)
  else if (gotFourthPrize(totalMatchsWhiteBall, isMatchRedPowerBall)) wonValue = multiply(POWERBALL_PRIZES.FOURTH_PRIZE.VALUE_AS_NUMBER)
  else if (gotFifthPrize(totalMatchsWhiteBall, isMatchRedPowerBall)) wonValue = multiply(POWERBALL_PRIZES.FIFTH_PRIZE.VALUE_AS_NUMBER)
  else if (gotSixthPrize(totalMatchsWhiteBall, isMatchRedPowerBall)) wonValue = multiply(POWERBALL_PRIZES.SIXTH_PRIZE.VALUE_AS_NUMBER)
  else if (gotSeventhPrize(totalMatchsWhiteBall, isMatchRedPowerBall)) wonValue = multiply(POWERBALL_PRIZES.SEVENTH_PRIZE.VALUE_AS_NUMBER)
  else if (gotEighthPrize(totalMatchsWhiteBall, isMatchRedPowerBall)) wonValue = multiply(POWERBALL_PRIZES.EIGHTH_PRIZE.VALUE_AS_NUMBER)
  else if (gotNinethPrize(totalMatchsWhiteBall, isMatchRedPowerBall)) wonValue = multiply(POWERBALL_PRIZES.NINETH_PRIZE.VALUE_AS_NUMBER)

  return new TicketResult(wonValue > 0, wonValue, StringUtil.formatNumberToUSACurrency(wonValue))
}

/**
 * Function to validate if the first prize was hit according to the rules for hitting the first prize
 *
 * @param  {number} totalMatchsWhiteBall
 * @param  {boolean} isMatchRedPowerBall
 * @returns {boolean}
 */
const gotFirstPrize = (totalMatchsWhiteBall, isMatchRedPowerBall) =>
  POWERBALL_PRIZES.FIRST_PRIZE.TOTAL_MATCH_WHITE_BALL === totalMatchsWhiteBall &&
  POWERBALL_PRIZES.FIRST_PRIZE.REQUIRED_MATCH_RED_BALL === isMatchRedPowerBall

/**
 * Function to validate if the Second prize was hit according to the rules for hitting the Second prize
 *
 * @param  {number} totalMatchsWhiteBall
 * @param  {boolean} isMatchRedPowerBall
 * @returns {boolean}
 */
const gotSecondPrize = (totalMatchsWhiteBall, isMatchRedPowerBall) =>
  POWERBALL_PRIZES.SECOND_PRIZE.TOTAL_MATCH_WHITE_BALL === totalMatchsWhiteBall &&
  POWERBALL_PRIZES.SECOND_PRIZE.REQUIRED_MATCH_RED_BALL === isMatchRedPowerBall

/**
 * Function to validate if the Third prize was hit according to the rules for hitting the Third prize
 *
 * @param  {number} totalMatchsWhiteBall
 * @param  {boolean} isMatchRedPowerBall
 * @returns {boolean}
 */
const gotThirdPrize = (totalMatchsWhiteBall, isMatchRedPowerBall) =>
  POWERBALL_PRIZES.THIRD_PRIZE.TOTAL_MATCH_WHITE_BALL === totalMatchsWhiteBall &&
  POWERBALL_PRIZES.THIRD_PRIZE.REQUIRED_MATCH_RED_BALL === isMatchRedPowerBall

/**
 * Function to validate if the Fourth prize was hit according to the rules for hitting the Fourth prize
 *
 * @param  {number} totalMatchsWhiteBall
 * @param  {boolean} isMatchRedPowerBall
 * @returns {boolean}
 */
const gotFourthPrize = (totalMatchsWhiteBall, isMatchRedPowerBall) =>
  POWERBALL_PRIZES.FOURTH_PRIZE.TOTAL_MATCH_WHITE_BALL === totalMatchsWhiteBall &&
  POWERBALL_PRIZES.FOURTH_PRIZE.REQUIRED_MATCH_RED_BALL === isMatchRedPowerBall

/**
 * Function to validate if the Fifth prize was hit according to the rules for hitting the Fifth prize
 *
 * @param  {number} totalMatchsWhiteBall
 * @param  {boolean} isMatchRedPowerBall
 * @returns {boolean}
 */
const gotFifthPrize = (totalMatchsWhiteBall, isMatchRedPowerBall) =>
  POWERBALL_PRIZES.FIFTH_PRIZE.TOTAL_MATCH_WHITE_BALL === totalMatchsWhiteBall &&
  POWERBALL_PRIZES.FIFTH_PRIZE.REQUIRED_MATCH_RED_BALL === isMatchRedPowerBall

/**
 * Function to validate if the Sixth prize was hit according to the rules for hitting the Sixth prize
 *
 * @param  {number} totalMatchsWhiteBall
 * @param  {boolean} isMatchRedPowerBall
 * @returns {boolean}
 */
const gotSixthPrize = (totalMatchsWhiteBall, isMatchRedPowerBall) =>
  POWERBALL_PRIZES.SIXTH_PRIZE.TOTAL_MATCH_WHITE_BALL === totalMatchsWhiteBall &&
  POWERBALL_PRIZES.SIXTH_PRIZE.REQUIRED_MATCH_RED_BALL === isMatchRedPowerBall

/**
 * Function to validate if the Seventh prize was hit according to the rules for hitting the Seventh prize
 *
 * @param  {number} totalMatchsWhiteBall
 * @param  {boolean} isMatchRedPowerBall
 * @returns {boolean}
 */
const gotSeventhPrize = (totalMatchsWhiteBall, isMatchRedPowerBall) =>
  POWERBALL_PRIZES.SEVENTH_PRIZE.TOTAL_MATCH_WHITE_BALL === totalMatchsWhiteBall &&
  POWERBALL_PRIZES.SEVENTH_PRIZE.REQUIRED_MATCH_RED_BALL === isMatchRedPowerBall

/**
 * Function to validate if the Eighth prize was hit according to the rules for hitting the Eighth prize
 *
 * @param  {number} totalMatchsWhiteBall
 * @param  {boolean} isMatchRedPowerBall
 * @returns {boolean}
 */
const gotEighthPrize = (totalMatchsWhiteBall, isMatchRedPowerBall) =>
  POWERBALL_PRIZES.EIGHTH_PRIZE.TOTAL_MATCH_WHITE_BALL === totalMatchsWhiteBall &&
  POWERBALL_PRIZES.EIGHTH_PRIZE.REQUIRED_MATCH_RED_BALL === isMatchRedPowerBall

/**
 * Function to validate if the Nineth prize was hit according to the rules for hitting the Nineth prize
 *
 * @param  {number} totalMatchsWhiteBall
 * @param  {boolean} isMatchRedPowerBall
 * @returns {boolean}
 */
const gotNinethPrize = (totalMatchsWhiteBall, isMatchRedPowerBall) =>
  POWERBALL_PRIZES.NINETH_PRIZE.TOTAL_MATCH_WHITE_BALL === totalMatchsWhiteBall &&
  POWERBALL_PRIZES.NINETH_PRIZE.REQUIRED_MATCH_RED_BALL === isMatchRedPowerBall

const PowerballUtil = {
  invalidWhiteBall,
  invalidRedBall,
  convertPickStringToNumberList,
  getTotalWhiteBall,
  buildTicketResult,
}

module.exports = PowerballUtil
