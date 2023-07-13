import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  editform!:FormGroup 
   post!:any;
  constructor(private ss:ApiService){
    this.ss.getpost(9).subscribe(x=>{
      this.post=this.ss.dataparser(x)
    })
  }

  ngOnInit(){
    this.ss.getpost(9).subscribe(x=>{
      this.post=this.ss.dataparser(x)
    })
  }

  editprofile(){

  }

  submit(){

  }

  
}