declare const API_KEY_KLM: string;

import * as moment from 'moment';
import {
  catchError,
  map,
  distinctUntilChanged,
  debounceTime
} from 'rxjs/operators';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, of as observableOf, Subject } from 'rxjs';

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
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  public displayedColumns: string[] = [
    'flightNumber',
    'flightDestination',
    'flightScheduled',
    'flightTime',
    'flightStatus'
  ];
  public dataSource: MatTableDataSource<SearchItem> = new MatTableDataSource<
    SearchItem
  >();
  public isLoadingResults = true;
  public isRateLimitReached = false;
  private searchSubject$: Subject<string> = new Subject<string>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.getData().subscribe(data => {
      this.dataSource.data = data;

      console.log(this.dataSource.data);
    });

    // Update results every 1 minute.
    setInterval(() => {
      this.getData().subscribe(data => {
        this.dataSource.data = data;

        console.log(this.dataSource.data);
      });
    }, 60000);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Display desired results after 1 second.
    this.searchSubject$
      .pipe(
        debounceTime(1000), // Limit requests to maximum one per second.
        distinctUntilChanged() // Eliminate duplicate values.
      )
      .subscribe((filterValue: string) => {
        this.dataSource.filter = filterValue.trim().toLowerCase(); // Filter data in flights table.
      });
  }

  getData(): Observable<SearchItem[]> {
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
        catchError((error: any) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          alert(error); // TODO: Remove it.
          console.log(error);

          return observableOf([]);
        })
      );
  }

  getColor(country) {
    switch (country) {
      case 'Delayed departure':
        return 'orange';
      case 'New departure time':
        return 'purple';
      case 'On time':
        return 'green';
      case 'Cancelled':
        return 'red';
      default:
        return 'black';
    }
  }

  applyFilter(filterValue: string) {
    this.searchSubject$.next(filterValue);
  }
}
