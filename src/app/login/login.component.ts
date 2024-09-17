import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,RouterModule,CommonModule,RouterOutlet,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
    
  }

  constructor(
    private admin: AdminService,
    private router: Router
  ){ }

  loginform = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  login() {
    if (this.loginform.valid) {
      this.admin.logins(this.loginform.value).subscribe(
        (result: any) => {
          if (result && result.token) {
            // Display success notification
            Swal.fire({
              icon: 'success',
              title: 'Login Successful!',
              text: 'You are now logged in.',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false
            });
  
            // Store the token in localStorage
            localStorage.setItem('token', result.token);
  
            // Navigate to the main page
            this.router.navigate(['/main']);
          } else {
            // Handle case where the result doesn't contain the token
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: 'Login was unsuccessful. Please try again.',
              showConfirmButton: true
            });
          }
          console.log(result);
        },
        (error) => {
          // Handle error response from the server (e.g., 401 Unauthorized)
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Please check your email and password.',
            showConfirmButton: true
          });
  
          // Log the error for debugging
          console.error('Login error:', error);
        }
      );
    } else {
      // Handle case where the form is not valid
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill in all required fields correctly.',
        showConfirmButton: true
      });
      console.log("Form is not valid");
    }
  }
  

  // login(){
  //   if(this.loginform.valid){
  //     this.admin.logins(this.loginform.value).subscribe((result: any) => {
  //       if(result.token){
  //         localStorage.setItem('token',result.token);
  //         this.router.navigate(['/main'])
  //       }
  //       console.log(result)
  //     });
  //   } else{
  //     console.log("Form is not valid")
  //   }
  // }
  
  // login(){
  //   console.log("From is not valid");
    // this.AdminService.logins(this.email, this.password).subscribe(
    //   (response) => {
    //     localStorage.setItem('personal_access_token', response.personal_access_token);
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'Login Successful!',
    //       text: 'You are now logged in.',
    //       timer: 2000,
    //       timerProgressBar: true,
    //       showConfirmButton: false
    //     });
    
    //     this.router.navigate(['/main']);
    //   },
    //   (error) => {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Login Failed',
    //       text: 'Please check your email and password.',
    //       showConfirmButton: true
    //     });
    
    //     console.error('Login error:', error);
    //   }
    // );
      // }

}
