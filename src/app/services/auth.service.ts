import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) {}
  role!:any;
  token!:any;
  username!:any;
  fullname!:any;
  userid!:number;

  signup(formdata:any){
    return this.http.post(environment.apiUrl+'/Auth/register',formdata)
  }

  login(formdata:any){
    return this.http.post(environment.apiUrl+'/Auth/login',formdata)
  }

  forgotpassword(formdata:any){
    return this.http.put(environment.apiUrl+'/Auth/forgotpassword',formdata)   
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

  loginguard(){
    if(localStorage.getItem('token')!=null){
      return true
    } 
    else{
    return false
    }
  }
}