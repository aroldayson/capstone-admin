import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../../admin.service';
import { SearchfilterPipe } from '../../../searchfilter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-customer',
  standalone: true,
  imports: [RouterLink, RouterOutlet,SearchfilterPipe,FormsModule],
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.css',
})
export class ViewCustomerComponent implements OnInit{

  cust: any
  keyword: string = '';

  constructor(
    private admin: AdminService,
    private route: Router
  ){}
  ngOnInit(): void {
    this.admin.customerdisplay().subscribe((result: any) => {
      this.cust = result;
      console.log(this.cust);
    });
  }

  history(id: any){
    console.log(id)
    localStorage.setItem('Cust_ID', id)
    this.route.navigate(["/main/customertpage/main/view-history"])
  }

}
