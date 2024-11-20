import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-transaction',
  standalone: true,
  imports: [NgxPrintModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './view-transaction.component.html',
  styleUrl: './view-transaction.component.css',
})
export class ViewTransactionComponent {
  Approved() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure to approved?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Approved it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: 'Approved',
            text: 'Your remittance is approved.',
            icon: 'success',
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'Approval canceled.',
            icon: 'error',
          });
        }
      });
  }
}
