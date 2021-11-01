const MESSAGES = {
  INVALID_BODY: 'Missing or invalid body',
  NOT_FOUND: 'Not found data for parameters informed',
  INTERNAL_ERROR: 'An internal error occurred, please try again later',
  EXTERNAL_ERROR: 'Failed to request data in an external service',

  DRAW_DATE_NOT_FOUND: 'No draw result found for the DrawDate informed: ',
  INVALID_INPUT_DRAW_DATE: 'The date was not informed or is in invalid format. Date must be entered as year-month-day like:',
  INVALID_INPUT_PICKS:
    'Informed picks were not informed or are invalid. The value bet must be 6-digit and not duplicated entered for each pick such as: "01 20 03 45 05 10"',
}

const POWERBALL_PRIZES = {
  FIRST_PRIZE: {
    VALUE_AS_NUMBER: 0,
    VALUE_FORMATTED: 'Grand Prize',
    TOTAL_MATCH_WHITE_BALL: 5,
    REQUIRED_MATCH_RED_BALL: true,
  },

  SECOND_PRIZE: {
    VALUE_AS_NUMBER: 1000000,
    VALUE_FORMATTED: '$1,000,000',
    TOTAL_MATCH_WHITE_BALL: 5,
    REQUIRED_MATCH_RED_BALL: false,
  },

  THIRD_PRIZE: {
    VALUE_AS_NUMBER: 50000,
    VALUE_FORMATTED: '$50,000',
    TOTAL_MATCH_WHITE_BALL: 4,
    REQUIRED_MATCH_RED_BALL: true,
  },

  FOURTH_PRIZE: {
    VALUE_AS_NUMBER: 100,
    VALUE_FORMATTED: '$100',
    TOTAL_MATCH_WHITE_BALL: 4,
    REQUIRED_MATCH_RED_BALL: false,
  },

  FIFTH_PRIZE: {
    VALUE_AS_NUMBER: 100,
    VALUE_FORMATTED: '$100',
    TOTAL_MATCH_WHITE_BALL: 3,
    REQUIRED_MATCH_RED_BALL: true,
  },

  SIXTH_PRIZE: {
    VALUE_AS_NUMBER: 7,
    VALUE_FORMATTED: '$7',
    TOTAL_MATCH_WHITE_BALL: 3,
    REQUIRED_MATCH_RED_BALL: false,
  },

  SEVENTH_PRIZE: {
    VALUE_AS_NUMBER: 7,
    VALUE_FORMATTED: '$7',
    TOTAL_MATCH_WHITE_BALL: 2,
    REQUIRED_MATCH_RED_BALL: true,
  },

  EIGHTH_PRIZE: {
    VALUE_AS_NUMBER: 4,
    VALUE_FORMATTED: '$4',
    TOTAL_MATCH_WHITE_BALL: 1,
    REQUIRED_MATCH_RED_BALL: true,
  },

  NINETH_PRIZE: {
    VALUE_AS_NUMBER: 4,
    VALUE_FORMATTED: '$4',
    TOTAL_MATCH_WHITE_BALL: 0,
    REQUIRED_MATCH_RED_BALL: true,
  },
}

module.exports = {
  MESSAGES,
  POWERBALL_PRIZES,
}
