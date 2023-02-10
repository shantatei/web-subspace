import cypress from "cypress"

describe('Post', () => {

    beforeEach(() => {

        cy.visit('/')

    })

    it('Create Community', () => {
        cy.login('peacock@gmail.com', 'password')

        cy.get('#homefeed').within(() => {
            cy.get('button[id=createCommunity]').click()
        })

        cy.get('#createCommunityForm').within(() => {
            cy.get('input[name=name]').type("cypress community")
            cy.get('input[name=about]').type("cypress test :)")
            cy.get('button[type="submit"]').click();

        })

        cy.contains('Your Community has been created!').should('be.visible')

    })

    it('Edit & Delete Community', () => {

        cy.intercept('/api/communityByUserId/**').as('getCommunity')
        cy.intercept('/api/usersInCommunity/**').as('getUsers')

        cy.login('peacock@gmail.com', 'password')

        cy.get('#menu-button-authmenubtn').click();

        cy.contains('Profile').click()

        cy.contains('Communities').click()

        cy.wait(5000)

        cy.wait(['@getCommunity', '@getUsers']).then(() => {
            cy.get(':nth-child(2) > :nth-child(1) > .css-hpdc46 > .css-qbquqd > .css-152xqq4').click()
        })

        cy.wait(5000)

        cy.wait('@getUsers').then(() => {
            cy.get('.community-menu-btn').click()
        })

        cy.contains('Edit').click()

        cy.get('#editcommunityform').within(() => {
            cy.get('input[name=name]').clear().type("cypress community updated")
            cy.get('input[name=about]').clear().type("cypress test updated :)")
            cy.get('button[type="submit"]').click();
        })

        cy.contains('Your Community has been updated!').should('be.visible')

        cy.get('.community-menu-btn').click()

        cy.contains('Delete').click()

        cy.contains('Save').click()

        cy.contains('Your Community has been deleted').should('be.visible')
    })

    it('Join Community', () => {

        cy.login('peacock@gmail.com', 'password')

        cy.get('#communityfeed').within(() => {
            cy.get(':nth-child(1) > .css-1lekzkb').click()
        })

        cy.contains('Join', {
            timeout: 10000
        }).should('be.enabled').click();

        cy.contains('Successfully joined').should('be.visible')
    })

    it('Leave Community', () => {

        cy.login('peacock@gmail.com', 'password')

        cy.get('#communityfeed').within(() => {
            cy.get(':nth-child(1) > .css-1lekzkb').click()
        })

        cy.contains('Joined', {
            timeout: 10000
        }).should('be.enabled').click();

        cy.contains('Successfully left').should('be.visible')
    })

})