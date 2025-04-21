class HomePageFooter {
    getFacebookLink() {
        return cy.get('a[href*="facebook.com"]')
    }

    getTelegramLink() {
        return cy.get('a[href*="t.me"]')
    }

    getYouTubeLink() {
        return cy.get('a[href*="youtube.com"]')
    }

    getInstagramLink() {
        return cy.get('a[href*="instagram.com"]')
    }

    getLinkedInLink() {
        return cy.get('a[href*="linkedin.com"]')
    }

    getItHillelLink() {
        return cy.get('a[href="https://ithillel.ua"]')
    }

    getItHillelEmail() {
        return cy.get('a[href="mailto:developer@ithillel.ua"]')
    }

    clickFaceBookLink() {
        this.getFacebookLink().click(); 
    }

    clickTelegramLink() {
        this.getTelegramLink().click();
    }

    clickYouTubeLink() {
        this.getYouTubeLink().click();
    }

    clickInstagramLink() {
        this.getInstagramLink().click();
    }

    clickLinkedInLink() {
        this.getLinkedInLink().click();
    }
}

export default new HomePageFooter();