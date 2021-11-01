/**
 * Represents the result loterry ticket.
 * @constructor
 * @param @type {string} drawDate - draw date as string in yyyy-MM-dd format
 * @param @type {TotalWon} totalWon - Total obtained with winning ticks
 * @param @type {Array.<Ticket>} tickets - Tickets validated
 */
class ResultLotteryTicket {
  constructor(drawDate, totalWon, tickets) {
    this.drawDate = drawDate
    this.totalWon = totalWon && new TotalWon(totalWon.value, totalWon.valueFormatted)
    this.tickets = tickets
  }

  getTotalWon() {
    return this.totalWon
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
    this.valueFormatted = valueFormatted
  }

  getValue() {
    return this.value
  }

  getValueFormatted() {
    return this.valueFormatted
  }

  setValueFormatted(valueFormatted) {
    this.valueFormatted = valueFormatted
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
    this.result = ticketResult && new TicketResult(ticketResult.won, ticketResult.value, ticketResult.valueFormatted)  }

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
    this.valueFormatted = valueFormatted
  }

  getWon() {
    return this.won
  }

  getValue() {
    return this.value
  }

  getValueFormatted() {
    return this.valueFormatted
  }
}

module.exports = {
  ResultLotteryTicket,
  TotalWon,
  Ticket,
  TicketResult,
}
