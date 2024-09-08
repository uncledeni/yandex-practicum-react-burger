const aT = 'test-accessToken';
const rT = 'test-refreshToken';
const url = Cypress.config().baseUrl;

describe('Trace to profile page and user check', () => {
  beforeEach(() => {
    // установка моков токенов (из констант, 
    // падают после просрачивания времени жизни refresh т.к. не происходит обновления) 
    window.localStorage.setItem("accessToken", aT);
    window.localStorage.setItem("refreshToken", rT);

    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });

    // переход на страницу "Конструктора"
    cy.visit(`${url}`);
  })

  it('should go to profile page and check user name', () => {
    // переход на страницу "Конструктора"
    cy.get('a').contains('Личный кабинет').click();
    
    cy.get('[data-testid=name]').invoke('val').then(sometext => {
      if (sometext === 'TestUser') {
        cy.log(`CONGRATS ${sometext}`)
      }
    });;
  });
})

afterEach(() => {
  // удаление токенов из localstorage 
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('refreshToken');
})
