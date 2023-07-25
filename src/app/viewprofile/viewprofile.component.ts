import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
  id:any
  profiledata:any;
  constructor(private api:ApiService,private route:ActivatedRoute){
  }
  ngOnInit(){
    this.id=this.route.snapshot.paramMap.get("id");
    this.api.getpost(this.id).subscribe(x=>{
      this.profiledata=this.api.dataparser(x)
    })
  }

  editprofile(){

  }

  submit(){

  }

}
