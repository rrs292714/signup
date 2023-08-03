import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
RegisterForm!: FormGroup;
constructor(private fb:FormBuilder,private auth:AuthService,private route:Router){}

ngOnInit(){
  this.RegisterForm = this.fb.group({
    Email: ['', Validators.required],
    FullName: ['', Validators.required],
    UserName: ['', Validators.required],
    Password: ['', Validators.required]
  });
}

OnRegister(){
    if(this.RegisterForm.valid){
      this.auth.signup(this.RegisterForm.value)
      .subscribe({
        next:(res)=>{
          this.auth.savetoken(res);
          this.route.navigateByUrl('/profileform');
        },
        error:(err=>{
          alert(err.error.message)
        })
      })
    }
}

get FirstName(){
  return this.RegisterForm.get('FirstName');
}
get LastName(){
  return this.RegisterForm.get('LastName');
}
get Email(){
  return this.RegisterForm.get('Email');
}
get username(){
  return this.RegisterForm.get('username');
}
 get password(){
  return this.RegisterForm.get('password');
}

}