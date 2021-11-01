/**
 * Method to check if the month informed is valid Between 0 and 11,
 * 0 being the first month of the year and 11 or 12 being the last month of the year
 *
 * @param  {string} month
 * @returns {boolean}
 */
const isValidMonth = (month) => !!month && (month > 0) && (month <= 12)

/**
 * Method to check if the day informed is valid Between 1 and 31,
 *
 * @param  {string} day
 * @returns {boolean}
 */
const isValidDay = (day) => !!day && day > 0 && day <= 31

/**
 * Method to build date from simplified date as string in like format: yyyy-MM-dd ("2021-10-31")
 *
 * @param  {string} dateAsString: "2021-10-31"
 * @returns {Date} date: instantiated date
 * @throw {Error} exception: if input entered is invalid or different from the specified format, an exception will be thrown
 */
const buildDateFrom = (dateAsString) => {
  if (!dateAsString) throw new Error('Date as string should be informed to build Date')

  const dateSplited = dateAsString.split('-')
  const year = Number.parseInt(dateSplited[0])
  const month = Number.parseInt(dateSplited[1])
  const day = Number.parseInt(dateSplited[2])

  if (year && isValidMonth(month) && isValidDay(day)) return new Date(year, month === 12 ? 11 : month, day)

  throw new Error(`date informed "${dateAsString}" is not in valid format (year-month-day).`)
}

/**
 * Method to format instances of date to date as string in format of type: yyyy-MM-dd ("2021-10-31")
 *
 * @param  {Date} date: instantiated date
 * @returns {string} dateAsString: "2021-10-31"
 * @throw {Error} exception: if input entered is invalid or different of the date, an exception will be thrown
 */
const formatDateWithoutTime = (date) => {
  if (date && date instanceof Date) return date.toJSON().split('T')[0]

  throw new Error(`Input entered not null or invalid`)
}

const DateUtil = {
  buildDateFrom,
  isValidMonth,
  isValidDay,
  formatDateWithoutTime,
}

module.exports = DateUtil
