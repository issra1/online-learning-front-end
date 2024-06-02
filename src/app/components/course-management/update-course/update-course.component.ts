import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Professor } from '../../../models/professor';
import { Course } from '../../../models/course';
import { UserService } from '../../../services/user-services/user.service';
import { CourseService } from '../../../services/course-service/course.service';

@Component({
  selector: 'app-update-course',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})
export class UpdateCourseComponent implements OnInit {
  courseId: number = 0;
  @Output() professorsListChange = new EventEmitter<Professor[]>();

  @ViewChild('updateForm') updateForm: NgForm | undefined; // Reference to the form using ViewChild
  selectedInstructor: string = '';
  showDropdown: boolean = false;
  filteredProfessors: Professor[] = [];
  professorsList: Professor[] = [];

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
    department: '',
    coursePaymentStatuses :[],
    price: '',
    comments: [],
    isSelected:false, // Assuming Comment is another model/interface representing a comment
    paiedOrNo:false,
    isAccepted:false // Assuming Comment is another model/interface representing a comment
    // Assuming Comment is another model/interface representing a comment
  };

  constructor(public userService: UserService, private route: ActivatedRoute, private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseId = +id;
    }
    this.getCourseDetails(this.courseId);
    this.getAllProfessors();
  }

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


  getCourseDetails(id: number): void {
    this.courseService.getCourseById(id).subscribe(
      course => {
        this.course = course;
        // Assuming you have a method to fill the form fields with the course details
        this.fillFormWithCourseDetails();
      },
      error => {
        console.error('Error fetching course details:', error);
      }
    );
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
  fillFormWithCourseDetails(): void {
    // Check if course details are available
    if (this.course && this.updateForm) {
      // Access form controls using template reference variables from NgForm
      this.updateForm.form.patchValue({
        courseName: this.course.courseName,
        instructor: this.course.instructor, // Assuming instructor is a string property
        instructorInstitution: this.course.instructorInstitution,
        skillLevel: this.course.skillLevel,
        language: this.course.language,
        youtubeUrl: this.course.youtubeUrl,
        websiteUrl: this.course.websiteUrl,
        courseType: this.course.courseType,
        department: this.course.department,
        description: this.course.description,
        price: this.course.price
      });
    }
  }

  submitForm(): void {
    if (this.updateForm && this.updateForm.valid) {
      // Implement update logic
      this.courseService.updateCourse(this.courseId, this.course)
        .subscribe(() => {
          this.router.navigate(['/listcourses']);
        });
    }
  }




}