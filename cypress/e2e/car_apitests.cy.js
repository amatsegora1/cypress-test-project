import Garage from '../pages/Garage';

describe('Garage and Fuel Expenses tests', () => {
  beforeEach(() => {
    cy.login(Cypress.env('email'), Cypress.env('password'));
  });

  it('should add a car and expence ', () => {
    Garage.deleteAllCars(); //Delete all cars that were exisit

    cy.intercept('POST', '/api/cars').as('createCar'); // Intercept

    //Add car on UI
    Garage.getGarageNavigationLink().click();
    Garage.getAddCarButton().click();
    Garage.getAddCarBrand().select('BMW');
    Garage.getAddCarModel().select('X5');
    Garage.getAddCarMileage().click().type('100').blur();
    Garage.getAddCarButtonPopup().click();

    //Car id check and record
    cy.wait('@createCar').then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      const carId = response.body.data.id;
      cy.wrap(carId).as('createdCarId');
      cy.log(`Created car ID: ${carId}`);
    });

    //UI check that car created
    cy.contains('Car added').should('be.visible'); 
    cy.contains('p', 'BMW X5').should('be.visible');

    //Get created car via API and ID verification
    cy.get('@createdCarId').then((carId) => {
      cy.request({
        method: 'GET',
        url: 'https://qauto.forstudy.space/api/cars',
        auth: {
          username: 'guest',
          password: 'welcome2qauto'
        }
      }).then((res) => {
        const cars = res.body.data;
        const createdCar = cars.find(car => car.id === Number(carId));
        expect(createdCar.id).to.eq(Number(carId));
      });
    });

    //Create expense using created car id via API
    cy.get('@createdCarId').then((carId) => {
      cy.createExpenseViaApi(carId, {
        mileage: 101,
        liters: 10,
        totalCost: 150
      });
    });

    //Check that expense is displayed on the UI
    Garage.getExpenseNavigation().click();
    cy.get('table.expenses_table tbody tr').first().within(() => {
      cy.get('td').eq(0).should('contain.text', Garage.formatDateForUi(new Date()));
      cy.get('td').eq(1).should('contain.text', '101'); // milage
      cy.get('td').eq(2).should('contain.text', '10L'); // L
      cy.get('td').eq(3).should('contain.text', '150.00 USD'); // Cost
    });




    Garage.deleteAllCars(); //Delete all test cars
  });
});