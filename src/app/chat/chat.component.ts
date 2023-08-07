import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
chatusers!:any;
userdata:any[]=[];
user1:any[]=[];
userName!:any;
userId!:any;
  constructor(private api:ApiService,private route:ActivatedRoute,private auth:AuthService){
    this.userName=this.route.snapshot.paramMap.get("userName");   
  }
  async ngOnInit(){
   this.userId= this.auth.getId();
    var res=await this.api.getchatusers(this.userId).toPromise()
      console.log(res);
      this.chatusers=res;
      console.log(this.chatusers);
  };
}