import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-postpage',
  templateUrl: './postpage.component.html',
  styleUrls: ['./postpage.component.css']
})
export class PostpageComponent {
  loginUserId:number=11;
  profiledata:any;
  requeststatus:boolean=true;

  req_object={
    followerId: this.loginUserId,
    followingId: 0,
    connectionStatus: "string"
  }

  constructor(private api:ApiService){
    this.api.usersuggestion(11).subscribe(x=>{
      this.profiledata=this.api.dataparser(x)
    })
    
  }
  async ngOnInit(){
    try{
    var res=await this.api.usersuggestion(11).toPromise();
      this.profiledata=this.api.dataparser(res)
    }
    catch{
      console.log("A");  
    }
  }

  like(){
    alert("liked");
  }

  request(id:number){
    alert(id)
    this.req_object.followingId=id;
    this.api.followrequest(this.req_object).subscribe(x=>{
     console.log(x)
    })
  }
}