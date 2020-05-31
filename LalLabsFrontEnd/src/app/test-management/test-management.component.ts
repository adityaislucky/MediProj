import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestDetails } from './test-details';
import { TestManagementService } from './test-management.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogTestManagementComponent } from '../dialog-test-management/dialog-test-management.component';

@Component({
  selector: 'app-test-management',
  templateUrl: './test-management.component.html',
  styleUrls: ['./test-management.component.css']
})
export class TestManagementComponent implements OnInit {

  tests: TestDetails[] = [];
  constructor(private _route: Router, private _testManagementService: TestManagementService,
    public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    if (!(sessionStorage.getItem("isLoggedIn")))
      this._route.navigate(['login'], { replaceUrl: true });
    if (sessionStorage.getItem("userRole") != "admin")
      this._route.navigate(['pageNotFound'], { replaceUrl: true });

    this._testManagementService.GetTestPrice().subscribe(data => {
      this.tests = data;
    });
  }

  EditTest(test: TestDetails): void {
    const dialogRef = this.dialog.open(DialogTestManagementComponent, {
      width: '250px',
      data: { test: test, mode: "edit" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this._testManagementService.UpdateTest(test).subscribe();
    });

  }
  

}
