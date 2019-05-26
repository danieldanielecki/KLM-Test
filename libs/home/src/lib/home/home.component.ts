declare const API_KEY_KLM: string;

import * as moment from 'moment';
import { catchError, map } from 'rxjs/operators';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material';
import { Observable, of as observableOf } from 'rxjs';

class SearchItem {
  constructor(
    public flightNumber: string,
    public flightStatus: string,
    public flightDestination: string,
    public flightScheduled: Date,
    public flightTime: Date
  ) {}
}

@Component({
  selector: 'workspace-klm',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [FilterPipe]
})
export class HomeComponent implements AfterViewInit {
  resultsLength = 0;
  private displayedColumns: string[] = [
    'flightNumber',
    'flightDestination',
    'flightScheduled',
    'flightTime',
    'flightStatus'
  ];
  private results$: Observable<SearchItem[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private httpClient: HttpClient, private filterPipe: FilterPipe) {}

  ngAfterViewInit() {
    this.results$ = this.getData();

    // Update results every 1 minute.
    setInterval(() => {
      this.results$ = this.getData();
    }, 60000);
  }

  getData(): Observable<SearchItem[]> {
    // To synchronize with https://www.schiphol.nl/en/departures/ adding "utc()" is required.
    let currentDate =
      moment()
        .utc()
        .format('YYYY-MM-DDTHH:mm:ss') + 'Z';
    let endOfToday =
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
          '&movementType=D&timeOriginType=S&timeType=U&origin=AMS&pageNumber=0&pageSize=300', // Can't get more than 100.
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
        map(response => {
          console.log(response);
          return response.operationalFlights.map(item => {
            return new SearchItem(
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
        catchError(() => {
          return observableOf([]);
        })
      );
  }

  getColor(country) {
    switch (country) {
      case 'Delayed departure':
        return 'orange';
      case 'On time':
        return 'green';
      default:
        return 'black';
    }
  }
}
