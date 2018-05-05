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
    get: (table, id) => tables[table][id]
  }
}