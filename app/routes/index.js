const express = require('express')
const NotFoundController = require('../controllers/notfound.controller')
const HealthController = require('../controllers/health.controller')
const PowerballController = require('../controllers/powerball.controller')

const router = express.Router()

router.get('/health', HealthController.getHealth)
router.get('/powerball/check/result', PowerballController.checkResult)

// Fall Through Route
router.use(NotFoundController.getNotFound)

module.exports = router