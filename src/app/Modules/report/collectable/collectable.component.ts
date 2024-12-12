import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-collectable',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgxPrintModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './collectable.component.html',
  styleUrl: './collectable.component.css'
})
export class CollectableComponent implements OnInit{
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
    this.admin.collectable().subscribe((result: any) => {
      this.income = result.trans;
      // this.filteredData = this.income; 
      // this.totalpayment = result.totalPayments;
      // this.totalexpense = result.totalExpenses;
      // this.totalincome = result.total;
      // this.totalcash = result.transactions;

      if (this.income && this.income.length > 0) {
        const pendingTransactions = this.income.filter((transaction: any) => 
          transaction.latest_transac_status === 'folding' || 
          transaction.latest_transac_status === 'washing' ||
          transaction.latest_transac_status === 'forRelease' ||
          transaction.latest_transac_status === 'received' ||
          transaction.latest_transac_status === 'released'
        );

        if (pendingTransactions.length > 0) {
            this.income = pendingTransactions;
        } else {
            console.log('No pending transactions found');
            this.income = [];
        }
    } else {
        console.log('No transactions available');
        this.income = [];
    }
      
  
      console.log('Income Data:', this.income);
    });
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
