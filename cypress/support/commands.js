// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//Custom command for login
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/'); 
    cy.contains('button', 'Sign In').click();
    cy.get('#signinEmail').type(email);
    cy.get('#signinPassword').type(password, { sensitive: true });
    cy.contains('button', 'Login').click();
    cy.contains('You have been successfully logged in').should('be.visible');
  });
//Overwrite command
  Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
      options.log = false;
  
      Cypress.log({
        $el: element,
        name: 'type',
        message: '*'.repeat(text.length),
      });
    }
  
    return originalFn(element, text, options);
  });

  //Command for expence adding
  Cypress.Commands.add('createExpenseViaApi', (carId, expenseData) => {
    cy.request({
      method: 'POST',
      url: 'https://qauto.forstudy.space/api/expenses',
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      },
      body: {
        carId,
        mileage: expenseData.mileage,
        liters: expenseData.liters,
        totalCost: expenseData.totalCost,
        reportedAt: expenseData.reportDate || new Date().toISOString().split('T')[0],
        forceMileage: false
      },
      json: true
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('ok');
      expect(response.body.data.carId).to.eq(carId);
      cy.wrap(response.body.data).as('createdExpense');
    });
  });