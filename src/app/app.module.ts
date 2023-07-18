import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
    ViewprofileComponent
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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
