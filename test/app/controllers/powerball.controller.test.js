const { mockRequest, mockResponse } = require('./util')
const controller = require('../../../app/controllers/powerball.controller')
const { ResultLotteryTicket, TotalWon, Ticket, TicketResult } = require('../../../app/services/powerball/model/result-lotery-ticket.model')

jest.mock('../../../app/services/powerball')
const PowerballService = require('../../../app/services/powerball')

jest.mock('../../../app/config/logger')
const Logger = require('../../../app/config/logger')
const ApiResponse = require('../../../app/models/api-error-response.model')

describe("Check method 'checkResult'", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return status code 200 and expected body', async () => {
    const pickNumber = '01 20 50 05 10 20'
    const drawDate = '2021-10-31'

    const ticket = new Ticket(pickNumber, new TicketResult(true, 4000.5, '$4,000,50'))
    const expectedBody = new ResultLotteryTicket(
      drawDate,
      new TotalWon(ticket.getTicketResult().getValue(), ticket.getTicketResult().getValueFormatted()),
      [ticket]
    )

    const body = { draw_date: drawDate, picks: [pickNumber] }
    const res = mockResponse()

    PowerballService.getResults = jest.fn().mockImplementation(() => expectedBody)
    PowerballService.isAnInvalidPick = jest.fn().mockImplementation(() => false)

    await controller.checkResult(mockRequest(body), res)

    const bodyCaptured = res.json.mock.calls[0][0]

    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.status.mock.calls.length).toEqual(1)
    expect(bodyCaptured).toEqual(expectedBody)
  })

  test('Should return status code 400 and expected body If body is invalid', async () => {
    const expectedBody = new ApiResponse('Missing or invalid body')

    const body = null
    const res = mockResponse()

    const mockRequestOwn = (body) => {
      const req = {}
      req.body = body
      return req
    }

    await controller.checkResult(mockRequestOwn(body), res)

    const bodyCaptured = res.json.mock.calls[0][0]

    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status.mock.calls.length).toEqual(1)
    expect(bodyCaptured).toEqual(expectedBody)
  })

  test('Should return status code 400 and expected body if the draw date informed is invalid', async () => {
    const date = new Date().toJSON().split('T')[0]
    const expectedBody = new ApiResponse(
      `The date was not informed or is in invalid format. Date must be entered as year-month-day like: ${date}`
    )

    const invalidDrwaDates = [null, '', ' ', '2021', '2021_10_31', '2021/10/31', '20211031', 'any other string']

    for (const drawDate of invalidDrwaDates) {
      const body = { draw_date: drawDate, picks: ['01 20 50 05 10 20'] }
      const res = mockResponse()

      await controller.checkResult(mockRequest(body), res)

      const bodyCaptured = res.json.mock.calls[0][0]

      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(bodyCaptured).toEqual(expectedBody)
    }
  })

  test('Should return status code 400 and expected body if picks are in invalid formats', async () => {
    const expectedBody = new ApiResponse(
      "Informed picks were not informed or are invalid. The value bet must be 6-digit and not duplicated entered for each pick such as: \"01 20 03 45 05 10\""
    )

    const invalidPicks = [ null, '', ' ', '01', '01 20', '01 20 50', '01 20 50 05', '01 20 50 05 10', 'any other string']

    PowerballService.isAnInvalidPick = jest.fn().mockImplementation(() => true)

    const body = { draw_date: '2021-10-31', picks: invalidPicks }
    const res = mockResponse()

    await controller.checkResult(mockRequest(body), res)

    const bodyCaptured = res.json.mock.calls[0][0]

    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(bodyCaptured).toEqual(expectedBody)
  })

  test('Should return 500 and the expected body if an exception is thrown', async () => {
    const expectedBody = new ApiResponse('An internal error occurred, please try again later')

    const body = { draw_date: '2021-10-31', picks: ['01 20 50 05 10 20'] }
    const res = mockResponse()

    PowerballService.getResults = jest.fn().mockImplementation(() => {
      throw new Error('Generic Error')
    })

    PowerballService.isAnInvalidPick = jest.fn().mockImplementation(() => false)

    await controller.checkResult(mockRequest(body), res)

    const bodyCaptured = res.json.mock.calls[0][0]

    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(bodyCaptured.message).toEqual(expectedBody.message)
  })

  test('When an error captured is not ProcessingFailureException it must be logged.', async () => {
    const expectedErrorLogged = new Error('Generic Error')

    const body = { draw_date: '2021-10-31', picks: ['01 20 50 05 10 20'] }
    const res = mockResponse()

    PowerballService.getResults = jest.fn().mockImplementation(() => {
      throw expectedErrorLogged
    })

    PowerballService.isAnInvalidPick = jest.fn().mockImplementation(() => false)

    await controller.checkResult(mockRequest(body), res)

    const logger = jest.spyOn(Logger, 'error')

    const inputCaptured = logger.mock.calls[0][0]

    expect(logger.mock.calls.length).toEqual(1)
    expect(inputCaptured).toEqual(expectedErrorLogged)
  })
})
