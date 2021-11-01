const DateUtil = require('../../../app/utils/date.util')

describe('date.util.js', () => {
  describe('DateUtil.isValidMonth', () => {
    test('Should return true for months', () => {

      for (let month=1; month <= 12; month++) expect(DateUtil.isValidMonth(month)).toBe(true)

    })

    test('Should return false for invalid months', () => {
      const invalidMonths = [null, NaN, undefined, 0, '22312', -1]

      for (const month of invalidMonths) expect(DateUtil.isValidMonth(month)).toBe(false)
    })
  })

  describe('DateUtil.isValidDay', () => {
    test('Should return true for days', () => {

      for (let day=1; day <= 31; day++) expect(DateUtil.isValidDay(day)).toBe(true)
    })

    test('Should return false for invalid days', () => {
      const invalidDays = [null, NaN, undefined, 0, '22312', 32, 50, -1, -50]

      for (const day of invalidDays) expect(DateUtil.isValidDay(day)).toBe(false)
    })
  })

  describe('DateUtil.buildDateFrom', () => {
    test('Should return the date built from valid input', () => {
      const validInput = '2021-10-31'
      const returned = DateUtil.buildDateFrom(validInput)

      expect(returned.toJSON()).toBe(new Date(2021, 10, 31).toJSON())
    })

    test('should return expected exception for input invalid', () => {

      const invalidInputs = [null, undefined]

      for (const input of invalidInputs) {
        try {
          const returned = DateUtil.buildDateFrom(input)
          expect(returned).toBeUndefined() 
        } catch(error) {
          expect(error).not.toBeUndefined() 
          expect(error.message).toBe('Date as string should be informed to build Date') 
        }
      }
    })

    test('should return expected exception for input in different formats', () => {

      const invalidInputs = ['2021/10/31', '2021_10_31', '2021, 10, 31', 'any other string']

      for (const input of invalidInputs) {
        try {
          const returned = DateUtil.buildDateFrom(input)
          expect(returned).toBeUndefined() 
        } catch(error) {
          expect(error).not.toBeUndefined() 
          expect(error.message).toBe(`date informed "${input}" is not in valid format (year-month-day).`) 
        }
      }
    })
  })

  describe('DateUtil.formatDateWithoutTime', () => {
    test('Should return the date built from valid input', () => {
      const validInput = new Date(2021, 10, 31)
      const returned = DateUtil.formatDateWithoutTime(validInput)

      expect(returned).toBe('2021-12-01')
    })

    test('should return expected exception for input invalid', () => {

      const invalidInputs = [null, undefined, 'any other string', 50050, {}, true]

      for (const input of invalidInputs) {
        try {
          const returned = DateUtil.formatDateWithoutTime(input)
          expect(returned).toBeUndefined() 
        } catch(error) {
          expect(error).not.toBeUndefined() 
          expect(error.message).toBe('Input entered not null or invalid') 
        }
      }
    })
  })
})
