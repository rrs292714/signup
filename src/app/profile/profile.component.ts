import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  editform!:FormGroup;

   profiledata:any;
  constructor(private api:ApiService){
    this.api.getpost(11).subscribe(x=>{
      this.profiledata=this.api.dataparser(x)
    })
  }
  ngOnInit(){
    this.api.getpost(11).subscribe(x=>{
      this.profiledata=this.api.dataparser(x)
    })
  }

  editprofile(){

  }

  submit(){

  }

  
}