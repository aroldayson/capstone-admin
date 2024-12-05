import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-listtranincome',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgxPrintModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './listtranincome.component.html',
  styleUrl: './listtranincome.component.css'
})
export class ListtranincomeComponent implements OnInit{
  date_id =  localStorage.getItem('datetimeincome');
  income: any;
  payments: any;
  expenses: any;
  overalltotal: any;
  dateincome: any;
  constructor(
    private admin: AdminService,
    private route: Router
  ){}
  ngOnInit(): void {
    this.admin.hisdisplayincome(this.date_id).subscribe((result: any) => {
      this.payments = result.transactionPayments;
      this.expenses = result.transactionExpenses;
      this.overalltotal = result.total;
      this.dateincome = result.transactionPayments[0].transactionDate;
      console.log(this.payments,this.expenses,this.overalltotal)
    });
  }

}
