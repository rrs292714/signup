import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
RegisterForm!: FormGroup;
otpform!:FormGroup;
otp!:any;
otpdata!:any;
constructor(private fb:FormBuilder,private auth:AuthService,private route:Router,private api:ApiService){}

ngOnInit(){
  this.RegisterForm = this.fb.group({
    Email: ['', Validators.required],
    FullName: ['', Validators.required],
    UserName: ['', Validators.required],
    Password: ['', Validators.required]
  });

  this.otpform=this.fb.group({
    otp:['',Validators.required]
  })
}

login_form=
  {
    userName:'',
    password:'' 
  }


  OnRegister() {
    if (this.RegisterForm.valid) {
      const { UserName, Password } = this.RegisterForm.value;
  
      this.auth.signup(this.RegisterForm.value).subscribe({
        next: (res) => {
          this.login_form.userName = UserName;
          this.login_form.password = Password;
  
          this.auth.login(this.login_form).subscribe({
            next: (res => {
              this.auth.savetoken(res);
              // alert("login")
              // this.route.navigate(['/home'])
              this.route.navigateByUrl('/profileform');
            }),
            error: (err => {
              // Handle login error
            })
          });
        },
        error: (err => {
          if (err.error && err.error.includes("UserName already exist")) {
            // For example, show a message to the user asking them to choose a different username
            alert("Username already exists. Please choose a different username.");
          } else {
            // Handle other errors
            alert(err.error.message);
          }
        })
      });
    }
  }
  
// OnRegister(){
//     if(this.RegisterForm.valid){
//       this.auth.signup(this.RegisterForm.value)
//       .subscribe({
//         next:(res)=>{
//           this.login_form.userName=this.RegisterForm.value.userName;
//           this.login_form.password=this.RegisterForm.value.password;
//           this.auth.login(this.login_form)
//           .subscribe({
//             next:(res=>{
//               this.auth.savetoken(res);
//               // alert("login")
//               // this.route.navigate(['/home'])
//              this.route.navigateByUrl('/profileform');

//             }),
//             error:(err=>{
//               // alert("ERROR")
//             })
//           })
//         },
//         error:(err=>{
//           alert(err.error.message)
//         })
//       })
//     }
// }

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


otpgen(){
  this.api.getotp(this.RegisterForm.value.Email).subscribe({
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
  if(this.otp==this.otpform.value.otp){

    this.OnRegister();
  }
  else{
  alert("wrong Otp!!");
  }
}

}