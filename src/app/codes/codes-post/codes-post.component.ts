import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, FormBuilder } from '@angular/forms';

import { CodesService } from "../codes.service";
import { Code } from "../codes.model"

@Component({
  selector: 'app-codes-post',
  templateUrl: './codes-post.component.html',
  styleUrls: ['./codes-post.component.css'],
})
export class CodesPostComponent {
  nlangugae: string = "";
  ncontent: string = '';
  codes: Code[] = [];
  codeForm = this.fb.group({
    language: [''],
    content: [''],
    result: [''],
    performance: ['']
  })

  constructor(
    public codesService: CodesService, 
    private fb: FormBuilder) {}

  add() {
    // if (form.invalid) {
    //   return;
    // }
    // this.codesService.addCode(form.value.language, form.value.content);
    // form.resetForm();
    // this.codesService.addCode(this.nlangugae, this.ncontent)

    console.info(this.codeForm.value);
    const content = this.codeForm.controls['content'].value;
    const language = this.codeForm.value.language?.trim();
    const newCode: Code = { language, content } as Code;
    this.codesService
      .addCode(newCode)
      .subscribe(code => this.codes.push(code))
  }

}
