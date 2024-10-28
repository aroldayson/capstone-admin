import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-account',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './view-account.component.html',
  styleUrl: './view-account.component.css'
})
export class ViewAccountComponent implements OnInit{

  admin_id = {id:localStorage.getItem('Admin_ID')}
  log: any;
  userId: any
  userData: any;
  users: any;

  showOldPassword: boolean = false;
  showPassword: boolean = false;
  showConPassword: boolean = false;
  passwordsMatch = true;

  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string = ''; // To hold any error messages
  file:  File | null = null;
  selectedFile: File | null = null;
  message: string = '';
  existingImageUrl: string | null = null;
  intervalId: any;

  constructor(
    private admin: AdminService,
    private route: Router,
    private http: HttpClient
  ){}
  updateaccount = new FormGroup({
    Admin_lname: new FormControl(null),
    Admin_fname: new FormControl(null),
    Admin_mname: new FormControl(null),
    Email: new FormControl(null),
    Admin_OldPassword: new FormControl(null),
    Password: new FormControl(null),
    Admin_ConPassword: new FormControl(null)
  })
  ngOnInit(): void {
    this.users = { id: localStorage.getItem('Admin_ID') };
    console.log('Admin_ID:', this.users.id);
    this.get();
    this.loadExistingImage();
    this.startPolling()
  }
  get(){
    this.admin.findstaff(this.users.id).subscribe((result: any) => {
      this.users = result;
      console.log(result);
      this.updateaccount.controls['Email'].setValue(this.users.Email);
      this.updateaccount.controls['Admin_OldPassword'].setValue(this.users.Password);
      this.updateaccount.controls['Admin_lname'].setValue(this.users.Admin_lname);
      this.updateaccount.controls['Admin_fname'].setValue(this.users.Admin_fname);
      this.updateaccount.controls['Admin_mname'].setValue(this.users.Admin_mname);

    });
  }
  update(){
    console.log(this.updateaccount.valid)
    this.checkPasswords();
    const updatedData = { id: this.admin_id.id, ...this.updateaccount.value };
    console.log('Data to be sent:', updatedData);

    if (this.passwordsMatch) {
      this.admin.updateStaff(updatedData).subscribe(
        response => {
          console.log('Update successful', response);
          Swal.fire('Success!', 'Staff details updated successfully.', 'success').then(() => {
            // location.reload(); 
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

  togglePasswordVisibility() {
    this.showOldPassword = !this.showOldPassword; 
  }

  togglePasswordVisibilitys() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibilityss() {
    this.showConPassword = !this.showConPassword;
  }

  checkPasswords() {
    const password = this.updateaccount.get('Password')?.value;
    const confirmPassword = this.updateaccount.get('Admin_ConPassword')?.value;
    this.passwordsMatch = password === confirmPassword;
  }
  onUpload(){
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('Admin_image', this.selectedFile, this.selectedFile.name);
    
      this.http.post(`http://localhost:8000/api/update-profile-image/${this.admin_id.id}`, formData)
        .subscribe(
          (response: any) => {
            Swal.fire({
              title: 'Success!',
              text: 'Image uploaded successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.loadExistingImage();
              this.startPolling();
              // localStorage.removeItem('Admin_ID'); 
              this.route.navigate(["/main/accountpage/accountmain/accountview/"]);
              // location.reload(); // Reload the page after navigation
             
            });
          },
          (error: any) => {
            Swal.fire({
              title: 'Error!',
              text: 'Error uploading image. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
            console.error('Error:', error);
          }
        );
    } else {
      Swal.fire({
        title: 'Warning!',
        text: 'Please select an image first.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }
  previewImage(){
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Update image preview with selected file
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  startPolling() {
    this.intervalId = setInterval(async () => {
      const latestAdminId = localStorage.getItem('Admin_ID');
      if (latestAdminId !== this.admin_id.id) {
        this.admin_id.id = latestAdminId;
        this.loadExistingImage();
      }
    }, 300); // Check every second
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.previewImage();
  }
  loadExistingImage() {
    if (this.admin_id.id) {
      this.admin.findstaff(this.admin_id.id).subscribe(
        (response: any) => {
          if (response.Admin_image) {
            this.existingImageUrl = `http://localhost/admin/profile_images/${response.Admin_image}`;
            this.imagePreview = this.existingImageUrl; // Set the preview to existing image
          } else {
            this.imagePreview = null; // Clear preview if no image exists
            this.message = 'No existing image found.'; // Message if no image
          }
        },
        (error) => {
          console.error('Error loading existing image:', error);
          this.message = 'Error loading existing image. Please try again.';
        }
      );
    } else {
      this.imagePreview = null; // Clear the preview if no ID
      this.message = 'No Admin ID found. Please log in again.';
    }
  }

}
