import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { catchError } from 'rxjs/operators'

import { Code } from "./codes.model";

@Injectable({ providedIn: "root" })
export class CodesService {
  private codes: Code[] = [];
  // private handleError: HandleError;
  // private codesUpdated = new Subject<Code[]>();
  private codeUrl = "http://localhost:3000";
  constructor(
    private http: HttpClient,
    // httpErrorHandler: HttpErrorHandler
    ) {};

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'None',
      // 'Origin': "http://localhost:4200",
    })
  }
  // getCodes() {
  //   this.http
  //     .get<{ message: string; codes: Code[] }>(this.codeUrl)
  //     .subscribe(codeData => {
  //       this.codes = codeData.codes;
  //       this.codesUpdated.next([...this.codes]);
  //     });
  // }

  getCodes(): Observable<Code[]> {
    const url = `${this.codeUrl}/codes`;
    console.log("Get all codes.");
    return this.http.get<Code[]>(url);
  }
  getCode(id: number): Observable<Code> {
    const url = `${this.codeUrl}/${id}`;
    return this.http.get<Code>(url);
  }

  deleteCode(id: number): Observable<unknown> {
    const url = `${this.codeUrl}/codes/${id}`;
    console.log("Delete code in", url);
    return this.http.delete(url, this.httpOptions);
  }

  updateCode(code: Code): Observable<Code> {
    const url = `${this.codeUrl}/codes/${code._id}`;
    console.log("Update code in", url);
    return this.http.put<Code>(url, code, this.httpOptions)
  }
  // getCodeUpdateListener() {
  //   return this.codesUpdated.asObservable();
  // }

  addCode(code: Code): Observable<Code> {
    console.log("add Code: ", code);
    const url = `${this.codeUrl}/codes`;
    return this.http.post<Code>(url, code, this.httpOptions)
      // pipe(catchError(this.))
  }

}
