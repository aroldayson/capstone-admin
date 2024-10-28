import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, RouterOutlet,ReactiveFormsModule],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css'
})
export class ViewDetailsComponent implements OnInit{
  details: any;


  constructor(
    private admin: AdminService
  ){}
  ngOnInit(): void {
    this.admin.viewdetails().subscribe(
      (result: any) => {
        this.details = result.cashed; // Store payments
        console.log(this.details); // Log for debugging
      },
      (error) => {
        console.error('Error fetching expenses data:', error);
      }
    );
  }

}
