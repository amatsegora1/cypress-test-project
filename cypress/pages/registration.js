class RegistrationForm {

getSignUpButton() {
    return cy.get('.hero-descriptor button.btn-primary')
}

getRegisterButton(){
    return cy.get('.modal-footer button.btn-primary')
}

getNameField() {
    return cy.get('#signupName')
}

getLastNameField() {
    return cy.get('#signupLastName')
}

getEmailField(){
    return cy.get('#signupEmail')
}

getPasswordField(){
    return cy.get('#signupPassword');
}

getReEnterPasswordField(){
    return cy.get('#signupRepeatPassword');
}

generateUniqueEmail() {
    const random = Math.floor(Math.random() * 100000);
    return `test${random}@example.com`;
  }

}

export default new RegistrationForm();
