import { Component } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';


@Component({
  selector: 'app-view-transaction',
  standalone: true,
  imports: [NgxPrintModule],
  templateUrl: './view-transaction.component.html',
  styleUrl: './view-transaction.component.css'
})
export class ViewTransactionComponent {

  Approved(){
    
  }

}
