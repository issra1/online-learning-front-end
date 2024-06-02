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
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestionsByQuizId(quizId: number): Observable<any[]> {
    const url = `${ApiEndpoints.questions}/quiz/${quizId}`;
    return this.http.get<any[]>(url);
  }

  createQuestion(question: any): Observable<any> {
    return this.http.post<any>(ApiEndpoints.questions, question);
  }
}
