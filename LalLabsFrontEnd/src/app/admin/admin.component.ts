import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommentStmt } from '@angular/compiler';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userName: string;
  userRole: string;
  admin = false;
  constructor(private _route: Router) { }
  
  ngOnInit() {
    if (!(sessionStorage.getItem("isLoggedIn")))
      this._route.navigate(['login'], { replaceUrl: true });
    this.userName = sessionStorage.getItem("userName");
    this.userRole = sessionStorage.getItem('userRole');
    if (this.userRole == 'admin') {
      this.admin = true;
    }

  }

}
