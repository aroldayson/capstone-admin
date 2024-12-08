import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { SearchfilterPipe } from '../../../searchfilter.pipe';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-alltransaction',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,SearchfilterPipe,ReactiveFormsModule],
  templateUrl: './alltransaction.component.html',
  styleUrl: './alltransaction.component.css'
})
export class AlltransactionComponent implements OnInit{
  trans: any;
  keyword: any
  staff: any;
  totalprice: any;
  constructor(
    private admin: AdminService
  ){}
  ngOnInit(): void {
    this.admin.customerdisplays().subscribe(
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
      console.log(this.trans)
    });
  }
}