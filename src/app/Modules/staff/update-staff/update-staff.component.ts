import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-staff',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CommonModule,ReactiveFormsModule],
  templateUrl: './update-staff.component.html',
  styleUrl: './update-staff.component.css'
})
export class UpdateStaffComponent implements OnInit{
  staff_id = {id:localStorage.getItem('Admin_ID')}
  staff: any
  showOldPassword: boolean = false;
  showPassword: boolean = false;
  showConPassword: boolean = false;
  passwordsMatch = true;

  constructor(
    private admin: AdminService,
    private route: Router
  ){}

  togglePasswordVisibility() {
    this.showOldPassword = !this.showOldPassword; // Toggle the password visibility
  }

  togglePasswordVisibilitys() {
    this.showPassword = !this.showPassword; // Toggle the password visibility
  }

  togglePasswordVisibilityy() {
    this.showConPassword = !this.showConPassword; // Toggle the password visibility
  }

  checkPasswords() {
    const password = this.updatestaff.get('Password')?.value;
    const confirmPassword = this.updatestaff.get('ConfirmPassword')?.value;
    this.passwordsMatch = password === confirmPassword;
  }


  updatestaff = new FormGroup({
    Admin_lname: new FormControl(null),
    Admin_fname: new FormControl(null),
    Admin_mname: new FormControl(""),
    Address: new FormControl(null),
    Phone_no: new FormControl(null),
    Email: new FormControl(null),
    Oldpassword: new FormControl(null),
    Password: new FormControl(null),
    ConfirmPassword: new FormControl(null)
  });


  ngOnInit(): void {
    console.log(this.staff_id.id);
    this.admin.findstaff(this.staff_id.id).subscribe((result: any) => {
      this.staff = result;
      console.log(result);

      this.updatestaff.controls['Admin_lname'].setValue(this.staff.Admin_lname);
      this.updatestaff.controls['Admin_fname'].setValue(this.staff.Admin_fname);
      this.updatestaff.controls['Admin_mname'].setValue(this.staff.Admin_mname);
      this.updatestaff.controls['Address'].setValue(this.staff.Address);
      this.updatestaff.controls['Phone_no'].setValue(this.staff.Phone_no);
      this.updatestaff.controls['Oldpassword'].setValue(this.staff.Password);
      // this.updatestaff.controls['Password'].setValue(this.staff.Password);
      this.updatestaff.controls['Email'].setValue(this.staff.Email);
    });

    // this.updatestaff.valueChanges.subscribe(() => {
    //   this.checkPasswords();
    // });
  }


  update(): void {
    if (this.updatestaff.valid) {
      this.checkPasswords();
  
      const updatedData = { id: this.staff_id.id, ...this.updatestaff.value };
      console.log('Data to be sent:', updatedData);

      if (this.passwordsMatch) {
        this.admin.updateStaff(updatedData).subscribe(
          response => {
            console.log('Update successful', response);
            Swal.fire('Success!', 'Staff details updated successfully.', 'success').then(() => {
              location.reload(); 
            });
            this.route.navigate(['/main/staffpage/staffmain/staffview/']);
          },
          error => {
            console.error('Update failed', error);
            Swal.fire('Warning!', 'Please fill in all required fields.', 'warning');
          }
        );
      } else {
        if (!this.passwordsMatch) {
          Swal.fire('Warning!', 'Please fill in all required fields.', 'warning');
        }
      }
    } else {
      console.error('Form is invalid');
      Swal.fire('Warning!', 'Please fill in all required fields.', 'warning');
    }
  }
  
  


}
