
describe('Homepage', () => {
  beforeEach(() => {
    //cy.visit(Cypress.env('login_url'))
  })

    it('greets with Login', () => {
      cy.contains('Login')
    })

    it('links to /signup', () => {
      cy.contains('Sign Up')
      cy.should('have.attr', 'href', '/signup')
    })

    it ('requires email', () => {
      cy.get('form').get('[class=loginButton]').click()
      cy.contains('Invalid email or password.')
    })

    it ('requires password', () => {
      cy.get('[data-test=email]').type('taylor@codesmith.com{enter}')
    })

    it('navigates to /trips on sucessful login', () => {
      
    })
   
})