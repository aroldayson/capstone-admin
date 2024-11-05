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
  logout(headers: any): Observable<any> {
    const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.Apiurl + 'logout', {}, { headers });
  }

  // logo

  // STAFF
  getData(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'displaystaff',{headers});
  }
  insertData(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.Apiurl + 'addstaff', data,{headers});
  }
  deletestaff(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.Apiurl}deletestaff/${id}`,{headers}); 
  }

  findstaff(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}findstaff/${id}`,{headers}); 
  }

  updateStaff(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.Apiurl}updatestaff/${data.id}`,data,{headers});
  }
  uploadAdmin(data: any){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.Apiurl}upload/${data.Admin_ID}`, data,{headers});
  }

  // PRICEMANAGEMENT
  displayprice(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'pricedisplay',{headers});
  }
  addprice(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.Apiurl + 'addprice', data, {headers}); 
  }
  deletecateg(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.Apiurl}deletecateg/${id}`,{headers}); 
  }
  findprice(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}findprice/${id}`,{headers}); 
  }
  updateprice(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.Apiurl}updateprice/${data.id}`,data);
  }


  // DASHBOARD
  paymentDisplay() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'dashdisplays',{headers});
  }
  // paymentDisplays(month: number, year: number): Observable<any> {
  //     return this.http.get<any>(`${this.Apiurl}/dashdisplaysgraph?month=${month}&year=${year}`);
  // }

  expensesDisplay() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'expensendisplays',{headers});
  }
  CountDisplay(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'CountDisplay',{headers});
  }
  Staffinitail(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'displaystaffs',{headers});
  }
  cashinitial(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.Apiurl + 'cashinitial', data, {headers}); 
  }
  remit(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.Apiurl + 'remittance', data,{headers}); 
  }
  viewdetails(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'veiwdeatils',{headers});
  }
    // Inside admin.service.ts
  getIncomeDataByMonth(month: string) {
    return this.http.get<{ GCASH: number; BPI: number; CASH: number }>(`/api/income/${month}`);
  }


  //CUSTOMER
  customerdisplay() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'customerdisplay',{headers});
  }
  findcustomer(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}findcustomer/${id}`,{headers}); 
  }
  updateprofilecus(data:any){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.Apiurl}updateprofilecus/${data.id}`,data,{headers});
  }

  // TRANSACTION
  findtransaction(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}findtrans/${id}`,{headers}); 
  }
  findtransactionprint(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}printtrans/${id}`,{headers}); 
  }
  getprint(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}calculateBalance/${id}`,{headers}); 
  }
  Transadisplay() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'Transadisplay',{headers});
  }
  approvetrans(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}approvedtrans/${id}`,{headers}); 
  }
  remittanceapproved() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.Apiurl + 'remittanceapproved',{headers});
  }
  printTransac(id: any){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}printTransac/${id}`,{headers}); 
  }
  approveremit(id: any){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.Apiurl}approveremit/${id}`,{headers}); 
  }


  // EXPENSES
  displayexpenses() {
    return this.http.get(this.Apiurl + 'displayexpenses');
  }

  //REPORT
  displayincome() {
    return this.http.get(this.Apiurl + 'displayincome');
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
