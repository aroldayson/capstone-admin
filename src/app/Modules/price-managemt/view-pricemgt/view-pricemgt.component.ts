import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import Swal from 'sweetalert2';
import { AdminService } from '../../../admin.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-pricemgt',
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
  templateUrl: './view-pricemgt.component.html',
  styleUrl: './view-pricemgt.component.css',
})
export class ViewPricemgtComponent implements OnInit {
  categ: any[] = []; // List of categories fetched from the service
  filteredCategories: any[] = []; // Filtered list of categories for display
  searchTerm: string = ''; // Search term entered in the input field

  constructor(
    private admin: AdminService,
    private http: HttpClient,
    private route: Router
  ) {}

  ngOnInit(): void {
    // Fetch categories and initialize both categ and filteredCategories
    this.admin.displayprice().subscribe((result: any) => {
      this.categ = result;
      this.filteredCategories = result; // Initially display all categories
    });
  }

  // Filter categories based on the search term
  filterCategories(): void {
    const searchTermLower = this.searchTerm.toLowerCase(); // Convert search term to lowercase for case-insensitive text matching

    // Check if the search term is a number
    const searchTermNumber = parseFloat(this.searchTerm); // Convert to a number for numeric filtering (NaN if not a number)

    // Filter categories based on text or numeric search
    this.filteredCategories = this.categ.filter((category) => {
      // Convert Per_kilograms to string and check if searchTerm is a part of it
      const perKilogramsString = category.Price.toString();

      return (
        category.Category.toLowerCase().includes(searchTermLower) || // Match category name
        perKilogramsString.includes(this.searchTerm) || // Match per kilograms (as a string)
        (!isNaN(searchTermNumber) && category.Price === searchTermNumber) // Match exact per kilograms if search term is a number
      );
    });
  }

  // Other existing methods (updatebtn, dltbtn)...

  updatebtn(item: any): void {
    localStorage.setItem('Categ_ID', item);
    this.route.navigate([
      '/main/pricemanagementpage/pricemgtmain/pricemgtview/update',
    ]);
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
          this.admin.deletecateg(id).subscribe(
            () => {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
              this.categ = this.categ.filter(
                (category) => category.Categ_ID !== id
              );
              this.filteredCategories = this.filteredCategories.filter(
                (category) => category.Categ_ID !== id
              );
            },
            (error) => {
              console.error('Delete failed', error);
              swalWithBootstrapButtons.fire(
                'Error!',
                'There was an error deleting the category.',
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
