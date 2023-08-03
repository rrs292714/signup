import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string="https://localhost:7200/api/Auth/";
  constructor(private http:HttpClient) {}
  role!:any;
  token!:any;
  username!:any;
  fullname!:any;
  userid!:number;

  signup(formdata:any){
    return this.http.post('https://localhost:7200/api/Auth/register',formdata)
  }

  login(formdata:any){
    return this.http.post('https://localhost:7200/api/Auth/login',formdata)
  }

  savetoken(tkn:any){
    console.log(tkn.token.value)
    console.log(tkn.userid)
    console.log(tkn.fullname)
    this.token=tkn.token.value;
    this.userid=tkn.id;
    this.username=tkn.username;
    this.fullname=tkn.fullName;
    localStorage.setItem('token',this.token)
    localStorage.setItem('id',this.userid.toString());
    localStorage.setItem('fullname',this.fullname);
  }

  getrole(){
    return localStorage.getItem('role');
  }

  gettoken(){
    return localStorage.getItem('token');
  }

  getfullName(){
    return localStorage.getItem('fullname');
  }

  getId() {
    const storedId = localStorage.getItem('id');
    return storedId ? Number.parseInt(storedId) : 0;
  }

  getIDD(){
    return localStorage.getItem('id');
  }

  logout(){
    localStorage.clear();
  }
}