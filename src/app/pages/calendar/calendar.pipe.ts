import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calendar'
})
export class CalendarPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
