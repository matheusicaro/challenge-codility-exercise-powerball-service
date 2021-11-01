const ApiErrorResponse = require('../models/api-error-response.model')
const Logger = require('../config/logger')

const { MESSAGES } = require('../constants')

class NotFoundController {
  /**
   * Funtion to return not found status
   *
   * @param  {Request} req
   * @param  {Response} res
   * @returns {Promise<ApiResponse> | Promise<ApiErrorResponse>}
   */
  static getNotFound(req, res) {
    try {
      return res.status(404).json(new ApiErrorResponse(`No resource requested for the path: ${req.url}`))
    } catch (error) {
      Logger.error(error)
      return res.status(500).json(new ApiErrorResponse(MESSAGES.INTERNAL_ERROR))
    }
  }
}

module.exports = NotFoundController
