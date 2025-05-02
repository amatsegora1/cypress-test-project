class Garage {

    getGarageNavigationLink() {
        return cy.get('.sidebar a[routerlink="garage"]');
    }

    getAddCarButton() {
        return cy.contains('.panel-page_heading button', 'Add car');
    }

    getAddCarBrand(){
        return cy.get('#addCarBrand');
    }

    getAddCarModel(){
        return cy.get('#addCarModel');
    }

    getAddCarMileage(){
        return cy.get('#addCarMileage');
    }

    getAddCarButtonPopup(){
        return cy.get('.modal-footer .btn.btn-primary');
    }

    getAddExpenseButton(){
        return cy.get('.car_actions .car_add-expense');
    }

    getExpenseMileage(){
        return cy.get('#addExpenseMileage');
    }

    getExpenseLiters(){
        return cy.get('#addExpenseLiters');
    }

    getExpenseTotalCost(){
        return cy.get('#addExpenseTotalCost');
    }

    getAddExpenseButtonPopup(){
        return cy.get('.modal-content .btn.btn-primary');
    }

    deleteAllCars() {
        this.getGarageNavigationLink().click();
        cy.wait(500);
        cy.get('body').then(($body) => {
            if ($body.find('.car-item').length > 0) {
                cy.get('.car-item').first().within(() => {
                    cy.get('.car_edit').click();
                });

                cy.get('.modal-footer .btn-outline-danger').click();
                cy.get('.modal-footer .btn-danger').click();
                cy.contains('Car removed').should('be.visible'); // removal confirmation
                cy.wait(500);

                this.deleteAllCars();
            }
        });
    }
}

export default new Garage();