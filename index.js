const expressApp = require('./app/app')

process.on('unhandledRejection', error => {
  console.error(error)
  process.exit(1)
})

process.on('uncaughtException', error => {
  console.error(error)
  process.exit(1)
})

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

const httpServer = expressApp.listen(expressApp.get('port'), () => {
  console.log(`Server started on ${expressApp.get('host') || 'http://localhost:'}:${expressApp.get('port')}`)
  console.log(`environment: ${expressApp.get('env')}`)
})

function shutdown() {
  httpServer.close()
  console.log('\nApp shutdown')
  process.exit(0)
}