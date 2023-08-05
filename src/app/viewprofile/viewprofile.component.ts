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
      this.profiledata=this.api.dataparser(x)
      this.api.followingOrnot(this.loginedUser,this.id).subscribe(x=>{
        this.followingdata=x;
      })
    })
  }



  editprofile(){

  }

  submit(){

  }

}
