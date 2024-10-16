import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgxPrintModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit{
  income: any;
  totalpayment: any;
  totalexpense: any;
  totalincome: any;
  totalcash: any;
  
  constructor(
    private admin: AdminService
  ){}
  ngOnInit(): void {
    this.admin.displayincome().subscribe((result: any) => {
      this.income = result.combinedData;
      this.totalpayment = result.totalPayments;
      this.totalexpense = result.totalExpense;
      this.totalincome = result.totalNetIncome;
      this.totalcash = result.cashed;
      console.log(
        this.income,
        this.totalpayment,
        this.totalexpense,
        this.totalincome,
        this.totalcash
      );
    });
  }

}
