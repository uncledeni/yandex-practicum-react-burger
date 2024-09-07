const aT = 'test-accessToken';
const rT = 'test-refreshToken';

describe('Trace to Registration page', () => {
  beforeEach(() => {
        
    // установка моков токенов (из констант, 
    // падают после просрачивания времени жизни refresh т.к. не происходит обновления) 
    window.localStorage.setItem("accessToken", aT);
    window.localStorage.setItem("refreshToken", rT);

    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    
    // переход на страницу "Конструктора"
    cy.visit('http://localhost:3000');
  })


  it('should open modal for all ingredients and close it', () => {
    // мок запрос данных пользователя

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