import cypress from "cypress"

describe('Post', () => {

    beforeEach(() => {

        cy.visit('/')

    })

    it('Create Comment', () => {

        cy.openPostModal()

        cy.get('textarea[name=text]').type('cypress comments test')

        cy.contains('Comment').click()

        cy.contains('Comment has been posted').should('be.visible')

    })

    it('Edit Comment', () => {

        cy.openPostModal()

        cy.get('.css-kw64cx > :nth-child(1)').within(() => {
            cy.get('.commentsmenu').click()
        })

        cy.contains('Edit').click()

        cy.get('.css-kw64cx > :nth-child(1)').within(() => {
            cy.get('textarea[name=text]').clear().type('cypress comments updated test')
            cy.contains('Save').click()
        })

        cy.contains('Comment has been updated').should('be.visible')

    })

    it('Delete Comment', () => {

        cy.openPostModal()

        cy.get('.css-kw64cx > :nth-child(1)').within(() => {
            cy.get('.commentsmenu').click()
        })

        cy.contains('Delete').click()

        cy.contains('Save').click()

        cy.contains('Your Comment has been deleted').should('be.visible')

    })

})