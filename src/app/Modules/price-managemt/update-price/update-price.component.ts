import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-price',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './update-price.component.html',
  styleUrl: './update-price.component.css',
})
export class UpdatePriceComponent implements OnInit {
  category_id: { id: string | null } = { id: localStorage.getItem('Categ_ID') };
  categ: any;
  intervalId: any;
  // category = {category:localStorage.getItem('category')}
  constructor(private admin: AdminService, private route: Router) {}
  categoryForm = new FormGroup({
    Category: new FormControl(null, Validators.required),
    Price: new FormControl(0.0, Validators.required),
    Minimum_weight: new FormControl(0.0, [
      Validators.required,
      Validators.min(0),
    ]),
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

  clear(): void {
    this.categoryForm.reset();
  }

  findCategory(): void {
    this.admin.findprice(this.category_id.id).subscribe((result: any) => {
      this.categ = result;
      if (this.categ) {
        this.categoryForm.controls['Category'].setValue(this.categ.Category);
        this.categoryForm.controls['Price'].setValue(this.categ.Price);
        this.categoryForm.controls['Minimum_weight'].setValue(
          this.categ.Minimum_weight
        );
      }
    });
  }

  update() {
    console.log(this.categoryForm.value);

    if (this.categoryForm.valid) {
      const updatedData = {
        id: this.category_id.id,
        ...this.categoryForm.value,
      };
      this.admin.updateprice(updatedData).subscribe(
        (response: any) => {
          console.log('Update successful', response);
          Swal.fire(
            'Success!',
            'Laundry Category Price details updated successfully.',
            'success'
          ).then(() => {});
          this.clear();
          this.route.navigate(['/main/pricemanagementpage']);
        },
        (error) => {
          console.error('Update failed', error);
          Swal.fire(
            'Error!',
            'There was an error updating the category.',
            'error'
          );
        }
      );
    } else {
      Swal.fire('Warning!', 'Please fill in all required fields.', 'warning');
    }
  }

  onNumberInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (+inputElement.value < 0) {
      inputElement.value = '0';
    }
  }
}
