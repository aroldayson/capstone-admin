import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../../admin.service';
@Component({
  selector: 'app-view-staff',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './view-staff.component.html',
  styleUrl: './view-staff.component.css'
})
export class ViewStaffComponent implements OnInit{
  staff:any
  id: any;
  intervalId: any;
  staff_id: { id: string | null } = { id: localStorage.getItem('Admin_ID') };


  ngOnInit(): void {
    this.startPolling();
    this.showdata();
  }
  startPolling() {
    this.intervalId = setInterval(async () => {
      const latestAdminId = localStorage.getItem('Admin_ID');
      if (latestAdminId !== this.staff_id.id) {
        this.staff_id.id = latestAdminId;
        this.showdata();
        location.reload();
      }
    }, 300); // Check every second
  }

  showdata(){
    this.admin.getData().subscribe((result: any) => {
      this.staff = result;
      console.log(this.staff);
    });
  }
  constructor(
    private admin: AdminService,
    private route: Router
  ){}

  dltbtn(id: any): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.admin.deletestaff(id).subscribe(
          response => {
            swalWithBootstrapButtons.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success'
            });
            this.route.navigate(["/main/staffpage/staffmain/staffview/addstaff"])
            this.staff = this.staff.filter((staff: any) => staff.Admin_ID !== id);
          },
          error => {
            console.error('Delete failed', error);
            swalWithBootstrapButtons.fire({
              title: 'Error!',
              text: 'There was an error deleting the staff member.',
              icon: 'error'
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: 'Cancelled',
          text: 'Your imaginary file is safe :)',
          icon: 'error'
        });
      }
    });
  }

  update(id: any){
    console.log(id)
    localStorage.setItem('Admin_ID', id)
    this.route.navigate(["/main/staffpage/staffmain/staffview/update"])
  }
  upload(id: any){
    console.log(id)
    localStorage.setItem('Admin_ID', id)
    this.route.navigate(["/main/staffpage/staffmain/staffview/upload"])
  }
  



  // dltbtn(): void {
  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: "btn btn-success mx-2",
  //       cancelButton: "btn btn-danger"
  //     },
  //     buttonsStyling: false
  //   });
  //   swalWithBootstrapButtons.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText:"Yes, delete it!",
  //     cancelButtonText: "No, cancel!",
  //     reverseButtons: true
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       swalWithBootstrapButtons.fire({
  //         title: "Deleted!",
  //         text: "Your file has been deleted.",
  //         icon: "success"
  //       });
  //     } else if (
  //       /* Read more about handling dismissals below */
  //       result.dismiss === Swal.DismissReason.cancel
  //     ) {
  //       swalWithBootstrapButtons.fire({
  //         title: "Cancelled",
  //         text: "Your imaginary file is safe :)",
  //         icon: "error"
  //       });
  //     }
  //   });
  // }
}
