import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoUploadService {

  pdfData: any;
  videoData: any;
  pdfVisible: boolean = false;
  videoVisible: boolean = false;

  private baseUrl = 'http://localhost:8080/api/video';
  videoSrc: string = "";

  constructor(private http: HttpClient) { }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.baseUrl}/upload`, formData);
  }

  getFileNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/names`);
  }

  getFile(fileName: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${fileName}`, { responseType: 'blob' });
  }

  fetchFileNames(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + 'names');
  }


}



