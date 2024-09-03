describe('Trace to Registration page', () => {
  before(() => {
    
  })

  // beforeEach(function () {
    // cy.visit('http://localhost:3000/profile');
    // cy.visit('http://localhost:3000');
    // cy.intercept("GET", "https://norma.nomoreparties.space/api/auth/user", { fixture: "user.json" })
    // cy.intercept('GET', 'ingredients');


    // cy.prepare('uncledeni@yandex.ru', 'qweqweqwe');
  // });

  it('should open modal for all ingredients and close it', () => {

    cy.visit('http://localhost:3000');
    cy.viewport(1920, 1080);
    // cy.intercept('POST', 'auth/login', {fixture: 'login'});
    cy.intercept({ method: "GET", url: "ingredients" }, { statusCode: 200, fixture: "ingredients.json" });


    // cy.get('[class^=style_ingredientElemContent]').each(($el) => {
      // cy.wrap($el).click();
      // cy.get('[data-testid=close-modal-span]').click();
      // cy.wrap($el).trigger('dragstart');
      // cy.get('[class^=style_constructorComponentContainer]').trigger('drop');
    // });
  });

  // it('should put all ingredients in constructor; bun should be put and replaced by last one!', () => {
  //   cy.prepare('uncledeni@yandex.ru', 'qweqweqwe');

  //   cy.visit('http://localhost:3000/');


  //   cy.get('[class^=style_ingredientElemContent]').each(($el) => {
  //     cy.wrap($el).trigger('dragstart');
  //     cy.get('[class^=style_constructorComponentContainer]').trigger('drop');
  //   });

  //   // cy.get('button').contains('Оформить заказ').click()

  //   // cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', 
  //   //   { fixture: "order.json" }
  //   // )

  // });
})