import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import Swal from 'sweetalert2';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-cashdetails',
  standalone: true,
  imports: [RouterLink, FormsModule,CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './cashdetails.component.html',
  styleUrl: './cashdetails.component.css'
})
export class CashdetailsComponent {
  staff: any[] = []; // Populate this with your staff data
  selectedCashier: string = '';
  cashierId: any;
  InitialAmount: any;

  InitialFrom = new FormGroup({
    Staff_ID: new FormControl(null),
    Initial_amount: new FormControl(0.0),
  })
  
 

  constructor(
    private admin: AdminService,
    private route: Router
  ){}

  ngOnInit(): void {
    this.admin.Staffinitail().subscribe(
      (result: any) => {
        this.staff = result; // Store payments
        console.log(this.staff); // Log for debugging
      },
      (error) => {
        console.error('Error fetching payment data:', error);
      }
    );
    
  }

  clearForm(): void {
    this.InitialFrom = new FormGroup({
      Staff_ID: new FormControl(null),
      Initial_amount: new FormControl(0.0),
    })
  }

  
  save(): void{
    console.log(this.InitialFrom.value);
    // Swal.fire({
    //   position: "top-end",
    //   icon: "success",
    //   title: "Your work has been saved",
    //   showConfirmButton: true, 
    // })
  
    this.admin.cashinitial(this.InitialFrom.value).subscribe(
      (result: any) => {
        if (result.message === 'Success') {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: true, 
          }).then(() => {
            location.reload();
          });
          this.route.navigate(['/main/dashboardpage/dashboardmain/dashboardview']);
        } else {
          console.error('Error occurred during save:', result);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}
