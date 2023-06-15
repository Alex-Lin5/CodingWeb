import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';

import { CodesService } from "./codes.service";
import { Code } from "./codes.model"

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  providers: [CodesService], 
  styleUrls: ['./codes.component.css']
})
export class CodesComponent implements OnInit{
  codes: Code[] = [];
  editCode: Code;
  codeForm = this.fb.group({
    _id: [''],
    language: [''],
    content: [''],
    result: [''],
    performance: ['']
  })

  constructor(
    public codesService: CodesService, 
    private fb: FormBuilder) {
      this.editCode = this.codes[0];
    }
  
  ngOnInit(): void {
    this.getAll();
  }
  // POST request
  add(): void {
    console.info(this.codeForm.value);
    const content = this.codeForm.controls['content'].value;
    const language = this.codeForm.value.language?.trim();
    const newCode: Code = { language, content } as Code;
    this.codesService
      .addCode(newCode)
      .subscribe(code => this.codes.push(code))
  }

  // GET ALL request
  getAll(): void {
    this.codesService.getCodes()
      .subscribe(codes => (this.codes = codes));
  }
  
  // DELETE request
  delete(code: Code): void {
    this.codes = this.codes.filter(c => c !== code);
    this.codesService
      .deleteCode(code._id)
      .subscribe();
  }
  // PUT request
  edit(code: Code): void {
    // console.log("Edit code in component.");
    if(this.codes.filter(c => c == code) == null){
      this.codesService
        .updateCode(code)
        .subscribe();
    }
  }
}
