// const aT = 'test-accessToken';
const aT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTc4MWJkMTE5ZDQ1MDAxYjRmOTg0ZSIsImlhdCI6MTcyNTU0MTcyNywiZXhwIjoxNzI1NTQyOTI3fQ.zet4rv9G31cTLfzvouPFGJpYpyT-Bty_LwlGP-XzkJk';
// const rT = 'test-refreshToken';
const rT = '046957db3bc5a978814b3cce53dcb1f62d460173967a1dced4b4c30aa623beb18df915b3ab1b46c6';

describe('Trace to Registration page', () => {

  it('should open modal for all ingredients and close it', () => {
    // переход на страницу "Конструктора"
    cy.visit('http://localhost:3000');

    // установка моков токенов (из констант, 
    // падают после просрачивания времени жизни refresh т.к. не происходит обновления) 
    window.localStorage.setItem("accessToken", aT);
    window.localStorage.setItem("refreshToken", rT);

    // мок запрос данных пользователя
    cy.intercept({
      method: "GET",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      url: "auth/user"
    }, { fixture: "user.json" }).as('getUser');

    // мок запроса списка ингредиентов
    cy.intercept({ method: "GET", url: "ingredients" }, { fixture: "ingredients.json" }).as('getIngredients');

    // открытие и закрытие модального окна просмотра ингредиента
    cy.get('[class^=style_ingredientElemContent]').first().click();
    cy.get('[data-testid=close-modal-span]').click();
    
    // перетаскивание ингредиента в конструктор
    cy.get('[class^=style_ingredientElemContent]').first().trigger('dragstart');
    cy.get('[class^=style_constructorComponentContainer]').trigger('drop');
    
    // открытие и закрытие модального окна просмотра заказа
    cy.intercept({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      url: 'orders'
    }, { fixture: 'order.json' });
    cy.get('button').contains('Оформить заказ').click();
    cy.get('[data-testid=close-modal-span]').click();
  });
})