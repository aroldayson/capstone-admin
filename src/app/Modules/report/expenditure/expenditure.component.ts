import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-expenditure',
  standalone: true,
  imports: [RouterLink,NgxPrintModule],
  templateUrl: './expenditure.component.html',
  styleUrl: './expenditure.component.css'
})
export class ExpenditureComponent implements OnInit{
  expen: any;
  amount: any;


  constructor(
    private admin: AdminService
  ){}
  ngOnInit(): void {
    this.admin.displayexpenses().subscribe((result: any) => {
      this.expen = result.price;
      this.amount = result.totalAmount;
      console.log(this.expen,this.amount);
    });
  }

}
