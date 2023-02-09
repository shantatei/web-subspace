import cypress from "cypress"

describe('Auth', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('Signup', () => {

        cy.signup('testuser', "testuser@gmail.com", "password", "password")
    })

    it('Login', () => {

        cy.login("testuser@gmail.com", "password")

    })

    it('Logout', () => {

        cy.login("testuser@gmail.com", "password")

        cy.get('#menu-button-authmenubtn').click();

        cy.contains('Log Out').click()

        cy.contains('Logout Success').should('be.visible')
    })

    it('Delete Account', () => {

        cy.login("testuser@gmail.com", "password")

        cy.get('#menu-button-authmenubtn').click();

        cy.contains('Settings').click()

        cy.get('#deleteaccform').within(() => {
            cy.get('input[name=password]').type("password")
        })

        cy.get('#deleteaccbtn').scrollIntoView()
        cy.get('#deleteaccbtn').click({force: true})

        cy.contains('Your Account has been deleted').should('be.visible')

    })

})


