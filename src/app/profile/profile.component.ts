import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
editform!:FormGroup
constructor(){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  editprofile(){

  }

  submit(){

  }
}