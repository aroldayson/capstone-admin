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
import Swal from 'sweetalert2';

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
  isLoading: boolean = false;

  constructor(private admin: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.spinner();
    this.admin.customerdisplay().subscribe((result: any) => {
      this.cust = result;
      this.filteredCustomers = result;
    });
  }

  history(id: any) {
    localStorage.setItem('Cust_ID', id);
    this.router.navigate(['/main/customertpage/main/view-history']);
  }

  spinner(){
    this.isLoading = true

    setTimeout(() => {
      this.isLoading = false;
    },3000);
  }

  dltbtn(id: any): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.admin.deletecustomer(id).subscribe(
            () => {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
              this.cust = this.cust.filter(
                (category) => category.Cust_ID !== id
              );
              this.filteredCustomers = this.filteredCustomers.filter(
                (category) => category.Cust_ID !== id
              );
            },
            (error) => {
              console.error('Delete failed', error);
              swalWithBootstrapButtons.fire(
                'Error!',
                'There was an error deleting the customer.',
                'error'
              );
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your category is safe :)',
            'error'
          );
        }
      });
  }
}
