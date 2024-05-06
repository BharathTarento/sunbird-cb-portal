import { Component, OnInit, Inject, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { HttpErrorResponse } from '@angular/common/http'
import { MatSnackBar } from '@angular/material'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
/* tslint:disable */
import * as _ from 'lodash'

import { OtpService } from '../../../user-profile/services/otp.services'
import { UserProfileService } from '../../../user-profile/services/user-profile.service'

@Component({
  selector: 'ws-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})

export class VerifyOtpComponent implements OnInit, OnDestroy {

  private destroySubject$ = new Subject()
  @ViewChild('timerDiv', { static: false }) timerDiv !: any
  @Output() resendOTP = new EventEmitter<string>()
  @Output() otpVerified = new EventEmitter<any>()
  timeLeft = 150
  interval: any
  showResendOTP = false
  otpEntered = ''
  constructor(
    public dialogRef: MatDialogRef<VerifyOtpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private otpService: OtpService,
    private matSnackbar: MatSnackBar,
    private userProfileService: UserProfileService
  ) { }

  ngOnInit() {
    this.startTimer()
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft = this.timeLeft - 1
        this.timerDiv.nativeElement.innerHTML = `${Math.floor(this.timeLeft / 60)}m: ${this.timeLeft % 60}s`
      } else {
        clearInterval(this.interval)
        this.showResendOTP = true
      }
    },                          1000)
  }

  handleVerifyOTP(): void {
    if (this.data.type === 'email') {
      this.verifyEmailOTP()
    } else {
      this.verifyMobileOTP()
    }
  }

  verifyEmailOTP(): void {
    this.otpService.verifyEmailOTP(this.otpEntered, this.data.value)
    .pipe(takeUntil(this.destroySubject$))
    .subscribe((_res: any) => {
      this.matSnackbar.open(this.handleTranslateTo('OTPSentSuccess'))
      this.handleCloseModal()
      this.otpVerified.emit({type: 'email', token: _res.result.contextToken})
    }, (error: HttpErrorResponse) => {
      if (!error.ok) {
        this.matSnackbar.open(_.get(error, 'error.params.errmsg') || this.handleTranslateTo('OTPVerifyFailed'))
        this.handleCloseModal()
      }
    })
  }

  verifyMobileOTP(): void {
    this.otpService.verifyOTP(Number(this.otpEntered), this.data.value)
    .pipe(takeUntil(this.destroySubject$))
    .subscribe((_res: any) => {
      this.matSnackbar.open(this.handleTranslateTo('OTPSentSuccess'))
      this.handleCloseModal()
      this.otpVerified.emit({type: 'mobile'})
    }, (error: HttpErrorResponse) => {
      if (!error.ok) {
        this.matSnackbar.open(_.get(error, 'error.params.errmsg') || this.handleTranslateTo('OTPVerifyFailed'))
        this.handleCloseModal()
      }
    })
  }

  handleCloseModal(): void {
    this.dialogRef.close()
  }

  handleResendOTP(): void {
    this.timeLeft = 150
    this.showResendOTP = !this.resendOTP
    this.startTimer()
    this.resendOTP.emit(this.data.type)
  }

  handleTranslateTo(menuName: string): string {
    return this.userProfileService.handleTranslateTo(menuName)
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
    this.destroySubject$.unsubscribe()
  }

}
