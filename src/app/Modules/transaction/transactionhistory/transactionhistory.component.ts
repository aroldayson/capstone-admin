import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactionhistory',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterOutlet,RouterModule],
  templateUrl: './transactionhistory.component.html',
  styleUrl: './transactionhistory.component.css'
})
export class TransactionhistoryComponent implements OnInit{
  date_id =  localStorage.getItem('datetimeincome');
  dateincome: any;
  amount: any;


  constructor(
    private admin: AdminService,
    private route: Router
  ){}

  ngOnInit(): void {
    this.admin.DisplayAllTransaction(this.date_id).subscribe((result: any) => {
      this.dateincome = result.data;
      this.amount = result.data.reduce((sum: any, item: any) => sum + item.totalprice, 0);
      // this.amount = result.data[0].totalprice;
      console.log(this.dateincome, this.amount)
    });
  }
  // get totalPaymentsSum(): number {
  //   return this.dateincome?.reduce((sum, item) => sum + (item.totalprice || 0), 0) || 0;
  // }
}
