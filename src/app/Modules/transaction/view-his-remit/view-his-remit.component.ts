import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-his-remit',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './view-his-remit.component.html',
  styleUrl: './view-his-remit.component.css'
})
export class ViewHisRemitComponent implements OnInit{

  remit: any
  currentDate: any;
  Transac = {id: localStorage.getItem('Staff_ID')}
  Initial: any;
  Expenses: any;
  data: any;
  Transacs: any;
  Totalprice: any;
  Totalreceive: any;
  TotalOver: any;
  Remit: any;

  constructor(
    private admin: AdminService,
    private route: Router
  ){}

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long', // Full month name (e.g., January, February)
      day: '2-digit', // Day with leading zeros if necessary (e.g., 01, 02)
      year: 'numeric', // Full year (e.g., 2023)
      hour: '2-digit', // Hour (e.g., 01, 02)
      minute: '2-digit', // Minute (e.g., 30, 45)
      second: '2-digit', // Second (e.g., 30, 45)
      hour12: true // Optional: To show time in 12-hour format with AM/PM
    };
    return date.toLocaleDateString('en-US', options) ;
  }
  

  ngOnInit(): void {
    console.log(this.Transac);
    this.currentDate = this.formatDate(new Date());
    // this.admin.remittanceapproved().subscribe((result: any) => {
    //   this.remit = result.Data;
    //   console.log(this.remit);
    // });

    this.admin.printTransac(this.Transac.id).subscribe((result: any) => {
      this.data = result;
      this.Transacs = result.Transac;
      this.Initial = result.Initials[0];
      this.Expenses = result.Expenses[0];
      this.Totalprice = result.Totalprice;
      this.Totalreceive = result.Totalinitials;
      this.Remit = result.Remit[0];
      console.log(this.Totalprice,this.data,this.Transacs,this.Initial,this.Expenses,this.Remit);
    })
  }

  Transaction(){
    this.route.navigate(['/main/tansactionpage/main/view-tran/view-paid'])
  }

}
