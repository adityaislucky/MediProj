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

  update = false;
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

  UpdateTest(test: TestDetails){
    const dialogRef = this.dialog.open(DialogTestManagementComponent, {
      width: '250px',
      data: { test: test, mode: "update" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._testManagementService.UpdateTest(result).subscribe(data => {
          if (data == 1) {
            this._snackBar.open("Test Updated Successfully..!!", "Close", {
              duration: 2000,
            });
          }
          else if (data == 0) {
            this._snackBar.open("Some Error Occured..!!", "Close", {
              duration: 2000,
            });
          }
        });
      }
    });

  }

  ShowUpdate() {
    this.update = true;
  }

  AddTest() {
    const dialogRef = this.dialog.open(DialogTestManagementComponent, {
      width: '250px',
      data: { mode: "add" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._testManagementService.AddTest(result).subscribe(data => {
          if (data == 1) {
            this._snackBar.open("Test Added Successfully..!!", "Close", {
              duration: 2000,
            });
            this._route.navigateByUrl('admin', { skipLocationChange: true }).then(() => {
              this._route.navigate(['testManagement']);
            }); 
          }
          else if (data == 0) {
            this._snackBar.open("Some Error Occured..!!", "Close", {
              duration: 2000,
            });
            this._route.navigateByUrl('admin', { skipLocationChange: true }).then(() => {
              this._route.navigate(['testManagement']);
            }); 
          }
        });
      }
    });
  }
}
