describe('Trace to Registration page', () => {

  beforeEach(function () {
    cy.prepare('uncledeni@yandex.ru', 'qweqweqwe');
  });

  it('should open modal for all ingredients and close it', () => {
    cy.get('[data-testid=profile-logout]').click();
  });
})