import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  
  constructor(private auth:AuthService ,private route:Router){}

  logout(){
    this.auth.logout();
    this.route.navigateByUrl('/');
  }
}