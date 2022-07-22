describe('My Trips', () => {
    before(() => {
        cy.visit(Cypress.env('login_url'))
        cy.login()
       
    })
//need to fix re
    it('new trip requires data', () => {
        cy.contains("Add a new trip").click()
        cy.get('[data-test=trip_submit]').click()
        cy.contains('Trip added unsuccessfully')
        cy.reload()
    })

    it('adds new trips', () => {
        cy.contains("Add a new trip").click()
        cy.get('[data-test=trip_name]').type("Florida Trip")
        cy.get('[data-test=description]').type("Fun in Sun")
        cy.get('[data-test=destination]').type('Orlando')
        cy.get('[data-test=start_date]').type('08/25/2025')
        cy.get('[data-test=end_date]').type('09/05/2025')
        cy.get('[data-test=trip_submit]').click()
        cy.contains('Trip added successfully')
    })

    it('signs out', () => {
        cy.get('Signout').click()
        cy.contains('Ready to Travel? Sign Up')
    })
})