import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from  'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-view-dash',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-dash.component.html',
  styleUrl: './view-dash.component.css'
})
export class ViewDashComponent implements OnInit{
  currentDate: any;
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  public config: any = {
    type: 'bar',
    data: {
      labels: ['GCASH', 'BPI', 'CASH'], 
      datasets: [
        {
          label: 'Income', 
          data: ['1000', '550', '850'],
          backgroundColor: ['#2986cc', '#da1b1b', '#89c76e'],
          borderColor: ['#ff6384', '#36a2eb', '#cc65fe'],
          fill: false, 
          tension: 0.1 
        }
      ]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Method of Payment'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Amount'
          },
          beginAtZero: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Montly Income Data for 2024',
        },
        legend: {
          labels: {
            color: '#333' // Color of the legend text
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false 
    }
  };
  
  chart: any;
  ngOnInit(): void {
    this.chart = new  Chart('MyChart',this.config);
    this.currentDate = this.formatDate(new Date());
  }

}
