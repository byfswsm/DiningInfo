/* globals cy */

describe('Menu Tests', () => {

    it('Share Menu Buttons Exist', () => {
        cy.visit('/');
        cy.get('[data-cy=menu-Allison]').should('contain','Full Menu');
        cy.get('[data-cy=menu-Sargent]').should('contain','Full Menu');
        cy.get("[data-cy=menu-Plex-West]").should('contain','Full Menu');
        cy.get('[data-cy=menu-Elder]').should('contain','Full Menu');
    });

    it('Clicking share menu button opens menu modal', () => {
        cy.visit('/');
        cy.get('[data-cy=menu-Allison]').click();
    });

    it('Menu shows correct items for all three meals', () => {
        const now = new Date(2023, 2, 1);
        cy.clock(now, ['Date']);
        // this.clock.setSystemTime(now);
        cy.visit('/');
        cy.get('[data-cy=menu-Allison]').click();
        cy.get('[data-cy=Spiced-Lentil-Kale-and-Potato-Hash]').should('contain','Spiced Lentil Kale and Potato Hash');
        cy.get('[data-cy=Lunch]').click();
        cy.get('[data-cy=BBQ-Chicken-Quarter').should('contain','BBQ Chicken Quarter');
        cy.get('[data-cy=Dinner]').click();
        cy.get('[data-cy=Steamed-Herbed-Zucchini]').should('contain','Steamed Herbed Zucchini');
    });

    it('shows form when share your experience button is pressed', () => {
        cy.visit('/');
        cy.get('[data-cy=share-your-experience]').click();
        cy.get('[data-cy=dining-hall-question]').should('contain', 'Which dining hall did you go to?');
    });

});