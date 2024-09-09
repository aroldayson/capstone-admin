import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-price',
  standalone: true,
  imports: [RouterLink,RouterOutlet,ReactiveFormsModule,CommonModule],
  templateUrl: './update-price.component.html',
  styleUrl: './update-price.component.css'
})
export class UpdatePriceComponent implements OnInit {
  
  category_id = {id:localStorage.getItem('categ_id')}
  categ: any;
  // category = {category:localStorage.getItem('category')}
  constructor(
    private admin: AdminService,
    private route: Router
  ){

  }

  ngOnInit(): void {
    console.log(this.category_id.id)
    this.admin.getcateg(this.category_id.id).subscribe((result: any) =>{
      this.categ = result;
      console.log(result);
      this.categoryForm.controls['laundryname'].setValue(this.categ[0].category);
      this.categoryForm.controls['price'].setValue(this.categ[0].price);
      this.categoryForm.controls['kilograms'].setValue(this.categ[0].kilo);
    })
  } 
  categoryForm = new FormGroup({
    laundryname: new FormControl(null),
    price: new FormControl(null),
    kilograms: new FormControl(null)
  })
  update(){
    console.log(this.categoryForm.value);

    this.admin.updateCateg({...this.categoryForm.value, categ_id: this.category_id.id }).subscribe((result: any) => {
      console.log(result);

      if (result.message === 'Success') {
        this.route.navigate(['/main/pricemanagementpage/pricemgtmain/pricemgtview/add']);
      } else {
        // Handle error
        console.error('Error occurred during update:', result.message);
      }
    });
  }

}
