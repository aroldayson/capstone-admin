import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-history',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './view-history.component.html',
  styleUrl: './view-history.component.css',
})
export class ViewHistoryComponent implements OnInit{
  cust_id = {id:localStorage.getItem('Cust_ID')}
  cust: any
  custs: any
  totalAmount: any;
  histo: any;
  transactions: any[] = [];
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string = ''; 
  file:  File | null = null;
  selectedFile: File | null = null;
  message: string = '';
  existingImageUrl: string | null = null;
  intervalId: any;

  constructor(
    private admin: AdminService,
    private route: Router
  ){
    this.loadExistingImage();
    this.startPolling();
  }
  ngOnInit(): void {
    this.admin.findcustomer(this.cust_id.id).subscribe(
      (result: any) => {
        this.cust = result; 
        console.log(result);
      }
    );
    this.admin.findtransaction(this.cust_id.id).subscribe(
      (result: any) => {
        this.custs = result;
        this.histo = result.trans; 
        this.totalAmount = result.totalprice; 
        console.log(result);
      }
    );
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.previewImage();
  }

  startPolling() {
    this.intervalId = setInterval(async () => {
      const latestAdminId = localStorage.getItem('Cust_ID');
      if (latestAdminId !== this.cust_id.id) {
        this.cust_id.id = latestAdminId;
        this.loadExistingImage();
      }
    }, 300);
  }

  loadExistingImage() {
    if (this.cust_id.id) {
      this.admin.findcustomer(this.cust_id.id).subscribe(
        (response: any) => {
          if (response.Cust_image) {
            this.existingImageUrl = `http://localhost/customer/profile/${response.Cust_image}`;
            this.imagePreview = this.existingImageUrl;
          } else {
            this.imagePreview = null;
            this.message = 'No existing image found.'; 
          }
        },
        (error) => {
          console.error('Error loading existing image:', error);
          this.message = 'Error loading existing image. Please try again.';
        }
      );
    } else {
      this.imagePreview = null; 
      this.message = 'No Admin ID found. Please log in again.';
    }
  }
  previewImage(){
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; 
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  history(id:any){
    console.log(id)
    localStorage.setItem('Transac_ID', id)
    this.route.navigate(["/main/customertpage/main/view-listtransac"])
  }
  editpro(id: any){
    console.log(id)
    localStorage.setItem('Cust_ID', id)
    this.route.navigate(["/main/customertpage/main/edit"])
  }
}
