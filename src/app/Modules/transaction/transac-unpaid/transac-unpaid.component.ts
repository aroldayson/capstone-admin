import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminService } from '../../../admin.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchfilterPipe } from '../../../searchfilter.pipe';

@Component({
  selector: 'app-transac-unpaid',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule,RouterOutlet,FormsModule,SearchfilterPipe],
  templateUrl: './transac-unpaid.component.html',
  styleUrl: './transac-unpaid.component.css',
})
export class TransacUnpaidComponent implements OnInit{
  trans: any;
  error: any
  keyword: any;
  
  
  constructor(
    private admin: AdminService,
    private route: Router
  ){}
  ngOnInit(): void {
    this.admin.Transadisplay().subscribe((result: any) => {
      this.trans = result.data;
  
      if (this.trans && this.trans.length > 0) {
          const pendingTransactions = this.trans.filter((transaction: any) => transaction.latest_transac_status === 'pending'
        );
  
          if (pendingTransactions.length > 0) {
              console.log('Pending Transactions:', pendingTransactions);
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

  Approved(id: any) {

    // Swal.fire({
    //   title: "Payment type",
    //   input: "text",
    //   inputAttributes: {
    //     autocapitalize: "off"
    //   }})
    Swal.fire({
      title: "Payment type",
      // text: "You won't be able to revert this!",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.approveTransaction(id);
      }
    });
  }

  private approveTransaction(id: any) {
    Swal.fire({
      title: 'Processing...',
      text: 'Please wait while we approve the transaction.',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false
    });

    this.admin.approvetrans(id).subscribe({
      next: (response) => {
        console.log('Update successful', response);
        Swal.fire({
          title: "Approved!",
          text: "The transaction has been approved.",
          icon: "success"
        }).then(() => {
          this.route.navigate(['/main/tansactionpage/main/view-tran/view-paid']);
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
  
  
}


