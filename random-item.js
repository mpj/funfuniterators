const randomNumber = require('random-number')

module.exports = function randomItem(array) {
  const randomIndex = randomNumber({
    min: 0,
    max: array.length - 1,
    integer: true
  })
  return array[randomIndex]
}