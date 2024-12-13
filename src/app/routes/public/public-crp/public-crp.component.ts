import {
  Component,
  Inject,
  PLATFORM_ID,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  ConfigurationsService,
  EventService,
  LoggerService,
  MultilingualTranslationsService,
  NsInstanceConfig,
  TelemetryService,
  WsEvents,
} from '@sunbird-cb/utils-v2';
import { interval, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignupService } from '../public-signup/signup.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
// import { ReCaptchaV3Service } from 'ng-recaptcha';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { map, pairwise, startWith } from 'rxjs/operators';
import { SignupSuccessDialogueComponent } from '../public-signup/signup-success-dialogue/signup-success-dialogue/signup-success-dialogue.component';
import { TermsAndConditionComponent } from '../public-signup/terms-and-condition/terms-and-condition.component';
import { DialogBoxComponent as ZohoDialogComponent } from '@ws/app/src/lib/routes/profile-v3/components/dialog-box/dialog-box.component';
// tslint:disable-next-line: import-name
import _ from 'lodash';
import { IOrganizationDetails } from './models/public-crp-model';
import { MobileAppsService } from '../../../services/mobile-apps.service';
import { AppOtpReaderComponent } from 'src/app/component/app-otp-reader/app-otp-reader.component';

@Component({
  selector: 'ws-public-crp',
  templateUrl: './public-crp.component.html',
  styleUrls: ['./public-crp.component.scss'],
})
export class PublicCrpComponent {
  registrationForm!: UntypedFormGroup;
  namePatern = /^[a-zA-Z0-9\s']+$/;
  customCharsPattern = `^[a-zA-Z0-9 \\w\-\&\(\)]*$`;
  positionsOriginal!: [];
  postions!: any;
  masterGroup: any;
  telemetryConfig: NsInstanceConfig.ITelemetryConfig | null = null;
  portalID = '';
  confirm = false;
  confirmTerms = false;
  disableBtn = false;
  disableVerifyBtn = false;
  orgRequired = false;
  ministeries: any[] = [];
  masterMinisteries!: Observable<any> | undefined;
  orgs: any[] = [];
  masterOrgs!: Observable<any> | undefined;
  emailLengthVal = false;
  phoneNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  isMobileVerified = false;
  isEmailVerified = false;
  otpSend = false;
  otpEmailSend = false;
  otpVerified = false;
  OTP_TIMER = environment.resendOTPTIme;
  timerSubscription: Subscription | null = null;
  timeLeftforOTP = 0;
  timeLeftforOTPEmail = 0;
  timerSubscriptionEmail: Subscription | null = null;
  OTP_TIMER_EMAIL = environment.resendOTPTIme;
  filteredOrgList!: any;
  orgList: any;
  resultFetched = false;
  heirarchyObject: any;
  hideOrg = false;
  emailPattern = `^[\\w\-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$`;
  zohoHtml: any;
  zohoUrl: any = '/assets/static-data/zoho-code.html';
  invalidLinkMessage = '';
  private subscriptionContact: Subscription | null = null;
  private recaptchaSubscription!: Subscription;
  private userdataSubscription!: Subscription;
  searching = false;
  groupsOriginal: any = [];

  selectedLanguage = 'en';
  multiLang: any = [];
  isMultiLangEnabled: any;

  organizationDetails: IOrganizationDetails | null = null;
  frameworkDetails: any;
  organisationsList: any[] = [];
  designationsList: any[] = [];
  stopExecution = 0;

  mobileTopHeaderVisibilityStatus = true;
  @ViewChild('invalidLinkTemplate') invalidLinkTemplateRef!: TemplateRef<any>;
  @ViewChild('emailOTPComponent') emailOTPComponent!: AppOtpReaderComponent;
  @ViewChild('phoneOTPComponent') phoneOTPComponent!: AppOtpReaderComponent;

  constructor(
    private signupSvc: SignupService,
    private loggerSvc: LoggerService,
    private configSvc: ConfigurationsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    // private recaptchaV3Service: ReCaptchaV3Service,
    private router: Router,
    @Inject(DOCUMENT) private _document: any,
    @Inject(PLATFORM_ID) private _platformId: any,
    private translate: TranslateService,
    private langtranslations: MultilingualTranslationsService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public mobileAppsService: MobileAppsService,
    private eventService: EventService,
    private telemetrySvc: TelemetryService
  ) {
    if (localStorage.getItem('websiteLanguage')) {
      this.translate.setDefaultLang('en');
      let lang = JSON.stringify(localStorage.getItem('websiteLanguage'));
      lang = lang.replace(/\"/g, '');
      this.selectedLanguage = lang;
      this.translate.use(lang);
    } else {
      this.translate.setDefaultLang('en');
      localStorage.setItem('websiteLanguage', 'en');
    }

    let userData: any = {};
    this.userdataSubscription =
      this.signupSvc.updateSignupDataObservable.subscribe((res: any) => {
        userData = res;
      });
    this.isMobileVerified = (userData && userData.isMobileVerified) || false;
    this.isEmailVerified = (userData && userData.isEmailVerified) || false;
    this.registrationForm = new UntypedFormGroup({
      firstname: new UntypedFormControl(
        (userData && userData.firstname) || '',
        [Validators.required, Validators.pattern(this.namePatern)]
      ),
      group: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl((userData && userData.email) || '', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      mobile: new UntypedFormControl((userData && userData.mobile) || '', [
        Validators.required,
        Validators.pattern(this.phoneNumberPattern),
        Validators.maxLength(12),
      ]),
      confirmTermsBox: new UntypedFormControl(false, [Validators.required]),
      designation: new UntypedFormControl('', [Validators.required]),
    });
    if (
      this.configSvc.instanceConfig &&
      this.configSvc.instanceConfig.isMultilingualEnabled
    ) {
      this.isMultiLangEnabled =
        this.configSvc.instanceConfig.isMultilingualEnabled;
    }

    this.raiseImpressionTelemetry()
  }

  ngOnInit() {
    const instanceConfig = this.configSvc.instanceConfig;
    this.positionsOriginal =
      this.activatedRoute.snapshot.data.positions.data || [];
    if (this.activatedRoute.snapshot.data.group.data) {
      this.groupsOriginal = this.activatedRoute.snapshot.data.group.data.filter(
        (ele: any) => ele !== 'Others'
      );
      this.masterGroup = this.groupsOriginal;
    } else {
      this.groupsOriginal = [];
    }
    const org = this.activatedRoute.snapshot.data.organization;
    if (org) {
      this.designationsList = org.designationsList;
      this.organizationDetails = org.organizationDetails;
      this.invalidLinkMessage = org.invalidLinkMessage;

      if (
        this.invalidLinkMessage &&
        this.invalidLinkMessage !== 'Registration link is not active'
      ) {
        setTimeout(() => {
          this.dialog.open(this.invalidLinkTemplateRef, {
            width: '400px',
            height: '200px',
            data: this.invalidLinkMessage,
            disableClose: true,
          });
        }, 200);
      } else if (
        this.invalidLinkMessage &&
        this.invalidLinkMessage == 'Registration link is not active'
      ) {
        setTimeout(() => {
          this.dialog.open(this.invalidLinkTemplateRef, {
            width: '400px',
            height: '200px',
            data: 'Registrations are closed as of now please reach out to your department MDO or please write us at mission.karmayogi@gov.in with organization and designation name',
            disableClose: true,
          });
        }, 200)
      }
    }

    this.getOrganization();
    this.onPhoneChange();
    this.onEmailChange();
    if (instanceConfig) {
      this.telemetryConfig = instanceConfig.telemetryConfig;
      this.portalID = `${this.telemetryConfig.pdata.id}`;
      this.multiLang = instanceConfig.websitelanguages;
    }

    if (isPlatformBrowser(this._platformId)) {
      this._document.body.classList.add('cs-recaptcha');
    }
    this.http.get(this.zohoUrl, { responseType: 'text' }).subscribe((res) => {
      this.zohoHtml = this.sanitizer.bypassSecurityTrustHtml(res);
    });
  }

  emailVerification(emailId: string) {
    this.emailLengthVal = false;
    if (emailId && emailId.length > 0) {
      const email = emailId.split('@');
      if (email && email.length === 2) {
        if (
          (email[0] && email[0].length > 64) ||
          (email[1] && email[1].length > 255)
        ) {
          this.emailLengthVal = true;
        }
      } else {
        this.emailLengthVal = false;
      }
    }
  }

  clearValues() {
    // tslint:disable-next-line: no-non-null-assertion
    // this.registrationForm.get('organisation')!.setValue('');
    this.heirarchyObject = null;
  }

  onPhoneChange() {
    const ctrl = this.registrationForm.get('mobile');
    if (ctrl) {
      ctrl.valueChanges
        .pipe(startWith(null), pairwise())
        .subscribe(([prev, next]: [any, any]) => {
          if (!(prev == null && next)) {
            this.isMobileVerified = false;
            this.otpSend = false;
            this.disableVerifyBtn = false;
          }
        });
    }
  }

  onEmailChange() {
    const ctrl = this.registrationForm.get('email');
    if (ctrl) {
      ctrl.valueChanges
        .pipe(startWith(null), pairwise())
        .subscribe(([prev, next]: [any, any]) => {
          if (!(prev == null && next)) {
            this.isEmailVerified = false;
            this.otpEmailSend = false;
          }
        });
    }
  }

  sendOtp() {
    const mob = this.registrationForm.get('mobile');
    if (mob && mob.value && Math.floor(mob.value) && mob.valid) {
      this.signupSvc.sendOtp(mob.value, 'phone').subscribe(
        () => {
          this.otpSend = true;
          alert(
            this.translateLabels('anOtpHasBeenSentToMobile', 'publicsignup')
          );
          this.startCountDown();
          // tslint:disable-next-line: align
        },
        (error: any) => {
          this.snackBar.open(
            _.get(error, 'error.params.errmsg') || 'Please try again later'
          );
        }
      );
    } else {
      this.snackBar.open(
        this.translateLabels('pleaseEnterValidMobileNumber', 'publicsignup')
      );
    }
  }

  resendOTP() {
    const mob = this.registrationForm.get('mobile');
    if (mob && mob.value && Math.floor(mob.value) && mob.valid) {
      this.signupSvc.resendOtp(mob.value, 'phone').subscribe(
        (res: any) => {
          if (_.get(res, 'result.response').toUpperCase() === 'SUCCESS') {
            this.otpSend = true;
            this.disableVerifyBtn = false;
            alert(
              this.translateLabels('anOtpHasBeenSentToMobile', 'publicsignup')
            );
            this.startCountDown();
          }
          // tslint:disable-next-line: align
        },
        (error: any) => {
          this.snackBar.open(
            _.get(error, 'error.params.errmsg') || 'Please try again later'
          );
        }
      );
    } else {
      this.snackBar.open(
        this.translateLabels('pleaseEnterValidMobileNumber', 'publicsignup')
      );
    }
  }

  verifyOtp(otp: any) {
    const mob = this.registrationForm.get('mobile');

    if (otp) {
      if (otp && otp.length < 4) {
        this.snackBar.open(
          this.translateLabels('pleaseEnterValidOtp', 'publicsignup')
        );
      } else if (mob && mob.value && Math.floor(mob.value) && mob.valid) {
        this.signupSvc.verifyOTP(otp, mob.value, 'phone').subscribe(
          (res: any) => {
            if (_.get(res, 'result.response').toUpperCase() === 'SUCCESS') {
              this.otpVerified = true;
              this.isMobileVerified = true;
              this.disableBtn = false;
            }
            // tslint:disable-next-line: align
          },
          (error: any) => {
            this.snackBar.open(
              _.get(error, 'error.params.errmsg') || 'Please try again later'
            );
            if (error.error && error.error.result) {
              this.disableVerifyBtn =
                error.error.result.remainingAttempt === 0 ? true : false;
            }
          }
        );
      }
    } else {
      this.snackBar.open(
        this.translateLabels('pleaseEnterValidOtp', 'publicsignup')
      );
    }
  }
  startCountDown() {
    const startTime = Date.now();
    this.timeLeftforOTP = this.OTP_TIMER;
    // && this.primaryCategory !== this.ePrimaryCategory.PRACTICE_RESOURCE
    if (this.OTP_TIMER > 0) {
      this.timerSubscription = interval(1000)
        .pipe(map(() => startTime + this.OTP_TIMER - Date.now()))
        .subscribe((_timeRemaining: any) => {
          this.timeLeftforOTP -= 1;
          if (this.timeLeftforOTP < 0) {
            this.timeLeftforOTP = 0;
            if (this.timerSubscription) {
              this.timerSubscription.unsubscribe();
            }
            // this.submitQuiz()
          }
        });
    }
  }

  sendOtpEmail() {
    const email = this.registrationForm.get('email');
    if (email && email.value && email.valid) {
      this.signupSvc.sendOtp(email.value, 'email').subscribe(
        () => {
          this.otpEmailSend = true;
          alert(
            this.translateLabels('anOtpHasBeenSentToEmail', 'publicsignup')
          );
          this.startCountDownEmail();
          // tslint:disable-next-line: align
        },
        (error: any) => {
          this.snackBar.open(
            _.get(error, 'error.params.errmsg') || 'Please try again later'
          );
        }
      );
    } else {
      this.snackBar.open(this.translateLabels('validEmail', 'publicsignup'));
    }
  }

  resendOTPEmail() {
    const email = this.registrationForm.get('email');
    if (email && email.value && email.valid) {
      this.signupSvc.resendOtp(email.value, 'email').subscribe(
        (res: any) => {
          if (_.get(res, 'result.response').toUpperCase() === 'SUCCESS') {
            this.otpEmailSend = true;
            alert(
              this.translateLabels('anOtpHasBeenSentToEmail', 'publicsignup')
            );
            this.startCountDownEmail();
          }
          // tslint:disable-next-line: align
        },
        (error: any) => {
          this.snackBar.open(
            _.get(error, 'error.params.errmsg') || 'Please try again later'
          );
        }
      );
    } else {
      this.snackBar.open(this.translateLabels('validEmail', 'publicsignup'));
    }
  }

  verifyOtpEmail(otp: any) {
    const email = this.registrationForm.get('email');
    if (otp ) {
      if (otp && otp.length < 4) {
        this.snackBar.open(
          this.translateLabels('pleaseEnterValidOtp', 'publicsignup')
        );
      } else if (email && email.value && email.valid) {
        this.signupSvc.verifyOTP(otp, email.value, 'email').subscribe(
          (res: any) => {
            if (_.get(res, 'result.response').toUpperCase() === 'SUCCESS') {
              this.otpEmailSend = true;
              this.isEmailVerified = true;
              this.disableBtn = false;
            }
            // tslint:disable-next-line: align
          },
          (error: any) => {
            this.snackBar.open(
              _.get(error, 'error.params.errmsg') || 'Please try again later'
            );
          }
        );
      }
    } else {
      this.snackBar.open(
        this.translateLabels('pleaseEnterValidOtp', 'publicsignup')
      );
    }
  }

  startCountDownEmail() {
    const startTime = Date.now();
    this.timeLeftforOTPEmail = this.OTP_TIMER_EMAIL;
    // && this.primaryCategory !== this.ePrimaryCategory.PRACTICE_RESOURCE
    if (this.OTP_TIMER_EMAIL > 0) {
      this.timerSubscriptionEmail = interval(1000)
        .pipe(map(() => startTime + this.OTP_TIMER_EMAIL - Date.now()))
        .subscribe((_timeRemaining) => {
          this.timeLeftforOTPEmail -= 1;
          if (this.timeLeftforOTPEmail < 0) {
            this.timeLeftforOTPEmail = 0;
            if (this.timerSubscriptionEmail) {
              this.timerSubscriptionEmail.unsubscribe();
            }
            // this.submitQuiz()
          }
        });
    }
  }

  public confirmChange() {
    this.confirm = !this.confirm;
    this.registrationForm.patchValue({
      confirmBox: this.confirm,
    });
  }

  public confirmTermsChange() {
    this.confirmTerms = !this.confirmTerms;
    this.registrationForm.patchValue({
      confirmTermsBox: this.confirmTerms,
    });
  }

  signup() {
    this.raiseSignupInteractTelementry()
    this.disableBtn = true;
    // this.recaptchaSubscription = this.recaptchaV3Service
    //   .execute('importantAction')
    //   .subscribe(
    //     (_token) => {
          // tslint:disable-next-line: no-console
          let req: any;
          if (this.heirarchyObject) {
            req = {
              firstName: this.registrationForm.value.firstname || '',
              // lastName: this.registrationForm.value.lastname || '',
              email: this.registrationForm.value.email || '',
              phone: `${this.registrationForm.value.mobile}` || '',
              // position: this.registrationForm.value.position.name || '',
              group: this.registrationForm.value.group || '',
              source: `${environment.name}.${this.portalID}` || '',
              orgName: this.heirarchyObject.orgName || '',
              channel: this.heirarchyObject.channel || '',
              organisationType: this.heirarchyObject.sbOrgType || '',
              organisationSubType: this.heirarchyObject.sbOrgSubType || '',
              mapId: this.heirarchyObject.mapId || '',
              sbRootOrgId: this.heirarchyObject.sbRootOrgId,
              sbOrgId: this.heirarchyObject.sbOrgId,
              registrationLink: window.location.href
            };
          }

          this.signupSvc.register(req).subscribe(
            (_res: any) => {
              this.openDialog();
              this.disableBtn = false;
              this.isMobileVerified = true;
              
            },
            (err: any) => {
              this.disableBtn = false;
              this.loggerSvc.error('Error in registering new user >', err);
              if (err.error && err.error.params && err.error.params.errmsg) {
                this.openSnackbar(err.error.params.errmsg);
              } else {
                this.openSnackbar(
                  this.translateLabels('somethingWentWrong', 'common')
                );
              }
            }
          );
      //   },
      //   (error) => {
      //     this.disableBtn = false;
      //     // tslint:disable-next-line: no-console
      //     console.error('captcha validation error', error);
      //     this.openSnackbar(`reCAPTCHA validation failed: ${error}`);
      //   }
      // );
  }

  private openSnackbar(primaryMsg: string, duration: number = 5000) {
    this.snackBar.open(primaryMsg, 'X', {
      duration,
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SignupSuccessDialogueComponent, {
      // height: '400px',
      width: '500px',
      // data: { content, userId: this.userId, userRating: this.userRating },
    });
    dialogRef.afterClosed().subscribe((_result: any) => {});
  }

  termsAndConditionClick() {
    const dialogRef = this.dialog.open(TermsAndConditionComponent, {
      maxHeight: 'auto',
      height: '90%',
      width: '90%',
      minHeight: 'auto',
    });
    dialogRef.afterClosed().subscribe((_result: any) => {
      if (_result) {
        this.confirmTerms = _result;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscriptionContact) {
      this.subscriptionContact.unsubscribe();
    }
    if (this.recaptchaSubscription) {
      this.recaptchaSubscription.unsubscribe();
    }

    if (isPlatformBrowser(this._platformId)) {
      this._document.body.classList.remove('cs-recaptcha');
    }
    if (this.userdataSubscription) {
      this.userdataSubscription.unsubscribe();
    }
  }

  navigateTo(param?: any) {
    const formData = this.registrationForm.value;
    const url = '/public/request';
    // tslint:disable-next-line: max-line-length
    this.router.navigate([url], {
      queryParams: { type: param },
      state: {
        userform: formData,
        isMobileVerified: this.isMobileVerified,
        isEmailVerified: this.isEmailVerified,
      },
    });
  }

  numericOnly(event: any): boolean {
    const pattren = /^([0-9])$/;
    const result = pattren.test(event.key);
    return result;
  }

  selectLanguage(event: any) {
    this.selectedLanguage = event;
    localStorage.setItem('websiteLanguage', this.selectedLanguage);
    this.langtranslations.updatelanguageSelected(
      true,
      this.selectedLanguage,
      ''
    );
  }

  translateLabels(label: string, type: any) {
    return this.langtranslations.translateActualLabel(label, type, '');
  }

  getZohoForm() {
    const dialogRef = this.dialog.open(ZohoDialogComponent, {
      width: '45%',
      data: {
        view: 'zohoform',
        value: this.zohoHtml,
      },
    });
    dialogRef.afterClosed().subscribe(() => {});
    setTimeout(() => {
      this.callXMLRequest();
    }, 0);
  }

  callXMLRequest() {
    let webFormxhr: any = {};
    webFormxhr = new XMLHttpRequest();
    // tslint:disable-next-line: prefer-template
    webFormxhr.open(
      'GET',
      'https://desk.zoho.in/support/GenerateCaptcha?action=getNewCaptcha&_=' +
        new Date().getTime(),
      true
    );
    webFormxhr.onreadystatechange = () => {
      if (webFormxhr.readyState === 4 && webFormxhr.status === 200) {
        try {
          const response =
            webFormxhr.responseText != null
              ? JSON.parse(webFormxhr.responseText)
              : '';
          const zsCaptchaUrl: any = document.getElementById('zsCaptchaUrl');
          if (zsCaptchaUrl) {
            zsCaptchaUrl.src = response.captchaUrl;
            zsCaptchaUrl.style.display = 'block';
          }
          const xJdfEaS: any = document.getElementsByName('xJdfEaS')[0];
          xJdfEaS.value = response.captchaDigest;
          const zsCaptchaLoading: any =
            document.getElementById('zsCaptchaLoading');
          zsCaptchaLoading.style.display = 'none';
          const zsCaptcha: any = document.getElementById('zsCaptcha');
          zsCaptcha.style.display = 'block';
          const refreshCaptcha: any = document.getElementById('refreshCaptcha');
          if (refreshCaptcha) {
            refreshCaptcha.addEventListener('click', () => {
              this.callXMLRequest();
            });
          }
        } catch (e) {}
      }
    };
    webFormxhr.send();
  }

  getOrganization() {
    const params = {
      request: {
        filters: {
          identifier: [this.organizationDetails?.id],
        },
      },
    };
    this.signupSvc.searchOrgsByIdentifier(params).subscribe({
      next: (response: any) => {
        if (response.result && response.result.response) {
          const organization = response.result.response.find(
            (org: any) => org.orgName === this.organizationDetails!.orgName
          );
          if (organization) {
            this.heirarchyObject = organization;
          }
        }
      },
    });
  }

  hideMobileTopHeader() {
    this.mobileTopHeaderVisibilityStatus = false
    this.mobileAppsService.mobileTopHeaderVisibilityStatus.next(this.mobileTopHeaderVisibilityStatus)
  }

  
  downloadApp(): void {
    const userAgent = navigator.userAgent
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      window.open('https://play.google.com/store/apps/details?id=com.igot.karmayogibharat&hl=en&gl=US', '_blank')
    }

    if (/android/i.test(userAgent)) {
        window.open('https://play.google.com/store/apps/details?id=com.igot.karmayogibharat&hl=en&gl=US', '_blank')
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent)) {
        window.open('https://apps.apple.com/in/app/igot-karmayogi/id6443949491', '_blank')
    }
  }

  raiseSignupInteractTelementry() {
      this.eventService.raiseInteractTelemetry(
        {
          type: WsEvents.EnumInteractTypes.CLICK,
          id: 'sign-up',
          pageid: "/crp" 
        },
        {},
      )
  }

  raiseImpressionTelemetry() {
    this.telemetrySvc.impression(
      { 
        type: "view",
        pageid: "/crp",
        uri: this.router.url,
      },{
        module: "Self Registration",
      }
    )
  }

}
