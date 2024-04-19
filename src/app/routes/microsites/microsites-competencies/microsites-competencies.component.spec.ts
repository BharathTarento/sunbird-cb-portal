import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrositesCompetenciesComponent } from './microsites-competencies.component';

describe('MicrositesCompetenciesComponent', () => {
  let component: MicrositesCompetenciesComponent;
  let fixture: ComponentFixture<MicrositesCompetenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicrositesCompetenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrositesCompetenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
