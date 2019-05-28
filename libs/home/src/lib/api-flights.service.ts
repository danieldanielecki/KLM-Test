declare const API_KEY_KLM: string;

import * as moment from 'moment';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { FlightItem } from './flight-item';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiFlightsService {
  public isLoadingResults = true;
  public isRateLimitReached = false;

  constructor(private httpClient: HttpClient) {}

  getData(): Observable<FlightItem[]> {
    // To synchronize with https://www.schiphol.nl/en/departures/ adding "utc()" is required.
    const currentDate =
      moment()
        .utc()
        .format('YYYY-MM-DDTHH:mm:ss') + 'Z';
    const endOfToday =
      moment()
        .utc()
        .endOf('day')
        .format('YYYY-MM-DDTHH:mm:ss') + 'Z';

    console.log(currentDate);
    console.log(endOfToday);

    return this.httpClient
      .get(
        'https://api.airfranceklm.com/opendata/flightstatus/?startRange=' +
          currentDate +
          '&endRange=' +
          endOfToday +
          '&movementType=D&timeOriginType=S&timeType=U&origin=AMS&pageNumber=0&pageSize=100', // Can't get more than 100.
        {
          headers: {
            accept:
              'application/hal+json;version=com.afkl.operationalflight.v3',
            'accept-language': 'en-US',
            'Api-Key': API_KEY_KLM
          }
        }
      )
      .pipe(
        map((response: any) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;

          console.log(response);

          return response.operationalFlights.map((item: any) => {
            return new FlightItem(
              item.flightNumber.toString(),
              item.flightStatusPublicLangTransl.toString(),
              item.flightLegs
                .map(e => e.arrivalInformation.airport.city.name)
                .toString(),
              item.flightLegs
                .map(e =>
                  moment(e.departureInformation.times.scheduled)
                    .locale('nl')
                    .format('LT')
                )
                .toString(),
              item.flightLegs
                .map(e =>
                  moment(e.departureInformation.times.estimatedPublic)
                    .locale('nl')
                    .format('LT')
                )
                .toString()
            );
          });
        }),
        // Handle errors.
        catchError((error: any) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;

          console.log('Caught mapping error: ', error);
          return throwError(error); // Throw an error.
        }),
        finalize(() => {
          console.log("First 'finalize()' has been executed.");
        }),
        catchError((error: any) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;

          console.log('Caught throwing error: ', error);
          return observableOf([]); // Return fallback value.
        }),
        finalize(() => {
          console.log("Second 'finalize()' has been executed.");
        }),
        tap(
          res => console.log('HTTP response: ', res),
          err => console.log('HTTP error: ', err),
          () => console.log('HTTP request completed.')
        )
      );
  }
}
