import cypress from "cypress";
/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable {
            login(email: string, password: string): Chainable<void>
            signup(username: string, email: string, password: string, confirm_password: string): Chainable<void>
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


