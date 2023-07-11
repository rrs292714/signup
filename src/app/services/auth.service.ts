import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string="https://localhost:7200/api/Auth/"
  constructor(private http:HttpClient) { }
  role!:any;
  token!:any;
  username!:any;
  fullname!:any;

  signup(formdata:any){
    return this.http.post('https://localhost:7200/api/Auth/register',formdata)
  }

  login(formdata:any){
    return this.http.post('https://localhost:7200/api/Auth/login',formdata)
  }

  savetoken(tkn:any){
    console.log(tkn.token.value)
    console.log(tkn.role)
    this.role=tkn.role;
    this.username=tkn.username;
    this.fullname=tkn.fullname;
    this.token=tkn.token.value;
    localStorage.setItem('token',this.token)
    localStorage.setItem('role',this.role)
  }

  getrole(){
    return localStorage.getItem('role');
  }

  gettoken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.clear();
  }
}