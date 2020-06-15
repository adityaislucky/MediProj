import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SalesModel } from './sales-model';

@Injectable()
export class SalesReportService {

  endpoint = 'http://localhost:64878/api/sales/';

  constructor(private _http: HttpClient) { }

  SalesReport(fromDate: Date, toDate: Date): Observable<SalesModel[]> {
    let param = new HttpParams().set('FromDate', fromDate.toDateString()).set('ToDate', toDate.toDateString());
    return this._http.get<SalesModel[]>(this.endpoint + 'SalesReport', { params: param }).pipe(
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
