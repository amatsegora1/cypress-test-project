import Garage from '../pages/Garage';

describe('Garage and Fuel Expenses tests', () => {
    beforeEach(() => {
      cy.login(Cypress.env('email'), Cypress.env('password'));
    });
  
    it('should add a car and expence ', () => {
        Garage.deleteAllCars(); //Delete all cars that were exisit 
        Garage.getGarageNavigationLink().click();
        Garage.getAddCarButton().click();
        Garage.getAddCarBrand().select('BMW');
        Garage.getAddCarModel().select('X5');
        Garage.getAddCarMileage().click().type('100').blur();
        Garage.getAddCarButtonPopup().click();
        cy.contains('Car added').should('be.visible'); //car added
        cy.contains('p', 'BMW X5').should('be.visible'); //car added
        Garage.getAddExpenseButton().first().click();
        Garage.getExpenseMileage().clear().type('101').blur();
        Garage.getExpenseLiters().type('10').blur();
        Garage.getExpenseTotalCost().type('150').blur();
        Garage.getAddExpenseButtonPopup().click();
        cy.get('table.expenses_table tbody tr').first().within(() => {
            cy.get('td').eq(0).should('contain.text', Garage.formatDateForUi(new Date())); // date
            cy.get('td').eq(1).should('contain.text', '101'); // milage
            cy.get('td').eq(2).should('contain.text', '10L'); // L
            cy.get('td').eq(3).should('contain.text', '150.00 USD'); // Cost
          });
        
        Garage.deleteAllCars(); //Delete all test cars
    });
  });