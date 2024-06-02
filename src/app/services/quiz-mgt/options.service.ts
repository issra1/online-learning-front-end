import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const ApiEndpoints = {
    quizzes: 'http://localhost:8080/api/quizzes',
    questions: 'http://localhost:8080/api/questions',
    options: 'http://localhost:8080/api/options'
  };
  

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  constructor(private http: HttpClient) {}

  createOption(option: any): Observable<any> {
    return this.http.post<any>(ApiEndpoints.options, option);
  }

  getOptionsByQuestionId(questionId: number): Observable<any[]> {
    const url = `${ApiEndpoints.options}/question/${questionId}`;
    return this.http.get<any[]>(url);
  }

  
}
