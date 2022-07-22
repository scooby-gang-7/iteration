describe('Signup', () => {
  beforeEach(() => {
      cy.visit(Cypress.env('login_url'))
  })

  it('Links to /signup from Nav bar', () => {
      cy.contains('Sign Up').click()
      cy.url().should('include', '/signup')
      cy.get('[data-test=signup]').click()
      cy.contains('Signup unsuccessful')
  })

  it('requires firstname', () => {
      cy.contains('Ready to Travel? Sign Up').click()
      cy.get('[data-test=signup]').click()
      cy.contains('Signup unsuccessful')
    })

  it('requires lastname', () => {
      cy.contains('Ready to Travel? Sign Up').click()
      cy.get('[test-data=first_name]').type('katrina')
      cy.get('[data-test=signup]').click()
      cy.contains('Signup unsuccessful')
  })

  it('requires email', () => {
      cy.contains('Ready to Travel? Sign Up').click()
      cy.get('[test-data=first_name]').type('katrina')
      cy.get('[test-data=last_name]').type('test')
      cy.get('[data-test=signup]').click()
      cy.contains('Signup unsuccessful')
  })

  it('requires password', () => {
      cy.contains('Ready to Travel? Sign Up').click()
      cy.get('[test-data=first_name]').type('katrina')
      cy.get('[test-data=last_name]').type('test')
      cy.get('[test-data=signup_email]').type('taylor@codesmith.com')
      cy.get('[test-data=signup_password]').type('test')
      cy.get('[data-test=signup]').click()
      cy.contains('Signup unsuccessful')
  })
  it(('requires unique email'), () => {
      cy.contains('Ready to Travel? Sign Up').click()
      cy.get('[test-data=first_name]').type('katrina')
      cy.get('[test-data=last_name]').type('test')
      cy.get('[test-data=signup_email]').type('taylor@codesmith.com')
      cy.get('[test-data=signup_password]').type('test')
      cy.get('[data-test=signup]').click()
      cy.contains('Signup unsuccessful')
  })

  it('navigates to /trips on successful signup', () => {
      cy.contains('Ready to Travel? Sign Up').click()
      cy.get('[test-data=first_name]').type('katrina')
      cy.get('[test-data=last_name]').type('test')
      cy.get('[test-data=signup_email]').type('katrina@katrina.com')
      cy.get('[test-data=signup_password]').type('test')
      cy.get('[data-test=signup]').click()
      cy.url().should('include', '/mytrips')
  })

  //this is a specifc route for deleting the user created for testing purposes
  
  after(() => {
      cy.request({
          url:'/mytrips/api/auth/user',
          method: 'POST',
          body: {
              email: 'katrina@katrina.com'
          }
      })
      .its('body')
      .should('deep.contain', {"data":1 })
  })
})