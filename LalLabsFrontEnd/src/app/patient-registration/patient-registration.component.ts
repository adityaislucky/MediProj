import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { PatientService } from './patient-service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DialogSavePatientComponent } from '../dialog-save-patient/dialog-save-patient.component';
import { TestService } from './test-service';
import { PhoneService } from './phone-service';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { PatientDetails } from './patient-details';
import { TestDetails } from './test-details';


@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit, DoCheck {

  mode: string;
  update = false;
  save = false;
  patient = new PatientDetails();
  years: number;
  months: number;
  days: number;
  dobChanged = false;
  docChanged = false;
  maxDate = new Date(new Date().setDate(new Date().getDate()));
  minDate = new Date(new Date().setDate(new Date().getDate()));
  panelOpenState = false;
  myControl = new FormControl();
  options: string[] = [];
  previousRecords: PatientDetails[] = [];
  filteredOptions: Observable<string[]>;
  displayedColumns: string[] = ['select', 'TestName', 'TestCode', 'TestPrice'];
  dataSource = new MatTableDataSource<TestDetails>();
  selection = new SelectionModel<TestDetails>(true, []);
  
  constructor(private _route: Router, private _patientService: PatientService, private _testService: TestService,
    private _phoneService: PhoneService, private _dialog: MatDialog, private _aRoute: ActivatedRoute) { }


  ngDoCheck() {
    if (this.patient.DateOfBirth)
      this.CalculateAge();

    this.patient.Payment.TotalAmount = 0;
    if (this.patient.HomeCollection && this.patient.HomeCollection.CollectionCharges)
      this.patient.Payment.TotalAmount += parseFloat(this.patient.HomeCollection.CollectionCharges.toString());

    if (this.patient.Home == false && this.patient.HomeCollection.CollectionCharges > 0)
      this.patient.Payment.TotalAmount -= parseFloat(this.patient.HomeCollection.CollectionCharges.toString());

    if (this.selection.selected.length > 0) {
      for (var test of this.selection.selected) {
        this.patient.Payment.TotalAmount += test.TestPrice;
      }
    }

    if (this.patient.Payment.Discount && this.patient.Payment.TotalAmount)
      this.patient.Payment.DiscountAmount = Math.round((this.patient.Payment.Discount) * (this.patient.Payment.TotalAmount) * 0.01);
    if (this.patient.Payment.DiscountAmount || this.patient.Payment.DiscountAmount == 0)
      this.patient.Payment.NetAmount = parseFloat((this.patient.Payment.TotalAmount - this.patient.Payment.DiscountAmount).toString());
    if (this.patient.Payment.PaidAmount)
      this.patient.Payment.BalanceAmount = parseFloat((this.patient.Payment.NetAmount - this.patient.Payment.PaidAmount).toFixed(2));
    
  }

  ngOnInit()
  {
    if (!(sessionStorage.getItem("isLoggedIn")))
      this._route.navigate(['login'], { replaceUrl: true });
    let id = parseInt(this._aRoute.snapshot.paramMap.get('id'));
    if (id) {
      if (sessionStorage.getItem('userRole') != 'admin')
        this._route.navigate(['pageNotFound'], { replaceUrl: true });
      this.mode = "update";
      this.update = true;
      this._patientService.GetPatient(id).subscribe(data => {
        this.patient = data;
        this.patient.Tests = data.Tests;
        this.myControl.setValue(this.patient.Phone);
      });
    }

    else
      this.save = true;

    this._testService.GetTestPrice().subscribe(data => {
      this.dataSource.data = data;
      if (this.mode == "update" || this.mode=="previous") {
        /* let testCodeArray = []; 
        for (var test of this.patient.Tests) {
          testCodeArray.push(test.TestCode);
        }
        this.selection = new SelectionModel<TestDetails>(true, [...this.dataSource.data.filter(row => testCodeArray.includes(row.TestCode))]); */
        this.selection = new SelectionModel<TestDetails>(true, [...this.dataSource.data.filter(row => JSON.stringify(this.patient.Tests).includes(JSON.stringify(row)))]);
      }
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: TestDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.TestCode}`;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  SavePatient(form: NgForm) {

    this.patient.Phone = this.myControl.value;
    this.patient.AddedBy = sessionStorage.getItem("userName");
    this.patient.CreatedOn = new Date();
    this.patient.CreatedOn.setHours(new Date().getHours() + 5);
    this.patient.Age = this.years.toString() + "Years " + this.months.toString() + "Months " + this.days.toString() + "Days";
    this.patient.Tests = this.selection.selected;
    if (this.dobChanged)
      this.changeDateOfBirth();
    if (this.docChanged && this.patient.HomeCollection.CollectionDate != null)
      this.changeCollectionDate();
    var patientId: number;
    this._patientService.SavePatient(this.patient).subscribe(
      data => {
        form.reset();
        this.patient.Payment.DiscountAmount = 0;
        patientId = data as number;
        this.OpenDialog(patientId);
      })
  }

  OpenDialog(patientId) {

    let dialogRef = this._dialog.open(DialogSavePatientComponent, { data: { id: patientId, mode: this.mode } });

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

  phoneChange(form: NgForm) {
    if (this.myControl.valueChanges && this.myControl.value != null) {
      this._phoneService.GetPatientByPhone(this.myControl.value as string).subscribe(data => {
        this.previousRecords = data;
      });
    }
  }

  InitializePatientByPhone(id) {
    this._patientService.GetPatient(id).subscribe(data => {
      this.patient = data;
      this.mode = "previous";
      this.previousRecords = [];
      this.ngOnInit();
    })
  }

  UpdatePatient(form: NgForm) {
    this.patient.Phone = this.myControl.value as string;
    this.patient.ModifiedOn = new Date();
    this.patient.ModifiedOn.setHours(new Date().getHours() + 5);
    this.patient.Age = this.years.toString() + "Years " + this.months.toString() + "Months " + this.days.toString() + "Days";
    this.patient.Tests = this.selection.selected;
    if (this.dobChanged)
      this.changeDateOfBirth();
    if (this.docChanged && this.patient.HomeCollection.CollectionDate != null)
      this.changeCollectionDate();
    var updatedId: number;
    this._patientService.UpdatePatient(this.patient).subscribe(
      data => {
        form.reset();
        this.patient.Payment.DiscountAmount = 0;
        updatedId = data as number;
        this.OpenDialog(updatedId);
      })
  }

  changeDateOfBirth() {
    this.patient.DateOfBirth.setDate(this.patient.DateOfBirth.getDate() + 1);
  }

  changeCollectionDate() {
    this.patient.HomeCollection.CollectionDate.setDate(this.patient.HomeCollection.CollectionDate.getDate() + 1);
  }

  DateOfBirthChanged() {
    this.dobChanged = true;
  }

  DateOfCollectionChanged() {
    this.docChanged = true;
  }
}
