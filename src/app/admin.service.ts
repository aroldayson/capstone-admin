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

  logins(data:any): Observable<any> {
    return this.http.post(this.Apiurl + 'login', data);
  }

  logout(): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.post(this.Apiurl + 'logout', {}, { headers });
  }
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
  
  


  savecateg(data: any) {
    return this.http.post(this.url + 'saveitem.php', JSON.stringify(data));
  }
  displayitem() {
    return this.http.get(this.url + 'displayitem.php');
  }
  deleteprice(id: any) {
    return this.http.delete(this.url + 'deleteCateg.php?id=' + id);
  }
  getcateg(id: any) {
    return this.http.get(this.url + 'getitemedit.php?id=' + id);
  }
  updateCateg(data: any) {
    return this.http.post(this.url + 'updateitem.php', JSON.stringify(data));
  }
}
