import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchString?: any): any {
    if (searchString === undefined) return value;
    return value.filter(result => {
      const flightNumber = result.flightNumber
        .toLowerCase()
        .includes(searchString.toLowerCase());
      const flightDestination = result.flightDestination
        .toLowerCase()
        .includes(searchString.toLowerCase());
      // console.log('flightNumber: ' + flightNumber);
      // console.log('flightDestination: ' + flightDestination);
      return flightNumber + flightDestination;
    });
  }
}
