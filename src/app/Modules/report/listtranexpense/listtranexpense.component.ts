import { Component, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listtranexpense',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgxPrintModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './listtranexpense.component.html',
  styleUrl: './listtranexpense.component.css'
})
export class ListtranexpenseComponent implements OnInit{

  date_id =  localStorage.getItem('datetimeincome');
  income: any;
  payments: any;
  expenses: any;
  overalltotal: any;
  dateincome: any;
  constructor(
    private admin: AdminService,
    private route: Router
  ){}
  ngOnInit(): void {
    this.admin.hisdisplayexpenses(this.date_id).subscribe((result: any) => {
      this.expenses = result.price;
      this.overalltotal = result.totalAmount;
      this.dateincome = result.price[0].transactionDate;
      console.log(this.payments,this.expenses,this.overalltotal)
    });
  }

}
