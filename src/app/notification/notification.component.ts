import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  requests!:any;
  loginedUser!:any;
  constructor(private api:ApiService,private route:ActivatedRoute,private auth:AuthService){}
  req_object={
    followerId: this.loginedUser,
    followingId: 0,
    connectionStatus: "string"
  }
  formobj={
    followerId: 0,
    followingId: 0
  }
  ngOnInit() {
    this.loginedUser=this.auth.getId();
   this.api.getrequests(this.loginedUser).subscribe(x=>{
    this.requests=x;
   })
  }


 accept(id:number){
    this.req_object.followingId=id;
    this.req_object.followerId=this.loginedUser;
    console.log(id);
    console.log(this.loginedUser)
    this.api.accept(this.req_object).subscribe(x=>{
      this.api.getrequests(this.loginedUser).subscribe(x=>{
        this.requests=x;
       })
    })
  }

  async decline(id:number){
    console.log(id);
    this.api.unfollow(id,this.loginedUser).subscribe({
      next:(res=>{
        this.api.getrequests(this.loginedUser).subscribe(x=>{
          this.requests=x;
         })
      }),
      error:(err=>{
        this.api.getrequests(this.loginedUser).subscribe(x=>{
          this.requests=x;
        })
      })
    })
  }
}
