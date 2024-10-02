import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-expenditure',
  standalone: true,
  imports: [RouterLink,NgxPrintModule],
  templateUrl: './expenditure.component.html',
  styleUrl: './expenditure.component.css'
})
export class ExpenditureComponent implements OnInit{
  expen: any;


  constructor(
    private admin: AdminService
  ){}
  ngOnInit(): void {
    this.admin.displayexpenses().subscribe((result: any) => {
      this.expen = result;
      console.log(this.expen);
    });
  }

}
