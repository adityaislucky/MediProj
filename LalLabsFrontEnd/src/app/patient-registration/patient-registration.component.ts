import { Component, DoCheck, OnInit} from '@angular/core';
import { PatientDetails } from './patient-details';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from './patient-service';
import { combineAll } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { DialogSavePatientComponent } from '../dialog-save-patient/dialog-save-patient.component';
import { GetPatientDetails } from '../models/get-patient-details';


@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit, DoCheck{

  mode: string;
  patient = new PatientDetails();
  maxDate = new Date(new Date().setDate(new Date().getDate()));
  constructor(private _route: Router, private _patientService: PatientService, private _dialog: MatDialog, private _aRoute: ActivatedRoute) { }


  ngDoCheck() {
      if (this.patient.Payment.Discount && this.patient.Payment.TotalAmount)
        this.patient.Payment.DiscountAmount = (this.patient.Payment.Discount) * (this.patient.Payment.TotalAmount) * 0.01;
      if (this.patient.Payment.DiscountAmount || this.patient.Payment.DiscountAmount == 0)
        this.patient.Payment.NetAmount = this.patient.Payment.TotalAmount - this.patient.Payment.DiscountAmount;
      if (this.patient.Payment.PaidAmount)
        this.patient.Payment.BalanceAmount = this.patient.Payment.NetAmount - this.patient.Payment.PaidAmount;
  }

  ngOnInit()
  {
    if (!(sessionStorage.getItem("isLoggedIn")))
      this._route.navigate(['login'], { replaceUrl: true });
    let id = parseInt(this._aRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.mode = "update";
      let tempArray: GetPatientDetails[];
      this._patientService.GetPatient(id).subscribe(data => {
        tempArray = data;
        let tempObj = tempArray[0];
        this.initializePatient(tempObj);
      });
    }
  }

  initializePatient(tempObj) {
    this.patient.Title = tempObj.Title;
    this.patient.FirstName = tempObj.FirstName;
    this.patient.MiddleName = tempObj.MiddleName;
    this.patient.LastName = tempObj.LastName;
    this.patient.Age = tempObj.Age;
    this.patient.DateOfBirth = tempObj.DateOfBirth;
    this.patient.Phone = tempObj.Phone;
    this.patient.Address = tempObj.Address;
    this.patient.DoctorName = tempObj.DoctorName;
    this.patient.BarCode = tempObj.Barcode;
    this.patient.Tests.Malaria = tempObj.Malaria;
    this.patient.Tests.Malaria = tempObj.Typhoid;
    this.patient.Payment.PaymentMode = tempObj.PaymentMode;
    this.patient.Payment.TotalAmount = tempObj.TotalAmount;
    this.patient.Payment.Discount = tempObj.Discount;
    this.patient.Payment.DiscountAmount = tempObj.DiscountAmount;
    this.patient.Payment.NetAmount = tempObj.NetAmount;
    this.patient.Payment.PaidAmount = tempObj.PaidAmount;
    this.patient.Payment.BalanceAmount = tempObj.BalanceAmount;
    this.patient.AddedBy = tempObj.AddedBy;
    this.patient.CreatedOn = tempObj.CreatedOn;
    this.patient.ModifiedOn = tempObj.ModifiedOn;
  }

  SavePatient() {

    this.patient.AddedBy = sessionStorage.getItem("userName");
    this.patient.CreatedOn = new Date();
    this.patient.ModifiedOn = new Date();

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
