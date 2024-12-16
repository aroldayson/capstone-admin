import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cashregister',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './cashregister.component.html',
  styleUrls: ['./cashregister.component.css']  // Corrected to styleUrls
})
export class CashregisterComponent implements OnInit {

  savedData: any = {}; // Initialized as an empty object in case no data in localStorage

  cashRegistryForm: any;

  constructor(private fb: FormBuilder) {
    //  this.cashRegistryForm = new FormGroup({
    //       Staff_ID: new FormControl(null),
    //       Initial_amount: new FormControl(0.0, [Validators.min(0)]),
    //   });
  }

  ngOnInit() {
    // Retrieve saved data from localStorage and log it (if available)
    const storedData = localStorage.getItem('initialFormData');
    if (storedData) {
      this.savedData = JSON.parse(storedData);
      console.log(this.savedData); // You can remove this line once you're done debugging
    }

    // Initialize the form with values from localStorage if available
    this.cashRegistryForm = this.fb.group({
      date: [this.savedData.date || '', Validators.required],
      time: [this.savedData.time || '', Validators.required],
      cashier: [this.savedData.cashier || '', Validators.required],
      initialAmount: [this.savedData.initialAmount || '', [Validators.required, Validators.min(0)]],
      receivedBy: [this.savedData.receivedBy || '', Validators.required],
      receivedDate: [this.savedData.receivedDate || '', Validators.required],
    });
  }

  onSubmit() {
    if (this.cashRegistryForm.valid) {
      console.log(this.cashRegistryForm.value);
      // Save to localStorage or perform further actions
      localStorage.setItem('initialFormData', JSON.stringify(this.cashRegistryForm.value));
    }
  }

  onCancel() {
    // Logic for cancel button
    this.cashRegistryForm.reset();  // Resets the form
    localStorage.removeItem('initialFormData');  // Optionally remove data from localStorage
  }

}
