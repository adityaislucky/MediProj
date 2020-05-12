import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientGridService } from './patient-grid.service';
import { PatientDetails } from './patient-details';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-grid',
  styleUrls: ['./patient-grid.component.css'],
  templateUrl: './patient-grid.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  
})
  //for change
export class PatientGridComponent implements OnInit {

  dataSource = new MatTableDataSource<PatientDetails>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  columnsToDisplay = ['PatientId', 'mergedField','FirstName', 'LastName', 'Phone', 'DoctorName', 'TotalAmount', 'BalanceAmount', 'select'];
  expandedElement: PatientDetails | null;
  selection = new SelectionModel<PatientDetails>(true, []);
  phoneArray: number[];
  constructor(private _patientService: PatientGridService, private _route: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    if (!(sessionStorage.getItem("isLoggedIn")))
      this._route.navigate(['login'], { replaceUrl: true });
    this._patientService.PatientGrid(sessionStorage.getItem("userName")).subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;

    })
    
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
    for (var patient of this.selection.selected)
      this.phoneArray.push(patient.Phone);
    console.log(this.phoneArray);
    if (this.phoneArray.length == 0) {
      var message = "No Patient Selected ..!!";
      var action = "Close";
      this._snackBar.open(message, action,{
          duration: 2000,
        });
    }
  }

}

