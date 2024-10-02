import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-transac-unpaid',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './transac-unpaid.component.html',
  styleUrl: './transac-unpaid.component.css',
})
export class TransacUnpaidComponent implements OnInit{
  trans: any;
  
  constructor(
    private admin: AdminService
  ){}
  ngOnInit(): void {
    this.admin.Transadisplay().subscribe((result: any) => {
      this.trans = result.data;
  
      if (this.trans && this.trans.length > 0) {
          // Filter the transactions to include only those with status 'Pending'
          const pendingTransactions = this.trans.filter((transaction: any) => transaction.Transac_status === 'unpaid');
  
          if (pendingTransactions.length > 0) {
              // If there are pending transactions, log them
              console.log('Pending Transactions:', pendingTransactions);
              // You can assign the pending transactions to a variable to display them in your template
              this.trans = pendingTransactions;
          } else {
              // If no pending transactions are found, handle accordingly
              console.log('No pending transactions found');
              // Optional: clear the transactions or show a message in your template
              this.trans = [];
          }
      } else {
          // Handle the case where no transactions are available
          console.log('No transactions available');
          this.trans = [];
      }
  });
  
  }

  Approved(){
    console.log("Sample")
    
  }
}
