/**
 * Represents the result loterry ticket.
 * @constructor
 * @param @type {string} drawDate - draw date as string in yyyy-MM-dd format
 * @param @type {TotalWon} totalWon - Total obtained with winning ticks
 * @param @type {Array.<Ticket>} tickets - Tickets validated
 */
class ResultLotteryTicket {
  constructor(drawDate, winningNumbers, totalWon, tickets) {
    this.draw_date = drawDate
    this.winning_numbers = winningNumbers
    this.total_won = totalWon && new TotalWon(totalWon.getValue(), totalWon.getValueFormatted())
    this.tickets = tickets
  }

  getTotalWon() {
    return this.total_won
  }

  getTickets() {
    return this.tickets
  }
}

/**
 * Represents the total total won in awards
 * @constructor
 * @param @type {number} value - Prize value obtained
 * @param @type {string} valueFormatted - Prize value obtained formatted in specified currency
 */
class TotalWon {
  constructor(value, valueFormatted) {
    this.value = value
    this.value_formatted = valueFormatted
  }

  getValue() {
    return this.value
  }

  getValueFormatted() {
    return this.value_formatted
  }
}

/**
 * Represents the ticket with the number played and the evaluated result
 * @constructor
 * @param @type {string} pick - Number played
 * @param @type {TicketResult} ticketResult - Ticket result for the picked game
 */
class Ticket {
  constructor(pick, ticketResult) {
    this.pick = pick
    this.result = ticketResult && new TicketResult(ticketResult.getWon(), ticketResult.getValue(), ticketResult.getValueFormatted())
  }

  getPick() {
    return this.pick
  }

  getTicketResult() {
    return this.result
  }
}

/**
 * Represents the result of the ticket with the values if awarded
 * @constructor
 * @param @type {boolean} won - Ticket is awarded
 * @param @type {number} value - Prize value obtained
 * @param @type {string} valueFormatted - Prize value obtained formatted in specified currency
 */
class TicketResult {
  constructor(won, value, valueFormatted) {
    this.won = won
    this.value = value
    this.value_formatted = valueFormatted
  }

  getWon() {
    return this.won
  }

  getValue() {
    return this.value
  }

  getValueFormatted() {
    return this.value_formatted
  }
}

module.exports = {
  ResultLotteryTicket,
  TotalWon,
  Ticket,
  TicketResult,
}
