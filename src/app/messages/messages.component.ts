import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  id!:any;
  userdata!:any;
  loginedUser!:any;
  allmessages!:any;
  message:any='';
  deleteid!:number;

  constructor(private api:ApiService,private route:ActivatedRoute,private auth:AuthService){
    this.loginedUser=this.auth.getIDD();
    
    console.log(this.loginedUser);
  }



  ngOnInit() {
    this.loginedUser=this.auth.getIDD();

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

    this.fetchMessages();

    interval(3000).subscribe(() => {
      this.fetchMessages();
    });

    
  }

  message_form={
    senderId: this.loginedUser,
    receiverId: this.id,
    message: this.message
  }

  private fetchMessages() {
    this.api.getmessage(this.loginedUser, this.id).subscribe(x => {
      this.allmessages = x;
    });
  }

  sendMessage(){
    this.message_form.senderId=this.loginedUser;
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

  deletemessageid(id:number){
    this.deleteid=id;
    console.log(this.deleteid);
  }

 delete(){
  
  this.api.deletemessage(this.deleteid).subscribe({
    next:(res=>{   
        this.api.getmessage(this.loginedUser,this.id).subscribe(x=>{
          this.allmessages=x;
        });    
    }),
    error:(error=>{    
        this.api.getmessage(this.loginedUser,this.id).subscribe(x=>{
          this.allmessages=x;
        });   
    })
  })
    
  }
}