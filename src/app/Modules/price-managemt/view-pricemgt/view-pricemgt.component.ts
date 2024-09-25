import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../../admin.service';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-pricemgt',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink, 
    CommonModule,
    RouterModule,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  templateUrl: './view-pricemgt.component.html',
  styleUrl: './view-pricemgt.component.css',
})
export class ViewPricemgtComponent implements OnInit {
  ngOnInit(): void {
    // this.useid = localStorage.getItem('result');
    this.admin.displayprice().subscribe((result: any) => {
      this.categ = result;
      console.log(this.categ);
    });
  }

  constructor(private admin: AdminService, private http: HttpClient, private route: Router) {}
  categ: any;
  categid: any;
  users: any;

  updatebtn(item:any) {
    console.log(item)
    localStorage.setItem('Categ_ID', item)
    this.route.navigate(["/main/pricemanagementpage/pricemgtmain/pricemgtview/update"])
  }
  // dltbtn(id: any){}

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
        this.admin.deletecateg(id).subscribe(
          response => {
            swalWithBootstrapButtons.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success'
            });
            this.route.navigate(["/main/pricemanagementpage/pricemgtmain/pricemgtview/add"])
            this.categ = this.categ.filter((categ: any) => categ.Categ_ID !== id);
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
}
