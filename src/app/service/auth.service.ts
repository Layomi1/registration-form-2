import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  apiurl = 'http://localhost:3000/user';

  GetAll() {
    return this.http.get(this.apiurl);
  }

  Getbycode(code: any) {
    return this.http.get(this.apiurl + '/' + code);
  }
  getAllRole() {
    return this.http.get('http://localhost:3000/role');
  }
  proceedRegister(inputdata: any) {
    return this.http.post(this.apiurl, inputdata);
  }

  UpdateUser(code: any, inputdata: any) {
    console.log('yo' + code);

    return this.http.put(this.apiurl + '/' + code, inputdata);
  }
  IsloggedIn() {
    return sessionStorage.getItem('username') != null;
  }
  getUserRole() {
    return sessionStorage.getItem('userrole') != null
      ? sessionStorage.getItem('userrole')?.toString()
      : '';
  }
}
