describe('is the server on', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('runs and start all good', () => {    
        cy.focused()
            .should('have.class' , 'para')
    });

    it('has input element', () => {
        const typedText = 'test1';
        cy.get('.para')
            .type(typedText)
            .should('have.value', typedText)
    })

    it('shows the title', () => {
        cy.get('.titleBurger')
            .should('be.visible')
    })

    it('show modal', () => {
        cy.get('.justToTestPress')
            .click()
    })

    it.only('adding salad', () => {
        cy.get('.BuildControl_More__2jyEK')
            .click('{multiple:true}')
    })

})