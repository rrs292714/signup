import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
chatusers!:any;
userdata:any[]=[];
user1:any[]=[]
userName!:any;
  constructor(private api:ApiService,private route:ActivatedRoute){
    this.userName=this.route.snapshot.paramMap.get("userName");   
  }
  async ngOnInit(){

    var res=await this.api.getchatusers(11).toPromise()
      console.log(res);
      this.chatusers=res;
      console.log(this.chatusers);
  };
}