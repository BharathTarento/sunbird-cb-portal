import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AllCompetenciesV2Component } from './all-competencies-v2.component'

describe('AllCompetenciesV2Component', () => {
  let component: AllCompetenciesV2Component
  let fixture: ComponentFixture<AllCompetenciesV2Component>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllCompetenciesV2Component],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCompetenciesV2Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
