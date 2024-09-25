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

  logout(): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.post(this.Apiurl + 'logout', {}, { headers });
  }

  // STAFF
  getData(){
    return this.http.get(this.Apiurl + 'display');
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

  //CUSTOMER
  customerdisplay() {
    return this.http.get(this.Apiurl + 'customerdisplay');
  }
  findcustomer(id: any) {
    return this.http.get(`${this.Apiurl}findcustomer/${id}`); 
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
