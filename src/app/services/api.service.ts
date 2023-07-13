import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getpost(id: number) {
    return this.http.get('https://localhost:7200/api/Post/UserPost?userid='+id)
  }

dataparser(data1: any) {
    for (let i of data1) {
      if (i.media) {
        let x = JSON.parse(i.media);
        i.media = x;
      }
    }
    return data1;
  }
}