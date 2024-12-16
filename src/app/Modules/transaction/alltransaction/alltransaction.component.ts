import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { SearchfilterPipe } from '../../../searchfilter.pipe';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-alltransaction',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    SearchfilterPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './alltransaction.component.html',
  styleUrl: './alltransaction.component.css',
})
export class AlltransactionComponent implements OnInit {
  trans: any;
  keyword: any;
  staff: any;
  totalprice: any;
  isLoading: boolean = false;
  selectedCashier: string = '';
  filteredTrans: any[] = [];

  constructor(private admin: AdminService) {}
  ngOnInit(): void {
    this.spinner();
    this.admin.displaystaff().subscribe(
      (result: any) => {
        this.staff = result;
        console.log(this.staff);
      },
      (error) => {
        console.error('Error fetching staff data:', error);
      }
    );
    this.admin.TransactiondisplayAll().subscribe((result: any) => {
      this.trans = result.data;
      this.totalprice = result.totalsprice;
      console.log(this.trans);
    });
  }

  spinner() {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  filterByCashier() {
    if (this.selectedCashier) {
      this.filteredTrans = this.trans.filter(
        (c: { Admin_fname: any; Admin_lname: any }) =>
          `${c.Admin_fname} ${c.Admin_lname}`.toLowerCase() ===
          this.selectedCashier.toLowerCase()
      );
    } else {
      this.filteredTrans = this.trans; // Reset to all transactions
    }
  }
}
