import { Component, OnInit } from '@angular/core';
import { copyFileSync } from 'fs';
import { AdminService } from '../../../admin.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editprof-customer',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './editprof-customer.component.html',
  styleUrl: './editprof-customer.component.css'
})
export class EditprofCustomerComponent implements OnInit{

  cust_id = {id:localStorage.getItem('Cust_ID')}
  cust: any;
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string = ''; // To hold any error messages
  file:  File | null = null;
  selectedFile: File | null = null;
  message: string = '';
  existingImageUrl: string | null = null;
  intervalId: any;

  showOldPassword: boolean = false;
  showPassword: boolean = false;
  showConPassword: boolean = false;
  passwordsMatch = true;
  

  constructor(
    private admin: AdminService,
    private route: Router,
    private http: HttpClient
  ){
    this.loadExistingImage();
    this.startPolling();
  }

  updateaccount = new FormGroup({
    Cust_address: new FormControl(null),
    Cust_phoneno: new FormControl(null),
    Cust_OldPassword: new FormControl(null),
    Cust_password: new FormControl(null),
    Cust_ConfirmPassword: new FormControl(null)
  })
  
  ngOnInit(): void {
    this.getcustomer();
    this.loadExistingImage();
    this.startPolling();
    // this.checkPasswords();
    // this.admin.findcustomer(this.cust_id.id).subscribe(
    //   (result: any) => {
    //     this.cust = result; 
    //     console.log(result);
    //   }
    // );
  }

  getcustomer(){
    this.admin.findcustomer(this.cust_id.id).subscribe((result: any) => {
      this.cust = result;
      console.log(result);

      this.updateaccount.controls['Cust_address'].setValue(this.cust.Cust_address);
      this.updateaccount.controls['Cust_phoneno'].setValue(this.cust.Cust_phoneno);
      this.updateaccount.controls['Cust_OldPassword'].setValue(this.cust.Cust_password);   
    });
  }

  startPolling() {
    this.intervalId = setInterval(async () => {
      const latestAdminId = localStorage.getItem('Cust_ID');
      if (latestAdminId !== this.cust_id.id) {
        this.cust_id.id = latestAdminId;
        this.loadExistingImage();
      }
    }, 300); // Check every second
  }

  update(){
    console.log(this.updateaccount.valid)
    this.checkPasswords();

    const updatedData = { id: this.cust_id.id, ...this.updateaccount.value };
    console.log('Data to be sent:', updatedData);

    if (this.passwordsMatch) {
      this.admin.updateprofilecus(updatedData).subscribe(
        response => {
          console.log('Update successful', response);
          Swal.fire('Success!', 'Staff details updated successfully.', 'success').then(() => {
            // location.reload(); 
          });
          this.route.navigate(['/main/customertpage/main/view-history']);
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
  previewImage(){
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Update image preview with selected file
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.previewImage();
  }
 
  loadExistingImage() {
    if (this.cust_id.id) {
      this.admin.findcustomer(this.cust_id.id).subscribe(
        (response: any) => {
          if (response.Cust_image) {
            this.existingImageUrl = `http://localhost/customer/profile/${response.Cust_image}`;
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
  

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('Cust_image', this.selectedFile, this.selectedFile.name);
    
      this.http.post(`http://localhost:8000/api/updateprofile/${this.cust_id.id}`, formData)
        .subscribe(
          (response: any) => {
            Swal.fire({
              title: 'Success!',
              text: 'Image uploaded successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              // this.loadExistingImage();
              // this.startPolling();
              // localStorage.removeItem('Cust_ID'); 
              this.route.navigate(["/main/customertpage/main/view-history"]);
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
    const password = this.updateaccount.get('Cust_password')?.value;
    const confirmPassword = this.updateaccount.get('Cust_ConfirmPassword')?.value;
    this.passwordsMatch = password === confirmPassword;
  }


}
