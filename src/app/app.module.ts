import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StartpageComponent } from './startpage/startpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostpageComponent } from './postpage/postpage.component';
import { SidepageComponent } from './sidepage/sidepage.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ProfileformComponent } from './profileform/profileform.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationComponent } from './notification/notification.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { MatRadioModule } from '@angular/material/radio';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { ChatComponent } from './chat/chat.component';
import { MessagesComponent } from './messages/messages.component';
import { SearchingComponent } from './searching/searching.component';
import { MatIconModule } from '@angular/material/icon';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { CommonModule } from '@angular/common';
import { ViewpostpageComponent } from './viewpostpage/viewpostpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { InterceptosInterceptor } from './interceptors/interceptos.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StartpageComponent,
    HomepageComponent,
    NavbarComponent,
    PostpageComponent,
    SidepageComponent,
    ProfileComponent,
    EditprofileComponent,
    ProfileformComponent,
    NotificationComponent,
    CreatePostComponent,
    ViewprofileComponent,
    ChatComponent,
    MessagesComponent,
    SearchingComponent,
    ForgotpasswordComponent,
    ViewpostpageComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    CommonModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass:InterceptosInterceptor,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
