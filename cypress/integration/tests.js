describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/');
  });

  it('check for 6 row of 5 letter words', () => {
    cy.get('div.letter-row').should('have.length', 6);
    cy.get('div.letter-row').each(($ele) => {
      expect($ele.children()).to.have.length(5);
    });
  });

  it('can add word on typing from keyboard', () => {
    // We'll store our item text in a variable so we can reuse it
    cy.get('body').type('mango{enter}');

    cy.get('.letter-row').first().children().should('have.text', 'mango');
    cy.get('.letter-row')
      .first()
      .children()
      .each(($ele) => {
        expect($ele.css('background-color')).oneOf(['rgb(128, 128, 128)', 'rgb(255, 255, 0)', 'rgba(0, 0, 0, 0)']);
      });
  });

  it('can earse the letter on backspace', () => {
    cy.get('body').type('apple');
    cy.get('.letter-row').first().children().should('have.text', 'apple');
    cy.get('body').type('{backspace}');
    cy.get('.letter-row').first().children().should('have.text', 'appl');
  });

  it('check Alert(Word not in list!)', () => {
    cy.get('body').type('applo{enter}');
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Word not in list!`);
    });
  });
  it('check Alert(Not enough letters!) ', () => {
    cy.get('body').type('{enter}');
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Not enough letters!`);
    });
  });

  it(`check Alert(You've run out of guesses! Game over!)`, () => {
    cy.get('body').type('which{enter}');
    cy.get('body').type('there{enter}');
    cy.get('body').type('their{enter}');
    cy.get('body').type('about{enter}');
    cy.get('body').type('would{enter}');
    cy.get('body').type('years{enter}');
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`You've run out of guesses! Game over!`);
    });
  });
});
