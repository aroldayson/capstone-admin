import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminService } from '../../../admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cashdetails',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './cashdetails.component.html',
  styleUrl: './cashdetails.component.css'
})
export class CashdetailsComponent implements OnInit {
  staff: any[] = []; 
  InitialFrom: FormGroup;
  isSubmitted: boolean = false; // Flag to track submission
  isLoading: boolean = false;

  constructor(private admin: AdminService, private route: Router) {
    this.InitialFrom = new FormGroup({
      Staff_ID: new FormControl(null, Validators.required), // Added null as the default value
      Initial_amount: new FormControl(0.0, [Validators.min(0), Validators.required]), // Corrected syntax for validators
    });    
  }

  ngOnInit(): void {
    this.isSubmitted = false;
    // this.spinner();
    
    this.admin.Staffinitail().subscribe(
      (result: any) => {
        this.staff = result;
        console.log(this.staff);
      },
      (error) => {
        console.error('Error fetching staff data:', error);
      }
    );

    this.InitialFrom.enable();

    
  }
  
  onSubmit() {
    // Set isLoading to true to show the loader
    this.isLoading = true;
    
    // Simulate a delay (e.g., form submission, API call)
    setTimeout(() => {
      // Simulate form submission completion
      this.isLoading = false;
      this.isSubmitted = true;
      // Any further logic after submission (e.g., reset form, navigate, etc.)
    }, 1000); // 3 seconds delay for demo, replace with actual logic
  }
  

  enforceNonNegative(): void {
    const control = this.InitialFrom.get('Initial_amount');
    if (control && control.value < 0) {
      control.setValue(0);
    }
  }

  clearForm(): void {
    // Reset the form to its default state
    this.InitialFrom.reset({
      Staff_ID: null, // Reset Staff_ID to null
      Initial_amount: 0.0, // Reset Initial_amount to 0.0 or any default value
    });
  
    // Enable all form controls
    this.InitialFrom.enable();
    this.isSubmitted = false; // Allow re-submission
  
    // Clear localStorage data
    localStorage.removeItem('initialFormData');
  
    // Optional: Notify the user that the form has been cleared
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Form has been cleared!',
      // showConfirmButton: true,
    });
  }
  

  save(): void {
    if (this.isSubmitted) {
      return; // Prevent submitting if already submitted
    }

    this.isSubmitted = true; // Mark as submitted
    console.log(this.InitialFrom.value);
    localStorage.setItem('initialFormData', JSON.stringify(this.InitialFrom.value));

    // Disable all form controls after submission
    this.InitialFrom.disable();

    // this.InitialFrom.enable();

    // Navigate to the next route
    this.route.navigate(['/main/tansactionpage/main/view-tran/cashdetails/cashregister']);
    
    // Optionally, you can use the following code if you want to submit to the backend
    // this.admin.cashinitial(this.InitialFrom.value).subscribe(
    //   (result: any) => {
    //     if (result.message === 'Success') {
    //       Swal.fire({
    //         position: 'center',
    //         icon: 'success',
    //         title: 'Your work has been saved',
    //         showConfirmButton: true,
    //       })
    //       this.route.navigate(['/main/tansactionpage/main/view-tran/cashdetails']);
    //     } else {
    //       console.error('Error occurred during save:', result);
    //     }
    //   },
    //   (error) => {
    //     console.error('Error:', error);
    //   }
    // );
  }
}
