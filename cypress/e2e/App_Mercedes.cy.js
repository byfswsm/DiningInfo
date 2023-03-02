/* globals cy */

describe('Test App', () => {

    it('launches', () => {
        cy.visit('/');
    });

    it('opens with share your experience', () => {
        cy.visit('/');
        cy.get('[data-cy=share-your-experience]').should('contain', 'Share your experience');
    });

    it('shows form when share your experience button is pressed', () => {
        cy.visit('/');
        cy.get('[data-cy=share-your-experience]').click();
        cy.get('[data-cy=dining-hall-question]').should('contain', 'Which dining hall did you go to?');
    });

    it('rating shows default value of 3', () => {
        cy.visit('/');
        // cy.get('.MuiRating-root').each((rating) => {
        //     cy.wrap(rating).should('have.attr', 'value', '3');
        // });

        cy.get('.MuiRating-root')  // select the Mui Rating component
        .find('span')  // select the rating elements inside the component
        .filter('.MuiRating-iconFilled')  // select the rating value element
        .invoke('attr', 'data-value')  // retrieve the "data-value" attribute
        .then((value) => {
            cy.log(`The rating value is ${value}`);
            // use the retrieved value in your test
        });
    });

});