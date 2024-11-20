import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchfilterPipe } from '../../../searchfilter.pipe';

@Component({
  selector: 'app-transac-paid',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,SearchfilterPipe],
  templateUrl: './transac-paid.component.html',
  styleUrl: './transac-paid.component.css',
})
export class TransacPaidComponent implements OnInit{
  trans: any;
  keyword: any
  constructor(
    private admin: AdminService
  ){}
  ngOnInit(): void {
    this.admin.Transadisplay().subscribe((result: any) => {
      this.trans = result.data;
      console.log(this.trans)
  
      if (this.trans && this.trans.length > 0) {
          const pendingTransactions = this.trans.filter((transaction: any) => transaction.Transac_status === 'paid');
  
          if (pendingTransactions.length > 0) {
              this.trans = pendingTransactions;
          } else {
              console.log('No pending transactions found');
              this.trans = [];
          }
      } else {
          console.log('No transactions available');
          this.trans = [];
      }
  });
  }
}
