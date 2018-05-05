module.exports = function createStore() {

  const tables = {
    customer: {
      1: { name: 'John' },
      2: { name: 'Mattias' },
      3: { name: 'Kim' },
    },
    food: {
      1: [ 'cake', 'waffle' ],
      2: [ 'coffee' ],
      3: [ 'apple', 'carrot' ],
    }
  }

  return {
    get: (table, id) => delay(50).then(() => tables[table][id])
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}