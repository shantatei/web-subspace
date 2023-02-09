import cypress from "cypress";

/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable {
            login(email: string, password: string): Chainable<void>
            signup(username: string, email: string, password: string, confirm_password: string): Chainable<void>
            logout(): Chainable<void>
            deleteAccount(): Chainable<void>
        }
    }
}

Cypress.Commands.add('login', (username, password) => {

    cy.contains('Login').click()

    cy.get('#loginform').within(() => {
        cy.get('input[name=email]').type(username)
        cy.get('input[name=password]').type(password)
        cy.contains('Log In').click()
    })

    cy.contains('Login Success').should('be.visible')
})

Cypress.Commands.add('signup', (username, email, password, confirm_password) => {

    cy.contains('Sign Up').click()

    cy.get('#signupform').within(() => {
        cy.get('input[name=username]').type(username)
        cy.get('input[name=email]').type(email)
        cy.get('input[name=password]').type(password)
        cy.get('input[name=password_confirmation]').type(confirm_password)
        cy.contains('Sign Up').click()
    })

    cy.contains('Account created.').should('be.visible')

})

Cypress.Commands.add('logout', () => {

    cy.get('#menu-button-authmenubtn').click();

    cy.contains('Log Out').click()

    cy.contains('Logout Success').should('be.visible')

})

Cypress.Commands.add('deleteAccount', () => {

    cy.get('#menu-button-authmenubtn').click();

    cy.contains('Settings').click()

    cy.get('#deleteaccform').within(() => {
        cy.get('input[name=password]').type("password")
    })

    cy.get('#deleteaccbtn').scrollIntoView()
    cy.get('#deleteaccbtn').click({ force: true })

    cy.contains('Your Account has been deleted').should('be.visible')

})


