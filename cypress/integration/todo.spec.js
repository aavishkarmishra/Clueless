/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

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

    // cy.get('body').type('e');
    // cy.get('body').type('{enter}');
    // cy.get('div.letter-row').first().next().children().should('have.text', 'mango');
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
  //
  //  context('with a checked task', () => {
  //    beforeEach(() => {
  //      // We'll take the command we used above to check off an element
  //      // Since we want to perform multiple tests that start with checking
  //      // one element, we put it in the beforeEach hook
  //      // so that it runs at the start of every test.
  //      cy.contains('Pay electric bill')
  //        .parent()
  //        .find('input[type=checkbox]')
  //        .check()
  //    })
  //
  //    it('can filter for uncompleted tasks', () => {
  //      // We'll click on the "active" button in order to
  //      // display only incomplete items
  //      cy.contains('Active').click()
  //
  //      // After filtering, we can assert that there is only the one
  //      // incomplete item in the list.
  //      cy.get('.todo-list li')
  //        .should('have.length', 1)
  //        .first()
  //        .should('have.text', 'Walk the dog')
  //
  //      // For good measure, let's also assert that the task we checked off
  //      // does not exist on the page.
  //      cy.contains('Pay electric bill').should('not.exist')
  //    })
  //
  //    it('can filter for completed tasks', () => {
  //      // We can perform similar steps as the test above to ensure
  //      // that only completed tasks are shown
  //      cy.contains('Completed').click()
  //
  //      cy.get('.todo-list li')
  //        .should('have.length', 1)
  //        .first()
  //        .should('have.text', 'Pay electric bill')
  //
  //      cy.contains('Walk the dog').should('not.exist')
  //    })
  //
  //    it('can delete all completed tasks', () => {
  //      // First, let's click the "Clear completed" button
  //      // `contains` is actually serving two purposes here.
  //      // First, it's ensuring that the button exists within the dom.
  //      // This button only appears when at least one task is checked
  //      // so this command is implicitly verifying that it does exist.
  //      // Second, it selects the button so we can click it.
  //      cy.contains('Clear completed').click()
  //
  //      // Then we can make sure that there is only one element
  //      // in the list and our element does not exist
  //      cy.get('.todo-list li')
  //        .should('have.length', 1)
  //        .should('not.have.text', 'Pay electric bill')
  //
  //      // Finally, make sure that the clear button no longer exists.
  //      cy.contains('Clear completed').should('not.exist')
  //    })
  //  })
});
