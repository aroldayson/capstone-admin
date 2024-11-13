import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './view-account.component.html',
  styleUrl: './view-account.component.css',
})
export class ViewAccountComponent implements OnInit {
  users: any;
  previewUrl: string | ArrayBuffer | null = null;
  showOldPassword: boolean = false;
  hideNewPassword = true;
  newPassword = '';
  hideConfirmPassword = true;

  updateaccount = new FormGroup({
    Admin_lname: new FormControl(null),
    Admin_fname: new FormControl(null),
    Admin_mname: new FormControl(null),
    Admin_Email: new FormControl(null, [Validators.required, Validators.email]),
    Admin_Password: new FormControl(null, Validators.required),
    Admin_OldPassword: new FormControl(null),
    Admin_ConPassword: new FormControl(null),
  });

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    const adminId = localStorage.getItem('Admin_ID');
    console.log(adminId);
    this.getAdminDetails(adminId);
    this.loadExistingImage();
  }

  getAdminDetails(id: string | null): void {
    if (id) {
      this.adminService.getAdmin(id).subscribe((data: any) => {
        this.users = data;
        console.log(this.users);
        this.updateaccount.patchValue({
          Admin_Email: this.users.Email,
          Admin_lname: this.users.Admin_lname,
          Admin_fname: this.users.Admin_fname,
          Admin_mname: this.users.Admin_mname,
          Admin_OldPassword: this.users.Password,
        });
      });
    }
  }

  clearForm() {
    this.updateaccount.reset(); // Resets all form fields to their initial values
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        localStorage.setItem('previewImage', this.previewUrl as string);
      };
      reader.readAsDataURL(file);
    }
  }

  toggleCurrentPasswordVisibility(): void {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPasswordVisibility(): void {
    this.hideNewPassword = !this.hideNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  passwordsDoNotMatch(): boolean {
    const currentPassword = this.updateaccount.get('Admin_Password')?.value;
    return (
      this.newPassword !== '' &&
      currentPassword !== null &&
      currentPassword !== undefined &&
      this.newPassword !== currentPassword
    );
  }

  update(): void {
    if (this.updateaccount.valid) {
      console.log(this.updateaccount.valid);
      // const adminId = localStorage.getItem('Admin_ID');
      // const updatedData = { ...this.updateaccount.value, adminId };
      // this.adminService.updateAdmin(updatedData).subscribe(
      //   () => Swal.fire('Success', 'Your account has been updated', 'success'),
      //   () => Swal.fire('Error', 'Error updating your account', 'error')
      // );
    }
  }

  loadExistingImage(): void {
    const storedImage = localStorage.getItem('previewImage');
    if (storedImage) {
      this.previewUrl = storedImage;
    }
  }
}
