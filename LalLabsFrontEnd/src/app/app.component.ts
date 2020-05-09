import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'LalLabsFrontEnd';
  isLoggedIn: string;

  constructor(private _route: Router) { }

  ngOnInit() {
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn');
  }

  ngDoCheck() {
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn');
  }

  onLogout() {

    sessionStorage.removeItem("isLoggedIn");
    this._route.navigate(['welcome'], { replaceUrl: true });
  }
}
