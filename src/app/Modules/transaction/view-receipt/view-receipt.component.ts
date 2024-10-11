import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-receipt',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-receipt.component.html',
  styleUrl: './view-receipt.component.css'
})
export class ViewReceiptComponent implements OnInit{

  Transac = {id: localStorage.getItem('Staff_ID')}


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
