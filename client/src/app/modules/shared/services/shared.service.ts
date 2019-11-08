import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  public prettyDate(timestamp: any) {
    const date = new Date(timestamp);
    return moment(date).fromNow();
  }

  public convertToDate(timestamp: any) {
    const date = new Date(timestamp);
    return moment(date).format('MMM Do YYYY');
  }
}
