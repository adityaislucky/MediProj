import { Component, DoCheck, OnInit} from '@angular/core';
import { PatientDetails } from './patient-details';
import { Router } from '@angular/router';
import { PatientService } from './patient-service';
import { combineAll } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { DialogSavePatientComponent } from '../dialog-save-patient/dialog-save-patient.component';


@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit, DoCheck{

  patient = new PatientDetails();
  maxDate = new Date(new Date().setDate(new Date().getDate()));
  constructor(private _route: Router, private _patientService: PatientService, private _dialog: MatDialog) { }


  ngDoCheck() {
    if (this.patient.Payment.Discount && this.patient.Payment.TotalAmount)
      this.patient.Payment.DiscountAmount = (this.patient.Payment.Discount) * (this.patient.Payment.TotalAmount) * 0.01;
    if (this.patient.Payment.DiscountAmount || this.patient.Payment.DiscountAmount==0)
      this.patient.Payment.NetAmount = this.patient.Payment.TotalAmount - this.patient.Payment.DiscountAmount;
    if (this.patient.Payment.PaidAmount)
      this.patient.Payment.BalanceAmount = this.patient.Payment.NetAmount - this.patient.Payment.PaidAmount;

  }


  ngOnInit()
  {
    if (!(sessionStorage.getItem("isLoggedIn")))
      this._route.navigate(['login'], { replaceUrl: true });
  }
 
  SavePatient() {

    this.patient.AddedBy = sessionStorage.getItem("userName");
    this.patient.CreatedOn = new Date();
    this.patient.ModifiedOn = new Date();

    console.log(this.patient.Tests.Malaria);
    console.log(this.patient.Tests.Typhoid);

    if (typeof (this.patient.Address) == "undefined")
      this.patient.Address = "";
    if (typeof (this.patient.MiddleName) == "undefined")
      this.patient.MiddleName = "";

    var patientId: number;
    this._patientService.SavePatient(this.patient).subscribe(
      data => {
        patientId = data as number;
        this.OpenDialog(patientId);
      })
  }

  OpenDialog(patientId) {

    let dialogRef = this._dialog.open(DialogSavePatientComponent, { data: { id: patientId } });

  }
}
