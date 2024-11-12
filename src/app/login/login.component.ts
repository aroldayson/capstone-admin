import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';
import { resourceUsage } from 'node:process';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit(): void {}

  constructor(private admin: AdminService, private router: Router) {}

  loginform = new FormGroup({
    Email: new FormControl(''),
    Password: new FormControl(''),
  });

  login() {
    if (this.loginform.valid) {
      this.admin.logins(this.loginform.value).subscribe(
        (result: any) => {
          if (result && result.token) {
            Swal.fire({
              icon: 'success',
              title: 'Login Successful!',
              text: 'You are now logged in.',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });

            localStorage.setItem('Admin_ID', result.user.Admin_ID);
            localStorage.setItem('token', result.token);
            // console.log('Token stored:', result.token);
            this.router.navigate(['/main']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: 'Login was unsuccessful. Please try again.',
              showConfirmButton: true,
            });
          }
          console.log(result);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Please check your email and password.',
            showConfirmButton: true,
          });
          console.error('Login error:', error);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill in all required fields correctly.',
        showConfirmButton: true,
      });
      console.log('Form is not valid');
    }
  }
}
