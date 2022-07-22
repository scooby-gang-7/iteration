describe('My Trips', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('login_url'))
        cy.login()
    })

    it('signs out', () => {
        cy.contains('Signout').click()
        cy.contains('Ready to Travel? Sign Up')
    })

    it('new trip requires data', () => {
        cy.contains("Add a new trip").click()
        cy.get('[data-test=trip_submit]').click()
        cy.contains('Trip added unsuccessfully')
    })

    it('adds new trips', () => {
        cy.contains("Add a new trip").click()
        cy.get('[data-test=trip_name]').type("Family Visit")
        cy.get('[data-test=description]').type("Mountain Fun")
        cy.get('[data-test=destination]').type('Denver')
        cy.get('[data-type=start_date]').type('08/25/2034')
        cy.get('[data-type=end_data]').type('09/05/2034')
        cy.get('[data-test=trip_submit]').click()
        cy.contains('Trip added sucessfully')
    })
})