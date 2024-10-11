import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  url = 'http://localhost/admin/';
  Apiurl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  // ACCOUNT
  logins(data:any): Observable<any> {
    return this.http.post(this.Apiurl + 'login', data);
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.Apiurl + 'logout', {}, { headers });
  }

  // STAFF
  getData(){
    return this.http.get(this.Apiurl + 'displaystaff');
  }
  insertData(data: any) {
    return this.http.post(this.Apiurl + 'addstaff', data);
  }
  deletestaff(id: any) {
    return this.http.delete(`${this.Apiurl}deletestaff/${id}`); 
  }

  findstaff(id: any) {
    return this.http.get(`${this.Apiurl}findstaff/${id}`); 
  }

  updateStaff(data: any) {
    return this.http.put(`${this.Apiurl}updatestaff/${data.id}`,data);
  }
  uploadAdmin(data: any){
    return this.http.put(`${this.Apiurl}upload/${data.Admin_ID}`, data);
  }
  // PRICEMANAGEMENT
  displayprice(){
    return this.http.get(this.Apiurl + 'pricedisplay');
  }
  addprice(data: any) {
    return this.http.post(this.Apiurl + 'addprice', data); 
  }
  deletecateg(id: any) {
    return this.http.delete(`${this.Apiurl}deletecateg/${id}`); 
  }
  findprice(id: any) {
    return this.http.get(`${this.Apiurl}findprice/${id}`); 
  }
  updateprice(data: any) {
    return this.http.put(`${this.Apiurl}updateprice/${data.id}`,data);
  }


  // DASHBOARD
  paymentDisplay() {
    return this.http.get(this.Apiurl + 'dashdisplays');
  }
  expensesDisplay() {
    return this.http.get(this.Apiurl + 'expensendisplays');
  }
  CountDisplay(){
    return this.http.get(this.Apiurl + 'CountDisplay');
  }
  Staffinitail(){
    return this.http.get(this.Apiurl + 'displaystaffs');
  }
  cashinitial(data: any) {
    return this.http.post(this.Apiurl + 'cashinitial', data); 
  }
  remit(data: any) {
    return this.http.post(this.Apiurl + 'remittance', data); 
  }

  //CUSTOMER
  customerdisplay() {
    return this.http.get(this.Apiurl + 'customerdisplay');
  }
  findcustomer(id: any) {
    return this.http.get(`${this.Apiurl}findcustomer/${id}`); 
  }

  // TRANSACTION
  findtransaction(id: any) {
    return this.http.get(`${this.Apiurl}findtrans/${id}`); 
  }
  findtransactionprint(id: any) {
    return this.http.get(`${this.Apiurl}printtrans/${id}`); 
  }
  getprint(id: any) {
    return this.http.get(`${this.Apiurl}calculateBalance/${id}`); 
  }
  Transadisplay() {
    return this.http.get(this.Apiurl + 'Transadisplay');
  }
  approvetrans(id: any) {
    return this.http.get(`${this.Apiurl}approvedtrans/${id}`); 
  }
  remittanceapproved() {
    return this.http.get(this.Apiurl + 'remittanceapproved');
  }
  printTransac(id: any){
    return this.http.get(`${this.Apiurl}printTransac/${id}`); 
  }


  // EXPENSES
  displayexpenses() {
    return this.http.get(this.Apiurl + 'displayexpenses');
  }

  


  // savecateg(data: any) {
  //   return this.http.post(this.url + 'saveitem.php', JSON.stringify(data));
  // }
  // displayitem() {
  //   return this.http.get(this.url + 'displayitem.php');
  // }
  // deleteprice(id: any) {
  //   return this.http.delete(this.url + 'deleteCateg.php?id=' + id);
  // }
  // getcateg(id: any) {
  //   return this.http.get(this.url + 'getitemedit.php?id=' + id);
  // }
  // updateCateg(data: any) {
  //   return this.http.post(this.url + 'updateitem.php', JSON.stringify(data));
  // }
}
