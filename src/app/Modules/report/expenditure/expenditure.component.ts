import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-expenditure',
  standalone: true,
  imports: [RouterLink,NgxPrintModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './expenditure.component.html',
  styleUrl: './expenditure.component.css'
})
export class ExpenditureComponent implements OnInit{
  expen: any[] = [];
  amount: any;
  fromDate: string = '';  
  toDate: string = '';   
  data: any[] = [];      
  filteredData: any[] = [];
  totalexpense: any;


  constructor(
    private admin: AdminService
  ){}
  ngOnInit(): void {
    this.admin.displayexpenses().subscribe((result: any) => {
      this.expen = result.price;
      this.filteredData = this.expen; 
      this.amount = result.totalAmount;
      console.log(this.expen,this.amount);
    });
  }

  onDateChange() {
    if (this.fromDate && this.toDate) {
      const fromDateStart = new Date(this.fromDate);
      fromDateStart.setHours(0, 0, 0, 0); 
  
      const toDateEnd = new Date(this.toDate);
      toDateEnd.setHours(23, 59, 59, 999);
  
      this.filteredData = this.expen.filter(i => {
        const itemDateTime = new Date(i.transactionDate).getTime(); 
        return itemDateTime >= fromDateStart.getTime() && itemDateTime <= toDateEnd.getTime();
      });
  
      this.calculateTotals();
  
      console.log('Filtered Data:', this.filteredData);
    } else {
      this.filteredData = this.expen;
      this.calculateTotals(); 
    }
  }
  
  calculateTotals() {
    this.amount = this.filteredData.reduce((acc, i) => acc + (i.totalExpenses || 0), 0);
    console.log('Filtered Data:', this.amount);
  }

}
