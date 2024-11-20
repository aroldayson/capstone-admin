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
    FormsModule, 
    ReactiveFormsModule,
    SearchfilterPipe,
  ],
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
})
export class ViewCustomerComponent implements OnInit {
  cust: any[] = []; 
  filteredCustomers: any[] = [];
  searchTerm: string = ''; 

  constructor(private admin: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.admin.customerdisplay().subscribe((result: any) => {
      this.cust = result;
      this.filteredCustomers = result; 
    });
  }

  history(id: any) {
    localStorage.setItem('Cust_ID', id);
    this.router.navigate(['/main/customertpage/main/view-history']);
  }
}
