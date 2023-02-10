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

        cy.logout()
    })

    it('Delete Account', () => {

        cy.login("testuser@gmail.com", "password")

        cy.deleteAccount()

    })

})