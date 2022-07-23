describe('My Trips', () => {
    before(() => {
        cy.visit(Cypress.env('login_url'))
        cy.login()
       
    })
//this test doesn't work
    // it('new trip requires data', () => {
    //     cy.contains("Add a new trip").click()
    //     cy.get('[data-test=trip_submit]').click()
    //     cy.contains('Trip added unsuccessfully')
  
    // })

    //This test works but because it adds a trips, want to add delete functionality so we don't have a million entries of the same thing
    // it('adds new trips', () => {
    //     cy.contains("Add a new trip").click()
    //     cy.get('[data-test=trip_name]').type("Florida Trip")
    //     cy.get('[data-test=description]').type("Fun in Sun")
    //     cy.get('[data-test=destination]').type('Orlando')
    //     cy.get('[data-test=start_date]').type('08/25/2025')
    //     cy.get('[data-test=end_date]').type('09/05/2025')
    //     cy.get('[data-test=trip_submit]').click()
    //     cy.contains('Trip added successfully')
    //     cy.reload()
    // })

//this test doesn't work
    // it('signs out', () => {
    //     cy.get('[test-data=navbar_signout]').click()
    //     cy.contains('Ready to Travel? Sign Up')
    // })

    it('renders upcoming trips', () => {
        cy.get('[test-data=upcoming_trips]')
    })

    it('renders past trips', () => {
        cy.get('[test-data=past_trips]')
    })

    //need to delete from database test
})