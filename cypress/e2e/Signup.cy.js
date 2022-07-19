const { cyan } = require("@mui/material/colors");
const { RowDescriptionMessage } = require("pg-protocol/dist/messages");

describe('Signup', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('login_url'))
        cy.contain('Sign Up').click()
    })
})