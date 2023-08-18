import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
loginForm!: FormGroup;
loader:boolean=false;

constructor(private fb:FormBuilder,private auth:AuthService,private route:Router){}
ngOnInit(){
  this.loginForm = this.fb.group({
    UserName: ['', [Validators.required]],
    Password: ['', [Validators.required]]
  });
}

Onlogin(){
  this.loader=true;
  if(this.loginForm.valid){
    this.auth.login(this.loginForm.value)
    .subscribe({
      next:(res=>{
        this.auth.savetoken(res);
        // alert("login")
        this.loader=false;
        this.route.navigate(['/home'])
      }),
      error:(err=>{
      this.loader=false;
      alert("please check your userName and password!")
        // alert("ERROR")
      })
    })
  }
}
 get username(){
  return this.loginForm.get('UserName');
 }

 get password(){
  return this.loginForm.get('Password');
 }
}