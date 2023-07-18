import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-postpage',
  templateUrl: './postpage.component.html',
  styleUrls: ['./postpage.component.css']
})
export class PostpageComponent {

  
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
  
  like(){
    alert("liked");
  }
}
