import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-customer',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.css'
})
export class ViewCustomerComponent {


  Approved(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger"
      },  
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      // title: "Are you sure to approved?",
      html:`
      <div class="modal-content">

                        <div class="modal-header " >
                          <h4 class="modal-title" >ITEM DETAILS:</h4>
                        </div>

                        <div class="modal-body col-lg-12">
                            <div class="row justify-content-center">
                                <div class="col-md mb-4 text-center">
                                    <div>
                                        <label class="form-label" for="form3Example2"><b>IMAGE </b></label>
                                    </div>
                                    <div>
                                        <img *ngIf="u.image" [src]="u.image" height="130" width="130">
                                    </div>
                                </div>
                            </div>

                             <div class="row">
                                <div class="col-md-7">
                                    <div>
                                        <label class="form-label mx-5" for="form3Example2"><b>Category:</b></label>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <div>
                                        <label class="form-label m-0" for="form3Example2"></label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-7">
                                    <div>
                                        <label class="form-label mx-5" for="form3Example2"><b>Status:</b></label>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <div>
                                        <label class="form-label" for="form3Example2"></label>
                                    </div>
                                </div>
                            </div>

                            <div class="row" >
                              <div class="col-md-7">
                                    <label class="mx-5"><b>Dropped Details: </b></label>
                              </div>
                              <div class="col-md-12">
                                  <label class="m-0 mx-5 px-5" for="form3Example2"><b class="m-0 mx-3">Date Dropped:</b></label><br>
                                  <label class="m-0 mx-5 px-5" for="form3Example2"><b class="m-0 mx-3">Dropped by:</b><span class="mx-2"></span></label><br>
                                  <label class="m-0 mx-5 px-5" for="form3Example2"><b class="m-0 mx-3">Dropped to:</b><span class="mx-2"></span></label><br>
                                  <label class="m-0 mx-5 px-5" for="form3Example2"><b class="m-0 mx-3">Contact:</b><span class="mx-4"></span></label>
                              </div>
                            </div>

                             <div class="row" >
                              <div class="col-md-7">
                                    <label class="mx-5"><b>Received Details: </b></label>
                              </div>
                              <div class="col-md-12">
                                    <label class="m-0 mx-5 px-5" for="form3Example2"><b class="m-0 mx-3">Date Received:</b></label><br>
                                    <label class="m-0 mx-5 px-5" for="form3Example2"><b class="m-0 mx-3">Received by:</b><span class="mx-2"></span></label><br>
                              </div>
                            </div>
                        </div>
                      </div>
      `,
      // icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Approved",
          text: "Your remittance is approved.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Approval canceled.",
          icon: "error"
        });
      }
    });

  }
}
