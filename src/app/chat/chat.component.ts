import { Component, OnInit } from '@angular/core';
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
  constructor(private api:ApiService){
    
  }
  async ngOnInit(){
    var res=await this.api.getchatusers(11).toPromise()
      console.log(res);  
      this.chatusers=res;
      console.log(this.chatusers); 

    for(let i of this.chatusers){
        this.api.getpost(i).subscribe(x=>{
          this.userdata.push(x);
        });   
    }
    console.log(this.userdata);
  };
}