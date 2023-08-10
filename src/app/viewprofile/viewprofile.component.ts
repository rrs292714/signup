import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
  id:any
  profiledata:any;
  loginedUser!:any;
  followingdata!:any;
  constructor(private api:ApiService,private route:ActivatedRoute,private auth:AuthService){
  }
  ngOnInit(){
    this.loginedUser=this.auth.getId();
    this.id=this.route.snapshot.paramMap.get("id");
    this.api.getpost(this.id).subscribe(x=>{
      this.profiledata=this.api.dataparser(x);
      this.api.followingOrnot(this.loginedUser,this.id).subscribe(x=>{
        this.followingdata=x;
        console.log(this.followingdata);
      })
    })
  }



  async decline(id:number){
    console.log(id);
    this.api.unfollow(this.loginedUser,this.id).subscribe({
      next:(res=>{
        this.api.getpost(this.id).subscribe(x=>{
          this.profiledata=this.api.dataparser(x)
          this.api.followingOrnot(this.loginedUser,this.id).subscribe(x=>{
            this.followingdata=x;
            console.log(this.followingdata); 
          })
        })
      }),
      error:(err=>{
        this.api.getpost(this.id).subscribe(x=>{
          this.profiledata=this.api.dataparser(x)
          this.api.followingOrnot(this.loginedUser,this.id).subscribe(x=>{
            this.followingdata=x;
            console.log(this.followingdata);
 
          })
        })
      })
    })
  }

  req_object={
    followerId: this.loginedUser,
    followingId: 0,
    connectionStatus:""
  }

   request(id:number){
    this.req_object.followerId=this.loginedUser;
    this.req_object.followingId=this.id;
    this.api.followrequest(this.req_object).subscribe({
      next:(res=>{
        this.api.getpost(this.id).subscribe(x=>{
          this.profiledata=this.api.dataparser(x)
          this.api.followingOrnot(this.loginedUser,this.id).subscribe(x=>{
            this.followingdata=x;
            console.log(this.followingdata); 
          })
        })
      }),
      error:(err=>{
        this.api.getpost(this.id).subscribe(x=>{
          this.profiledata=this.api.dataparser(x)
          this.api.followingOrnot(this.loginedUser,this.id).subscribe(x=>{
            this.followingdata=x;
            console.log(this.followingdata);
 
          })
        })
      })
    })
  }




  editprofile(){

  }

  submit(){

  }

}
