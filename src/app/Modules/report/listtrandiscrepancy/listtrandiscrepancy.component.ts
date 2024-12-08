import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listtrandiscrepancy',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgxPrintModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './listtrandiscrepancy.component.html',
  styleUrl: './listtrandiscrepancy.component.css'
})
export class ListtrandiscrepancyComponent implements OnInit{
  date_id =  localStorage.getItem('datetimeincome');
  income: any;
  payments: any;
  expenses: any;
  overalltotal: any;
  dateincome: any;
  totalpayments: any;
  totalexpenses: any;
  staff: any;
  remit: any;
  initial: any;
  totalinitial: any;
  totalremit: any;
  constructor(
    private admin: AdminService,
    private route: Router
  ){}
  ngOnInit(): void {
    this.admin.hisdisplaydicsripancy(this.date_id).subscribe((result: any) => {
      this.payments = result.transactionPayments;
      this.expenses = result.transactionExpenses;
      this.remit = result.transactionRemittance;
      this.initial = result.transactionInitialamount;
      this.dateincome = result.transactionPayments[0].transactionDate;
      this.staff = result.transactionRemittance[0].adminNames;

      this.totalexpenses = result.totalExpense;
      this.totalpayments = result.totalPayments;
      this.totalinitial = result.initial;
      this.totalremit = result.remittance;
      this.overalltotal = result.total;


      // this.totalpayments = result.totalPayments;
      // this.totalexpenses = result.totalExpense;
      // this.overalltotal = result.total;
      // this.dateincome = result.transactionPayments[0].transactionDate;
      // this.staff = result.transactionExpenses[0].adminNames;
      console.log(this.payments,this.expenses,this.remit,this.initial)
    });
  }

}
