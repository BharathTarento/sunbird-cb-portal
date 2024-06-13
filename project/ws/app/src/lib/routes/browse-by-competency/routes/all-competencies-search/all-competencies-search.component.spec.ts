import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AllCompetenciesSearchComponent } from './all-competencies-search.component'

describe('AllCompetenciesSearchComponent', () => {
  let component: AllCompetenciesSearchComponent
  let fixture: ComponentFixture<AllCompetenciesSearchComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllCompetenciesSearchComponent],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCompetenciesSearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
