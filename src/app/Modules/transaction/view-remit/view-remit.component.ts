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
      this.remit = result.Data;
      this.expenses = result.Expenses;
      this.initial = result.Initial;
      this.payment = result.Payment;
      this.remittance = result.Remit;
      this.totalprice = result.totalprice;
      console.log(this.remit,this.expenses,this.initial,this.payment,this.totalprice);
    });
  }

  print(id: any){
    console.log(id);
    localStorage.setItem('Staff_ID', id);
    this.route.navigate(['/main/tansactionpage/main/view-tran/viewremit-his'])
    // routerLink=""
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
