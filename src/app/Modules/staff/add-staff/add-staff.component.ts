import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-staff',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './add-staff.component.html',
  styleUrl: './add-staff.component.css'
})
export class AddStaffComponent implements OnInit{
  
  staff: any;
  showOldPassword: boolean = false;
  showPassword: boolean = false;
  showConPassword: boolean = false;
  passwordsMatch = true;


  
  togglePasswordVisibility() {
    this.showOldPassword = !this.showOldPassword; 
  }

  togglePasswordVisibilitys() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibilityy() {
    this.showConPassword = !this.showConPassword;
  }

  checkPasswords() {
    const password = this.addstaff.get('Password')?.value;
    const confirmPassword = this.addstaff.get('ConfirmPassword')?.value;
    this.passwordsMatch = password === confirmPassword; 
  }

  addstaff = new FormGroup({
    Admin_lname: new FormControl(null, [Validators.required]), 
    Admin_fname: new FormControl(null, [Validators.required]), 
    Admin_mname: new FormControl(null),
    Address: new FormControl(null, [Validators.required]), 
    Role: new FormControl('staff'), 
    Admin_image: new FormControl('staff.jpeg'), 
    Birthdate: new FormControl('2001-10-20'), 
    Phone_no: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{10,15}$')]),
    Email: new FormControl(null, [Validators.required, Validators.email]), 
    Password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    ConfirmPassword: new FormControl(null, [Validators.required])
    
  })

  constructor(
    private admin: AdminService,
    private router: Router,
    private fb: FormBuilder
  ){}
  ngOnInit(): void {
    this.admin.getData();

    this.addstaff.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('Password')?.value;
    const confirmPass = form.get('ConfirmPassword')?.value;
    return pass === confirmPass ? null : { 'mismatch': true };
  }

  insertStaff() {
    if (this.addstaff.valid) {
      const formValue = this.addstaff.value;
  
      this.checkPasswords(); // Check passwords for match
  
      // If passwords do not match, show an error message and return early
      if (!this.passwordsMatch) {
        Swal.fire('Error!', 'Passwords do not match. Please check your entries.', 'error');
        return; // Exit the function to prevent submission
      }
  
      // Ensure `Password_confirmation` is sent with the correct field name
      const payload = {
        ...formValue,
        Password_confirmation: formValue.ConfirmPassword,
      };
  
      this.admin.insertData(payload).subscribe(
        (result: any) => {
          console.log('Staff added successfully:', result);
          // Navigate to the desired route
          this.router.navigate(['/main/staffpage/staffmain/']).then(success => {
            if (success) {
              console.log('Navigation successful');
              location.reload(); // Reload the page after successful navigation
            } else {
              console.error('Navigation failed');
            }
          });
        },
        (error) => {
          console.error('Error adding staff:', error);
          Swal.fire('Error!', 'There was an issue adding the staff. Please try again.', 'error');
        }
      );
    } else {
      console.log('Form is invalid');
      Swal.fire('Warning!', 'Please fill in all required fields.', 'warning');
    }
  }
}

