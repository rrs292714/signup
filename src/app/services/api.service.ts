import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}
  baseUrl:string=environment.apiUrl;
  getpost(id: number) {
    return this.http.get(this.baseUrl+'/User/profile?id='+id);
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
      if(i.likedUsers){
        let x = JSON.parse(i.likedUsers);
        i.likedUsers = x;
      } 
    }
    return data1;
  }

  getalluser(){
    return this.http.get(this.baseUrl+'/User/AllUsers');
  }

  usersuggestion(id:any){
    return this.http.get(this.baseUrl+'/User/Suggestions?id='+id);
  }

  createprofile(formdata:any){
    return this.http.post(this.baseUrl+'/User/createprofile',formdata);
  }

  getprofile(id:number){
    return this.http.get(this.baseUrl+'/User/profile?id='+id);
  }

  followrequest(formdata:any){
    return this.http.put(this.baseUrl+'/User/follow',formdata);
  }

  getrequests(id:number){
    return this.http.get(this.baseUrl+'/User/Request?id='+id);
  }

  accept(formdata:any){
    return this.http.put(this.baseUrl+'/User/Accept',formdata);
  }

  unfollow(follower:number,following:number){
    return this.http.delete(this.baseUrl+'/User/unfollow?follower='+follower+'&following='+following);
  }

  getmessage(senderId:number,receiverId:number){
    return this.http.get(this.baseUrl+'/Chat/usermessage?senderId='+senderId+'&receiverId='+receiverId);
  }

  getchatusers(senderId:number){
    return this.http.get(this.baseUrl+'/Chat/userchat?id='+senderId);
  }

  postchat(formdata:any){
    return this.http.post(this.baseUrl+'/Chat',formdata);
  }

  deletemessage(id:number){
    return this.http.delete(this.baseUrl+'/Chat/delete?id='+id);
  }

  homepagepost(id:number){
    return this.http.get(this.baseUrl+'/Post/HomePagePost?userId='+id);
  }

  searching(username:string){
    return this.http.get(this.baseUrl+'/User/Searching?userName='+username);
  }

  likepost(formdata:any){
    return this.http.put(this.baseUrl+'/Post/like',formdata);
  }

  editprofile(formdata:any){
    return this.http.put(this.baseUrl+'/User/editprofile',formdata);
  }

  postcomment(formdata:any){
    return this.http.post(this.baseUrl+'/Post/comment',formdata);
  }

  getcomment(id:any){
    return this.http.get(this.baseUrl+'/Post/GetComment?postId='+id)
  }

  postSubcomment(formdata:any){
    return this.http.post(this.baseUrl+'/Post/SubComment',formdata)
  }

  getSubcomment(commentId:number){
    return this.http.get(this.baseUrl+'/Post/getSubComment?commentId='+commentId)
  }

  getotp(email:string){
    return this.http.get(this.baseUrl+'/Auth/Otp/'+email)
  }

  getPostByPostId(postId:number){
    return this.http.get(this.baseUrl+'/Post/PostById?posId='+postId)
  }

  deletePost(postId:number){
    return this.http.delete(this.baseUrl+'/Post/DeletePost?postId='+postId)
  }


  followingOrnot(followerId:number,followingId:number){
    return this.http.get(this.baseUrl+`User/IsFollowing?followerId=${followerId}&followingId=${followingId}}`)
  }
}