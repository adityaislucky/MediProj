import { Component, OnInit, ViewChild} from '@angular/core';
import { PatientGridService } from './patient-grid.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PatientDetails } from './patient-details';

@Component({
  selector: 'app-patient-grid',
  styleUrls: ['./patient-grid.component.css'],
  templateUrl: './patient-grid.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0'})),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  
})

export class PatientGridComponent implements OnInit{

  dataSource = new MatTableDataSource<PatientDetails>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  columnsToDisplay = ['PatientId', 'mergedField', 'FirstName', 'LastName', 'Phone', 'Age', 'Barcode', 'DoctorName', 'TotalAmount', 'BalanceAmount', 'select'];
  expandedElement: PatientDetails | null;
  selection = new SelectionModel<PatientDetails>(true, []);
  phoneArray: string[];
  admin = false;
  constructor(private _patientService: PatientGridService, private _route: Router) { }

  ngOnInit() {
    if (!(sessionStorage.getItem("isLoggedIn")))
      this._route.navigate(['login'], { replaceUrl: true });
    this._patientService.PatientGrid(sessionStorage.getItem("userName")).subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      if (sessionStorage.getItem('userRole') != 'admin') {
        this.maskValues();
      }
      else {
        this.admin = true;
      }
      this.displayAge();
    })
  }

  maskValues() {
    for (var temp of this.dataSource.data) {
      temp.Phone = temp.Phone.replace(/\d(?!\d{0,3}$)/gi, "X");
    }
  }

  UpdatePatient(PatientId: number) {
    this._route.navigate(['patientRegistration', PatientId]);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PatientDetails): string{
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Phone}`;
  }

  checkboxResult() {
    this.phoneArray = [];
    if (sessionStorage.getItem('userRole') != 'admin') {
      let tempArray = [];
      for (var patient of this.selection.selected) {
        tempArray.push(patient.PatientId);
      }
      var tempDataSource = new MatTableDataSource<PatientDetails>();
      this._patientService.PatientGrid(sessionStorage.getItem("userName")).subscribe(data => {
        tempDataSource.data = data;
        for (var patient of tempDataSource.data) {
          if (tempArray.indexOf(patient.PatientId)>=0) {
            this.phoneArray.push(patient.Phone);
          }
        }
        console.log(this.phoneArray);
      });
    }
    else {
      for (var patient of this.selection.selected)
        this.phoneArray.push(patient.Phone);
      console.log(this.phoneArray);
    }
  }

  displayAge() {
    /*for (var temp of this.dataSource.data) {
      var age = temp.Age.split(" ");
      var years = age[0];
      var months = age[1];
      var days = age[2];
      if (years == "0Years") {
        if (months == "0Months") {
          temp.Age = days;
        }
        else
          temp.Age = months;
      }
      else
        temp.Age = years;
    }
    */
  }
}

