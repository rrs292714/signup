import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificationComponent } from './notification/notification.component';
import { PostpageComponent } from './postpage/postpage.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileformComponent } from './profileform/profileform.component';
import { RegisterComponent } from './register/register.component';
import { SearchingComponent } from './searching/searching.component';
import { StartpageComponent } from './startpage/startpage.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { Userauthguard } from './loginguard.guard';
import { ViewpostpageComponent } from './viewpostpage/viewpostpage.component';

const routes: Routes = [
  {path:'',component:StartpageComponent,
   children:[
    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
  ]},
  {path:'forgotpassword',component:ForgotpasswordComponent},
  {path:'profileform', component:ProfileformComponent},
  {path:'home',component:HomepageComponent,canActivate:[Userauthguard],
  children:[
  {path:'',component:PostpageComponent},
  {path:'profile',component:ProfileComponent},
  {path:'post',component:PostpageComponent},
  {path:'notifications',component:NotificationComponent},
  {path:'createpost',component:CreatePostComponent},
  {path:'searching',component:SearchingComponent},
  {path:'message',component:ChatComponent,
children:[
  {path:':id',component:MessagesComponent}
]}
]},
{path:'viewprofile/:id',component:ViewprofileComponent},
{path:'viewpost/:id',component:ViewpostpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }