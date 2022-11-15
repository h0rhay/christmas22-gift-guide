module.exports = {
  defaultWaitingTime: process.env.CODECEPT_DEFAULT_WAITING_TIME === 'undefined' ? 5 : Number.parseInt(process.env.CODECEPT_DEFAULT_WAITING_TIME, 10),
}