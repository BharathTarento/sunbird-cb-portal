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

  processArray(arr: any[], chunkSize: number): any[][] {
    const chunkedArray: any[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }

  

  
  

}
