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

  // Function to filter customers based on search input
  filterCustomers(): void {
    const searchTermLower = this.searchTerm.toLowerCase(); // Case-insensitive search

    // Convert the search term to a number to handle numeric filtering
    const searchTermNumber = parseFloat(this.searchTerm);

    // Filter the customer list
    this.filteredCustomers = this.cust.filter((customer) => {
      // Combine first, middle, and last names for search
      const fullName =
        `${customer.Cust_fname} ${customer.Cust_mname} ${customer.Cust_lname}`.toLowerCase();
      const phoneNumber = customer.Cust_phoneno.toString(); // Convert phone number to string for search
      const address = customer.Cust_address.toLowerCase();
      const email = customer.Cust_email.toLowerCase();


      return (
        fullName.includes(searchTermLower) || // Match customer name
        phoneNumber.includes(this.searchTerm) || // Match phone number
        address.includes(searchTermLower) || // Match address
        email.includes(searchTermLower) || // Match address
        (!isNaN(searchTermNumber) && customer.Cust_phoneno === searchTermNumber) // Match exact phone number if numeric
      );
    });
  }

  // Navigate to the customer's history
  history(id: any) {
    localStorage.setItem('Cust_ID', id);
    this.router.navigate(['/main/customertpage/main/view-history']);
  }
}
