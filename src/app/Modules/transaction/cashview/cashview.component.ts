import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cashview',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, RouterOutlet,ReactiveFormsModule],
  templateUrl: './cashview.component.html',
  styleUrl: './cashview.component.css'
})
export class CashviewComponent implements OnInit{
  details: any;


  constructor(
    private admin: AdminService
  ){}
  ngOnInit(): void {
    this.admin.viewdetails().subscribe(
      (result: any) => {
        this.details = result.cashed; 
        console.log(this.details); 
      },
      (error) => {
        console.error('Error fetching expenses data:', error);
      }
    );
  }

}
