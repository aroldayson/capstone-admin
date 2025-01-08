import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dicrepancy',
  standalone: true,
  imports: [RouterLink, NgxPrintModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dicrepancy.component.html',
  styleUrls: ['./dicrepancy.component.css']  
})
export class DicrepancyComponent implements OnInit {
  remit: any[] = [];           
  fromDate: string = '';       
  toDate: string = '';         
  filteredData: any[] = [];    
  isLoading: boolean = false;

  constructor(
    private admin: AdminService,
    private route: Router
) {}

  ngOnInit(): void {
      // this.admin.remittanceapproved().subscribe((result: any) => {
      //     this.remit = result;
      //     this.filteredData = this.remit;

      //     this.filteredData = this.filteredData.filter((transaction: any) => transaction.Fund_status === 'Approve');

      //     if (this.filteredData.length === 0) {
      //         console.log('No approved transactions found');
      //     }

      //     console.log('Remit Data:', this.filteredData);
      // });
      this.spinner();
      this.admin.displayDisrepancy().subscribe((result: any) => {
        this.remit = result;
        this.filteredData = this.remit;
        // this.filteredData = this.remit.filter(transaction => transaction.Fund_status === 'Approve'); 
        console.log('Remit Data:', this.filteredData);
    });
  }

  onDateChange(): void {
    if (this.fromDate && this.toDate) {
      const fromDateStart = new Date(this.fromDate);
      fromDateStart.setHours(0, 0, 0, 0); 
  
      const toDateEnd = new Date(this.toDate);
      toDateEnd.setHours(23, 59, 59, 999);
  
      this.filteredData = this.remit.filter(i => {
        const itemDateTime = new Date(i.transactionDate).getTime(); 
        return itemDateTime >= fromDateStart.getTime() && itemDateTime <= toDateEnd.getTime();
      });

  
      console.log('Filtered Data:', this.filteredData);
    }  else {
      this.filteredData = this.remit;

    }
  
    console.log('Filtered Data:', this.filteredData);
  }
  

  trackById(index: number, item: any): any {
    return item.id; // Replace `id` with your actual unique identifier field
  }
  
  

  spinner(){
    this.isLoading = true

    setTimeout(() => {
      this.isLoading = false;
    },3000);
  }

  discrepany(id: any){
    localStorage.setItem('datetimeincome', id);
    this.route.navigate([
      '/main/reportpage/reportmain/reportview/listdisrepancy',
    ]);
    console.log(id)
  }
}
