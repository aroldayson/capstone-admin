import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // url = 'http://localhost/admin/';
  Apiurl = 'http://localhost:8000/api/';
  // Apiurl = 'http://10.0.110.205:8000/api/';

  constructor(private http: HttpClient) {}

  // ACCOUNT
  logins(data: any): Observable<any> {
    return this.http.post(this.Apiurl + 'login', data);
  }
  logout(headers: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(this.Apiurl + 'logout', {}, { headers });
  }
  updateaccount(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.Apiurl}updateaccount/${data.id}`, data, {
      headers,
    });
  }


  // ADMIN ACCOUNT MANAGEMENT
  getAdmin(adminId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}admin/${adminId}`, { headers });
  }

  updateAdmin(adminData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(
      `${this.Apiurl}updateAdmin/${adminData.admin_id}`,
      adminData,
      { headers }
    );
  }

  // STAFF
  getData() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'displaystaff', { headers });
  }

  insertData(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.Apiurl + 'addstaff', data, { headers });
  }

  deletestaff(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.Apiurl}deletestaff/${id}`, { headers });
  }

  findstaff(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}findstaff/${id}`, { headers });
  }

  updateStaff(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.Apiurl}updatestaff/${data.id}`, data, {
      headers,
    });
  }

  uploadAdmin(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.Apiurl}upload/${data.Admin_ID}`, data, {
      headers,
    });
  }

  // PRICEMANAGEMENT
  displayprice() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'pricedisplay', { headers });
  }

  addprice(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.Apiurl + 'addprice', data, { headers });
  }

  deletecateg(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.Apiurl}deletecateg/${id}`, { headers });
  }

  findprice(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}findprice/${id}`, { headers });
  }

  updateprice(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.Apiurl}updateprice/${data.id}`, data, {
      headers,
    });
  }

  // DASHBOARD
  paymentDisplay() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'dashdisplays', { headers });
  }

  expensesDisplay() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'expensendisplays', { headers });
  }

  CountDisplay() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'CountDisplay', { headers });
  }

  Staffinitail() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'displaystaffs', { headers });
  }

  cashinitial(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.Apiurl + 'cashinitial', data, { headers });
  }

  remit(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.Apiurl + 'remittance', data, { headers });
  }

  viewdetails() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'veiwdeatils', { headers });
  }

  // CUSTOMER
  customerdisplay() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'customerdisplay', { headers });
  }

  findcustomer(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}findcustomer/${id}`, { headers });
  }

  updateprofilecus(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.Apiurl}updateprofilecus/${data.id}`, data, {
      headers,
    });
  }

  deletecustomer(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.Apiurl}deletecustomer/${id}`, { headers });
  }

  // TRANSACTION
  findtransaction(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}findtrans/${id}`, { headers });
  }

  findtransactionprint(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}printtrans/${id}`, { headers });
  }

  getprint(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}calculateBalance/${id}`, { headers });
  }

  Transadisplay() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'Transadisplay', { headers });
  }

  TransactiondisplayAll() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'TransactiondisplayAll', { headers });
  }

  TransactiondisplayAlls() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'TransactiondisplayAlls', { headers });
  }

  approvetrans(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}approvedtrans/${id}`, { headers });
  }

  remittanceapproved() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'remittanceapproved', { headers });
  }

  printTransac(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}printTransac/${id}`, { headers });
  }

  approveremit(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}approveremit/${id}`, { headers });
  }

  DisplayAllTransaction(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}DisplayAllTransaction/${id}`, { headers });
  }

  DisplayAllExpenses(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}DisplayAllExpenses/${id}`, { headers });
  }

  customerdisplays() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'customerdisplay', { headers });
  }

  // EXPENSES
  displayexpenses() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'displayexpenses');
  }

  // REPORT
  displayincome() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'displayincome');
  }
  hisdisplayincome(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}hisdisplayincome/${id}`, { headers });
  }

  hisdisplayexpenses(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}hisdisplayexpenses/${id}`, { headers });
  }

  hisdisplaydicsripancy(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}hisdisplaydiscripancy/${id}`, { headers });
  }

  collectable() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'collectable');
  }
}
