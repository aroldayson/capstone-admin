import { Component, OnInit } from '@angular/core';
import { copyFileSync } from 'fs';
import { AdminService } from '../../../admin.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editprof-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './editprof-customer.component.html',
  styleUrl: './editprof-customer.component.css',
})
export class EditprofCustomerComponent implements OnInit {
  previewUrl: string | ArrayBuffer | null = null;
  cust_id = { id: localStorage.getItem('Cust_ID') };
  cust: any;
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string = ''; // To hold any error messages
  file: File | null = null;
  selectedFile: File | null = null;
  message: string = '';
  existingImageUrl: string | null = null;
  intervalId: any;

  showOldPassword: boolean = false;
  // showPassword: boolean = false;
  // showConPassword: boolean = false;
  passwordsMatch: boolean = true;
  hideNewPassword: boolean = false;
  hideConfirmPassword: boolean = false;

  // newPassword = '';

  constructor(
    private admin: AdminService,
    private route: Router,
    private http: HttpClient
  ) {
    this.loadExistingImage();
    this.startPolling();
  }

  updateaccount = new FormGroup({
    Cust_lname: new FormControl(null),
    Cust_fname: new FormControl(null),
    Cust_mname: new FormControl(null),
    Cust_email: new FormControl(null),
    Cust_address: new FormControl(null),
    Cust_phoneno: new FormControl(null),
    Cust_OldPassword: new FormControl(null),
    Cust_password: new FormControl(null),
    Cust_ConfirmPassword: new FormControl(null),
  });

  ngOnInit(): void {
    this.getcustomer();
    this.loadExistingImage();
    this.startPolling();
  }
  getcustomer() {
    this.admin.findcustomer(this.cust_id.id).subscribe((result: any) => {
      this.cust = result;
  
      // Use existing values to populate form controls
      this.updateaccount.setValue({
        Cust_address: this.cust.Cust_address || '',
        Cust_phoneno: this.cust.Cust_phoneno || '',
        Cust_OldPassword: null, // Do not prepopulate password fields for security
        Cust_lname: this.cust.Cust_lname || '',
        Cust_mname: this.cust.Cust_mname || '',
        Cust_fname: this.cust.Cust_fname || '',
        Cust_email: this.cust.Cust_email || '',
        Cust_password: null, // Password fields start empty
        Cust_ConfirmPassword: null,
      });
    });
  }
  
  // getcustomer() {
  //   this.admin.findcustomer(this.cust_id.id).subscribe((result: any) => {
  //     this.cust = result;
  //     console.log(result);

  //     this.updateaccount.controls['Cust_address'].setValue(
  //       this.cust.Cust_address
  //     );
  //     this.updateaccount.controls['Cust_phoneno'].setValue(
  //       this.cust.Cust_phoneno
  //     );
  //     this.updateaccount.controls['Cust_OldPassword'].setValue(
  //       this.cust.Cust_password
  //     );
  //     this.updateaccount.controls['Cust_lname'].setValue(
  //       this.cust.Cust_lname
  //     );
  //     this.updateaccount.controls['Cust_mname'].setValue(
  //       this.cust.Cust_fname
  //     );
  //     this.updateaccount.controls['Cust_fname'].setValue(
  //       this.cust.Cust_mname
  //     );
  //     this.updateaccount.controls['Cust_email'].setValue(
  //       this.cust.Cust_email
  //     );
  //   });
  // }

  startPolling() {
    this.intervalId = setInterval(async () => {
      const latestAdminId = localStorage.getItem('Cust_ID');
      if (latestAdminId !== this.cust_id.id) {
        this.cust_id.id = latestAdminId;
        this.loadExistingImage();
      }
    }, 300); // Check every second
  }

  update() {
    console.log(this.updateaccount.valid);
    this.checkPasswords();

    const updatedData = { id: this.cust_id.id, ...this.updateaccount.value };
    console.log('Data to be sent:', updatedData);

    if (this.passwordsMatch) {
      this.admin.updateprofilecus(updatedData).subscribe(
        (response) => {
          console.log('Update successful', response);
          Swal.fire(
            'Success!',
            'Staff details updated successfully.',
            'success'
          ).then(() => {
            // location.reload();
          });
          this.route.navigate(['/main/customertpage/main/view-history']);
        },
        (error) => {
          console.error('Update failed', error);
          Swal.fire(
            'Warning!',
            'Please fill in all required fields.',
            'warning'
          );
        }
      );
    } else {
      if (!this.passwordsMatch) {
        Swal.fire('Warning!', 'Please fill in all required fields.', 'warning');
      }
    }
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

  loadExistingImage(): void {
    const storedImage = localStorage.getItem('previewImage');
    if (storedImage) {
      this.previewUrl = storedImage;
    }
  }

  // toggleNewPasswordVisibility(): void {
  //   this.hideNewPassword = !this.hideNewPassword;
  // }
  togglePasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
  }

  togglePasswordVisibilitys() {
    this.hideNewPassword = !this.hideNewPassword;
  }

  togglePasswordVisibilityss() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  checkPasswords() {
    const password = this.updateaccount.get('Cust_password')?.value;
    const confirmPassword = this.updateaccount.get(
      'Cust_ConfirmPassword'
    )?.value;
    this.passwordsMatch = password === confirmPassword;
  }

  passwordsDoNotMatch(): void{
    const password = this.updateaccount.get('Cust_password')?.value;
    const confirmPassword = this.updateaccount.get('Cust_ConfirmPassword')?.value;
    this.passwordsMatch = password === confirmPassword;
  }
}
