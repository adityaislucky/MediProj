import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TodaySalesService } from './dialog-today-sales.service';
import { TodaySalesModel } from './today-sales-model';

@Component({
  selector: 'app-dialog-today-sales',
  templateUrl: './dialog-today-sales.component.html',
  styleUrls: ['./dialog-today-sales.component.css']
})
export class DialogTodaySalesComponent implements OnInit {

  todaySales: TodaySalesModel;

  constructor(private _route: Router, private _dialogRef: MatDialogRef<DialogTodaySalesComponent>, private _datePipe: DatePipe,
    private _todaySalesService: TodaySalesService) {
    _dialogRef.disableClose = true;
  }

  ngOnInit() {
    if (!(sessionStorage.getItem("isLoggedIn")))
      this._route.navigate(['login'], { replaceUrl: true });
    this._todaySalesService.SalesReport().subscribe(data => {
      this.todaySales = data;
      this.todaySales = this.todaySales[0];
    })
  }

}
