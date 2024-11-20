import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../../admin.service';
import { FormsModule } from '@angular/forms';
import { SearchfilterPipe } from '../../../searchfilter.pipe';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'app-view-staff',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormsModule, SearchfilterPipe, CommonModule],
  templateUrl: './view-staff.component.html',
  styleUrl: './view-staff.component.css',
})
export class ViewStaffComponent implements OnInit {
  staff: any[] = []; 
  filteredStaff: any[] = []; 
  searchTerm: string = ''; 
  staff_id: { id: string | null } = { id: localStorage.getItem('Admin_ID') };
  intervalId: any;
  imagePreview: string | ArrayBuffer | null = null;
  existingImageUrl: string | null = null;
  message: string = '';

  constructor(private admin: AdminService, private route: Router) {}

  ngOnInit(): void {
    this.getdatastaff();
    this.startPolling();
    // this.loadExistingImage();
  }

  startPolling() {
    const pollingInterval = interval(10000); 
  
    pollingInterval.subscribe(() => {
      this.admin.getData().subscribe((result: any) => {
        const updatedStaff = result;
  
        if (JSON.stringify(updatedStaff) !== JSON.stringify(this.staff)) {
          console.log('Staff data has changed, updating list...');
          this.staff = updatedStaff;
          this.updateFilteredStaff();
        }
      });
    });
  }
  
  getdatastaff() {
    this.admin.getData().subscribe((result: any) => {
      this.staff = result; 
      this.updateFilteredStaff();
  
      if (this.filteredStaff && this.filteredStaff.length > 0) {
        this.startPolling(); 
      } else {
        console.log('No registered staff');
        this.filteredStaff = []; 
      }
    });
  }
  
  updateFilteredStaff() {
    this.filteredStaff = this.staff.filter((staff: any) => staff.Role === 'staff');
  
    this.filteredStaff.forEach((staff: any) => {
      if (staff.Admin_image) {
        staff.imagePreview = staff.Admin_image;
      } else {
        staff.imagePreview = null;
      }
    });
  
    console.log(this.filteredStaff);
  }

  // getdatastaff(){
  //   this.admin.getData().subscribe((result: any) => {
  //     this.staff = result; // Fetch the complete list of staff from the server
  //     this.filteredStaff = result; // Initialize the filtered list with the full staff list

  //     if (this.filteredStaff && this.filteredStaff.length > 0) {
  //       const pendingTransactions = this.filteredStaff.filter((staff: any) => staff.Role === 'staff');

  //       if (pendingTransactions.length > 0) {
  //           this.filteredStaff = pendingTransactions;
  //           this.startPolling();
  //           this.existingImageUrl = `http://127.0.0.1:8000/storage/profile_images/${staff.Admin_image}`;
  //           this.imagePreview = this.existingImageUrl;
  //       } else {
  //           console.log('Not found staff');
  //           this.filteredStaff = [];
  //       }
  //     } else {
  //         console.log('Not Register satff');
  //         this.filteredStaff = [];
  //     }
  //   });
  // }
  // getdatastaff() {
  //   this.admin.getData().subscribe((result: any) => {
  //     this.staff = result; // Fetch the complete list of staff from the server
  //     this.filteredStaff = result; // Initialize the filtered list with the full staff list
  
  //     if (this.filteredStaff && this.filteredStaff.length > 0) {
  //       // Filter out staff members with role 'staff'
  //       const pendingTransactions = this.filteredStaff.filter((staff: any) => staff.Role === 'staff');
  
  //       if (pendingTransactions.length > 0) {
  //         this.filteredStaff = pendingTransactions;
  
  //         // Set image preview for each staff in the filtered list
  //         this.filteredStaff.forEach((staff: any) => {
  //           if (staff.Admin_image) {
  //             staff.imagePreview = staff.Admin_image; // Directly assign the image URL from the backend
  //             console.log(staff.imagePreview); // Log the image preview URL
  //           } else {
  //             staff.imagePreview = null; // Clear the preview if no image
  //           }
  //         });
  
  //         this.startPolling(); // Start polling if staff found
  //       } else {
  //         console.log('No staff found');
  //         this.filteredStaff = []; // Clear the list if no staff with the 'staff' role
  //       }
  //     } else {
  //       console.log('No registered staff');
  //       this.filteredStaff = []; // Clear the list if no staff is returned
  //     }
  //   });
  // }
  

  // startPolling() {
  //   this.intervalId = setInterval(async () => {
  //     const latestAdminId = localStorage.getItem('Admin_ID');
  //     if (latestAdminId !== this.staff_id.id) {
  //       this.staff_id.id = latestAdminId;
  //       // this.loadExistingImage();
  //       // this.image();
  //     }
  //   }, 300); // Check every second
  // }

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
          this.admin.deletestaff(id).subscribe(
            (response) => {
              swalWithBootstrapButtons.fire({
                title: 'Deleted!',
                text: 'The staff member has been deleted.',
                icon: 'success',
              });
              this.route.navigate([
                '/main/staffpage/staffmain/staffview/addstaff',
              ]);
              this.staff = this.staff.filter(
                (staff: any) => staff.Admin_ID !== id
              ); // Remove deleted staff from the list
              this.filteredStaff = this.staff; // Update the filtered list
            },
            (error) => {
              console.error('Delete failed', error);
              swalWithBootstrapButtons.fire({
                title: 'Error!',
                text: 'There was an error deleting the staff member.',
                icon: 'error',
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'Your staff member is safe :)',
            icon: 'error',
          });
        }
      });
  }

  update(id: any): void {
    localStorage.setItem('Admin_ID', id);
    this.route.navigate(['/main/staffpage/staffmain/staffview/update']);
  }

  upload(id: any): void {
    localStorage.setItem('Admin_ID', id);
    this.route.navigate(['/main/staffpage/staffmain/staffview/upload']);
  }
}
