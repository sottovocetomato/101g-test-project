const { faker } = require('@faker-js/faker');
const { fakerRU } = require('@faker-js/faker');

function generateData(id) {
  const typeIsIncome = faker.datatype.boolean()
  const type = typeIsIncome
      ? "income"
      : "expense"

  return {
    "id": id + 1,
    "date": fakerRU.date.recent({ days: 10 }).toISOString().slice(0, 10).replace(/-/g, '-'),
    "type": type,
    "amount": faker.finance.amount(),
    "description": fakerRU.finance.transactionDescription()
  }
}


module.exports = () => {
  const data = { transactions: [] }
  for (let i = 0; i < 60; i++) {
    data.transactions.push(generateData(i))
  }
  return data
}
