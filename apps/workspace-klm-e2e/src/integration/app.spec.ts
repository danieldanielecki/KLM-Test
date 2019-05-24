import { getGreeting } from '../support/app.po';

describe('Page: home', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Hello world KLM! Test.');
  });
});

describe('Page: not found', () => {
  beforeEach(() => cy.visit('/not-found'));

  it('should display page not found message', () => {
    getGreeting().contains('Page Not Found');
  });
});
