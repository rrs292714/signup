import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  editform!:FormGroup;
  loginedUser!:number;
  profiledata:any;
  selectedFile: any;
  selectedFileUrl:any;
  imagedata!:any;

   constructor(private api:ApiService,private fb:FormBuilder,private http:HttpClient,private auth:AuthService,private route:Router){
    this.loginedUser=this.auth.getId();
    this.api.getpost(this.loginedUser).subscribe(x=>{
      this.profiledata=this.api.dataparser(x)
    })
    this.editform=this.fb.group({
      userId:['',[Validators.required]],
      fullName:['',[Validators.required]],
      bio:['',[Validators.required]],
      profileImageUrl:['',Validators.required],
      privacy:['',Validators.required]
    })
  }

   async ngOnInit(){
    var res=await this.api.getpost(this.loginedUser).toPromise();
      this.profiledata=this.api.dataparser(res)

    }
    onFileSelected(event:any){
      const file: File = event.target.files[0];
      this.selectedFile = file;
      this.previewImage(file);
    }

    previewImage(file: File) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.selectedFileUrl = reader.result;
      };
    }

    endsWith(str: string, suffix: string): boolean {
      return str.endsWith(suffix);
    }

    logout(){
      this.auth.logout();
      this.route.navigateByUrl('/');
    }
 async editprofile(){
    var data=this.profiledata;
    console.log((data[0].profileImageUrl));
    
    const formfiller={
      userId:this.loginedUser,
      fullName:data[0].fullName,
      bio:data[0].bio,
      profileImageUrl:data[0].profileImageUrl,
      privacy:data[0].privacy
    };
    console.log(formfiller);
    
    this.editform.patchValue(formfiller);     
  }

 async submit(){
    const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('name', this.selectedFile.name);
  
      try {
        const response = await this.http.post('http://localhost:8000/api/Post/ImageUrl', formData).toPromise();
        console.log('File uploaded:', response);
        this.imagedata=response;
      } catch (error) {
        console.error('Error uploading file:', this.selectedFile.name, error);
        // Handle the error if needed
      }
    this.editform.value.profileImageUrl=this.imagedata.mediaUrl
    console.log(this.editform.value);
    try {
      const res = await  this.api.editprofile(this.editform.value).toPromise();
      console.log(res);
      this.api.getpost(this.loginedUser).subscribe(x=>{
        this.profiledata=this.api.dataparser(x)
      })
    } catch (error) {
      console.error('Error saving post:', error);
      // Handle the error if needed
    }
  }
   deletepost(postId:number){
    this.api.deletePost(postId)
    .subscribe({
      next:(res=>{
        this.api.getpost(this.loginedUser).subscribe(x=>{
          this.profiledata=this.api.dataparser(x)
        })
      }),
      error:(err=>{
        this.api.getpost(this.loginedUser).subscribe(x=>{
          this.profiledata=this.api.dataparser(x)
        })
      })
    })
  }
}