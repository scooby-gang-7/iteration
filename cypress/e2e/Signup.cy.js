describe('Signup', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('login_url'))
        cy.contain('Sign Up').click()
    })
})