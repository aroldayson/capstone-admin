import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-price',
  standalone: true,
  imports: [RouterLink,RouterOutlet,ReactiveFormsModule,CommonModule],
  templateUrl: './update-price.component.html',
  styleUrl: './update-price.component.css'
})
export class UpdatePriceComponent implements OnInit {
  
  category_id: { id: string | null } = {id: localStorage.getItem('Categ_ID')};
  categ: any;
  intervalId: any;
  // category = {category:localStorage.getItem('category')}
  constructor(
    private admin: AdminService,
    private route: Router
  ){

  }
  categoryForm = new FormGroup({
    Category: new FormControl(null, Validators.required),
    Per_kilograms: new FormControl(0.0, Validators.required),
  });

  ngOnInit(): void {
    console.log(this.category_id.id);
    this.findCategory();
    this.startPolling();
  } 

  startPolling() {
    this.intervalId = setInterval(async () => {
      const latestAdminId = localStorage.getItem('Categ_ID');
      if (latestAdminId !== this.category_id.id) {
        this.category_id.id = latestAdminId;
        this.findCategory();
      }
    }, 100); // Check every second
  }
  
  findCategory(): void {
    this.admin.findprice(this.category_id.id).subscribe((result: any) => {
      this.categ = result;
      if (this.categ) {
        this.categoryForm.controls['Category'].setValue(this.categ.Category);
        this.categoryForm.controls['Per_kilograms'].setValue(this.categ.Per_kilograms);
      }
    });
  }
  
  update(){
    console.log(this.categoryForm.value);

    if (this.categoryForm.valid) {
      const updatedData = { id: this.category_id.id, ...this.categoryForm.value };
      this.admin.updateprice(updatedData).subscribe(
        (response: any) => {
          // location.reload();
          console.log('Update successful', response);
          Swal.fire('Success!', 'Laundry Category Price details updated successfully.', 'success').then(() => {
            location.reload(); // Reload the page after the alert is closed
          });
          this.route.navigate(['/main/pricemanagementpage/pricemgtmain/pricemgtview/add']);
        },
        error => {
          console.error('Update failed', error);
          Swal.fire('Error!', 'There was an error updating the category.', 'error');
        }
      );
    } else {
      Swal.fire('Warning!', 'Please fill in all required fields.', 'warning');
    }
  }
}
