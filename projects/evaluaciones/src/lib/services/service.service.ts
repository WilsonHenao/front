import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  myUrl = 'http://localhost:8090/';
  constructor(private http: HttpClient) { }

  /**
   * getAllTypeOfResponse
   */
  public getAllTypeOfResponse(): Observable<any> {
    return this.http.get<any>(this.myUrl + 'api/v1/typeOfResponse');
  }

  public getAllExam(): Observable<any> {
    return this.http.get<any>(this.myUrl + 'api/v1/exam/all')
  }

  public postExam(exam: any): Observable<any> {
    return this.http.post(this.myUrl + 'api/v1/exam', exam);
  }

  

}
