import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError, Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PatientDetails } from './patient-details';


@Injectable()
export class PhoneService {

  endpoint = 'http://localhost:64878/api/phone/';

  constructor(private _http: HttpClient) { }

  GetAllPhones(): Observable<string[]> {
    return this._http.get<string[]>(this.endpoint + 'GetAllPhones').pipe(
      catchError(this.handleError)
    );
  }

  GetPatientByPhone(phone: string): Observable<PatientDetails[]> {
    let param = new HttpParams().set('phone', phone);
    return this._http.get<PatientDetails[]>(this.endpoint + 'GetPatientByPhone', { params: param }).pipe(
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
