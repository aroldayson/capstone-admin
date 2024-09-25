import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-view-account',
  standalone: true,
  imports: [],
  templateUrl: './view-account.component.html',
  styleUrl: './view-account.component.css'
})
export class ViewAccountComponent implements OnInit{

  admin_id = {id:localStorage.getItem('Admin_ID')}
  log: any;
  userId: any
  userData: any;

  constructor(
    private admin: AdminService
  ){}
  ngOnInit(): void {
    
  }
    

}
