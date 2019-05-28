export const getAgastya = () => cy.get('button.agastya4__agastya-button');
export const getFiltering = () => cy.get('mat-form-field');
export const getHeader = () => cy.get('h1');
export const getTable = () => cy.get('mat-table');
export const getFlightNumberColumn = () =>
  cy.get('mat-header-cell.mat-column-flightNumber');
export const getFlightDestinationColumn = () =>
  cy.get('mat-header-cell.mat-column-flightDestination');
export const getFlightScheduledColumn = () =>
  cy.get('mat-header-cell.mat-column-flightScheduled');
export const getFlightEstimatedColumn = () =>
  cy.get('mat-header-cell.mat-column-flightEstimated');
export const getFlightStatusColumn = () =>
  cy.get('mat-header-cell.mat-column-flightStatus');
