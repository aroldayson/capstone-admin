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
  hideNewPassword: boolean = false;
  newPassword = '';
  hideConfirmPassword: boolean = false;
  admin_id = {id:localStorage.getItem('Account_ID')}
  passwordsMatch = true;

  updateaccount = new FormGroup({
    Admin_lname: new FormControl(null),
    Admin_fname: new FormControl(null),
    Admin_mname: new FormControl(null),
    Email: new FormControl(null),
    Password: new FormControl(null),
    Admin_OldPassword: new FormControl(null),
    Admin_ConfirmPassword: new FormControl(null),
  });

  constructor(private adminService: AdminService, private route: Router) {}

  ngOnInit(): void {
    const adminId = localStorage.getItem('Account_ID');
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
          Email: this.users.Email,
          Admin_lname: this.users.Admin_lname,
          Admin_fname: this.users.Admin_fname,
          Admin_mname: this.users.Admin_mname,
          Admin_OldPassword: this.users.Password,
        });
      });
    }
  }

  clearForm() {
    this.updateaccount.reset(); 
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

  passwordsDoNotMatch() {
    const password = this.updateaccount.get('Password')?.value;
    const confirmPassword = this.updateaccount.get('Admin_ConfirmPassword')?.value;
    this.passwordsMatch = password === confirmPassword;
  }

  update(): void {
    console.log(this.updateaccount.valid)
    this.passwordsDoNotMatch();
    const updatedData = { id: this.admin_id.id, ...this.updateaccount.value };
    console.log('Data to be sent:', updatedData);

    if (this.passwordsMatch) {
      this.adminService.updateaccount(updatedData).subscribe(
        response => {
          console.log('Update successful', response);
          Swal.fire('Success!', 'Staff details updated successfully.', 'success').then(() => {
          });
          this.route.navigate(['/main/accountpage/accountmain']);
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
  }

  loadExistingImage(): void {
    const storedImage = localStorage.getItem('previewImage');
    if (storedImage) {
      this.previewUrl = storedImage;
    }
  }
}
