import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-view-history',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-history.component.html',
  styleUrl: './view-history.component.css',
})
export class ViewHistoryComponent implements OnInit{
  cust_id = {id:localStorage.getItem('Cust_ID')}
  cust: any

  constructor(
    private admin: AdminService
  ){}
  ngOnInit(): void {
    this.admin.findcustomer(this.cust_id.id).subscribe(
      (result: any) => {
        this.cust = result; 
        console.log(result)
      }
    );
  }
}
