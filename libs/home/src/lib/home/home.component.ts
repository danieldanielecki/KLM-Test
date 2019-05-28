import { ApiFlightsService } from './../api-flights.service';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { FlightItem } from './../flight-item';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';

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
  public dataSource: MatTableDataSource<FlightItem> = new MatTableDataSource<
    FlightItem
  >();
  public isLoadingResults = true;
  public isRateLimitReached = false;
  private searchSubject$: Subject<string> = new Subject<string>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiFlightsService: ApiFlightsService) {}

  // Once the view will be initialized load the data.
  ngAfterViewInit() {
    this.apiFlightsService.getData().subscribe(data => {
      this.dataSource.data = data;
      this.isLoadingResults = this.apiFlightsService.isLoadingResults;
      this.isRateLimitReached = this.apiFlightsService.isRateLimitReached;

      console.log(this.dataSource.data);
    });

    // Update results every 1 minute.
    setInterval(() => {
      this.apiFlightsService.getData().subscribe(data => {
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

  // Based on user input apply her/his desired filter value in order to show results of the filtering.
  applyFilter(filterValue: string) {
    this.searchSubject$.next(filterValue);
  }

  // Based on type of flight status get appropriate color.
  getColor(country) {
    switch (country) {
      case 'Cancelled':
        return 'red';
      case 'Delayed departure':
        return 'orange';
      case 'New departure time':
        return 'purple';
      case 'On time':
        return 'green';
      default:
        return 'black';
    }
  }
}
