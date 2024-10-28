import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-add-price',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,FormsModule],
  templateUrl: './add-price.component.html',
  styleUrl: './add-price.component.css'
})
export class AddPriceComponent implements OnInit{

  categoryForm = new FormGroup({
    Category: new FormControl(null),
    Price: new FormControl(0.0),
  })

  constructor(
    private admin: AdminService,
    private route: Router
  ) {}
  ngOnInit(): void {

  }

  save(): void {
    console.log(this.categoryForm.value);
    // Swal.fire({
    //   position: "top-end",
    //   icon: "success",
    //   title: "Your work has been saved",
    //   showConfirmButton: true, 
    // })
  
    this.admin.addprice(this.categoryForm.value).subscribe(
      (result: any) => {
        if (result.message === 'Success') {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: true, 
          }).then(() => {
            location.reload();
          });
          this.route.navigate(['/main/pricemanagementpage/pricemgtmain/pricemgtview']);
        } else {
          console.error('Error occurred during save:', result);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  
  clear(): void {
    this.categoryForm.reset();
  }

}
