import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgxPrintModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit{
  income: any[] = [];
  totalpayment: any;
  totalexpense: any;
  totalincome: any;
  totalcash: any[] = [];
  today: any;
  fromDate: string = '';  
  toDate: string = '';   
  data: any[] = [];      
  filteredData: any[] = [];
  
  constructor(
    private admin: AdminService,
    private route: Router
  ){}
  ngOnInit(): void {
    this.admin.displayincome().subscribe((result: any) => {
      this.income = result.transactions;
      this.filteredData = this.income; 
      this.totalpayment = result.totalPayments;
      this.totalexpense = result.totalExpenses;
      this.totalincome = result.total;
      this.totalcash = result.transactions;
      
  
      console.log('Income Data:', this.income, this.totalpayment, this.totalexpense,  this.totalincome);
    });
  }

  get totalPaymentsSum(): number {
    return this.income ? this.income.reduce((sum, item) => sum + (item.totalPayments || 0), 0) : 0;
  }
  get totalExpenseSum(): number {
    return this.income ? this.income.reduce((sum, item) => sum + (item.totalExpenses || 0), 0) : 0;
  }
  get totalSum(): number {
    return this.income ? this.income.reduce((sum, item) => sum + (item.total || 0), 0) : 0;
  }


  onDateChange() {
    if (this.fromDate && this.toDate) {
      const fromDateStart = new Date(this.fromDate);
      fromDateStart.setHours(0, 0, 0, 0); 
  
      const toDateEnd = new Date(this.toDate);
      toDateEnd.setHours(23, 59, 59, 999);
  
      this.filteredData = this.income.filter(i => {
        const itemDateTime = new Date(i.transactionDate).getTime(); 
        return itemDateTime >= fromDateStart.getTime() && itemDateTime <= toDateEnd.getTime();
      });
  
      this.calculateTotals();
  
      console.log('Filtered Data:', this.filteredData);
    } else {
      this.filteredData = this.income;
      this.calculateTotals(); 
    }
  }
  
  calculateTotals() {
    this.totalpayment = this.filteredData.reduce((acc, i) => acc + (i.totalPayments || 0), 0);
    this.totalexpense = this.filteredData.reduce((acc, i) => acc + (i.totalExpenses || 0), 0);
    this.totalincome = this.filteredData.reduce((acc, i) => acc + (i.total || 0), 0);
  }
  
  incomes(data: any){
    localStorage.setItem('datetimeincome', data);
    this.route.navigate([
      '/main/reportpage/reportmain/reportview/listincome',
    ]);
    console.log(data);
  }
  
  

}
