import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dialog-save-patient',
  templateUrl: './dialog-save-patient.component.html',
  styleUrls: ['./dialog-save-patient.component.css']
})
export class DialogSavePatientComponent implements OnInit {

  constructor(private _route: Router, private _dialogRef: MatDialogRef<DialogSavePatientComponent>,
    private _location: Location,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    _dialogRef.disableClose = true;
  }

  ngOnInit() {
    if (!(sessionStorage.getItem("isLoggedIn")))
      this._route.navigate(['login'], { replaceUrl: true });
  }

  refresh() {

    this._route.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
      this._route.navigate([decodeURI(this._location.path())]);
    });
  }
}
