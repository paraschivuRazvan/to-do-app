import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';

import { environment } from '../../../../../environments/environment';

import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToDoListContainerService {

  constructor(
    private _http: HttpClient
  ) { }

  // Get a list of tasks
  getListOfTasks() {
    return this._http
      .get(environment.apiEndpoint + '/tasks')
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  // Get a single task
  getTask(id) {
    return this._http
      .get(environment.apiEndpoint + '/tasks/' + id)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  // Create a task
  createTask(data) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this._http
      .post(environment.apiEndpoint + '/tasks', data, options)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  // Update a task
  updateTask(id, data) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this._http
      .patch(environment.apiEndpoint + '/tasks/' + id, data, options)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  // Delete a task
  deleteTask(id) {
    return this._http
      .delete(environment.apiEndpoint + '/tasks/' + id)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('A client error occurred:', error);
      return throwError(error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`
      );
      return throwError(error);
    }
  }
}
