import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit{
  email:any='';
  otp!:any;
  otpdata!:any
  otpform!:FormGroup;
constructor(private api:ApiService,private fb:FormBuilder,private route:Router){}
  ngOnInit() {
    this.otpform=this.fb.group({
      otp:['',Validators.required]
    })
  }



  otpgen(){
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
    this.route.navigate(['/gamepage']);
    }
    else{
    alert("wrong Otp!!");
    }
  }
}
