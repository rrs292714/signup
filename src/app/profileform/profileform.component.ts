import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profileform',
  templateUrl: './profileform.component.html',
  styleUrls: ['./profileform.component.css']
})
export class ProfileformComponent {
  datalist!:any;
  constructor(private _formBuilder: FormBuilder) {}

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  isLinear = false;
  selectedFile: File | null = null;
  selectedFileUrl: string | ArrayBuffer | null = null;
  inputText: string = '';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    this.previewImage(file);
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.selectedFileUrl = reader.result;
    };
  }

  submitForm() {
    // Perform form submission or further processing
    // You can access the selected file using this.selectedFile
    // and the input text using this.inputText
    console.log('Selected File:', this.selectedFile);
    console.log('Input Text:', this.inputText);
  }
}

