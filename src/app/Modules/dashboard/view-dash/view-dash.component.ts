import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import Swal from 'sweetalert2';
import { AdminService } from '../../../admin.service';

Chart.register(...registerables);

@Component({
  selector: 'app-view-dash',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, RouterOutlet],
  templateUrl: './view-dash.component.html',
  styleUrls: ['./view-dash.component.css'], // Fixed typo 'styleUrl' to 'styleUrls'
})
export class ViewDashComponent implements OnInit {
  selectedCashier: string = ''; 
  selectedAdmin: string = ''; 
  initialAmount: string = ""; 
  cashCount: string = ""; 
  isDisabled: boolean = true;
  currentDate: any;
  isCollapsed: boolean = false;
  users: any;

  selectedRole: string = '';
  cash: any;
  expenses: any;
  totalAmount: any;
  totals: any;
  count: any;
  staff: any;

  constructor(private admin: AdminService) {}

  onRoleChange(event: any) {
    this.selectedRole = event.target.value;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }

  public config: any = {
    type: 'bar',
    data: {
      labels: ['GCASH', 'BPI', 'CASH'],
      datasets: [
        {
          label: 'Income',
          data: [],
          backgroundColor: ['#2986cc', '#da1b1b', '#89c76e'],
          borderColor: ['#ff6384', '#36a2eb', '#cc65fe'],
          fill: false,
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Method of Payment',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Amount',
          },
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: 'Monthly Income Data for September 2024',
        },
        legend: {
          labels: {
            color: '#333',
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  chart: any;

  private updateChartData(): void {
    // Ensure the totals object is defined before trying to access its properties
    if (this.totals) {
      this.config.data.datasets[0].data = [this.totals.gcash, this.totals.bpi, this.totals.cash];
      if (this.chart) {
        this.chart.update(); // Update the chart with new data
      }
    }
  }

  ngOnInit(): void {
    this.chart = new Chart('MyChart', this.config);
    this.currentDate = this.formatDate(new Date());

    // Fetch payment data
    this.admin.paymentDisplay().subscribe(
      (result: any) => {
        this.cash = result.payments; // Store payments
        this.totalAmount = result.total_amount; // Store total amount
        this.totals = result.totals;
        console.log(this.cash, this.totalAmount); // Log for debugging
        this.updateChartData(); // Update the chart after fetching data
      },
      (error) => {
        console.error('Error fetching payment data:', error);
      }
    );

    // Fetch expenses data
    this.admin.expensesDisplay().subscribe(
      (result: any) => {
        this.expenses = result; // Store payments
        console.log(this.expenses); // Log for debugging
      },
      (error) => {
        console.error('Error fetching expenses data:', error);
      }
    );

    // Fetch count data
    this.admin.CountDisplay().subscribe(
      (result: any) => {
        this.count = result.total_count; // Store payments
        console.log(this.count); // Log for debugging
      },
      (error) => {
        console.error('Error fetching count data:', error);
      }
    );
  }

  isFormValid(): boolean {
    return this.initialAmount !== null && this.cashCount !== '';
  }

  openForms() {
    this.isDisabled = true;
    const totalAmount = 5000.00; 
    Swal.fire({
      title: 'Cash Count',
      html: `...`, // Keep the form HTML here as in your original code
      confirmButtonText: 'Calculate Total',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        // Retrieve values from the form and calculate total as in your original code
        // Return { totalAmount };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { totalAmount } = result.value;
        Swal.fire({
          html: `<p>Total Amount: ${totalAmount}.00</p>`,
          icon: 'info'
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            // Assign the total amount to cashCount
            this.initialAmount = totalAmount;
          }
        });
      }
    });
  }
}
