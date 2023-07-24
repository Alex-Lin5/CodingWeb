import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { catchError, switchMap } from 'rxjs/operators'

import { Code } from "./codes.model";

@Injectable({ providedIn: "root" })
export class CodesService {
  private codes: Code[] = [];
  // private handleError: HandleError;
  private hostUrl = "http://localhost:3000";
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
  getCodesNo(): Observable<number> {
    const queryParams = `count=true`;
    const url = `${this.hostUrl}/codes/?${queryParams}`;
    const req = this.http.get<number>(url);
    req.subscribe({
      next(num){
        console.log(`Get codes total number ${num}.`);
      }
    })
    return req;
  }
  getCodes(pageSize: number, currentPage: number): Observable<Code[]> {
    let queryParams;
    let codes: Code[];
    if(currentPage == -1) {queryParams = '';}
    else {
      queryParams = `pageSize=${pageSize}&page=${currentPage}`;
    }
    const url = `${this.hostUrl}/codes/?${queryParams}`;
    console.log(`Get codes of (pageSize, currentPage)=(${pageSize}, ${currentPage}).`);
    // const codes = this.http.get<Code[]>(url);
    // console.log("The codes list is ", codes);
    // return codes;
    const req = this.http.get<Code[]>(url);
    // .pipe(switchMap(res => {
    //     console.log("The codes list is ", res);
    //   })
    // )
    req.subscribe({
      next(codes){ console.log("The codes list is ", codes);}
    })
    return req;
    
  }
  getCode(id: number): Observable<Code> {
    const url = `${this.hostUrl}/codes/${id}`;
    return this.http.get<Code>(url);
  }

  deleteCode(id: number): Observable<unknown> {
    const url = `${this.hostUrl}/codes/${id}`;
    console.log("Delete code in", url);
    return this.http.delete(url, this.httpOptions);
  }

  updateCode(code: Code): Observable<Code> {
    const url = `${this.hostUrl}/codes/${code._id}`;
    console.log("Update code in", url);
    return this.http.put<Code>(url, code, this.httpOptions)
  }

  addCode(code: Code): Observable<Code> {
    console.log("add Code: ", code);
    const url = `${this.hostUrl}/codes`;
    return this.http.post<Code>(url, code, this.httpOptions)
      // pipe(catchError(this.))
  }

}
