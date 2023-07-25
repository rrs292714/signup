import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  id!:any;
  userdata!:any;
  loginedUser:any=11;
  allmessages!:any;
  message!:any;


  constructor(private api:ApiService,private route:ActivatedRoute){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      console.log(this.id);
      this.api.getpost(this.id).subscribe(x => {
        this.userdata = x;
      });
      this.api.getmessage(this.loginedUser,this.id).subscribe(x=>{
        this.allmessages=x;
      })
    });
  }

  
  message_form={
    senderId: this.loginedUser,
    receiverId: this.id,
    message: this.message
  }


  sendMessage(){
    this.message_form.receiverId=this.id;
    this.message_form.message=this.message;
    console.log(this.message);   
    console.log(this.message_form);
    this.api.postchat(this.message_form).subscribe(x=>{
      console.log(x);    
      this.api.getmessage(this.loginedUser,this.id).subscribe(x=>{
        this.allmessages=x;
      })
    })
    this.message='';
  }
}