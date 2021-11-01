const ServiceUtil = require('../../../app/services/powerball/util/powerball.util')
const { TicketResult } = require('../../../app/services/powerball/model/result-lotery-ticket.model')

const { POWERBALL_PRIZES } = require('../../../app/constants')

describe('powerball.service.util', () => {
  describe('ServiceUtil.buildTicketResult', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('Should return expected TicketResult for each prize won', () => {
      const prizes = [
        POWERBALL_PRIZES.FIRST_PRIZE,
        POWERBALL_PRIZES.SECOND_PRIZE,
        POWERBALL_PRIZES.THIRD_PRIZE,
        POWERBALL_PRIZES.FOURTH_PRIZE,
        POWERBALL_PRIZES.FIFTH_PRIZE,
        POWERBALL_PRIZES.SIXTH_PRIZE,
        POWERBALL_PRIZES.SEVENTH_PRIZE,
        POWERBALL_PRIZES.EIGHTH_PRIZE,
        POWERBALL_PRIZES.NINETH_PRIZE,
      ]

      prizes.forEach((prize) => {
        const expected = new TicketResult(true, prize.VALUE_AS_NUMBER, prize.VALUE_FORMATTED)

        const totalMatchsWhiteBall = prize.TOTAL_MATCH_WHITE_BALL
        const isMatchRedPowerBall = prize.REQUIRED_MATCH_RED_BALL

        const returned = ServiceUtil.buildTicketResult(totalMatchsWhiteBall, isMatchRedPowerBall, 1)

        expect(returned).toEqual(expected)
      })
    })
  })

  describe('ServiceUtil.convertPickStringToNumberList', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('Should return number of list for string input informed', () => {
      const expected = [5, 20, 10, 30, 50, 25]
      const input = '05 20 10 30 50 25'

      const returned = ServiceUtil.convertPickStringToNumberList(input)

      expect(returned).toEqual(expected)
    })

    test('Should return empty list if input is invalid', () => {
      const invalidInputs = [null, '', ' ', 'any other string']

      invalidInputs.forEach((input) => {
        const returned = ServiceUtil.convertPickStringToNumberList(input)

        expect(returned).toEqual([])
      })
    })
  })

  describe('ServiceUtil.getTotalWhiteBall', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('Should return the total hits between list of winners numbers and list of pick numbers', () => {
      const expected = 2
      const winningNumbers = [5, 20, 10, 30, 50, 25]
      const pick = [5, 8, 20, 21, 26, 25]

      const returned = ServiceUtil.getTotalWhiteBall(winningNumbers, pick)

      expect(returned).toEqual(expected)
    })

    test('Should return zero if input is invalid', () => {
      const invalidInputs = [null, undefined, ' ', 'any other string', 0]

      invalidInputs.forEach((input) => {
        const returned = ServiceUtil.getTotalWhiteBall(input)

        expect(returned).toEqual(0)
      })
    })
  })

  describe('ServiceUtil.invalidRedBall', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('Should return invalid for inputs less 1', () => {
      for (let input = -1; input < -100; input--) expect(ServiceUtil.invalidRedBall(input)).toEqual(true)
    })
    
    test('Should return invalid for inputs bigger than 26', () => {
      for (let input = 27; input > 100; input++) expect(ServiceUtil.invalidRedBall(input)).toEqual(true)
    })

    test('Should return valid for inputs less 27 and bigger than 0', () => {
      for (let input = 1; input < 27; input++) expect(ServiceUtil.invalidRedBall(input)).toEqual(false)
    })
  })

  describe('ServiceUtil.invalidWhiteBall', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('Should return invalid for inputs less 1', () => {
      for (let input = -1; input < -100; input--) expect(ServiceUtil.invalidWhiteBall(input)).toEqual(true)
    })
    
    test('Should return invalid for inputs bigger than 69', () => {
      for (let input = 69; input > 100; input++) expect(ServiceUtil.invalidWhiteBall(input)).toEqual(true)
    })

    test('Should return valid for inputs less 70 and bigger than 0', () => {
      for (let input = 1; input < 70; input++) expect(ServiceUtil.invalidWhiteBall(input)).toEqual(false)
    })
  })
})
