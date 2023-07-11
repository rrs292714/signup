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

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  constructor(private _formBuilder: FormBuilder) {}

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  selectedFile: File[] = [];
  selectedFileUrl: any[] = [];

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

  submitForm() {
    // Perform form submission or further processing
    console.log('Selected Files:', this.selectedFile);
    console.log('Caption:', this.secondFormGroup.value);

    for(let i of this.selectedFile){
      console.log(i.name);
    }
  };

}