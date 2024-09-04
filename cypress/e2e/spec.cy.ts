describe('Trace to Registration page', () => {

  it('should open modal for all ingredients and close it', () => {
    cy.visit('http://localhost:3000');
    cy.visit('http://localhost:3000/profile');

    cy.intercept({ method: "GET", url: "ingredients" }, { fixture: "ingredients.json" }).as('getIngredients');
    cy.visit('http://localhost:3000');
    cy.get('[class^=style_ingredientElemContent]').first().trigger('dragstart');
    cy.get('[class^=style_constructorComponentContainer]').trigger('drop');
    cy.get('button').contains('Оформить заказ').click();

    cy.get('[data-testid=email-input]').type(`uncledeni@yandex.ru`);
    cy.get('[data-testid=password-input]').type(`qweqweqwe`);
    cy.get('[data-testid=submit-button]').type(`{enter}`);
    cy.intercept({ method: 'POST', url: 'auth/login' }, { fixture: 'login.json' }).as('postLogin');
    cy.get('button').contains('Оформить заказ').click();
    cy.intercept({
      method: 'POST', headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }, url: 'order'
    }, { fixture: 'order.json' });
  });
})