import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'ws-app-survey-form-section',
  templateUrl: './survey-form-section.component.html',
  styleUrls: ['./survey-form-section.component.scss']
})
export class SurveyFormSectionComponent {

  @Input() chaildQuestionsFormArray!: FormArray
  @Input() chaildFields: any
  @Input() sectionField: any

  @Output() questionValues = new EventEmitter()

  getField(questionIndex: number) {
    let field = {}
    if(this.chaildFields) {
      const filterList = this.chaildFields.filter((chaildField: any) => chaildField.controlIndex === questionIndex)
      field = filterList ? filterList[0] : {}
    }
    return field
  }

  updateQuestionValues(event: any) {
    this.questionValues.emit(event)
  }

}
