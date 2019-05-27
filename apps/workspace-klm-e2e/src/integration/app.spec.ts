import { getGreeting } from '../support/app.po';

describe('Page: home', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.wait(2000); // Required in order to pass the test due to the Agastya XHR request.
    getGreeting().contains('Departures from Amsterdam Schiphol');
  });
});

describe('Page: not found', () => {
  beforeEach(() => cy.visit('/not-found'));

  it('should display page not found message', () => {
    cy.wait(2000); // Required in order to pass the test due to the Agastya XHR request.
    getGreeting().contains('Page Not Found');
  });
});
