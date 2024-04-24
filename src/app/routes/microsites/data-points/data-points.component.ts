import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ws-competencies-metrics',
  templateUrl: './data-points.component.html',
  styleUrls: ['./data-points.component.scss']
})
export class DataPointsComponent implements OnInit {
  @Input() objectData: any
  @Input() layoutType: string = ''
  constructor() { 
    
  }

  ngOnInit() {
  }

  
  

}
