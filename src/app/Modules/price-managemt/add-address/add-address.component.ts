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
  selector: 'app-add-address',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.css'
})
export class AddAddressComponent implements OnInit {
  categoryForm = new FormGroup({
    City_Address: new FormControl(null, Validators.required),
    ShipServ_price: new FormControl(0.0, [
      Validators.required,
      Validators.min(0),
    ]),
  });

  constructor(private admin: AdminService, private route: Router) {}

  ngOnInit(): void {}

  save(): void {
    if (this.categoryForm.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Please fill out the form correctly',
        showConfirmButton: true,
      });
      return;
    }

    console.log(this.categoryForm.value);

   
    this.admin.addpricedestination(this.categoryForm.value).subscribe(
      (result: any) => {
        if (result.message === 'Success') {
          Swal.fire(
            'Success!',
            'Your data has been saved.',
            'success'
          );
          this.clear();
          this.route.navigate(['/main/pricemanagementpage/pricemgtmain/viewcateg/view-address']);
        } else {
          console.error('Error occurred during save:', result);
        }
      },
      (error) => {
        console.error('Error:', error);
        Swal.fire(
          'Error!',
          'Duplicated City_Address.',
          'error'
        );
    
      }
    );
  }

  clear(): void {
    this.categoryForm.reset();
  }

  onNumberInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (+inputElement.value < 0) {
      inputElement.value = '0';
    }
  }
}