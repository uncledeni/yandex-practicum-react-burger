describe('Trace to Registration page', () => {
  
  it('should open modal for all ingredients and close it', () => {
    // cy.prepare('uncledeni@yandex.ru', 'qweqweqwe');
    cy.visit('http://localhost:3000');
    cy.visit('http://localhost:3000/profile');
    
    // cy.intercept('POST', 'auth/login', {fixture: 'login'});S
    
    cy.intercept({ method: "GET", url: "ingredients" }, { fixture: "ingredients.json" }).as('getIngredients');
    
    
    
    // cy.wait('@getIngredients');
    // cy.get('[class^=style_ingredientElemContent]').first().click();
    // cy.get('[data-testid=close-modal-span]').click();
    // cy.get('button').contains('Оформить заказ').click();
    
    cy.get('[data-testid=email-input]').type(`uncledeni@yandex.ru`);
    cy.get('[data-testid=password-input]').type(`qweqweqwe`);
    cy.get('[data-testid=submit-button]').type(`{enter}`);
    cy.intercept({ method: 'POST', url: 'auth/login' }, { fixture: 'login.json' }).as('postLogin');
    cy.visit('http://localhost:3000');
    cy.get('[class^=style_ingredientElemContent]').first().trigger('dragstart');
    cy.get('[class^=style_constructorComponentContainer]').trigger('drop');
    cy.get('button').contains('Оформить заказ').click();
    // cy.intercept({ method: 'POST', url: 'order' }, { fixture: 'order.json' });

    // cy.get('[class^=style_ingredientElemContent]').each(($el) => {
    // cy.wrap($el).click();
    // cy.wrap($el).trigger('dragstart');
    // cy.get('[class^=style_constructorComponentContainer]').trigger('drop');
    // });
  });
})