import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-profileform',
  templateUrl: './profileform.component.html',
  styleUrls: ['./profileform.component.css']
})
export class ProfileformComponent {
  datalist!:any;
  loginedUser!:any;
  constructor(private _formBuilder: FormBuilder,private http:HttpClient,private api:ApiService,private route:Router,private auth:AuthService) {
    this.loginedUser=this.auth.getId();
    this.fullname=this.auth.getfullName();
  }

  firstFormGroup = this._formBuilder.group({
    profileimage: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    bio: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    privacy: ['', Validators.required],
  });

  isLinear = false;
  selectedFile: any;
  selectedFileUrl:any;
  inputText: string = '';
  bio!:any;
  privacy!:any;
  imagedata!:any;
  fullname!:any;

  profile_obj={
    userId: this.loginedUser,
    fullName: this.fullname,
    bio: '',
    profileImageUrl:'',
    privacy : ''
  }

  onFileSelected(event: any) {
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

  async submitForm() {
    this.profile_obj.userId=this.loginedUser;
    this.profile_obj.fullName=this.fullname;
    console.log(this.selectedFile);
    this.bio = this.secondFormGroup.value.bio;
    this.privacy=this.thirdFormGroup.value.privacy;
    
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('name', this.selectedFile.name);
  
      try {
        const response = await this.http.post(environment.apiUrl+'/Post/ImageUrl', formData).toPromise();
        console.log('File uploaded:', response);
        this.imagedata=response;
      } catch (error) {
        console.error('Error uploading file:', this.selectedFile.name, error);
        // Handle the error if needed
      }
    
    this.profile_obj.profileImageUrl = this.imagedata.mediaUrl;
    this.profile_obj.bio=this.bio;
    this.profile_obj.privacy=this.privacy;
    
    try {
      const res = await this.api.createprofile(this.profile_obj).toPromise();
      console.log(res);
      this.route.navigate(['/home'])
    } catch (error) {
      console.error('Error saving post:', error);
      // Handle the error if needed
    }
    
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.thirdFormGroup.reset();
  }
}