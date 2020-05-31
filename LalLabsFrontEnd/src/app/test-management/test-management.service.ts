import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TestDetails } from './test-details';


@Injectable()
export class TestManagementService {

  endpoint = 'http://localhost:64878/api/test/';

  constructor(private _http: HttpClient) { }

  GetTestPrice(): Observable<TestDetails[]> {
    return this._http.get<TestDetails[]>(this.endpoint + 'GetTestPrice').pipe(
      catchError(this.handleError)
    );
  }

  UpdateTest(test: TestDetails): any {
    return this._http.post(this.endpoint + 'UpdateTest', test).pipe(
      catchError(this.handleError)
    );
  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
