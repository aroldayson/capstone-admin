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
  currentDatezzz: string = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`;
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

  results: any = null; 
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
  isLoading: boolean = false;

  constructor(private admin: AdminService) {
    // const now = new Date();
    // this.currentDatezzz = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
  }

  ngOnInit(): void {
    const now = new Date();
    this.currentDate = this.formatDate(new Date());
    this.config.options.plugins.title.text = `Monthly Income Data for ${this.formatDates(new Date())}`;
    this.chart = new Chart('MyChart', this.config);
    this.currentDatezzz = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    
    this.loadPaymentData();
    this.loadExpensesData();
    this.loadCountData();
    this.spinner();
  
    // Pass the selected month in the correct format
    this.onMonthChange(this.currentDate);
  }
  

  loadPaymentData(): void {
    this.admin.paymentDisplay().subscribe(
      (result: any) => {
        this.cash = result.payments;
        this.totalAmount = result.total_amount;
        this.totals = result.totals;
        this.updateChartData();
      },
      (error) => {
        console.error('Error fetching payment data:', error);
      }
    );
  }

  loadExpensesData(): void {
    this.admin.expensesDisplay().subscribe(
      (result: any) => {
        this.expenses = result;
      },
      (error) => {
        console.error('Error fetching expenses data:', error);
      }
    );
  }

  loadCountData(): void {
    this.admin.CountDisplay().subscribe(
      (result: any) => {
        this.count = result.total_count;
      },
      (error) => {
        console.error('Error fetching count data:', error);
      }
    );
  }

  onMonthChange(event?: Event): void {
    const selectedMonth = (event?.target as HTMLInputElement)?.value || this.getCurrentMonth();
    const [year, month] = selectedMonth.split('-').map(Number);
    
    if (year && month) {
      this.currentDatezzz = selectedMonth;
      this.updateChartData(selectedMonth);
    } else {
      console.error('Invalid month selected.');
    }
  }

  spinner(){
    this.isLoading = true

    setTimeout(() => {
      this.isLoading = false;
    },3000);
  }

  getCurrentMonth(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  updateChartData(selectedMonth: string = this.currentDatezzz): void {
    const [year, month] = selectedMonth.split('-').map(Number);
    this.admin.dashdisplaysmonths(year, month).subscribe(
      (result: any) => {
        const monthlyData = result.totals;
        if (monthlyData) {
          this.config.data.datasets[0].data = [
            monthlyData.gcash, 
            monthlyData.bpi, 
            monthlyData.cash
          ];  
          this.chart.update();
        } else {
          console.error(`No data found for the selected month: ${selectedMonth}`);
        }
      },
      (error) => {
        console.error('Error fetching totals data:', error);
      }
    );
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
  }

  formatDates(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  openForms(): void {
    this.isDisabled = true;
    Swal.fire({
      title: 'Cash Count',
      html: `<input type="number" id="initialAmount" class="swal2-input" placeholder="Enter Initial Amount">`,
      confirmButtonText: 'Calculate Total',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const initialAmount = (document.getElementById('initialAmount') as HTMLInputElement)?.value;
        if (initialAmount) {
          return { totalAmount: initialAmount };
        }
        return null;
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
