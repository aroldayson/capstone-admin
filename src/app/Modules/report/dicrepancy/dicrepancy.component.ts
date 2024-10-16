import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dicrepancy',
  standalone: true,
  imports: [RouterLink,NgxPrintModule,CommonModule],
  templateUrl: './dicrepancy.component.html',
  styleUrl: './dicrepancy.component.css'
})
export class DicrepancyComponent implements OnInit{
  remit: any;

  constructor(
    private admin: AdminService
  ){}
  ngOnInit(): void {
    this.admin.remittanceapproved().subscribe((result: any) => {
      this.remit = result.combinedData;
      if (this.remit && this.remit.length > 0) {
          const pendingTransactions = this.remit.filter((transaction: any) => transaction.Fund_status === 'Approve');

          if (pendingTransactions.length > 0) {
              // console.log('Pending Transactions:', pendingTransactions);
              this.remit = pendingTransactions;
          } else {
              console.log('No pending transactions found');
              this.remit = [];
          }
      } else {
          console.log('No transactions available');
          this.remit = [];
      }
      console.log(this.remit);
    });
  }

}
