import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit{
  email:string='';
  otp!:any;
  otpdata!:any
  otpform!:FormGroup;
  changepasswordbox:boolean=false;
  password:string='';
constructor(private api:ApiService,private fb:FormBuilder,private route:Router,private auth:AuthService){}
  ngOnInit() {
    this.otpform=this.fb.group({
      otp:['',Validators.required]
    })
  }


  otpgen(){
    localStorage.setItem('email',this.email);
    this.api.getotp(this.email).subscribe({
      next:(res=>{
        this.otp=res;
        console.log(this.otp);
      }),
      error:(err=>{
        alert("user not found");
      })
    })  
  }

  checkotp(){
    this.otpdata=this.otpform.value;
    if(this.otp==this.otpdata.otp){
      this.changepasswordbox=true;
    }
    else{
    alert("wrong Otp!!");
    }
  }

  forgotpassword_obj={
    email: '',
    password: ''
  }

  changepassword(){
    this.forgotpassword_obj.email=this.email;
    this.forgotpassword_obj.password=this.password;
    this.auth.forgotpassword(this.forgotpassword_obj).subscribe(x=>{
      this.route.navigateByUrl('/login');
    })
    this.route.navigateByUrl('/login');
  }
}
