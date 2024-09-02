// describe('template spec', () => {
//   before(function() {
//     cy.visit('http://localhost:3000')
//   });

//   it('finds the content "type"', () => {
//     cy.viewport(1920, 1080)
//     cy.contains('Соберите бургер')
//   })
// })

describe('Trace to Registration page', () => {
  before(function() {
    cy.visit('http://localhost:3000');
    cy.intercept("GET", "https://norma.nomoreparties.space/api/auth/user", { fixture: "user.json" })
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients');

    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    cy.setCookie('accessToken', 'test-accessToken')
  });
  
  it('Does not do much!', () => {
    cy.viewport(1920, 1080);

    cy.contains('Соберите бургер');

    cy.get('span').contains('Булки');

    cy.get('[class^=style_ingredientElemContent]').each(($el) => {
      cy.wrap($el).trigger('dragstart')
      cy.get('[class^=style_constructorComponentContainer]').trigger('drop');;
    });

    cy.get('button').contains('Оформить заказ').click()

    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', 
      { fixture: "order.json" }
    )

  });
  
  // it('should open delivery page after continue button click', () => {
    // cy.viewport(1920, 1080);
    // cy.visit('http://localhost:3000');
    // cy.contains('Соберите бургер');
    // alert("A")
  //   // cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {

  //   // })
  //   // cy.contains('Доставка');
  // });

})

// describe('My First Test', () => {
//   before(function() {
//   });
  
//   it('Does not do much!', () => {
//     cy.viewport(1920, 1080)
//     cy.visit('http://localhost:3000/feed')
//     cy.contains('Лента заказов')
//   })
// })