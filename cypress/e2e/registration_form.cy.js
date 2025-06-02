import RegistrationForm from '../pages/registration';
import { RegistrationForm } from '../pages/RegistrationForm';

describe('Registration form tests', () => {
    beforeEach(function () {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space');
      
        if (this.currentTest.title !== 'Login with registered user') {
          RegistrationForm.getSignUpButton().click();
        }
      })

    it('Name field validations', () => {
        RegistrationForm.getRegisterButton().should('be.disabled'); //Register Button disabled

        RegistrationForm.getNameField().focus().blur();
        RegistrationForm.getNameField().should('have.css', 'border-color', 'rgb(220, 53, 69)'); //Border color red
        cy.contains('Name required').should('be.visible'); //Empty field - Name is required

        RegistrationForm.getNameField().type('123').blur();
        RegistrationForm.getNameField().should('have.css', 'border-color', 'rgb(220, 53, 69)'); //Border color red
        cy.contains('Name is invalid').should('be.visible'); //Wrong data - Name is invalid

        RegistrationForm.getNameField().clear().type('Uncharacteristicallyy').blur();
        RegistrationForm.getNameField().should('have.css', 'border-color', 'rgb(220, 53, 69)'); //Border color red
        cy.contains('Name has to be from 2 to 20 characters long').should('be.visible'); // Name > 20 characters long

        RegistrationForm.getNameField().clear().type('U').blur();
        RegistrationForm.getNameField().should('have.css', 'border-color', 'rgb(220, 53, 69)'); //Border color red
        cy.contains('Name has to be from 2 to 20 characters long').should('be.visible'); // Name < 2 characters long
    })

    it('Last Name field validations', () => {

        RegistrationForm.getLastNameField().focus().blur();
        RegistrationForm.getLastNameField().should('have.css', 'border-color', 'rgb(220, 53, 69)'); //Border color red
        cy.contains('Last name required').should('be.visible'); //Empty field - Last Name is required

        RegistrationForm.getLastNameField().type('123').blur();
        RegistrationForm.getLastNameField().should('have.css', 'border-color', 'rgb(220, 53, 69)'); //Border color red
        cy.contains('Last name is invalid').should('be.visible'); //Wrong data - Last Name is invalid

        RegistrationForm.getLastNameField().clear().type('Uncharacteristicallyy').blur();
        RegistrationForm.getLastNameField().should('have.css', 'border-color', 'rgb(220, 53, 69)'); //Border color red
        cy.contains('Last name has to be from 2 to 20 characters long').should('be.visible'); // Last Name > 20 characters long

        RegistrationForm.getLastNameField().clear().type('U').blur();
        RegistrationForm.getLastNameField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.contains('Last name has to be from 2 to 20 characters long').should('be.visible'); // Last Name < 2 characters long
    })

    it('Email field validations', () => {
        RegistrationForm.getEmailField().focus().blur();
        RegistrationForm.getEmailField().should('have.css', 'border-color', 'rgb(220, 53, 69)'); //Border color red
        cy.contains('Email required').should('be.visible'); //Empty field - Email is required

        RegistrationForm.getEmailField().type('123').blur();
        RegistrationForm.getEmailField().should('have.css', 'border-color', 'rgb(220, 53, 69)'); //Border color red
        cy.contains('Email is incorrect').should('be.visible'); //Wrong data - Email is invalid
    })

    it('Password and Re-enter password fields validations', () => {
        RegistrationForm.getPasswordField().focus().blur();
        RegistrationForm.getPasswordField().should('have.css', 'border-color', 'rgb(220, 53, 69)'); //Border color red
        cy.contains('Password required').should('be.visible'); //Empty field - Password is required

        RegistrationForm.getReEnterPasswordField().focus().blur();
        RegistrationForm.getReEnterPasswordField().should('have.css', 'border-color', 'rgb(220, 53, 69)'); //Border color red
        cy.contains('Password required').should('be.visible'); //Empty field - Re-enter Password is required

        RegistrationForm.getPasswordField().type('123').blur();
        RegistrationForm.getPasswordField().should('have.css', 'border-color', 'rgb(220, 53, 69)'); //Border color red
        cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter').should('be.visible'); //Wrong data - Password is invalid

        RegistrationForm.getReEnterPasswordField().type('123').blur();
        RegistrationForm.getReEnterPasswordField().should('have.css', 'border-color', 'rgb(220, 53, 69)'); //Border color red
        cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter').should('be.visible'); //Wrong data - Re-enter password is invalid

        RegistrationForm.getPasswordField().clear().type('12345678Aa').blur();
        RegistrationForm.getReEnterPasswordField().clear().type('12345678AaA').blur();
        RegistrationForm.getReEnterPasswordField().should('have.css', 'border-color', 'rgb(220, 53, 69)'); //Border color red
        cy.contains('Passwords do not match').should('be.visible'); // Password do not match
    })

    it('Success sign up', () => {
        const email = RegistrationForm.generateUniqueEmail();
        const password = '12345678Aa';

        cy.contains('h4', 'Registration').should('be.visible'); //Text 'Registration'

        RegistrationForm.getNameField().type('AlexTestFname').blur(); //Correct F Name etered 
        cy.contains('Name is invalid').should('not.exist');

        RegistrationForm.getLastNameField().type('AlexTestLname').blur(); //Correct L Name etered 
        cy.contains('Last Name is invalid').should('not.exist');

        RegistrationForm.getEmailField().type(email).blur(); //Correct Email eterred 
        cy.contains('Email is incorrect').should('not.exist');

        RegistrationForm.getPasswordField().type(password, { sensitive: true }).blur(); //Correct password entered
        RegistrationForm.getReEnterPasswordField().type(password, { sensitive: true }).blur(); //Correct password re-entered
        cy.contains('Passwords do not match').should('not.exist'); // Passwords match — error shouldn't appear

        RegistrationForm.getRegisterButton().should('not.be.disabled').click(); //Register Button is not disabled + click

        cy.contains('Registration complete').should('be.visible'); //Success message is displayed

        cy.wrap(email).as('regEmail');
        cy.wrap(password).as('regPassword');
    })

    it('Login with registered user', function () {
        const email = this.regEmail;
        const password = this.regPassword;
      
        cy.login(email, password); // Custom login command run
      });

})