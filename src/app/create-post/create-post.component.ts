import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private auth: AuthService) { }

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  selectedFile: File[] = [];
  selectedFileVideo: any[] = [];
  selectedFileUrl: string[] = [];
  imagedata: any[] = [];
  caption!: string;
  userId!: any;
  images_object = {
    caption: '',
    media: this.imagedata
  }

  ngOnInit() {
    this.userId = this.auth.getId();
    this.firstFormGroup = this._formBuilder.group({
      image: this._formBuilder.array([], Validators.required)
    });

    this.secondFormGroup = this._formBuilder.group({
      caption: ['', [Validators.required]]
    });
  }

  get imageArray(): FormArray {
    return this.firstFormGroup.get('image') as FormArray;
  }

  addItem() {
    this.imageArray.push(this._formBuilder.control('', Validators.required));
  }

  removeItem(index: number) {
    this.imageArray.removeAt(index);
    this.selectedFile.splice(index, 1);
    this.selectedFileVideo.splice(index,1)
    this.selectedFileUrl.splice(index, 1);
    this.selectedFileUrl = [];
    for (let i = 0; i < this.selectedFile.length; i++) {
      const file: File = this.selectedFile[i];
      this.previewImage(file);
    }
  }
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      if (file.name.includes('.mp4')) {
        this.selectedFileVideo.push(file.name); 
      }
      else {
        this.selectedFile.push(file);
      }
      console.log(this.selectedFile);
      this.previewImage(file);
    }
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.selectedFileUrl.push(reader.result as string);
    };
  }

  async submitForm() {
    console.log(this.selectedFile);
    console.log(this.selectedFileUrl);

    this.images_object.caption = this.secondFormGroup.value.caption;

    for (let i of this.selectedFile) {
      console.log(i.name);
    }

    for (let file of this.selectedFile) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', file.name);

      try {
        const response = await this.http.post(environment.apiUrl + '/Post/ImageUrl', formData).toPromise();
        console.log('File uploaded:', response);
        this.imagedata.push(response);
      } catch (error) {
        console.error('Error uploading file:', file.name, error);
        // Handle the error if needed
      }
    }

    this.images_object.media = this.imagedata;

    try {
      const res = await this.http.post(environment.apiUrl + '/Post/post?userid=' + this.userId, this.images_object).toPromise();
      console.log(res);
    } catch (error) {
      console.error('Error saving post:', error);
      // Handle the error if needed
    }

    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.selectedFileUrl.splice(0, this.selectedFileUrl.length);
    this.selectedFile.splice(0, this.selectedFile.length);
    this.imagedata.splice(0, this.imagedata.length);
  }

  endsWith(str: string, suffix: string): boolean {
    return str.endsWith(suffix);
  }
}