import cypress from "cypress"

describe('Post', () => {

    beforeEach(() => {

        cy.visit('/')
        cy.intercept('/api/showPosts').as('getPost')
        cy.intercept('/api/showCommunity').as('getCommunity')

        cy.wait(['@getPost', '@getCommunity'])
    })

    it('Open/Close Post Modal', () => {

        cy.get('.css-1jtpjgy > :nth-child(1) > .chakra-card__body').click()
        cy.get('.chakra-modal__close-btn').click()
    })
    
})