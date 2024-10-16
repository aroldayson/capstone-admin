import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  isOpen: boolean = true;

  constructor(
    private admin: AdminService,
    private router: Router
  ){}

  toggleNav(): void {
    this.isOpen = !this.isOpen;
  }
  logout(){
    
  }
  // logout():  void{
  //   console.log('Success')
  //   this.admin.logout().subscribe((result: any) => {
  //     this.router.navigate(['/main']);
  //     console.log(result)
  //   });
  // }
  // logout() {
  //   const token = localStorage.getItem('token');  // Get the token from localStorage
  
  //   if (token) {
  //     const headers = { 'Authorization': `Bearer ${token}` };  // Set the Authorization header
  
  //     this.admin.logout(headers).subscribe(
  //       (result: any) => {
  //         // Clear the token and other data from localStorage
  //         localStorage.removeItem('token');
  
  //         // Display success notification
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Logout Successful!',
  //           text: 'You have been logged out.',
  //           timer: 2000,
  //           timerProgressBar: true,
  //           showConfirmButton: false
  //         });
  
  //         // Navigate to the login page
  //         this.router.navigate(['/login']);
  //       },
  //       (error: any) => {
  //         // Handle logout errors, such as expired or invalid tokens
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Logout Failed',
  //           text: 'There was an error logging you out. Please try again.',
  //           showConfirmButton: true
  //         });
  //         console.error('Logout Error:', error);
  //       }
  //     );
  //   } else {
  //     // If no token is found, immediately navigate to the login page
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Not Logged In',
  //       text: 'You are not logged in.',
  //       timer: 2000,
  //       timerProgressBar: true,
  //       showConfirmButton: false
  //     });
  //     // this.router.navigate(['/login']);
  //   }
  // }

}
