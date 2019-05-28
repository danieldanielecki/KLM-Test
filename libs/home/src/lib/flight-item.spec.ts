import { FlightItem } from './flight-item';

describe('FlightItem', () => {
  const flightNumber = '123';
  const flightStatus = 'fakeStatus';
  const flightDestination = 'fakeDestination';
  const flightScheduled: Date = new Date();
  const flightTime: Date = new Date();

  it('should create an instance of FlightItem class with 5 parameters', () => {
    expect(
      new FlightItem(
        flightNumber,
        flightStatus,
        flightDestination,
        flightScheduled,
        flightTime
      )
    ).toBeTruthy();
  });
});
