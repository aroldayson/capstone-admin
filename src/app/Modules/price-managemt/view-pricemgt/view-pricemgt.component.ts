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
  private pollingSubscription: Subscription | null = null;

  constructor(
    private admin: AdminService,
    private http: HttpClient,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.getdatastaff();
    this. startPolling();
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
