/* globals cy */

describe('Test App', () => {


    it('submit disabled when share your experience', () => {
        cy.visit('/');
        cy.get('[data-cy=share-your-experience]').click();
        cy.get('[data-cy=submit-button]').should('be.disabled');
    });

    it('shows form when share your experience button is pressed', () => {
        cy.visit('/');
        cy.get('[data-cy=share-your-experience]').click();
        cy.get("[data-cy=dining-hall-dropdown]").click();
        cy.get("[data-cy=click-on-allison]").click();
        cy.get("[data-cy=wait-time-typing").type("3");
        cy.get('[data-cy=submit-button]').click();
    });

});