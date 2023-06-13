import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { catchError } from 'rxjs/operators'

import { Code } from "./codes.model";

@Injectable({ providedIn: "root" })
export class CodesService {
  private codes: Code[] = [];
  // private handleError: HandleError;
  // private codesUpdated = new Subject<Code[]>();
  private codeUrl = "http://localhost:3000/codes";
  constructor(
    private http: HttpClient,
    // httpErrorHandler: HttpErrorHandler
    ) {};

  // getCodes() {
  //   this.http
  //     .get<{ message: string; codes: Code[] }>(this.codeUrl)
  //     .subscribe(codeData => {
  //       this.codes = codeData.codes;
  //       this.codesUpdated.next([...this.codes]);
  //     });
  // }

  // getCodeUpdateListener() {
  //   return this.codesUpdated.asObservable();
  // }

  // addCode(language: string, content: string) {
  //   const code: Code = { language: language, content: content, result: "none", performance: "none" };
  //   this.http
  //     .post<{ message: string }>(this.codeUrl, code)
  //     .subscribe(responseData => {
  //       console.log(responseData.message);
  //       this.codes.push(code);
  //       this.codesUpdated.next([...this.codes]);
  //     });
  // }
  addCode(code: Code): Observable<Code> {
    console.log("add Code: ", code);
    return this.http.post<Code>(this.codeUrl, code)
      // pipe(catchError(this.))
  }

}
