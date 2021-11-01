/**
 * Method to check if the month informed is valid Between 0 and 11,
 * 0 being the first month of the year and 11 or 12 being the last month of the year
 *
 * @param  {string} month
 * @returns {boolean}
 */
const formatNumberToUSACurrency = (number) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format(number).split('.')[0]

const StringUtil = {
  formatNumberToUSACurrency
}

module.exports = StringUtil
