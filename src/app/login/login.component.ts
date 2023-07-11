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
constructor(private fb:FormBuilder,private auth:AuthService,private route:Router){}
ngOnInit(){
  this.loginForm = this.fb.group({
    UserName: ['', Validators.required],
    Password: ['', Validators.required]
  });
}
Onlogin(){
  if(this.loginForm.valid){
    this.auth.login(this.loginForm.value)
    .subscribe({
      next:(res=>{
        this.auth.savetoken(res);
        alert("login")
        this.route.navigate(['/home'])
      }),
      error:(err=>{
        alert("ERROR")
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