import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ws-microsites-competencies',
  templateUrl: './microsites-competencies.component.html',
  styleUrls: ['./microsites-competencies.component.scss']
})
export class MicrositesCompetenciesComponent implements OnInit {
  subTheme = ['Behavioural']
  @Input() objectData: any;

  constructor() { 
    
  }

  ngOnInit() {
  }

  showMore() {
    this.objectData.viewMore = !this.objectData.viewMore
  }
  

}
