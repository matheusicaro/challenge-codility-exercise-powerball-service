const API = require('../../../app/integration/lottery-api.integration')
const exampleDataResponse = require('../json/example-response-lottery-api.json')

jest.mock('axios')
const axios = require('axios')

const { LoterryApiResponse } = require('../../../app/integration/models/loterry-api-response.model')
const HttpError = require('../../../app/exceptions/http-error-exception')
const environment = require('../../../app/config/environment')

describe("Check method 'getLotteryResults'", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return expected LoterryApiResponse in success case', async () => {
    const expected = new LoterryApiResponse(exampleDataResponse)

    axios.get = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({
          data: exampleDataResponse,
          status: 200,
        })
      })
    })

    const returned = await API.getLotteryResults()

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(returned).toEqual(expected)
  })

  test('Should return exception expected if request is not successful', async () => {
    const body = {}
    const status = 403

    const expected = new HttpError(status, body)

    axios.get = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({
          data: body,
          status,
        })
      })
    })

    try {
      await await API.getLotteryResults()
    } catch (error) {
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(error).toEqual(expected)
    }
  })

  test('Axios request should be called with expect configs', async () => {
    const expected = {
      baseURL: environment.LOTTERY_API_URL,
      timeout: 3000,
    }

    axios.get = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({
          data: exampleDataResponse,
          status: 200,
        })
      })
    })

    await await API.getLotteryResults()

    const axiosSpied = jest.spyOn(axios, 'get')

    const firstArgument = axiosSpied.mock.calls[0][0]
    const secondArgument = axiosSpied.mock.calls[0][1]

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(firstArgument).toEqual(expected.baseURL)
    expect(secondArgument).toEqual(secondArgument)
  })
})
