describe('Test App', () => {

    it('only displays four options for dining hall field of the "Share your Experience" form', () => {
        cy.visit('/');
        cy.get('[data-cy=share-your-experience]').click();
        cy.get("[data-cy=dining-hall-dropdown]").click();
        cy.get(".css-5dpu79-MuiButtonBase-root-MuiMenuItem-root").should('have.length', 4);
    });

    it('displays a default time of "5 minutes" on each dining card', () => {
        cy.visit('/');
        const i = 0;
        const counter = [0,1,2,3]
        for(const i in counter){
            cy.get('.waittime').eq(i).invoke('text').then((text) => {
                if(parseInt(text) == 5){
                    cy.get(".waitlabel").eq(i).should('have.css', 'background-color').and('eq', 'rgb(121, 222, 121)');
                }
            })
        }
    });


});