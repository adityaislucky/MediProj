import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { PatientDetails } from './patient-details';
import { GetPatientDetails } from '../models/get-patient-details';


@Injectable()
export class PatientService {

  endpoint = 'http://localhost:64878/api/patient';

  constructor(private _http: HttpClient) { }

  SavePatient(patient: PatientDetails) {
    return this._http.post(this.endpoint+'/SavePatient', patient).pipe(
      catchError(this.handleError)
    );
  }

  GetPatient(PatientId: number): Observable<GetPatientDetails[]> {
    let param = new HttpParams().set('PatientId', PatientId.toString());
    return this._http.get<GetPatientDetails[]>(this.endpoint+'/GetPatient', { params: param }).pipe(
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
