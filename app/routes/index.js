const express = require('express')
const NotFoundController = require('../controllers/notfound.controller')
const HealthController = require('../controllers/health.controller')

const router = express.Router()

router.get('/health', HealthController.getHealth)


// Fall Through Route
router.use(NotFoundController.getNotFound)

module.exports = router