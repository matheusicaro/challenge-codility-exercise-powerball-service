const Service = require('../../../app/services/powerball')
const { ResultLotteryTicket, TotalWon, Ticket, TicketResult } = require('../../../app/services/powerball/model/result-lotery-ticket.model')
const LoterryApiResponse = require('../../../app/integration/models/loterry-api-response.model')

jest.mock('../../../app/integration/lottery-api.integration')
const LoterryApi = require('../../../app/integration/lottery-api.integration')
const { POWERBALL_PRIZES } = require('../../../app/constants')

describe('powerball.service', () => {
  describe('PowerballService.isAnInvalidPick', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('Should return invalid for invalid pick not number', () => {
      const invalidInputs = [null, '', ' ', 'any other string']

      for (let input of invalidInputs) expect(Service.isAnInvalidPick(input)).toBe(true)
    })

    test('Should return invalid if there are duplicate elements at pick', () => {
      const input = '01 20 01 20 05 10'

      expect(Service.isAnInvalidPick(input)).toBe(true)
    })

    test('Should return invalid if there are white ball number less than 1 and or bigger than 69', () => {
      const invalidInputs = ['00 0-1 005 40 50 25', '75 70 100 40 2550 25']

      for (let input of invalidInputs) expect(Service.isAnInvalidPick(input)).toBe(true)
    })

    test('Should return invalid if there are red ball number less than 1 and or bigger than 26', () => {
      const invalidInputs = ['05 15 20 40 50 00', '05 15 20 40 50 27', '05 15 20 40 50 50']

      for (let input of invalidInputs) expect(Service.isAnInvalidPick(input)).toBe(true)
    })

    test('Should return valid for white balls greater than 1 and less than 70 and for the red balls greater than 1 and less than 26', () => {
      const inputs = ['01 20 03 45 05 10', '05 15 20 40 50 21', '05 15 20 40 69 26']

      for (let input of inputs) expect(Service.isAnInvalidPick(input)).toBe(true)
    })
  })

  describe('PowerballService.getResults', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('Should return expected ResultLotteryTicket for any prize won', async () => {
      const winningNumbers = '01 20 30 40 50 25'

      const pick = '57 20 30 40 50 25'
      const drawDate = '2021-10-31'
      const totalWon = new TotalWon(POWERBALL_PRIZES.THIRD_PRIZE.VALUE_AS_NUMBER, POWERBALL_PRIZES.THIRD_PRIZE.VALUE_FORMATTED)
      const ticket = new Ticket(pick, new TicketResult(true, totalWon.getValue(), totalWon.getValueFormatted()))

      const expected = new ResultLotteryTicket(drawDate, totalWon, [ticket])

      LoterryApi.getLotteryResults = jest.fn().mockImplementation(() => {
        return [
          new LoterryApiResponse({
            draw_date: `${drawDate}T00:00:00.000`,
            winning_numbers: winningNumbers,
            multiplier: '1',
          }),
        ]
      })

      const returned = await Service.getResults(new Date(drawDate), [pick])

      expect(LoterryApi.getLotteryResults).toHaveBeenCalledTimes(1)
      expect(returned).toEqual(expected)
    })

    test('Should return the sum on total won value from the set of winning pick and true with the prize value for all picks', async () => {
      const winningNumbers = '01 20 30 40 50 25'
      const pickAwardedWithSecondPrize = '01 20 30 40 50 01'
      const pickAwardedWithThirdPrize = '60 20 30 40 50 25'
      const pickAwardedWithFifthPrize = '54 07 30 40 50 25'

      const picksAwarded = [
        {
          pick: pickAwardedWithSecondPrize,
          prizeValue: POWERBALL_PRIZES.SECOND_PRIZE.VALUE_AS_NUMBER,
          prizeValueFormatted: POWERBALL_PRIZES.SECOND_PRIZE.VALUE_FORMATTED,
        },
        {
          pick: pickAwardedWithThirdPrize,
          prizeValue: POWERBALL_PRIZES.THIRD_PRIZE.VALUE_AS_NUMBER,
          prizeValueFormatted: POWERBALL_PRIZES.THIRD_PRIZE.VALUE_FORMATTED,
        },
        {
          pick: pickAwardedWithThirdPrize,
          prizeValue: POWERBALL_PRIZES.FIFTH_PRIZE.VALUE_AS_NUMBER,
          prizeValueFormatted: POWERBALL_PRIZES.FIFTH_PRIZE.VALUE_FORMATTED,
        },
      ]

      const picks = [pickAwardedWithSecondPrize, pickAwardedWithThirdPrize, pickAwardedWithFifthPrize]

      const expectedTotalValue = 1050100 // sum obtained from the values of the powerball constants
      const expectedTotalValueFormatted = '$1,050,100' // sum formatted obtained from the values of the powerball constants

      const drawDate = '2021-10-31'

      LoterryApi.getLotteryResults = jest.fn().mockImplementation(() => {
        return [
          new LoterryApiResponse({
            draw_date: `${drawDate}T00:00:00.000`,
            winning_numbers: winningNumbers,
            multiplier: '1',
          }),
        ]
      })

      const returned = await Service.getResults(new Date(drawDate), picks)

      expect(LoterryApi.getLotteryResults).toHaveBeenCalledTimes(1)
      expect(returned.getTotalWon()).not.toBeUndefined()
      expect(returned.getTotalWon().getValue()).toEqual(expectedTotalValue)
      expect(returned.getTotalWon().getValueFormatted()).toEqual(expectedTotalValueFormatted)

      returned.getTickets().forEach((ticket, index) => {
        expect(ticket.getTicketResult().getWon()).toBe(true)
        expect(ticket.getTicketResult().getValue()).toEqual(picksAwarded[index].prizeValue)
        expect(ticket.getTicketResult().getValueFormatted()).toEqual(picksAwarded[index].prizeValueFormatted)
      })
    })

    test('Should return values multiplied by the factor for the total value and each pick value won', async () => {
      const winningNumbers = '01 20 30 40 50 25'
      const pickAwardedWithThirdPrize = '60 20 30 40 50 25'
      const pickAwardedWithFifthPrize = '54 07 30 40 50 25'
      const factorMultiplierFromThePrize = 5

      const expectedPicksAwarded = [
        {
          pick: pickAwardedWithThirdPrize,
          prizeValue: POWERBALL_PRIZES.THIRD_PRIZE.VALUE_AS_NUMBER * factorMultiplierFromThePrize,
          prizeValueFormatted: '$250,000',
        },
        {
          pick: pickAwardedWithFifthPrize,
          prizeValue: POWERBALL_PRIZES.FIFTH_PRIZE.VALUE_AS_NUMBER * factorMultiplierFromThePrize,
          prizeValueFormatted: '$500',
        },
      ]

      const drawDate = '2021-10-31'
      const picks = [pickAwardedWithThirdPrize, pickAwardedWithFifthPrize]

      LoterryApi.getLotteryResults = jest.fn().mockImplementation(() => {
        return [
          new LoterryApiResponse({
            draw_date: `${drawDate}T00:00:00.000`,
            winning_numbers: winningNumbers,
            multiplier: factorMultiplierFromThePrize,
          }),
        ]
      })

      const returned = await Service.getResults(new Date(drawDate), picks)

      expect(LoterryApi.getLotteryResults).toHaveBeenCalledTimes(1)
      expect(returned.getTotalWon()).not.toBeUndefined()
      expect(returned.getTotalWon().getValue()).toEqual(250500)
      expect(returned.getTotalWon().getValueFormatted()).toEqual('$250,500')

      returned.getTickets().forEach((ticket, index) => {
        expect(ticket.getTicketResult().getWon()).toBe(true)
        expect(ticket.getTicketResult().getValue()).toEqual(expectedPicksAwarded[index].prizeValue)
        expect(ticket.getTicketResult().getValueFormatted()).toEqual(expectedPicksAwarded[index].prizeValueFormatted)
      })
    })

    test('Should return the grand prize as total won value if there is at least one ticket awarded as the grand prize', async () => {
      const winningNumbers = '01 20 30 40 50 25'

      const pickAwardedWithSecondPrize = '01 20 30 40 50 01'
      const pickAwardedWithThirdPrize = '60 20 30 40 50 25'
      const pickAwardedWithFifthPrize = '54 07 30 40 50 25'
      const pickAwardedWithFirstPrize = winningNumbers

      const picks = [pickAwardedWithSecondPrize, pickAwardedWithThirdPrize, pickAwardedWithFifthPrize, pickAwardedWithFirstPrize]

      const drawDate = '2021-10-31'

      LoterryApi.getLotteryResults = jest.fn().mockImplementation(() => {
        return [
          new LoterryApiResponse({
            draw_date: `${drawDate}T00:00:00.000`,
            winning_numbers: winningNumbers,
            multiplier: '1',
          }),
        ]
      })

      const returned = await Service.getResults(new Date(drawDate), picks)

      expect(LoterryApi.getLotteryResults).toHaveBeenCalledTimes(1)
      expect(returned.getTotalWon()).not.toBeUndefined()
      expect(returned.getTotalWon().getValue()).toEqual(POWERBALL_PRIZES.FIRST_PRIZE.VALUE_AS_NUMBER),
        expect(returned.getTotalWon().getValueFormatted()).toEqual(POWERBALL_PRIZES.FIRST_PRIZE.VALUE_FORMATTED)
    })

    test('Should return false for each ticket with no won and their values with zero', async () => {
      const winningNumbers = '01 20 30 40 50 25'
      const picksNotAwarded = ['55 21 54 12 10 01', '60 15 01 05 55 20', '33 67 45 08 09 15']

      const drawDate = '2021-10-31'

      LoterryApi.getLotteryResults = jest.fn().mockImplementation(() => {
        return [
          new LoterryApiResponse({
            draw_date: `${drawDate}T00:00:00.000`,
            winning_numbers: winningNumbers,
            multiplier: '1',
          }),
        ]
      })

      const returned = await Service.getResults(new Date(drawDate), picksNotAwarded)

      expect(LoterryApi.getLotteryResults).toHaveBeenCalledTimes(1)
      expect(returned.getTotalWon()).not.toBeUndefined()
      expect(returned.getTotalWon().getValue()).toEqual(0)
      expect(returned.getTotalWon().getValueFormatted()).toEqual('$0')

      for (let ticket of returned.getTickets()) {
        expect(ticket.getTicketResult().getWon()).toBe(false)
        expect(ticket.getTicketResult().getValue()).toEqual(0)
        expect(ticket.getTicketResult().getValueFormatted()).toEqual('$0')
      }
    })
  })
})
