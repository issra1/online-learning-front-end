import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordProfessorComponent } from './dashbord-professor.component';

describe('DashbordProfessorComponent', () => {
  let component: DashbordProfessorComponent;
  let fixture: ComponentFixture<DashbordProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordProfessorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashbordProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
