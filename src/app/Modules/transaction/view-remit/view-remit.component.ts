import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-remit',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './view-remit.component.html',
  styleUrl: './view-remit.component.css'
})
export class ViewRemitComponent implements OnInit{

  remit: any
  expenses: any;
  initial: any;
  payment: any;
  remittance: any;
  totalprice: any;


  constructor(
    private admin: AdminService,
    private route: Router
  ){}

  ngOnInit(): void {
    this.admin.remittanceapproved().subscribe((result: any) => {
      this.remit = result;
      if (this.remit && this.remit.length > 0) {
          const pendingTransactions = this.remit.filter((transaction: any) => transaction.Fund_status === 'Pending');

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

  getAbsoluteProfit(profit: number): number {
    return Math.abs(profit);
  }

  print(id: any){
    console.log(id);
    localStorage.setItem('Cash_ID', id);
    this.route.navigate(['/main/tansactionpage/main/view-tran/viewremit-his'])
  }
  approved(){
    Swal.fire({
      title: "Are you sure Approved?",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, approved it!",
      cancelButtonColor: "#d33",
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Approved!",
          text: "Your remittance has been approved.",
          icon: "success"
        });
      }
    });
  }

}
