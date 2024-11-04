import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'ws-app-rejection-reason-popup',
  templateUrl: './rejection-reason-popup.component.html',
  styleUrls: ['./rejection-reason-popup.component.scss'],
})
export class RejectionReasonPopupComponent implements OnInit {

  reason = ''
  buttonText = 'OK'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reason = data.comments,
    this.buttonText = data.buttonText ? data.buttonText : 'OK'
  }

  ngOnInit() {
  }

}
