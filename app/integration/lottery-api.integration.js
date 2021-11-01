const axios = require('axios')
const environment = require('../config/environment')
const HttpErrorException = require('../exceptions/http-error-exception')
const { LoterryApiResponse } = require('./models/loterry-api-response.model')

module.exports = class LotteryApi {
  /**
   * Method for returning lottery data from the government's public api
   *
   * @returns {LoterryApiResponse}
   */
  static async getLotteryResults() {
    const config = defaultConfig()
    const url = config.baseURL

    const response = await axios.get(url, config)

    const statusCode = response ? response.status : null
    const body = response ? response.data : null

    if (isUnsuccessfulRequest(statusCode)) throw new HttpErrorException(statusCode, body)

    return new LoterryApiResponse(body)
  }
}

/**
 * Method intended to return default request configuration for external service.
 * @returns {AxiosRequestConfig}
 */
const defaultConfig = () => {
  return {
    baseURL: environment.LOTTERY_API_URL,
    timeout: 3000,
  }
}

/**
 * Method intended to validate if statusCode received represents a success in the request.
 *
 * @param  {number} statusCode
 * @returns {boolean}
 */
const isUnsuccessfulRequest = (statusCode) => {
  return statusCode < 200 || statusCode > 300
}
