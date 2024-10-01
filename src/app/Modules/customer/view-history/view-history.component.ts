import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-history',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './view-history.component.html',
  styleUrl: './view-history.component.css',
})
export class ViewHistoryComponent implements OnInit{
  cust_id = {id:localStorage.getItem('Cust_ID')}
  cust: any
  custs: any
  totalAmount: any;
  histo: any;
  transactions: any[] = [];

  constructor(
    private admin: AdminService,
    private route: Router
  ){}
  ngOnInit(): void {
    this.admin.findcustomer(this.cust_id.id).subscribe(
      (result: any) => {
        this.cust = result; 
        console.log(result);
      }
    );
    this.admin.findtransaction(this.cust_id.id).subscribe(
      (result: any) => {
        this.custs = result;
        this.histo = result.trans; 
        this.totalAmount = result.totalprice; 
        console.log(result);
      }
    );
  }
  history(id:any){
    console.log(id)
    localStorage.setItem('Transac_ID', id)
    this.route.navigate(["/main/customertpage/main/view-listtransac"])
  }
}
