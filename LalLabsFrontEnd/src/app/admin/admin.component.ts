import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userName: string;
  constructor(private _route: Router) { }
  
  ngOnInit() {
    if (!(sessionStorage.getItem("isLoggedIn")))
      this._route.navigate(['login'], { replaceUrl: true });
    this.userName = sessionStorage.getItem("userName");
  }

}
