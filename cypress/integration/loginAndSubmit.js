describe('login without being authenticated', () => {
    
    beforeEach(() => {
        cy.visit('/')
    })
    
    it('should click ingredient button', () => {
        //adding ing
        cy.get('.BuildControl_More__2jyEK')
            .first()
            .click()

        //click order now button
        cy.get('.BuildControls_OrderButton__3rncB')
            .click()
        
        //Enter email and password 
        cy.get('.Input_inputElement__THEmZ')
            .first()
            .type('yazan@test.com')
        
        cy.get('.Input_inputElement__THEmZ')
            .last()
            .type('123456')
        
        //change to sign in 
        cy.get('.button_Danger__3dxj9')
            .first()
            .click()

        //submit the form 
        // cy.server()
        cy.get('.button_Button__3cAgT')
            .first()
            .click()
        
        cy.url().should('include', '/Checkout')

        cy.get('.button_Success__23eTu')
            .click()
        
        cy.get('.Input_inputElement__THEmZ')
            .eq(0)
            .type('hello1')
        cy.get('.Input_inputElement__THEmZ')        
            .eq(1)
            .type('hello2')
        cy.get('.Input_inputElement__THEmZ')        
            .eq(2)
            .type('hello3')  
        cy.get('.Input_inputElement__THEmZ')  
            .eq(3)
            .type('hello4')
        cy.get('.Input_inputElement__THEmZ')  
            .eq(4)
            .type('hello4@4.com')

     
        cy.get('form').find('.button_Button__3cAgT').click()
    })

}) 