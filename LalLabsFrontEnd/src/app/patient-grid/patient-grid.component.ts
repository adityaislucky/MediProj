import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientGridService } from './patient-grid.service';
import { PatientDetails } from './patient-details';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
export class PatientGridComponent implements OnInit {

  dataSource = new MatTableDataSource<PatientDetails>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  columnsToDisplay = ['PatientId', 'FirstName', 'LastName', 'Phone', 'DoctorName', 'TotalAmount', 'BalanceAmount'];
  expandedElement: PatientDetails|null;
  constructor(private _patientService: PatientGridService, private _route: Router) { }

  ngOnInit() {

    if (!(sessionStorage.getItem("isLoggedIn")))
      this._route.navigate(['login'], { replaceUrl: true });
    this._patientService.PatientGrid(sessionStorage.getItem("userName")).subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    })
    
  }

}

