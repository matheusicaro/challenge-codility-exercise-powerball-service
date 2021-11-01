module.exports = {
  BASE_PATH: process.env.BASE_PATH || '',
  HOST_NAME: process.env.HOST_NAME,
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT || ''),
  LOTTERY_API_URL: process.env.LOTTERY_API_URL || ''
}
