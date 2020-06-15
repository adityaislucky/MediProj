import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-sales-graph',
  templateUrl: './dialog-sales-graph.component.html',
  styleUrls: ['./dialog-sales-graph.component.css']
})
export class DialogSalesGraphComponent implements OnInit {

  ChartType = "LineChart";
  Height = 650;
  Width = 1000;
  TotalAmountGraph: any[][] = [];
  TotalAmountGraphTitle: string;
  TotalAmountGraphColumns = ['Date', 'Total Amount', 'Discount Amount', 'Net Amount', 'Paid Amount', 'Balance Amount'];
  TotalAmountGraphOptions = {
    hAxis: {
      title: 'Date'
    },
    vAxis: {
      title: 'Amount'
    },
    crosshair: {
      color: '#000000',
      trigger: 'selection'
    }
  };

  constructor(private _route: Router, private _dialogRef: MatDialogRef<DialogSalesGraphComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _datePipe: DatePipe) {
    _dialogRef.disableClose = true;
  }

  ngOnInit() {
    if (!(sessionStorage.getItem("isLoggedIn")))
      this._route.navigate(['login'], { replaceUrl: true });
    if (sessionStorage.getItem("userRole") != "admin")
      this._route.navigate(['pageNotFound'], { replaceUrl: true });
    this.createTotalAmountArray();
  }

  createTotalAmountArray() {
    for (var temp of this.data.salesData) {
      let showDate = this._datePipe.transform(temp.CreatedOn, 'dd-MMM');
      this.TotalAmountGraph.push([showDate, temp.TotalAmount, temp.DiscountAmount, temp.NetAmount, temp.PaidAmount, temp.BalanceAmount])
    }
    this.TotalAmountGraphTitle = "Showing Amount Between " + this._datePipe.transform(this.data.fromDate) + " And " + this._datePipe.transform(this.data.toDate);
  }
}
