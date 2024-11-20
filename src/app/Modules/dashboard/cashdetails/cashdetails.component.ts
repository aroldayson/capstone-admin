import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  staff: any[] = []; 
  InitialFrom: FormGroup;

  constructor(private admin: AdminService, private route: Router) {
    this.InitialFrom = new FormGroup({
      Staff_ID: new FormControl(null),
      Initial_amount: new FormControl(0.0, [Validators.min(0)]),
    });
  }

  ngOnInit(): void {
    this.admin.Staffinitail().subscribe(
      (result: any) => {
        this.staff = result; 
        console.log(this.staff); 
      },
      (error) => {
        console.error('Error fetching staff data:', error);
      }
    );
  }

  enforceNonNegative(): void {
    const control = this.InitialFrom.get('Initial_amount');
    if (control && control.value < 0) {
      control.setValue(0);
    }
  }

  clearForm(): void {
    this.InitialFrom.reset({
      Staff_ID: null,
      Initial_amount: 0.0,
    });
  }

  save(): void {
    console.log(this.InitialFrom.value);
    this.admin.cashinitial(this.InitialFrom.value).subscribe(
      (result: any) => {
        if (result.message === 'Success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: true,
          }).then(() => location.reload());
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
