import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit{
searcheddata!:any;
search!:any;
constructor(private api:ApiService){}
  ngOnInit(){
  
  }
searching(event :any){
  console.log(event.target.value);
  this.api.searching(event.target.value).subscribe(x=>{
    console.log(x);
    this.searcheddata=x;
  })

  if(this.search==''){
    this.searcheddata=[]
  }
}

}