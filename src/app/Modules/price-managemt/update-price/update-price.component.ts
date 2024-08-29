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
  
  category = {item:localStorage.getItem('category')}

  ngOnInit(): void {
    console.log(this.category)
  }
  categoryForm = new FormGroup({
    laundryname: new FormControl('', Validators.required),
    price: new FormControl(0.0),
    kilograms: new FormControl(0.0)
  })
  update(){
  }

}
