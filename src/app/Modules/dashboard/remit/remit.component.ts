import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import Swal from 'sweetalert2';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-remit',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
  ],
  templateUrl: './remit.component.html',
  styleUrl: './remit.component.css',
})
export class RemitComponent implements OnInit {
  users: any;

  constructor(private admin: AdminService, private route: Router) {}
  ngOnInit(): void {
    this.users = { id: localStorage.getItem('Admin_ID') };
    console.log('Admin_ID:', this.users.id);
    this.get();
  }
  get() {
    this.admin.findstaff(this.users.id).subscribe((result: any) => {
      this.users = result;
      console.log(result);
    });
  }

  cashout = new FormGroup({
    Admin_ID: new FormControl(localStorage.getItem('Admin_ID')),
    Remittance: new FormControl(0.0),
  });

  clearForm() {
    this.cashout.reset(); 
  }

  save() {
    console.log(this.cashout.value);
    this.admin.remit(this.cashout.value).subscribe(
      (result: any) => {
        if (result.message === 'Success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: true,
          }).then(() => {
            location.reload();
          });
          this.route.navigate([
            '/main/dashboardpage/dashboardmain/dashboardview',
          ]);
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
