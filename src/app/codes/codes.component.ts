import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { PaginatorComponent } from './paginator/paginator.component';
import { CodesService } from "./codes.service";
import { Code } from "./codes.model"

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  providers: [CodesService, PaginatorComponent], 
  styleUrls: ['./codes.component.css']
})
export class CodesComponent implements OnInit{
  codes: Code[] = [];
  displayedCodes: Code[] = []
  codesNo: number = 10
  codespp: number = 1
  psoptions: number[] = [1,2,3,5]
  currentPage: number = 0; // start from 0

  editCode: Code | undefined = undefined;
  codeForm = this.createForm();
  editingForm = this.createForm();
  languages: string[] = ['Plain Text','Python', 'Java', 'Javascript', 'C++']
  constructor(
    public codesService: CodesService, 
    private fb: FormBuilder) {
    }
  private createForm(): FormGroup{
    let form = this.fb.group({
      _id: [''],
      language: [''],
      content: [''],
      result: [''],
      performance: ['']  
    })
    return form;
  }
  ngOnInit(): void {
    // this.getAll();
    this.codesService.getCodes(this.codespp, this.currentPage)
      .subscribe(codes => {
        this.codes = codes;
        this.displayedCodes = this.codes;
      });
    this.codesService.getCodesNo()
      .subscribe(num => {
        this.codesNo = num;
      })
  }
  onChangedPage(pageData: PageEvent){
    this.currentPage = pageData.pageIndex;
    this.codespp = pageData.pageSize;
    this.codesService.getCodes(this.codespp, this.currentPage)
      .subscribe(codes => {
        this.codes = codes;
        this.displayedCodes = this.codes;
      });
    // console.log(`Now changing page on ${this.currentPage} of pageSize ${this.codespp} by total ${this.codesNo}`);
  }
  // POST request
  add(): void {
    // console.info(this.codeForm.value);
    const content = this.codeForm.controls['content'].value;
    const language = this.codeForm.value.language?.trim();
    const newCode: Code = { language, content } as Code;
    this.codesService
      .addCode(newCode)
      .subscribe(code => this.codes.push(code));
    this.clear(this.codeForm);
    this.codesService.getCodesNo()
      .subscribe(num => {
        this.codesNo = num;
      })
  }

  search(): void{
    const content = this.codeForm.value.content;
    const language = this.codeForm.value.language?.trim();
    const sCode: Code = { language, content } as Code;
    console.log("User pulls a searching request.", sCode);
    if(!content && !language){
      console.log("Empty search condition.");
      this.displayedCodes = this.codes;
      return;
    }
    this.displayedCodes = this.codes.filter(c => 
      (c.language == sCode.language) 
      // ||
      // (c.content.slice(0, content.length) == sCode.content)
      // c.content.includes(content)
    )
    if(!this.displayedCodes){
      console.log("No search result.");
    }
    else if(this.displayedCodes == this.codes){
      console.log("Show all results.");
    }
  }

  // GET ALL request
  getAll(): void {
    this.codesService.getCodes(this.codespp, -1)
      .subscribe(codes => {
        this.codes = codes;
        this.displayedCodes = this.codes;
      });
  }
  
  // DELETE request
  delete(code: Code): void {
    this.codes = this.codes.filter(c => c !== code);
    this.codesService
      .deleteCode(code._id)
      .subscribe();
    this.codesService
      .getCodesNo()
      .subscribe(num => {
        this.codesNo = num;
    })    
  }
  // PUT request
  edit(): void {
    if(this.editCode == undefined) return;
    const _id = this.editingForm.value._id;
    const content = this.editingForm.value.content;
    const language = this.editingForm.value.language?.trim();
    const newCode: Code = { _id, language, content } as Code;
    if(newCode.content === this.editCode.content && newCode.language === this.editCode.language){
      console.log("No editing with same content.");
    } else{
      console.log("Edit code in component. ", newCode);      
      this.codesService
        .updateCode(newCode)
        .subscribe(code => {
          const ix = code ? this.codes.findIndex(c => c._id === code._id) : -1
          if (ix > -1){
            this.codes[ix] = code;
          }
        });
    }
    this.editCode = undefined;
  }
  patch(code: Code): void{
    console.log("Form value patched, ", code);
    this.editingForm.patchValue({
      _id: code._id,
      language: code.language,
      content: code.content,
      result: code.result,
      performance: code.performance
    })
  }
  clear(form: FormGroup): void{
    console.log("Clear form ", form.value);
    form.setValue({
      _id: '',
      language: '',
      content: '',
      result: '',
      performance: ''
    });
  }
}
