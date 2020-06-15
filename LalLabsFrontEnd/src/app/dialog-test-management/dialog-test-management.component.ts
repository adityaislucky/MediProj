import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestDetails } from './test-details';

@Component({
  selector: 'app-dialog-test-management',
  templateUrl: './dialog-test-management.component.html',
  styleUrls: ['./dialog-test-management.component.css']
})
export class DialogTestManagementComponent implements OnInit {

  update = false;
  add = false;
  test: TestDetails = new TestDetails();
  constructor(private _route: Router, private _dialogRef: MatDialogRef<DialogTestManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    _dialogRef.disableClose = true;
  }

  ngOnInit() {
    if (!(sessionStorage.getItem("isLoggedIn")))
      this._route.navigate(['login'], { replaceUrl: true });
    if (sessionStorage.getItem("userRole") != "admin")
      this._route.navigate(['pageNotFound'], { replaceUrl: true });
    if (this.data.mode == "update") {
      this.update = true;
      this.test = this.data.test;
    }
    if (this.data.mode == "add") {
      this.add = true;
    }  
  }

  Cancel() {
    this._route.navigateByUrl('admin', { skipLocationChange: true }).then(() => {
      this._route.navigate(['testManagement']);
    }); 
  }

}
