import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-update-address',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './update-address.component.html',
  styleUrl: './update-address.component.css'
})
export class UpdateAddressComponent implements OnInit {
  category_id: { id: string | null } = { id: localStorage.getItem('Categ_ID') };
  categ: any;
  intervalId: any;
  // category = {category:localStorage.getItem('category')}
  constructor(private admin: AdminService, private route: Router) {}
  categoryForm = new FormGroup({
    City_Address: new FormControl(null, Validators.required),
    ShipServ_price: new FormControl(1.0, [
      Validators.required,
      Validators.min(1),
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
    this.admin.findpricedestination(this.category_id.id).subscribe((result: any) => {
      this.categ = result;
      if (this.categ) {
        this.categoryForm.controls['City_Address'].setValue(this.categ.City_Address);
        this.categoryForm.controls['ShipServ_price'].setValue(this.categ.ShipServ_price);
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
      this.admin.updatepricedestination(updatedData).subscribe(
        (response: any) => {
          console.log('Update successful', response);
          Swal.fire(
            'Success!',
            'Laundry Category Price details updated successfully.',
            'success'
          ).then(() => {});
          this.clear();
          this.route.navigate(['/main/pricemanagementpage/pricemgtmain/viewcateg/view-address']);
        },
        (error) => {
          console.error('Update failed', error);
          Swal.fire(
            'Error!',
            'There was an error updating the destination.',
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

