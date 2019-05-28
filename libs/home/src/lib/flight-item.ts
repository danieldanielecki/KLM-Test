export class FlightItem {
  constructor(
    public flightNumber: string,
    public flightStatus: string,
    public flightDestination: string,
    public flightScheduled: Date,
    public flightEstimated: Date
  ) {}
}
