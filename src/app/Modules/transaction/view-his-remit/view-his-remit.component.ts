import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-his-remit',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './view-his-remit.component.html',
  styleUrl: './view-his-remit.component.css'
})
export class ViewHisRemitComponent implements OnInit{

  remit: any
  currentDate: any;
  Transac = {id: localStorage.getItem('Cash_ID')}
  Initial: any;
  Expenses: any;
  data: any;
  Transacs: any;
  Totalprice: any;
  Totalreceive: any;
  TotalOver: any;
  Remit: any;
  totalAmount: any;
  day: any;
  month: any;
  year: any;

  constructor(
    private admin: AdminService,
    private route: Router
  ){}

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long', 
      day: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true 
    };
    return date.toLocaleDateString('en-US', options) ;
  }
  

  ngOnInit(): void {
    console.log(this.Transac.id);
    this.currentDate = this.formatDate(new Date());

    this.admin.printTransac(this.Transac.id).subscribe((result: any) => {
      this.data = result[0];
      this.day = result[0].transactionDate;
      // this.month = result[0].remitDay
      // this.year = result[0].remitMonth
      console.log(this.data,this.day);
    })
  }

  Transaction(id: any){
    localStorage.setItem('datetime', id);
    console.log(id)
    this.route.navigate(['/main/tansactionpage/main/view-tran/alltransaction'])
  }

  Expense(id: any){
    localStorage.setItem('datetime', id);
    console.log(id)
    this.route.navigate(['/main/tansactionpage/main/view-tran/allexpenses'])
  }

  approve(id: any){
    console.log(id);
    Swal.fire({
      title: "Do you want to approve the remittance?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.admin.approveremit(id).subscribe({
          next: (response) => {
            console.log('Update successful', response);
            Swal.fire({
              title: "Approved!",
              text: "The transaction has been approved.",
              icon: "success"
            }).then(() => {
              this.route.navigate(['/main/tansactionpage/main/view-tran/remittanceview']);
            });
          },
          error: (error) => {
            console.error('Update failed', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to approve transaction. Please try again.',
              icon: 'error'
            });
          }
        });
      }
    });
  }

  getAbsoluteProfit(profit: number | null): number {
    return Math.abs(profit ?? 0);
  }
  

}
