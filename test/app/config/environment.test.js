describe('environment.js', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'production'
    process.env.HOST_NAME = 'localhost'
    process.env.BASE_PATH = '/api/v1'
    process.env.PORT = '8080'
  })

  test('Should return the values from process.env', async () => {
    const environment = require('../../../app/config/environment')

    expect(environment.NODE_ENV).toEqual(process.env.NODE_ENV)
    expect(environment.HOST_NAME).toEqual(process.env.HOST_NAME)
    expect(environment.BASE_PATH).toEqual(process.env.BASE_PATH)
    expect(environment.PORT).toEqual(parseInt(process.env.PORT || ''))
  })
})
