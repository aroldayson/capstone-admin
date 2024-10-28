import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-view-historytransac',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule,NgxPrintModule],
  templateUrl: './view-historytransac.component.html',
  styleUrl: './view-historytransac.component.css',
})
export class ViewHistorytransacComponent implements OnInit{
  cust_id = {id:localStorage.getItem('Cust_ID')}
  his_id = {id:localStorage.getItem('Transac_ID')}
  custs:any;
  histo: any;
  totalAmount: any;
  cust: any;
  totalpayment: any;
  balance: any;
  data:any;
  totalPayment: any;
  histoss: any;
  trans_id: any;
  payment: any;
  trackingnumber: any;

  constructor(
    private admin: AdminService
  ){}
  ngOnInit(): void {
    this.admin.findcustomer(this.cust_id.id).subscribe(
      (result: any) => {
        this.cust = result; 
        console.log(result);
      }
    );
    this.admin.findtransactionprint(this.his_id.id).subscribe(
      (result: any) => {
        // this.custs = result;
        this.histo = result.data; 
        this.trackingnumber = result.data[0].Tracking_number;
        this.payment = result.data[0].totalPaymentAmount;
        // this.histoss = result.trans.Tracking_number;  
        this.totalpayment = result.price;
        this.balance = result.data[0].balanceAmount; 
        console.log( this.histo,this.payment,this.totalpayment,this.trackingnumber );
      }
    );
    // this.admin.getprint(this.his_id.id).subscribe(
    //   (result: any) => {
    //     this.data = result.trans; // Assign transactions to 'data'
    //     this.trans_id = result.trans[0].Tracking_number
    //     this.totalAmount = result.totalprice
    //     this.totalpayment = result.amount
    //     this.balance = result.balance
    //     this.totalPayment = result[0].totalprice; // Assign total price from the result
    //     // this.totalPayment = result.balance;
    //     console.log('Total Payment:', this.data); // Check the value
    //   },
    //   error => {
    //     console.error('Error fetching data:', error); // Log any error
    //   }
    // );
    
  }
}
