import { getAgastya } from '../support/app.po';
import { getFiltering } from '../support/app.po';
import { getHeader } from '../support/app.po';
import { getFlightNumberColumn } from '../support/app.po';
import { getFlightDestinationColumn } from '../support/app.po';
import { getFlightScheduledColumn } from '../support/app.po';
import { getFlightEstimatedColumn } from '../support/app.po';
import { getFlightStatusColumn } from '../support/app.po';
import { getTable } from '../support/app.po';

describe('Page: home', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.wait(2000); // Required in order to pass the test due to the Agastya XHR request.
    getHeader().contains('Departures from Amsterdam Schiphol');
  });

  it('should have Agastya accessibility plugin', () => {
    cy.wait(1000);
    getAgastya();
  });

  it('should have filtering of flights', () => {
    cy.wait(1000);
    getFiltering();
  });

  it('should have flights number column', () => {
    cy.wait(1000);
    getFlightNumberColumn();
  });

  it('should have flights destination column', () => {
    cy.wait(1000);
    getFlightDestinationColumn();
  });

  it('should have flights scheduled departure time column', () => {
    cy.wait(1000);
    getFlightScheduledColumn();
  });

  it('should have flights estimated departure time column', () => {
    cy.wait(1000);
    getFlightEstimatedColumn();
  });

  it('should have flights status column', () => {
    cy.wait(1000);
    getFlightStatusColumn();
  });

  it('should have flights table', () => {
    cy.wait(1000);
    getTable();
  });
});

describe('Page: not found', () => {
  beforeEach(() => cy.visit('/not-found'));

  it('should display page not found message', () => {
    cy.wait(2000); // Required in order to pass the test due to the Agastya XHR request.
    getHeader().contains('Page Not Found');
  });

  it('should have Agastya accessibility plugin', () => {
    cy.wait(1000);
    getAgastya();
  });
});
