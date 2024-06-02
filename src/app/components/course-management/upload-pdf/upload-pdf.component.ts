import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoUploadService } from '../../../services/course-service/file-video-course';
import { LoginService } from '../../../services/security-service/login.service';

@Component({
  selector: 'app-upload-pdf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-pdf.component.html',
  styleUrl: './upload-pdf.component.css'
})
export class UploadPdfComponent {

  uploadedVideoFile: File | null = null;
  videoUrl: SafeResourceUrl | null = null;

  uploadedPdfFile: File | null = null;
  pdfUrl: SafeResourceUrl | null = null;

  fileNames: string[] = [];
  pdfData: any;
  videoData: any;
  pdfVisible: boolean = false;
  videoVisible: boolean = false;

  constructor(public loginService: LoginService,private sanitizer: DomSanitizer, private videoUploadService: VideoUploadService) { }

  ngOnInit(): void {
    this.loadFileNames();
  }

  loadFileNames(): void {
    this.videoUploadService.getFileNames().subscribe(
      response => {
        this.fileNames = response;
      },
      error => {
        console.error('Error fetching file names:', error);
      }
    );
  }

  onVideoFileChange(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.uploadedVideoFile = files[0];
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.uploadedVideoFile));
      this.uploadFile(this.uploadedVideoFile);
    }
  }

  onPdfFileChange(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.uploadedPdfFile = files[0];
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.uploadedPdfFile));
      this.uploadFile(this.uploadedPdfFile);
    }
  }

  uploadFile(file: File): void {
    this.videoUploadService.uploadFile(file).subscribe(
      response => {
        console.log('File uploaded successfully:', response);
        this.loadFileNames(); // Reload the file names after uploading a new file
      },
      error => {
        console.error('Error uploading file:', error);
      }
    );
  }

  simulateVideo(): void {
    if (this.uploadedVideoFile) {
      console.log('Simulating Video:', this.uploadedVideoFile.name);
    }
  }

  fetchFileNames(): void {
    this.videoUploadService.fetchFileNames().subscribe(
      (data: string[]) => {
        this.fileNames = data;
      },
      (error) => {
        console.error('Error fetching file names:', error);
      }
    );
  }

  onFileSelected(fileName: string): void {
    this.videoUploadService.getFile(fileName).subscribe(
      (data) => {
        this.displayFile(data, fileName);
      },
      (error) => {
        console.error('Error fetching file:', error);
      }
    );
  }

  displayFile(fileData: any, fileName: string): void {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') {
      this.displayPdf(fileData);
    } else if (extension === 'mp4') {
      this.displayVideo(fileData);
    } else {
      console.error('Unsupported file type');
    }
  }

  displayPdf(pdfData: any): void {
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
    this.pdfVisible = true;
    this.videoVisible = false; // Hide video player if visible
  }
    
  displayVideo(videoData: any): void {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(videoData));
    this.videoVisible = true;
    this.pdfVisible = false; // Hide PDF viewer if visible
  }
  }
