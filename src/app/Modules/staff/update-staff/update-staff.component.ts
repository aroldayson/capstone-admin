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
  staff_id = {id:localStorage.getItem('id')}
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
    const password = this.updatestaff.get('password')?.value;
    const confirmPassword = this.updatestaff.get('confirmPassword')?.value;
    this.passwordsMatch = password === confirmPassword;
  }

  updatestaff = new FormGroup({
    admin_lname: new FormControl(null),
    admin_fname: new FormControl(null),
    admin_mname: new FormControl(null),
    address: new FormControl(null),
    phone_no: new FormControl(null),
    email: new FormControl(null),
    oldpassword: new FormControl(null),
    password: new FormControl(null),
    confirmPassword: new FormControl(null)
  });


  ngOnInit(): void {
    console.log(this.staff_id.id);
    this.admin.findstaff(this.staff_id.id).subscribe((result: any) => {
      this.staff = result;
      console.log(result);

      this.updatestaff.controls['admin_lname'].setValue(this.staff.admin_lname);
      this.updatestaff.controls['admin_fname'].setValue(this.staff.admin_fname);
      this.updatestaff.controls['admin_mname'].setValue(this.staff.admin_mname);
      this.updatestaff.controls['address'].setValue(this.staff.address);
      this.updatestaff.controls['phone_no'].setValue(this.staff.phone_no);
      this.updatestaff.controls['oldpassword'].setValue(this.staff.password);
      this.updatestaff.controls['password'].setValue(this.staff.password);
      this.updatestaff.controls['email'].setValue(this.staff.email);
    });

    this.updatestaff.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }


  update(): void {
    if (this.updatestaff.valid) {
      const updatedData = { id: this.staff_id.id, ...this.updatestaff.value };
      console.log('Data to be sent:', updatedData); // Debugging line
      this.admin.updateStaff(updatedData).subscribe(
        response => {
          console.log('Update successful', response);
          location.reload();
          Swal.fire('Success!', 'Staff details updated successfully.', 'success');
          this.route.navigate(['/main/staffpage/staffmain/staffview/'])

        },
        error => {
          console.error('Update failed', error);
          Swal.fire('Error!', 'There was an error updating the staff details. Check console for more information.', 'error');
        }
      );
    } else {
      console.error('Form is invalid');
      Swal.fire('Warning!', 'Please fill in all required fields.', 'warning');
    }
  }
  
  


}
