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
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/login'); 
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