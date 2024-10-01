import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-account',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './view-account.component.html',
  styleUrl: './view-account.component.css'
})
export class ViewAccountComponent implements OnInit{

  admin_id = {id:localStorage.getItem('Admin_ID')}
  log: any;
  userId: any
  userData: any;
  users: any;

  constructor(
    private admin: AdminService
  ){}
  updateaccount = new FormGroup({
    Admin_Email: new FormControl(null),
    Admin_Password: new FormControl(null)
  })
  ngOnInit(): void {
    this.users = { id: localStorage.getItem('Admin_ID') };
    console.log('Admin_ID:', this.users.id);
    this.get();
  }
  get(){
    this.admin.findstaff(this.users.id).subscribe((result: any) => {
      this.users = result;
      console.log(result);
      this.updateaccount.controls['Admin_Email'].setValue(this.users.Email);
      this.updateaccount.controls['Admin_Password'].setValue(this.users.Password);
    });
  }
  update(){

  }

}
