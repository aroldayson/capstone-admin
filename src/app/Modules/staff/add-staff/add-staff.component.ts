import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-staff',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './add-staff.component.html',
  styleUrl: './add-staff.component.css'
})
export class AddStaffComponent implements OnInit{
  
  staff: any;
  showPassword: boolean = false;
  showConPassword: boolean = false;
  passwordsMatch = true;


  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Toggle the password visibility
  }

  togglePasswordVisibilitys() {
    this.showConPassword = !this.showConPassword; // Toggle the password visibility
  }

  // form = this.fb.group({
  //   password: ['', Validators.required],
  //   confirmPassword: ['', Validators.required]
  // });
  checkPasswords() {
    const password = this.addstaff.get('password')?.value;
    const confirmPassword = this.addstaff.get('confirmPassword')?.value;
    this.passwordsMatch = password === confirmPassword;
  }

  addstaff = new FormGroup({
    admin_lname: new FormControl(null, [Validators.required]), // Required validator
    admin_fname: new FormControl(null, [Validators.required]), // Required validator
    admin_mname: new FormControl(null),
    address: new FormControl(null, [Validators.required]), // Required validator
    role: new FormControl('staff'), // Default role
    admin_image: new FormControl('staff.jpeg'), // Default image
    birthdate: new FormControl('2001-10-20'), // Default birthdate
    phone_no: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{10,15}$')]), // Phone number validation
    email: new FormControl(null, [Validators.required, Validators.email]), // Email validation
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]), // Password validation
    confirmPassword: new FormControl(null, [Validators.required])
    
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
    const pass = form.get('password')?.value;
    const confirmPass = form.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { 'mismatch': true };
  }

  insertStaff() {
    if (this.addstaff.valid) {
      const formValue = this.addstaff.value;
  
      // Ensure `password_confirmation` is sent with the correct field name
      const payload = {
        ...formValue,
        password_confirmation: formValue.confirmPassword
      };
  
      this.admin.insertData(payload).subscribe(
        (result: any) => {
          console.log('Staff added successfully:', result);
          // Navigate to the desired route
          this.router.navigate(['/main/staffpage/staffmain/']).then(success => {
            if (success) {
              console.log('Navigation successful');
              this.router.navigate(['/main/staffpage/staffmain/'])
              location.reload();
            } else {
              console.error('Navigation failed');
            }
          });
        },
        (error) => {
          console.error('Error adding staff:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  
}
