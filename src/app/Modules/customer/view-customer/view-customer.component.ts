import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { AdminService } from '../../../admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchfilterPipe } from '../../../searchfilter.pipe';

@Component({
  selector: 'app-view-customer',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    RouterModule,
    RouterLinkActive,
    FormsModule, // Add FormsModule for ngModel to work
    ReactiveFormsModule,
    SearchfilterPipe,
  ],
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
})
export class ViewCustomerComponent implements OnInit {
  cust: any[] = []; // List of customers
  filteredCustomers: any[] = []; // Filtered list for display
  searchTerm: string = ''; // Search input value

  constructor(private admin: AdminService, private router: Router) {}

  ngOnInit(): void {
    // Fetch customer data and initialize cust and filteredCustomers
    this.admin.customerdisplay().subscribe((result: any) => {
      this.cust = result;
      this.filteredCustomers = result; // Initialize the filtered list
    });
  }

  // Navigate to the customer's history
  history(id: any) {
    localStorage.setItem('Cust_ID', id);
    this.router.navigate(['/main/customertpage/main/view-history']);
  }
}
