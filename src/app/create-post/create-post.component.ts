// import { Component } from '@angular/core';
// import { FormArray, FormBuilder, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-create-post',
//   templateUrl: './create-post.component.html',
//   styleUrls: ['./create-post.component.css']
// })

// export class CreatePostComponent {
//   datalist!:any;
//   constructor(private _formBuilder: FormBuilder) {}

//   firstFormGroup = this._formBuilder.group({
//     image: this._formBuilder.array([])
//   });

//   get imageArray(): FormArray {
//     return this.firstFormGroup.get('image') as FormArray;
//   }

//   addItem() {
//     (<FormArray>this.firstFormGroup.get("image")).push(this._formBuilder.control('',[Validators.required]))
//   }

//   secondFormGroup = this._formBuilder.group({
//     caption: ['', Validators.required],
//   });

//   isLinear = false;
//   selectedFile: File | null = null;
//   selectedFileUrl:any=[];
//   inputText: string = '';

//   onFileSelected(event: any) {
//     const file: File = event.target.files[0];
//     this.selectedFile = file;
//     this.previewImage(file);
//   }

//   previewImage(file: File) {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = (event) => {
//       this.selectedFileUrl = reader.result;  
//     };
//   }

//   submitForm() {
//     // Perform form submission or further processing
//     // You can access the selected file using this.selectedFile
//     // and the input text using this.inputText
//     console.log('Selected File:', this.selectedFile);
//     console.log('Input Text:', this.inputText);
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  constructor(private _formBuilder: FormBuilder,private http:HttpClient) {}

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  selectedFile: any[] = [];
  selectedFileUrl: any[] = [];
  imagedata:any[]=[];
  caption!:string;

  images_object={
   caption:'',
   media:this.imagedata
  }


  ngOnInit() {
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
    this.selectedFile.splice(index,1);
    this.selectedFileUrl.splice(index, 1);

    // Clear the selectedFileUrl array
    this.selectedFileUrl = [];

    // Preview the remaining images
    for (let i = 0; i < this.selectedFile.length; i++) {
    const file: File = this.selectedFile[i];
    this.previewImage(file);
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      this.selectedFile.push(file);
      this.previewImage(file);
    }
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFileUrl.push(reader.result);
    }
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
        const response = await this.http.post('https://localhost:7200/api/Post/ImageUrl', formData).toPromise();
        console.log('File uploaded:', response);
        this.imagedata.push(response);
      } catch (error) {
        console.error('Error uploading file:', file.name, error);
        // Handle the error if needed
      }
    }

    this.images_object.media = this.imagedata;
  
    try {
      const res = await this.http.post('https://localhost:7200/api/Post/post?userid=' + 9, this.images_object).toPromise();
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
}