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
    return this.http.get<any>(this.myUrl + 'api/v1/exam/all');
  }

  public getAllQuestion(): Observable<any> {
    return this.http.get<any>(this.myUrl + 'api/v1/question/all');
  }

  public getAllOptions(): Observable<any> {
    return this.http.get<any>(this.myUrl + 'api/v1/option/all');
  }

  public getAllNotes(): Observable<any> {
    return this.http.get<any>(this.myUrl + 'api/v1/note/all');
  }

  public getAllAnswers(): Observable<any> {
    return this.http.get<any>(this.myUrl + 'api/v1/answer/all');
  }

  public postExam(exam: any): Observable<any> {
    return this.http.post(this.myUrl + 'api/v1/exam', exam);
  }

  public postQuestion(question: any): Observable<any> {
    return this.http.post(this.myUrl + 'api/v1/question', question);
  }

  public postOption(option: any): Observable<any> {
    return this.http.post(this.myUrl + 'api/v1/option', option);
  }

  public postNote(note: any): Observable<any> {
    return this.http.post(this.myUrl + 'api/v1/note', note);
  }

  public postAnswer(answer: any): Observable<any> {
    return this.http.post(this.myUrl + 'api/v1/answer', answer);
  }

  public getQuestion(id): Observable<any> {
    return this.http.get<any>(this.myUrl + 'api/v1/question/exam/' + id);
  }

  public getIdQuestion(id): Observable<any> {
    return this.http.get<any>(this.myUrl + 'api/v1/question/' + id);
  }

  public getIdExam(id): Observable<any> {
    return this.http.get<any>(this.myUrl + 'api/v1/exam/' + id);
  }

  public getOption(id): Observable<any> {
    return this.http.get<any>(this.myUrl + 'api/v1/option/question/' + id);
  }

  public getAnswer(id): Observable<any> {
    return this.http.get<any>(this.myUrl + 'api/v1/answer/question/' + id);
  }


}
