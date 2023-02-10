import cypress from "cypress"

describe('Post', () => {

    beforeEach(() => {

        cy.visit('/')

    })

    // it('Open/Close Post Modal', () => {
    //     cy.intercept('/api/showPosts').as('getPost')
    //     cy.intercept('/api/showCommunity').as('getCommunity')

    //     cy.wait(['@getPost', '@getCommunity'])

    //     cy.get('.css-1jtpjgy > :nth-child(1) > .chakra-card__body').click()
    //     cy.get('.chakra-modal__close-btn').click()
    // })

    it('Create Post', () => {
        cy.login('peacock@gmail.com', 'password')
        cy.get('#navbar').within(() => {
            cy.get('button[id=createpost]').click()
            cy.location().should((location) => {
                expect(location.pathname).to.eq('/createPost')
            })
        })

        //Choosing a Community
        cy.get('.css-17l0bha-control > .css-art2ul-ValueContainer2 > .css-4v1wqi-Input2').click().type('Valorant')
        cy.get('#react-select-3-option-0').click()
        //Input Fields
        cy.get('#createpostForm').within(() => {
            cy.get('input[name=title]').type("testing from cypress")
            cy.get('textarea[name=text]').type("cypress test :)")
            cy.get('button[type="submit"]').click();

        })

        cy.location('pathname').should('eq', '/')

    })

    it('Edit Post', () => {

        cy.intercept('/api/showPosts').as('getPost')
        cy.intercept('/api/showCommunity').as('getCommunity')

        cy.wait(['@getPost', '@getCommunity'])

        cy.login('peacock@gmail.com', 'password')

        cy.get('.css-1jtpjgy > :nth-child(1) > .chakra-card__footer > button').click()

        cy.contains('Edit').click()

        cy.get('textarea[name=text]').type("Anya Test")
        cy.contains('Save').click()

        cy.contains('Post has been updated').should('be.visible')

    })

    it('Delete Post', () => {

        cy.intercept('/api/showPosts').as('getPost')
        cy.intercept('/api/showCommunity').as('getCommunity')

        cy.wait(['@getPost', '@getCommunity'])

        cy.login('peacock@gmail.com', 'password')

        cy.get('.css-1jtpjgy > :nth-child(1) > .chakra-card__footer > button').click()

        cy.contains('Delete').click()

        cy.contains('Save').click()

        cy.contains('Your Post has been deleted').should('be.visible')

    })

})