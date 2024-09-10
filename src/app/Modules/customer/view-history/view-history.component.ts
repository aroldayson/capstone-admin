import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-history',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-history.component.html',
  styleUrl: './view-history.component.css',
})
export class ViewHistoryComponent {}
