const randomItem = require('./random-item')

module.exports = () => {
  const dragonSizes = [ 'big', 'medium', 'tiny' ]
  const dragonAbilities = [ 'time', 'fire', 'ice', 'lightning']
  return  randomItem(dragonSizes) + ' ' +
          randomItem(dragonAbilities) + ' ' +
          ' dragon'
}