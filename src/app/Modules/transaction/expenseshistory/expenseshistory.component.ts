import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-expenseshistory',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterOutlet,RouterModule],
  templateUrl: './expenseshistory.component.html',
  styleUrl: './expenseshistory.component.css'
})
export class ExpenseshistoryComponent implements OnInit{
  date_id =  localStorage.getItem('datetimeincome');
  dateincome: any;
  amount: any;


  constructor(
    private admin: AdminService,
    private route: Router
  ){}


  ngOnInit(): void {
    this.admin.DisplayAllExpenses(this.date_id).subscribe((result: any) => {
      this.dateincome = result.data;
      // this.amount = result.data[0].totalprice;
      this.amount = result.data.reduce((sum: any, item: any) => sum + item.Amount, 0);
      console.log(this.dateincome)
    });
  }
}
