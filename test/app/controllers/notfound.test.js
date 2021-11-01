// @ts-nocheck

const { mockRequest, mockResponse } = require('./util')
const controller = require('../../../app/controllers/notfound.controller')
const ApiResponse = require('../../../app/models/api-error-response.model')

jest.mock('../../../app/config/logger')
const Logger = require('../../../app/config/logger')

describe("Check method 'getNotFound'", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return status code 404 and message when function is called', async () => {
    const url = '/url-not-valid/here/test'
    const expectedBody = new ApiResponse(`No resource requested for the path: ${url}`)

    const res = mockResponse()

    await controller.getNotFound(mockRequest(null, url), res)

    const bodyCaptured = res.json.mock.calls[0][0]

    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.status.mock.calls.length).toEqual(1)
    expect(bodyCaptured.message).toEqual(expectedBody.message)
  })

  test('Should return 500 and the expected body if an exception is thrown', async () => {
    const expectedBody = new ApiResponse('An internal error occurred, please try again later')
    const res = mockResponse()

    const mockImplementationsToThrowErrorWhenStatus404 = jest.fn().mockImplementation(statusCode => {
      if (statusCode === 404) throw new Error('Error')
      return res
    })

    res.status = mockImplementationsToThrowErrorWhenStatus404

    await controller.getNotFound(mockRequest(), res)

    const bodyCaptured = res.json.mock.calls[0][0]

    expect(res.status).toHaveBeenCalledWith(500)
    expect(bodyCaptured.status).toEqual(expectedBody.status)
  })

  test('When any error is captured it must be logged.', async () => {
    const res = mockResponse()
    const error = new Error('error message')

    const mockImplementationsToThrowErrorWhenStatus404 = jest.fn().mockImplementation(statusCode => {
      if (statusCode === 404) throw error
      return res
    })

    res.status = mockImplementationsToThrowErrorWhenStatus404

    await controller.getNotFound(mockRequest(), res)

    const logger = jest.spyOn(Logger, 'error')

    const inputCaptured = logger.mock.calls[0][0]

    expect(logger.mock.calls.length).toEqual(1)
    expect(inputCaptured).toEqual(error)
  })
})
