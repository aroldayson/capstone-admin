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
  styleUrls: ['./view-dash.component.css'],
})
export class ViewDashComponent implements OnInit {
  selectedCashier: string = ''; 
  selectedAdmin: string = ''; 
  initialAmount: string = ""; 
  cashCount: string = ""; 
  isDisabled: boolean = true;
  currentDate: any;
  currentdate: any;
  isCollapsed: boolean = false;
  users: any;

  selectedRole: string = '';
  cash: any;
  expenses: any;
  totalAmount: any;
  totals: any;
  count: any;
  staff: any;

  year: any;
  month: any;

  results: any = null; // Store the fetched results
  currentYear: number = new Date().getFullYear();

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  chart: any;
  
  public config: any = {
    type: 'bar',
    data: {
      labels: ['GCASH', 'BPI', 'CASH'],
      datasets: [{
        label: 'Income',
        data: [],
        backgroundColor: ['#2986cc', '#da1b1b', '#89c76e'],
        borderColor: ['#ff6384', '#36a2eb', '#cc65fe'],
        fill: false,
        tension: 0.1,
      }],
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
          text: '',
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
  // results: any;

  constructor(private admin: AdminService) {}

  initializeChart(): void {
    this.chart = new Chart('myChart', this.config); // Create the chart instance
  }

  ngOnInit(): void {
    this.currentDate = this.formatDate(new Date());
    this.currentdate = this.formatDates(new Date());
    this.config.options.plugins.title.text = `Monthly Income Data for ${this.currentdate}`;

    this.chart = new Chart('MyChart', this.config);

    this.loadPaymentData();
    this.loadExpensesData();
    this.loadCountData();
  }

  loadPaymentData(): void {
    this.admin.paymentDisplay().subscribe(
      (result: any) => {
        this.cash = result.payments;
        this.totalAmount = result.total_amount;
        this.totals = result.totals;
        console.log(this.cash, this.totalAmount);
        this.updateChartData();
      },
      (error) => {
        console.error('Error fetching payment data:', error);
      }
    );
  }

  private loadExpensesData(): void {
    this.admin.expensesDisplay().subscribe(
      (result: any) => {
        this.expenses = result;
        console.log(this.expenses);
      },
      (error) => {
        console.error('Error fetching expenses data:', error);
      }
    );
  }

  private loadCountData(): void {
    this.admin.CountDisplay().subscribe(
      (result: any) => {
        this.count = result.total_count;
        console.log(this.count);
      },
      (error) => {
        console.error('Error fetching count data:', error);
      }
    );
  }

  private updateChartData(): void {
    if (this.totals) {
      this.config.data.datasets[0].data = [this.totals.gcash, this.totals.bpi, this.totals.cash];
      this.chart.update(); 
    }
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }
  formatDates(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      // day: '2-digit',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }


  onRoleChange(event: any): void {
    this.selectedRole = event.target.value;
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  isFormValid(): boolean {
    return this.initialAmount !== null && this.cashCount !== '';
  }

  openForms(): void {
    this.isDisabled = true;
    Swal.fire({
      title: 'Cash Count',
      html: `...`, // Add your form HTML here
      confirmButtonText: 'Calculate Total',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        // Retrieve values from the form
        // Return { totalAmount };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { totalAmount } = result.value;
        Swal.fire({
          html: `<p>Total Amount: ${totalAmount}.00</p>`,
          icon: 'info',
        }).then(() => {
          this.initialAmount = totalAmount;
        });
      }
    });
  }
}
