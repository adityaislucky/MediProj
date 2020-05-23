import { Component} from '@angular/core';
import { Login } from './Login';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  login = new Login();
  status: boolean;
  loginFail = false;
  hide = true;
  isLoggedIn: string;
  

  constructor(private _loginService: LoginService, private _route: Router) {
  
  }

 
  onSubmit() {
    this._loginService.LoginValidation(this.login).subscribe(
      data => {
        this.status = data
        this.reRoute(this.status);
      })
  }

  reRoute(status) {

    if (status == true) {
      this._loginService.GetUserRole(this.login).subscribe(data => {
        let userRole = data;
        sessionStorage.setItem("userRole", userRole);
      });
      this.isLoggedIn = "true";
      sessionStorage.setItem("isLoggedIn", this.isLoggedIn);
      sessionStorage.setItem("userName", this.login.userName);
      this._route.navigate(['admin'], { replaceUrl: true });
    }

    else {
      this.loginFail = true;
      this._route.navigate(['login'], { replaceUrl: true });
    }

  }
}
