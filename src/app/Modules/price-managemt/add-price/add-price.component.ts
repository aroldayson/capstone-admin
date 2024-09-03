import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-add-price',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './add-price.component.html',
  styleUrl: './add-price.component.css'
})
export class AddPriceComponent implements OnInit{

  categoryForm = new FormGroup({
      laundryname: new FormControl('', Validators.required),
      price: new FormControl(0.0),
      kilograms: new FormControl(0.0)
  })

  constructor(
    private admin: AdminService,
    private route: Router
  ) {}
  ngOnInit(): void {

  }

  // save(){
  //   Swal.fire({
  //     title: "Are you sure to add categoty?",
  //     showDenyButton: true,
  //     // showCancelButton: true,
  //     confirmButtonText: "Save",
  //     denyButtonText: `Don't save`
  //   }).then((result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       Swal.fire("Saved!", "", "success");
  //     } else if (result.isDenied) {
  //       Swal.fire("Changes are not saved", "", "info");
  //     }
  //   });
  // }

  save(): void {
    // console.log(this.categoryForm.value)
    // this.admin.savecateg(this.categoryForm.value)
    // .subscribe((result:any)=>{
    //   if (result.message === 'Success') {
    //     this.route.navigate(['/main/pricemanagementpage/pricemgtmain/pricemgtview']);
    //   } else {
    //     console.error('Error occurred during signup:', result);
    //   }
    //   location.reload();
    // })
  }

  clear(): void {
    this.categoryForm.reset();
  }

}
