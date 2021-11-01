const Health = require('../models/health.model')
const Logger = require('../config/logger')

class HealthController {
  /**
   * Method to return health status
   *
   * @param  {Request} req
   * @param  {Response} res
   * @returns {Promise<Health>}
   */
  static getHealth(req, res) {
    try {
      return res.status(200).json(new Health('ONLINE', new Date()))
    } catch (error) {
      Logger.error(error)
      return res.status(500).json(new Health('FAILED', new Date()))
    }
  }
}

module.exports = HealthController
