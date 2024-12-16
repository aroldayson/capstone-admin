import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminService } from '../../../admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cashregister',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './cashregister.component.html',
  styleUrls: ['./cashregister.component.css']
})
export class CashregisterComponent implements OnInit {

  savedData: any = {}; // Empty object for fallback
  cashRegistryForm: any;
  isDisabled: boolean = false; 
  
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private admin: AdminService
  ) {}

  ngOnInit() {
    const storedData = localStorage.getItem('initialFormData');
    this.savedData = storedData ? JSON.parse(storedData) : {};

    this.cashRegistryForm = this.fb.group({
      date: [this.getCurrentDate(), Validators.required],
      time: [this.getCurrentTime(), Validators.required],
      Staff_ID: [this.savedData.Staff_ID || '', Validators.required],
      Initial_amount: [this.savedData.Initial_amount || '', [Validators.required, Validators.min(0)]],
    });

    this.isDisabled = true;
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  getCurrentTime(): string {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  onSubmit() {
    if (this.cashRegistryForm.valid) {
      this.admin.cashinitial(this.cashRegistryForm.value).subscribe(
        (result: any) => {
          if (result.message === 'Success') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: true,
            }).then(() => {
              // Reload the page after the popup is dismissed
              location.reload();
            });
            this.route.navigate(['/main/tansactionpage/main/view-tran/cashdetails']);  // Navigating to CashviewComponent
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

  // onCancel() {
  //   this.cashRegistryForm.reset();  // Reset the form
  //   localStorage.removeItem('initialFormData');  // Remove data from localStorage
  //   this.route.navigate(['/main/tansactionpage/main/view-tran/cashdetails']);  // Navigate back to CashviewComponent
  // }
  onCancel(showPopup = true) {
    // Reset the form with default values
    this.cashRegistryForm = this.fb.group({
      date: [this.getCurrentDate(), Validators.required],
      time: [this.getCurrentTime(), Validators.required],
      Staff_ID: ['', Validators.required],
      Initial_amount: ['', [Validators.required, Validators.min(0)]],
    });
    this.isDisabled = false; // Allow form editing
    localStorage.removeItem('initialFormData'); // Clear localStorage data
  
    // Show Swal popup if requested
    if (showPopup) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Form has been cleared!',
        showConfirmButton: false,
      }).then(() => {
        // Reload the page after the popup is dismissed
        location.reload();
      });
      this.route.navigate(['/main/tansactionpage/main/view-tran/cashdetails']);
    } else {
      // If no popup is needed, reload directly
      location.reload();
    }
  }
  
}
