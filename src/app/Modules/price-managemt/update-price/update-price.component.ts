import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-update-price',
  standalone: true,
  imports: [RouterLink,RouterOutlet,ReactiveFormsModule],
  templateUrl: './update-price.component.html',
  styleUrl: './update-price.component.css'
})
export class UpdatePriceComponent implements OnInit {
  
  id = {id:localStorage.getItem('id')}
  category = {category:localStorage.getItem('category')}

  ngOnInit(): void {
    console.log(this.category)
  }
  categoryForm = new FormGroup({
    laundryname: new FormControl(this.id.id, Validators.required),
    price: new FormControl(0.0),
    kilograms: new FormControl(0.0)
  })
  update(){
  }

}
