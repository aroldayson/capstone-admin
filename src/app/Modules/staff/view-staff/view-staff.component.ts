import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../../admin.service';
import { FormsModule } from '@angular/forms';
import { SearchfilterPipe } from '../../../searchfilter.pipe';

@Component({
  selector: 'app-view-staff',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormsModule, SearchfilterPipe],
  templateUrl: './view-staff.component.html',
  styleUrl: './view-staff.component.css',
})
export class ViewStaffComponent implements OnInit {
  staff: any[] = []; // List of staff members
  filteredStaff: any[] = []; // Filtered list for displaying
  searchTerm: string = ''; // Search term for filtering

  constructor(private admin: AdminService, private route: Router) {}

  ngOnInit(): void {
    this.admin.getData().subscribe((result: any) => {
      this.staff = result; // Fetch the complete list of staff from the server
      this.filteredStaff = result; // Initialize the filtered list with the full staff list
    });
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
