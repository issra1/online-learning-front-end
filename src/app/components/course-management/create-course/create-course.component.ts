import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Professor } from '../../../models/professor';
import { Course } from '../../../models/course';
import { LoginService } from '../../../services/security-service/login.service';
import { UserService } from '../../../services/user-services/user.service';
import { CourseService } from '../../../services/course-service/course.service';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent implements OnInit {
  @Output() professorsListChange = new EventEmitter<Professor[]>();

  course: Course = {
    courseName: '',
    instructor: new Professor(),
    instructorInstitution: '',
    enrolledCount: 0,
    youtubeUrl: '',
    websiteUrl: '',
    courseType: '',
    skillLevel: '',
    language: '',
    description: '',
    coursePaymentStatuses :[],
    department: '',
    price: '',
    comments: [], 
    isSelected:false, // Assuming Comment is another model/interface representing a comment
    paiedOrNo:false, // Assuming Comment is another model/interface representing a comment
    isAccepted:false // Assuming Comment is another model/interface representing a comment
    // Initialize as an empty array
  };
  
  professorsList: Professor[] = [];
  filteredProfessors: Professor[] = [];
  selectedInstructor: string = '';
  showDropdown: boolean = false;

  constructor(public loginService: LoginService,public userService :UserService, private addCourse: CourseService, private router :Router) { }

  ngOnInit(): void {
    // Call the method to get professors list
    this.getAllProfessors();
  }

  toggleDropdown() {
    this.showDropdown = true;
  }

  selectProfessor(professor: Professor) {
    // Assign the selected professor object to the instructor property
    this.course.instructor = professor;

    // Update the input field value with the selected professor's name
    const searchInput = document.getElementById('instructorSearch') as HTMLInputElement;
    searchInput.value = professor.fullName;

    // Close dropdown after selection
    this.showDropdown = false;
  }
  // Method to fetch professors list
  getAllProfessors() {
    let resp = this.userService.getAllUsersByRoles('TRAINER');
    resp.subscribe(data => {
      this.professorsList = data;
      // Emit the list of professors
      this.professorsListChange.emit(this.professorsList);
    },
      error => {
        console.log(error);
      });
  }

  filterProfessors(searchTerm: string) {
    if (!searchTerm || !this.professorsList) {
      this.filteredProfessors = [];
      return;
    }
    const searchTermLower = searchTerm.toLowerCase();
    this.filteredProfessors = this.professorsList.filter(professor =>
      professor.fullName.toLowerCase().includes(searchTermLower)
    );
  }

  submitForm() {
    this.addCourse.addCourse(this.course).subscribe(
      (response) => {
        // Handle successful response
        console.log('Course added successfully:', response);
        this.router.navigate(['/listcourses']);

      },
      (error) => {
        // Handle error
        console.error('Error adding course:', error);
      }
    );
  }
}
