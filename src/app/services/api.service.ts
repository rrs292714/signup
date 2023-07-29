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

      if(i.media){
        let x = JSON.parse(i.media);
        i.media = x;
      }
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

  getalluser(){
    return this.http.get('https://localhost:7200/api/User/AllUsers')
  }

  usersuggestion(id:any){
    return this.http.get('https://localhost:7200/api/User/Suggestions?id='+id)
  }

  createprofile(formdata:any){
    return this.http.post('https://localhost:7200/api/User/createprofile',formdata);
  }

  getprofile(id:number){
    return this.http.get('https://localhost:7200/api/User/profile?id='+id)
  }

  followrequest(formdata:any){
    return this.http.put('https://localhost:7200/api/User/follow',formdata)
  }

  getrequests(id:number){
    return this.http.get('https://localhost:7200/api/User/Request?id='+id)
  }

  accept(formdata:any){
    return this.http.put('https://localhost:7200/api/User/Accept',formdata)
  }

  unfollow(follower:number,following:number){
    return this.http.delete('https://localhost:7200/api/User/unfollow?follower='+follower+'&following='+following)
  }

  getmessage(senderId:number,receiverId:number){
    return this.http.get('https://localhost:7200/api/Chat/usermessage?senderId='+senderId+'&receiverId='+receiverId)
  }

  getchatusers(senderId:number){
    return this.http.get('https://localhost:7200/api/Chat/userchat?id='+senderId)
  }

  postchat(formdata:any){
    return this.http.post('https://localhost:7200/api/Chat',formdata)
  }

  deletemessage(id:number){
    return this.http.delete('https://localhost:7200/api/Chat/delete?id='+id)
  }

  homepagepost(id:number){
    return this.http.get('https://localhost:7200/api/Post/HomePagePost?userId='+id)
  }

  searching(username:string){
    return this.http.get('https://localhost:7200/api/User/Searching?userName='+username)
  }
}