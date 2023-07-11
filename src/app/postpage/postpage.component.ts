import { Component } from '@angular/core';

@Component({
  selector: 'app-postpage',
  templateUrl: './postpage.component.html',
  styleUrls: ['./postpage.component.css']
})
export class PostpageComponent {

  like(){
    alert("liked");
  }
}
