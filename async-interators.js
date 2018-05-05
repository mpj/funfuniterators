const createStore = require('./fake-store-async')

const store = createStore()

const customers = {
  [Symbol.iterator]: function() {
    let i = 0
    return {
      next: async function() {
        i++
        const customer = await store.get('customer', i)

        if (!customer) {
          return { done: true }
        }

        customer.foods = await store.get('food', i)
        return {
          value: customer,
          done: false
        }
      }
    }
  }
}

;(async function() {
  const iterator = customers[Symbol.iterator]()
  const customer1 = (await iterator.next()).value //?
  const customer2 = (await iterator.next()).value //?
  const customer3 = (await iterator.next()).value //?
/*
  for await (const customer of customers) {
    customer //?
  }*/
})()
