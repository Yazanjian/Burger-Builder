describe('login without being authenticated', () => {
    
    beforeEach(() => {
        cy.visit('/')

        cy.server()
        cy.route({
            method: 'GET',      // Route all GET requests
            url: '**/ingredients.json',    // that have a URL that matches '/users/*'
        }).as('ingredientsRequest')
        // cy.wait('@ingredientsRequest')

        // expect(true).to.eq(true)
       
    })
    
    it('should click ingredient button', () => {
        //adding ing
        // cy.get('.BuildControl_More__2jyEK')
        //     .first()
        //     .click()
        cy.wait(1000)

        cy.get('[data-test="Salad-more"]')
        .click()

        // cy.wait(1000)
       

        //click order now button
        cy.get('.BuildControls_OrderButton__3rncB')
        .should('not.be', 'disabled')
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

        //click continue button 
        cy.get('.button_Success__23eTu')
            .click()
        
        //fill the fields with data
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

        // find the order button in the form then click it to send the  data to server 
        cy.get('form').find('.button_Button__3cAgT').click()
    })


}) 