import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getpost(id: number) {
    return this.http.get('https://localhost:7200/api/User/profile?id='+id);
  }

  dataparser(data1: any) {
    for (let i of data1) {
      if (i.post) {
        let x = JSON.parse(i.post);
        i.post = x;
      }
      if (i.followers) {
        let x = JSON.parse(i.followers);
        i.followers = x;
      }
      if (i.following) {
        let x = JSON.parse(i.following);
        i.following = x;
      }
      
    }
    return data1;
  }

  createprofile(formdata:any){
    return this.http.post('https://localhost:7200/api/User/createprofile',formdata);
  }

  getprofile(id:number){
    return this.http.get('https://localhost:7200/api/User/profile?id='+id)
  }
}