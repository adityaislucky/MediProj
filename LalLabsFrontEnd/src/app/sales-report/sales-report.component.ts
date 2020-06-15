import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesModel } from './sales-model';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SalesReportService } from './sales-report.service';
import { NgForm } from '@angular/forms';
import { DialogSalesGraphComponent } from '../dialog-sales-graph/dialog-sales-graph.component';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {

  FromDate: Date;
  ToDate: Date;
  Submit = false;
  dataSource = new MatTableDataSource<SalesModel>();
  displayedColumns: string[] = ['CreatedOn', 'TotalAmount', 'DiscountAmount', 'NetAmount', 'PaidAmount', 'BalanceAmount'];

  constructor(private _route: Router, private _salesReportService: SalesReportService, public dialog: MatDialog) { }

  maxDate = new Date(new Date().setDate(new Date().getDate()));

  ngOnInit() {
    if (!(sessionStorage.getItem("isLoggedIn")))
      this._route.navigate(['login'], { replaceUrl: true });
    if (sessionStorage.getItem("userRole") != "admin")
      this._route.navigate(['pageNotFound'], { replaceUrl: true });
  }

  DateSubmit(form: NgForm) {
    this._salesReportService.SalesReport(this.FromDate, this.ToDate).subscribe(data => {
      this.dataSource.data = data;
      this.Submit = true;
    });
  }

  getTotalAmount() {
    return this.dataSource.data.map(t => t.TotalAmount).reduce((acc, value) => acc + value, 0);
  }

  getDiscountAmount() {
    return this.dataSource.data.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
  }

  getNetAmount() {
    return this.dataSource.data.map(t => t.NetAmount).reduce((acc, value) => acc + value, 0);
  }

  getPaidAmount() {
    return this.dataSource.data.map(t => t.PaidAmount).reduce((acc, value) => acc + value, 0);
  }

  getBalanceAmount() {
    return this.dataSource.data.map(t => t.BalanceAmount).reduce((acc, value) => acc + value, 0);
  }

  ViewSalesGraph() {
    const dialogRef = this.dialog.open(DialogSalesGraphComponent, {
      width: '95%',
      height: '95%',
      data: { salesData: this.dataSource.data, fromDate: this.FromDate, toDate: this.ToDate }
    });
  }
}
