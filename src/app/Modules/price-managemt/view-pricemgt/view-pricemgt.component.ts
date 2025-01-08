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
import { SearchfilterPipe } from '../../../searchfilter.pipe';
import { interval, Subscription } from 'rxjs';

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
    SearchfilterPipe,
  ],
  templateUrl: './view-pricemgt.component.html',
  styleUrl: './view-pricemgt.component.css',
})
export class ViewPricemgtComponent implements OnInit {
  categ: any[] = []; // List of categories fetched from the service
  filteredCategories: any[] = []; // Filtered list of categories for display
  keyword: any;
  intervalId: any;
  isLoading: boolean = false;
  private pollingSubscription: Subscription | null = null;

  constructor(
    private admin: AdminService,
    private http: HttpClient,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getdatastaff();
    this.startPolling();
    this. spinner();
  }
  startPolling() {
    const pollingInterval = interval(5000);

    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }

    this.pollingSubscription = pollingInterval.subscribe(() => {
      this.fetchStaffData();
    });
  }
  spinner(){
    this.isLoading = true

    setTimeout(() => {
      this.isLoading = false;
    },3000);
  }
  

  fetchStaffData() {
    this.admin.displayprice().subscribe((result: any) => {
      const updatedStaff = result;

      if (JSON.stringify(updatedStaff) !== JSON.stringify(this.categ)) {
        console.log('Staff data has changed, updating list...');
        this.categ = updatedStaff;
        this.filteredCategories = updatedStaff;
      }
    });
  }

  getdatastaff() {
    this.admin.displayprice().subscribe((result: any) => {
      this.categ = result;
      this.filteredCategories = result;
    });
  }

  stopPolling() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
      this.pollingSubscription = null;
    }
  }

  ngOnDestroy() {
    this.stopPolling();
  }

  updatebtn(item: any): void {
    localStorage.setItem('Categ_ID', item);
    this.route.navigate(['/main/pricemanagementpage/pricemgtmain/viewcateg/update']);
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
        // title: 'Are you sure?',
        text: "Are you sure you want to delete this category?",
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
              swalWithBootstrapButtons.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
                showConfirmButton: false, // Removes the "OK" button
                timer: 1500, // Automatically closes after 1.5 seconds
              });
  
              // Update the view by removing the deleted category
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
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'Your category is safe.',
            icon: 'error',
            showConfirmButton: false, // Removes the "OK" button
            timer: 1500, // Automatically closes after 1.5 seconds
          });
        }
      });
  }
  

  history(id: any) {
    localStorage.setItem('Categ_ID', id);
    this.route.navigate(['/main/pricemanagementpage/pricemgtmain/viewcateg/update']);
  }
}
