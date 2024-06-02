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
export class QuizService {
  constructor(private http: HttpClient) {}

  getAllQuizzes(role: string): Observable<any[]> {
    return this.http.get<any[]>(`${ApiEndpoints.quizzes}/all/`+role);
  }

  createQuiz(quiz: any): Observable<any> {
    return this.http.post<any>(ApiEndpoints.quizzes, quiz);
  }

  deleteQuiz(quizId: string) : Observable<any>{
    return this.http.delete<any>(`${ApiEndpoints.quizzes}/${quizId}`);
  }

  updateQuiz(quizId: string, quiz: any): Observable<any> {
    return this.http.put<any>(`${ApiEndpoints.quizzes}/${quizId}`, quiz);
  }

  getQuizById(quizId: string): Observable<any> {
    return this.http.get<any>(`${ApiEndpoints.quizzes}/${quizId}`);
  }

  getOptionsForQuestion(questionId: string): Observable<any> {
    const apiUrl = `${ApiEndpoints.quizzes}/${questionId}/options`;
    return this.http.get(apiUrl);
  }


  acceptQuiz(quizId: any, data: any): Observable<any> {
    return this.http.put<any>(`${ApiEndpoints.quizzes}/accept-quiz/${quizId}`, data);
  }


}
