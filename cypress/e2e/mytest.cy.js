require('dotenv').config();

describe('My First Test', () => {
  it('Visits HomePage', () => {
    cy.visit(`http://localhost:${process.env.TEST_PORT}`)
  })
})