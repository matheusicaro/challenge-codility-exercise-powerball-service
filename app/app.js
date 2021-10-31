require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const swaggerUI = require('swagger-ui-express')
const swaggerDocs = require('./swagger.json')

const env = require('./config/environment')

const routes = require('./routes')

const corsOptions = {
  allowedHeaders: ['Content-Type'],
  methods: ['GET', 'POST'],
}

// Create Express App
const app = express()

swaggerDocs.host = env.NODE_ENV === 'production' ? `${env.HOST_NAME}` : `${env.HOST_NAME}:${env.PORT}`

app.set('env', env.NODE_ENV)
app.set('port', env.PORT)
app.set('host', env.HOST_NAME)

app.use(cors(corsOptions))
app.use(express.json())
app.use(morgan('common'))

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use(env.BASE_PATH, routes)

module.exports = app
