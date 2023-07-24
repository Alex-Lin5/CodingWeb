import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { CodesComponent } from '../codes.component';
import { CodesService } from "../codes.service";
import { Code } from "../codes.model"

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  providers: [CodesService], 
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  codesNo: number = 10
  codespp: number = 1
  psoptions: number[] = [1,2,3,5]
  currentPage: number = 1; // start from 0

  onChangedPage(pageData: PageEvent){
  }

}
