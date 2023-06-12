import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, FormBuilder } from '@angular/forms';

import { CodesService } from "../codes.service";

@Component({
  selector: 'app-codes-post',
  templateUrl: './codes-post.component.html',
  styleUrls: ['./codes-post.component.css'],
})
export class CodesPostComponent {
  nlangugae = "";
  ncontent = "";
  codeForm = this.fb.group({
    language: [''],
    content: ['']
  })

  constructor(
    // public codesService: CodesService, 
    private fb: FormBuilder) {}

  SubmitCode() {
    // if (form.invalid) {
    //   return;
    // }
    // this.codesService.addCode(form.value.language, form.value.content);
    // form.resetForm();
    // this.codesService.addCode(this.nlangugae, this.ncontent)
    console.info(this.codeForm.value);

  }

}
