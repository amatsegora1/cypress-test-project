import HomePageFooter from '../pages/homePageFooter'

describe('Login via Basic Auth', () => {
  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space')
  })

  it('should show Home link to confirm success login', () => {
    cy.contains('a', 'Home').should('be.visible')
  })

  it('header buttons should be visible', () => {
    cy.contains('button', 'Sign up').should('be.visible')
  }
  )

  it('facebook link is correct', () => {
    HomePageFooter.getFacebookLink()
      .should('have.attr', 'href', 'https://www.facebook.com/Hillel.IT.School')
  })

  it('telegram link is correct', () => {
    HomePageFooter.getTelegramLink()
      .should('have.attr', 'href', 'https://t.me/ithillel_kyiv')
  })

  it('youtube link is correct', () => {
    HomePageFooter.getYouTubeLink()
    .should('have.attr', 'href')
    .and('include', 'youtube.com/user/HillelITSchool')
  })

  it('instagram link is correct', () => {
    HomePageFooter.getInstagramLink()
      .should('have.attr', 'href', 'https://www.instagram.com/hillel_itschool/')
  })

  it('linkedIn link is correct', () => {
    HomePageFooter.getLinkedInLink()
      .should('have.attr', 'href', 'https://www.linkedin.com/school/ithillel/')
  })

  it('should have correct link to Hillel website', () => {
    HomePageFooter.getItHillelLink()
      .should('have.attr', 'href', 'https://ithillel.ua')
  })
  
  it('should have correct mailto link', () => {
    HomePageFooter.getItHillelEmail()
      .should('have.attr', 'href', 'mailto:developer@ithillel.ua')
  })
})