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
  imports: [RouterLink, FormsModule,CommonModule, RouterOutlet],
  templateUrl: './view-dash.component.html',
  styleUrl: './view-dash.component.css',
})
export class ViewDashComponent implements OnInit {
  selectedCashier: string = ''; 
  selectedAdmin: string = ''; 
  initialAmount: string = ""; 
  cashCount: string = ""; 
  isDisabled: boolean = true;
  currentDate: any;
  isCollapsed: boolean = false;
  users:any

  selectedRole: string = '';
  cash: any;
  expenses: any;
  totalAmount: any;
  totals: any;
  count: any;

  constructor(
    private admin: AdminService
  ){}

  admins = [
    { names: 'Admin', value: 'cashier4' },
  ];

  cashiers = [
    { name: 'Juan Dela Cruz', value: 'cashier1' },
    { name: 'Carl Katigbak', value: 'cashier2' },
    { name: 'Maria Santos', value: 'cashier3' }
  ];

  onRoleChange(event: any) {
    this.selectedRole = event.target.value;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  getSelectedAdmin(): string {
    const selected = this.admins.find(admin => admin.value === this.selectedRole);
    return selected ? selected.names : 'No Admin Selected';
  }

  getSelectedCashierName(): string {
    const selected = this.cashiers.find(cashier => cashier.value === this.selectedRole);
    return selected ? selected.name : 'No Cashier Selected';
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
          data: ['1000', '550', '850'],
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
          text: 'Montly Income Data for September 2024',
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
  ngOnInit(): void {
    this.chart = new Chart('MyChart', this.config);
    this.currentDate = this.formatDate(new Date());

    this.admin.paymentDisplay().subscribe(
      (result: any) => {
        this.cash = result.payments; // Store payments
        this.totalAmount = result.total_amount; // Store total amount
        this.totals = result.totals;
        console.log(this.cash, this.totalAmount); // Log for debugging
      },
      (error) => {
        console.error('Error fetching payment data:', error);
      }
    );
    this.admin.expensesDisplay().subscribe(
      (result: any) => {
        this.expenses = result; // Store payments
        console.log(this.expenses); // Log for debugging
      },
      (error) => {
        console.error('Error fetching payment data:', error);
      }
    );
    this.admin.CountDisplay().subscribe(
      (result: any) => {
        this.count = result.total_count; // Store payments
        console.log(this.count); // Log for debugging
      },
      (error) => {
        console.error('Error fetching payment data:', error);
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
      html: `
      <h3 >Cashier in Charge: Juan Dela Cruz</h3>
      <h3 >Expenses: 50.00</h3>
        <form id="denominationForm">
          <table class="table">
            <thead>
              <tr>
                <th class="col-md-3">Amount</th>
                <th>Count</th>
                <th class="col-md-3">Amount</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1000</td>
                <td><input type="number" id="denom1000" class="form-control" placeholder="Count of 1000"></td>
                <td>500</td>
                <td><input type="number" id="denom500" class="form-control" placeholder="Count of 500"></td>
              </tr>
              <tr>
                <td>200</td>
                <td><input type="number" id="denom200" class="form-control" placeholder="Count of 200"></td>
                <td>100</td>
                <td><input type="number" id="denom100" class="form-control" placeholder="Count of 100"></td>
              </tr>
              <tr>
                <td>50</td>
                <td><input type="number" id="denom50" class="form-control" placeholder="Count of 50"></td>
                <td>20</td>
                <td><input type="number" id="denom20" class="form-control" placeholder="Count of 20"></td>
              </tr>
              <tr>
                <td>10</td>
                <td><input type="number" id="denom10" class="form-control" placeholder="Count of 10"></td>
                <td>5</td>
                <td><input type="number" id="denom5" class="form-control" placeholder="Count of 5"></td>
              </tr>
              <tr>
                <td>1</td>
                <td><input type="number" id="denom1" class="form-control" placeholder="Count of 1"></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </form>
      `,
      confirmButtonText: 'Calculate Total',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        // Retrieve values from the form
        const denom1000 = +(document.getElementById('denom1000') as HTMLInputElement).value || 0;
        const denom500 = +(document.getElementById('denom500') as HTMLInputElement).value || 0;
        const denom200 = +(document.getElementById('denom200') as HTMLInputElement).value || 0;
        const denom100 = +(document.getElementById('denom100') as HTMLInputElement).value || 0;
        const denom50 = +(document.getElementById('denom50') as HTMLInputElement).value || 0;
        const denom20 = +(document.getElementById('denom20') as HTMLInputElement).value || 0;
        const denom10 = +(document.getElementById('denom10') as HTMLInputElement).value || 0;
        const denom5 = +(document.getElementById('denom5') as HTMLInputElement).value || 0;
        const denom1 = +(document.getElementById('denom1') as HTMLInputElement).value || 0;

        // Calculate the total amount
        const totalAmount = (denom1000 * 1000) +
                            (denom500 * 500) +
                            (denom200 * 200) +
                            (denom100 * 100) +
                            (denom50 * 50) +
                            (denom20 * 20) +
                            (denom10 * 10) +
                            (denom5 * 5) +
                            (denom1 * 1);

        return {
          totalAmount
        };
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

  openForm() {
    this.isDisabled = true;
    const totalAmount = 5000.00; 
    Swal.fire({
      title: 'Cash Count',
      html: `
      <h3 >Cashier in Charge: Juan Dela Cruz</h3>
      <h3 >Expenses: 50.00</h3>
        <form id="denominationForm">
          <table class="table">
            <thead>
              <tr>
                <th class="col-md-3">Amount</th>
                <th>Count</th>
                <th class="col-md-3">Amount</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1000</td>
                <td><input type="number" id="denom1000" class="form-control" placeholder="Count of 1000"></td>
                <td>500</td>
                <td><input type="number" id="denom500" class="form-control" placeholder="Count of 500"></td>
              </tr>
              <tr>
                <td>200</td>
                <td><input type="number" id="denom200" class="form-control" placeholder="Count of 200"></td>
                <td>100</td>
                <td><input type="number" id="denom100" class="form-control" placeholder="Count of 100"></td>
              </tr>
              <tr>
                <td>50</td>
                <td><input type="number" id="denom50" class="form-control" placeholder="Count of 50"></td>
                <td>20</td>
                <td><input type="number" id="denom20" class="form-control" placeholder="Count of 20"></td>
              </tr>
              <tr>
                <td>10</td>
                <td><input type="number" id="denom10" class="form-control" placeholder="Count of 10"></td>
                <td>5</td>
                <td><input type="number" id="denom5" class="form-control" placeholder="Count of 5"></td>
              </tr>
              <tr>
                <td>1</td>
                <td><input type="number" id="denom1" class="form-control" placeholder="Count of 1"></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </form>
      `,
      confirmButtonText: 'Calculate Total',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        // Retrieve values from the form
        const denom1000 = +(document.getElementById('denom1000') as HTMLInputElement).value || 0;
        const denom500 = +(document.getElementById('denom500') as HTMLInputElement).value || 0;
        const denom200 = +(document.getElementById('denom200') as HTMLInputElement).value || 0;
        const denom100 = +(document.getElementById('denom100') as HTMLInputElement).value || 0;
        const denom50 = +(document.getElementById('denom50') as HTMLInputElement).value || 0;
        const denom20 = +(document.getElementById('denom20') as HTMLInputElement).value || 0;
        const denom10 = +(document.getElementById('denom10') as HTMLInputElement).value || 0;
        const denom5 = +(document.getElementById('denom5') as HTMLInputElement).value || 0;
        const denom1 = +(document.getElementById('denom1') as HTMLInputElement).value || 0;

        // Calculate the total amount
        const totalAmount = (denom1000 * 1000) +
                            (denom500 * 500) +
                            (denom200 * 200) +
                            (denom100 * 100) +
                            (denom50 * 50) +
                            (denom20 * 20) +
                            (denom10 * 10) +
                            (denom5 * 5) +
                            (denom1 * 1);

        return {
          totalAmount
        };
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
            this.cashCount = totalAmount;
          }
        });
      }
    });
  }
}
