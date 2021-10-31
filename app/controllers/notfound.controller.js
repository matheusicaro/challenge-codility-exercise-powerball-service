const ApiResponse = require('../models/api-response.model')
const Logger = require('../config/logger')

const {INTERNAL_ERROR} = require('../constants')

/**
 * Funtion to return not found status
 *
 * @param  {Request} req
 * @param  {Response} res
 * @returns Promise<ApiResponse>
 */
function getNotFound(req, res) {
  try {
    return res.status(404).json(new ApiResponse(`No resource requested for the path: ${req.url}`))
  } catch (error) {
    Logger.error(error)
    return res.status(500).json(new ApiResponse(INTERNAL_ERROR))
  }
}

const NotFoundController = {
  getNotFound,
}

module.exports = NotFoundController