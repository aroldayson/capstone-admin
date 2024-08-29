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
    this.admin.displayitem().subscribe((result: any) => {
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
    localStorage.setItem('category', item)
    this.route.navigate(["/main/pricemanagementpage/pricemgtmain/pricemgtview/update"])
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
          swalWithBootstrapButtons.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
          this.admin.deleteprice(id).subscribe((result: any) => {
            console.log('User Deleted!', result);
            this.categ = result.data;
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'Your imaginary file is safe :)',
            icon: 'error',
          });
        }
      });
  }
}
