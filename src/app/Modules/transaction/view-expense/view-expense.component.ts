import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-expense',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-expense.component.html',
  styleUrl: './view-expense.component.css'
})
export class ViewExpenseComponent {

  approved(){
    Swal.fire({
      title: "Are you sure Approved?",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, approved it!",
      cancelButtonColor: "#d33",
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Approved!",
          text: "Your expenses has been approved.",
          icon: "success"
        });
      }
    });
  }

}
