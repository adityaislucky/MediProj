import { Component, DoCheck, OnInit} from '@angular/core';
import { PatientDetails } from './patient-details';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from './patient-service';
import { MatDialog } from '@angular/material';
import { DialogSavePatientComponent } from '../dialog-save-patient/dialog-save-patient.component';
import { GetPatientDetails } from '../models/get-patient-details';
import { TestPrice } from './test-price';
import { TestService } from './test-service';
import { PhoneService } from './phone-service';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit, DoCheck{

  mode: string;
  patient = new PatientDetails();
  testPrices: TestPrice[] = [];
  years: number;
  months: number;
  days: number;
  maxDate = new Date(new Date().setDate(new Date().getDate()));
  panelOpenState = false;
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  constructor(private _route: Router, private _patientService: PatientService, private _testService: TestService,
    private _phoneService: PhoneService, private _dialog: MatDialog, private _aRoute: ActivatedRoute) { }


  ngDoCheck() {
    if (this.patient.DateOfBirth)
      this.CalculateAge();

    this.patient.Payment.TotalAmount = 0;
    if (this.patient.HomeCollection.CollectionCharges)
      this.patient.Payment.TotalAmount += parseInt(this.patient.HomeCollection.CollectionCharges.toString());

    if (this.testPrices.length > 0) {
      if (this.patient.Tests.Malaria)
        this.patient.Payment.TotalAmount += this.testPrices[0].TestPrice;
      if (this.patient.Tests.Typhoid)
        this.patient.Payment.TotalAmount += this.testPrices[1].TestPrice;
    }

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

    this._testService.GetTestPrice().subscribe(data => {
      this.testPrices = data;
    });

    this._phoneService.GetAllPhones().subscribe(data => {
      var temp = data;
      this.options = temp;
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  initializePatient(tempObj) {
    this.myControl.setValue(tempObj.Phone);
    this.patient.Title = tempObj.Title;
    this.patient.FirstName = tempObj.FirstName;
    this.patient.MiddleName = tempObj.MiddleName;
    this.patient.LastName = tempObj.LastName;
    this.patient.Age = tempObj.Age;
    this.patient.DateOfBirth = tempObj.DateOfBirth;
    this.patient.Email = tempObj.Email;
    this.patient.Address = tempObj.Address;
    this.patient.DoctorName = tempObj.DoctorName;
    this.patient.BarCode = tempObj.Barcode;
    this.patient.Home = tempObj.HomeCollection;

    this.patient.HomeCollection.CollectionDate = tempObj.CollectionDate;
    this.patient.HomeCollection.CollectedBy = tempObj.CollectedBy;
    this.patient.HomeCollection.CollectionAddress = tempObj.CollectionAddress;
    this.patient.HomeCollection.CollectionCharges = tempObj.CollectionCharges;

    this.patient.Tests.Malaria = tempObj.Malaria;
    this.patient.Tests.Typhoid = tempObj.Typhoid;

    this.patient.Payment.PaymentMode = tempObj.PaymentMode;
    this.patient.Payment.Discount = tempObj.Discount;
    this.patient.Payment.PaidAmount = tempObj.PaidAmount;
    this.patient.AddedBy = tempObj.AddedBy;
    this.patient.CreatedOn = tempObj.CreatedOn;
    this.patient.ModifiedOn = tempObj.ModifiedOn;
  }

  SavePatient(form: NgForm) {

    this.patient.Phone = this.myControl.value;
    this.patient.AddedBy = sessionStorage.getItem("userName");
    this.patient.CreatedOn = new Date();
    this.patient.Age = this.years.toString() + "Years " + this.months.toString() + "Months " + this.days.toString() + "Days";
    var patientId: number;
    this._patientService.SavePatient(this.patient).subscribe(
      data => {
        form.reset();
        patientId = data as number;
        this.OpenDialog(patientId);
      })
  }

  OpenDialog(patientId) {

    let dialogRef = this._dialog.open(DialogSavePatientComponent, { data: { id: patientId } });

  }

  CalculateAge() {
    var startDate = new Date(new Date(this.patient.DateOfBirth).toISOString().substr(0, 10));
    var endingDate = new Date().toISOString().substr(0, 10);
    var endDate = new Date(endingDate);
    if (startDate > endDate) {
      var swap = startDate;
      startDate = endDate;
      endDate = swap;
    }
    var startYear = startDate.getFullYear();
    var february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    var daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var yearDiff = endDate.getFullYear() - startYear;
    var monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
    var dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
        yearDiff--;
        monthDiff = 11;
      }
      dayDiff += daysInMonth[startDate.getMonth()];
    }
    this.years = yearDiff;
    this.months = monthDiff;
    this.days = dayDiff;
  }

  FilterTests(event: any) {
  // Declare variables
  var input, filter, table, tr, i, txtValue;
  input = document.getElementById("searchTest");
  filter = input.value.toUpperCase();
  table = document.getElementById("testsTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
    for(i = 0; i < tr.length; i++) {
      var firstColumn = tr[i].getElementsByTagName("td")[0];
      var secondColumn = tr[i].getElementsByTagName("td")[1];
      if (firstColumn || secondColumn) {
        var txtValue1 = firstColumn.textContent || firstColumn.innerText;
        var txtValue2 = secondColumn.textContent || secondColumn.innerText;
        if ((txtValue1.toUpperCase().indexOf(filter) > -1) || (txtValue2.toUpperCase().indexOf(filter) > -1)) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  phoneChange(form: NgForm) {
    if (this.myControl.valueChanges && this.myControl.value != null) {
      this._phoneService.GetPatientByPhone(this.myControl.value as string).subscribe(data => {
        let tempArray: GetPatientDetails[];
        tempArray = data;
        if (tempArray) {
          if (tempArray.length) {
            let tempObj = tempArray[tempArray.length - 1];
            this.initializePatientByPhone(tempObj);
          }
          else
            form.reset();
        }
      });
    }
  }

  initializePatientByPhone(tempObj) {
    this.patient.Title = tempObj.Title;
    this.patient.FirstName = tempObj.FirstName;
    this.patient.MiddleName = tempObj.MiddleName;
    this.patient.LastName = tempObj.LastName;
    this.patient.DateOfBirth = tempObj.DateOfBirth;
    this.patient.Address = tempObj.Address;
    this.patient.Email = tempObj.Email;
  }
}
