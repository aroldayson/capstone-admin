import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  url = 'http://localhost/backend/';

  constructor(private http: HttpClient) {}

  savecateg(data: any) {
    return this.http.post(this.url + 'saveitem.php', JSON.stringify(data));
  }
  displayitem() {
    return this.http.get(this.url + 'displayitem.php');
  }
  deleteprice(id: any) {
    return this.http.delete(this.url + 'deleteCateg.php?id=' + id);
  }
}
