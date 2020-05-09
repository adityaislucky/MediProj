import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Login } from './Login';

@Injectable()
export class LoginService {

  endpoint = 'http://localhost:64878/api/login';
  
  constructor(private _http: HttpClient) { }

  LoginValidation(login: Login){


    let param= new HttpParams().set('userName', login.userName).set('password', login.password);

    return this._http.get<boolean>(this.endpoint, { params: param }).pipe(
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
