const aT = 'test-accessToken';
const rT = 'test-refreshToken';
const url = Cypress.config().baseUrl;

describe('Constructor burger test', () => {
  beforeEach(() => {
    // установка моков токенов (из констант, 
    // падают после просрачивания времени жизни refresh т.к. не происходит обновления) 
    window.localStorage.setItem("accessToken", aT);
    window.localStorage.setItem("refreshToken", rT);

    // мок запрос данных пользователя
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });

    // переход на страницу "Конструктора"
    cy.visit(`${url}`);

    // мок запроса списка ингредиентов
    cy.intercept({ method: "GET", url: "ingredients" }, { fixture: "ingredients.json" }).as('getIngredients');
  })

  it('should open ingredient modal and close it after', () => {
    // открытие и закрытие модального окна просмотра ингредиента
    cy.get('[class^=style_ingredientElemContent]').first().click();
    cy.get('[data-testid=close-modal-span]').click();
  });

  it('should drag ingredient to constructor and make order', () => {
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

afterEach(() => {
  // удаление токенов из localstorage 
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('refreshToken');
})