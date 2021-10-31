// @ts-nocheck

const { mockRequest, mockResponse } = require('./util')
const controller = require('../../../app/controllers/health.controller')
const Health = require('../../../app/models/health.model')

jest.mock('../../../app/config/logger')
const Logger = require('../../../app/config/logger')

describe("Check method 'getHealth'", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return status code 200 and expected body', async () => {
    const expectedBody = new Health('ONLINE', new Date())

    const res = mockResponse()

    await controller.getHealth(mockRequest(), res)

    const bodyCaptured = res.json.mock.calls[0][0]

    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status.mock.calls.length).toEqual(1)
    expect(bodyCaptured.status).toEqual(expectedBody.status)
    expect(bodyCaptured.time).not.toBeUndefined()
  })

  test('Should return 500 and the expected body if an exception is thrown', async () => {
    const expectedBody = new Health('FAILED', new Date())
    const res = mockResponse()

    const mockImplementationsToThrowErrorWhenStatus200 = jest.fn().mockImplementation(statusCode => {
      if (statusCode === 200) throw new Error('Error')
      return res
    })

    res.status = mockImplementationsToThrowErrorWhenStatus200

    await controller.getHealth(mockRequest(), res)

    const bodyCaptured = res.json.mock.calls[0][0]

    expect(res.status).toHaveBeenCalledWith(500)
    expect(bodyCaptured.status).toEqual(expectedBody.status)
    expect(bodyCaptured.time).not.toBeUndefined()
  })

  test('When any error is captured it must be logged.', async () => {
    const res = mockResponse()
    const error = new Error('error message')

    const mockImplementationsToThrowErrorWhenStatus200 = jest.fn().mockImplementation(statusCode => {
      if (statusCode === 200) throw error
      return res
    })

    res.status = mockImplementationsToThrowErrorWhenStatus200

    await controller.getHealth(mockRequest(), res)

    const logger = jest.spyOn(Logger, 'error')

    const inputCaptured = logger.mock.calls[0][0]

    expect(logger.mock.calls.length).toEqual(1)
    expect(inputCaptured).toEqual(error)
  })
})
