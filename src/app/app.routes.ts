import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registrationmanagement/registration/registration.component';
import { WelcomepageComponent } from './components/shared-component-management/welcomepage/welcomepage.component';
import { RegistrationsuccessComponent } from './components/registrationmanagement/registrationsuccess/registrationsuccess.component';
import { ListUserComponent } from './components/user-management/list-user/list-user.component';
import { ListApprenantComponent } from './components/user-management/list-apprenant/list-apprenant.component';
import { DashbordAdminComponent } from './components/dashbord-management/dashbord-admin/dashbord-admin.component';
import { UpdateCourseComponent } from './components/course-management/update-course/update-course.component';
import { CreateCourseComponent } from './components/course-management/create-course/create-course.component';
import { ListCoursesComponent } from './components/course-management/list-courses/list-courses.component';
import { QuestionListComponent } from './components/quiz-management/question-list/question-list.component';
import { LoginComponent } from './components/login/login.component';
import { QuizCreateComponent } from './components/quiz-management/quiz-create/quiz-create.component';
import { ListCoursFavorisComponent } from './components/course-management/list-cours-favoris/list-cours-favoris.component';
import { ListProfessorComponent } from './components/user-management/list-professor/list-professor.component';
import { DashbordProfessorComponent } from './components/dashbord-management/dashbord-professor/dashbord-professor.component';
import { DashbordUserComponent } from './components/dashbord-management/dashbord-user/dashbord-user.component';
import { UserProfileComponent } from './components/user-management/user-profile/user-profile.component';
import { QuizListComponent } from './components/quiz-management/quiz-list/quiz-list.component';
import { QuizUpdateComponent } from './components/quiz-management/quiz-update/quiz-update.component';
import { LoginGuard } from './services/guard/login.guard';
import { LogoutGuard } from './services/guard/logout.guard';
import { UploadPdfComponent } from './components/course-management/upload-pdf/upload-pdf.component';
import { ListCoursPanelComponent } from './components/course-management/list-cours-panel/list-cours-panel.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomepageComponent},
  { path: 'registration', component: RegistrationComponent },
  { path: 'registrationsuccess', component: RegistrationsuccessComponent},
  { path: 'listuser', component: ListUserComponent, canActivate:[LoginGuard]},
  { path: 'listapprenants', component: ListApprenantComponent, canActivate:[LoginGuard]},
  { path: 'dashbordadmin', component: DashbordAdminComponent, canActivate:[LoginGuard] },
  { path: 'updatecourse/:id', component: UpdateCourseComponent, canActivate:[LoginGuard] },
  { path: 'courses/create', component: CreateCourseComponent, canActivate:[LoginGuard] },
  { path: 'listcourses', component: ListCoursesComponent, canActivate:[LoginGuard] },
  { path: 'listprofessor', component: ListProfessorComponent, canActivate:[LoginGuard] },
  { path: 'listcoursesfavoris', component: ListCoursFavorisComponent, canActivate:[LoginGuard] },
  { path: 'listcoursespanel', component: ListCoursPanelComponent, canActivate:[LoginGuard] },
  { path: 'dashbordprofessor', component: DashbordProfessorComponent,canActivate:[LoginGuard] },
  { path: 'dashborduser', component: DashbordUserComponent,canActivate:[LoginGuard] },
  { path: 'updateuserprofile', component: UserProfileComponent,canActivate:[LoginGuard] },
  { path: 'quizzes', component: QuizListComponent,canActivate:[LoginGuard] },
  { path: 'create-quiz', component: QuizCreateComponent,canActivate:[LoginGuard] },
  { path: 'quiz-update/:id', component: QuizUpdateComponent,canActivate:[LoginGuard] },
  { path: 'questions/:quizId', component: QuestionListComponent ,canActivate:[LoginGuard]},
  { path: 'upload-pdf', component: UploadPdfComponent ,canActivate:[LoginGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LogoutGuard] },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', redirectTo: '/welcome' },
];
