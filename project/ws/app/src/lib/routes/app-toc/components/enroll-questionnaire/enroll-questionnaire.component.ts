import { Component, OnInit, Inject } from '@angular/core'
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UserProfileService } from '../../../user-profile/services/user-profile.service'
import { takeUntil } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
import { Subject } from 'rxjs'
import { NsUserProfileDetails } from '../../../user-profile/models/NsUserProfile'
import { ConfigurationsService } from '@sunbird-cb/utils-v2'
import { ProfileV2Service } from '../../../profile-v2/services/profile-v2.servive'

// const MOBILE_PATTERN = /^[0]?[6789]\d{9}$/
const PIN_CODE_PATTERN = /^[1-9][0-9]{5}$/
const EMP_ID_PATTERN = /^[a-z0-9]+$/i

@Component({
  selector: 'ws-app-enroll-questionnaire',
  templateUrl: './enroll-questionnaire.component.html',
  styleUrls: ['./enroll-questionnaire.component.scss'],
})
export class EnrollQuestionnaireComponent implements OnInit {
  public afterSubmitAction = this.checkAfterSubmit.bind(this)
  isReadOnly = false
  batchDetails: any
  customForm: boolean = true
  userDetailsForm: FormGroup
  groupData: any | undefined
  private destroySubject$ = new Subject()
  designationsMeta: any
  eUserGender = Object.keys(NsUserProfileDetails.EUserGender)
  currentDate = new Date()
  masterLanguages: any[] | undefined
  masterLanguageBackup: any[] | undefined
  eCategory = Object.keys(NsUserProfileDetails.ECategory)
  userProfileObject: any
  eligible: boolean = false
  isCadreStatus = false
  showBatchForNoCadre = true
  civilServiceData: any
  civilServiceTypes: any
  serviceName: any
  serviceType: any
  serviceListData: any
  serviceId: any
  errorMessage: any
  selectedServiceName: any
  selectedService: any
  civilServiceName: any
  civilServiceId: any
  cadreId: any
  cadre: any
  cadreControllingAuthority: any
  startBatch: any
  endBatch: any
  yearArray: any
  exclusionYear: any
  selectedCadreName: any
  selectedCadre: any

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EnrollQuestionnaireComponent>,
    private userProfileService: UserProfileService,
    private configSrc: ConfigurationsService,
    private profileV2Svc: ProfileV2Service,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { console.log("data ", data)
    console.log("configSrc ", this.configSrc)
    this.batchDetails = this.data.batchData
    if (this.data.batchData.batchAttributes.userProfileFileds && 
      this.data.batchData.batchAttributes.userProfileFileds === "Custom section" || 
      this.data.batchData.batchAttributes.userProfileFileds === "All fields") {
      this.customForm = true
    }
    //this.customForm = this.batchDetails.batchAttributes.bpEnrolMandatoryProfileFields ? true : false
    
    this.userDetailsForm = new FormGroup({
      group: new FormControl(''),
      designation: new FormControl(''),
      employeeCode: new FormControl('', [Validators.pattern(EMP_ID_PATTERN)]),
      // primaryEmail: new FormControl('', ),
      // mobile: new FormControl('', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(MOBILE_PATTERN)]),
      gender: new FormControl('', []),
      dob: new FormControl('', []),
      domicileMedium: new FormControl('', []),
      category: new FormControl('', []),
      pincode: new FormControl('', [Validators.minLength(6), Validators.maxLength(6), Validators.pattern(PIN_CODE_PATTERN)]),
      isCadre: new FormControl(false, []),
      typeOfCivilService: new FormControl(''),
      serviceType: new FormControl(''),
      cadre: new FormControl(''),
      batch: new FormControl(''),
      cadreControllingAuthority: new FormControl(''),
    })
  }

  public checkAfterSubmit(_e: any) {
    // this.renderSubject.next()
    // tslint:disable-next-line:no-console
    console.log('Form is submitted successfully')
    this.openSnackbar('Form is submitted successfully')
    this.dialogRef.close(true)
  }

  private openSnackbar(primaryMsg: string, duration: number = 5000) {
    this.snackBar.open(primaryMsg, 'X', {
      duration,
    })
  }

  ngOnInit() {
    this.getUserDetails()
    this.getGroupData()
    this.loadDesignations()
    this.getMasterLanguage()
    this.fetchCadreData()
    
  }

  fetchCadreData(){
    this.profileV2Svc.fetchCadre().subscribe((response: any) => {
      this.civilServiceData = response.result.response.value.civilServiceType
      this.civilServiceTypes = this.civilServiceData.civilServiceTypeList.map((service: any) => service.name)
    })
  }

  getIsCadreStatus(value:boolean) {
    this.isCadreStatus = value    
    if(value) {
      this.userDetailsForm.patchValue({
        typeOfCivilService: '',
        serviceType: '',
        cadre: '',
        batch: '',
        cadreControllingAuthority: '',
      });       
    }
    else {
    this.showBatchForNoCadre = false
    }
  }

  getService(event: any) {
    const serviceTypeControl = this.userDetailsForm.get('serviceType')
    const cadreControl = this.userDetailsForm.get('cadre')
    const batchControl = this.userDetailsForm.get('batch')
    const cadreControllingAuthorityControl = this.userDetailsForm.get('cadreControllingAuthority')

    if (serviceTypeControl) { serviceTypeControl.reset() }
    if (cadreControl) { cadreControl.reset() }
    if (batchControl) { batchControl.reset() }
    if (cadreControllingAuthorityControl) { cadreControllingAuthorityControl.reset() }

    this.serviceType = this.civilServiceData.civilServiceTypeList.find((element: any) => element.name === event)
    this.serviceType = this.civilServiceData.civilServiceTypeList.find((element: any) => element.name === event)
    if (this.serviceType) {
      this.serviceListData = this.serviceType.serviceList
      this.serviceName = this.serviceListData.map((service: any) => service.name)
      this.serviceId = this.serviceType.id
      this.errorMessage = ''
    } else {
      this.errorMessage = 'Service Type not found'
    }
  }

  onServiceSelect(event: any) {
    const cadreControl = this.userDetailsForm.get('cadre')
    const batchControl = this.userDetailsForm.get('batch')
    const cadreControllingAuthorityControl = this.userDetailsForm.get('cadreControllingAuthority')
    if (cadreControl) { cadreControl.reset() }
    if (batchControl) { batchControl.reset() }
    if (cadreControllingAuthorityControl) { cadreControllingAuthorityControl.reset() }
    this.selectedServiceName = event.value
    if (this.serviceListData) {
      this.selectedService = this.serviceListData.find((service: any) => service.name === this.selectedServiceName)
      this.civilServiceName =  this.selectedService.name
      this.civilServiceId = this.selectedService.id
      this.cadre = this.selectedService.cadreList.map((cadre: any) => cadre.name)
    }
    if (this.selectedService && this.selectedService.cadreControllingAuthority) {
      this.cadreControllingAuthority = this.selectedService.cadreControllingAuthority
    } else {
      this.cadreControllingAuthority = 'NA'
    }
    if (this.selectedService && this.selectedService.cadreList && this.selectedService.cadreList.length === 0) {
      this.showBatchForNoCadre = true
      this.startBatch = this.selectedService.commonBatchStartYear
      this.endBatch = this.selectedService.commonBatchEndYear
      this.exclusionYear = this.selectedService.commonBatchExclusionYearList
    // tslint:disable
    this.yearArray = Array.from({ length: this.endBatch - this.startBatch + 1 }, (_, index) => this.startBatch + index)
        .filter(year => !this.exclusionYear.includes(year))
    } else {
      this.showBatchForNoCadre = false
    }
  }

  onCadreSelect(event: any) {
    const batchControl = this.userDetailsForm.get('batch')
    const cadreControllingAuthorityControl = this.userDetailsForm.get('cadreControllingAuthority')

    if (batchControl) { batchControl.reset() }
    if (cadreControllingAuthorityControl) { cadreControllingAuthorityControl.reset() }
    this.selectedCadreName = event
    if(this.selectedService) {
      this.selectedCadre = this.selectedService.cadreList.find((cadre: any) => cadre.name === this.selectedCadreName)
      this.startBatch = this.selectedService.cadreList.find((cadre: any) => cadre.name === this.selectedCadreName).startBatchYear
      this.endBatch = this.selectedService.cadreList.find((cadre: any) => cadre.name === this.selectedCadreName).endBatchYear
      this.exclusionYear = this.selectedCadre.exculsionYearList
      // tslint:disable
      this.yearArray = Array.from({ length: this.endBatch - this.startBatch + 1 }, (_, index) => this.startBatch + index)
          .filter(year => !this.exclusionYear.includes(year))
      this.cadreId = this.selectedCadre.id
    }
  
  }

  getUserDetails(){
    this.profileV2Svc.fetchProfile(this.configSrc.unMappedUser.identifier).subscribe((resp: any) => {
      if (resp && resp.result && resp.result.response) {
        this.userProfileObject = resp.result.response
        console.log(" userProfileObject ", this.userProfileObject)
        if (this.userProfileObject.profileDetails.profileGroupStatus === "NOT-VERIFIED" || this.userProfileObject.profileDetails.profileDesignationStatus === "NOT-VERIFIED") {
          this.eligible = false
        } else {
          this.eligible = true
        }
      }      
    })
  }

  getGroupData(): void {
    this.userProfileService.getGroups()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((res: any) => {
        this.groupData = res.result && res.result.response.filter((ele: any) => ele !== 'Others')
      },         (error: HttpErrorResponse) => {
        if (!error.ok) {
          this.snackBar.open(this.handleTranslateTo('groupDataFaile'))
        }
      })
  }

  handleTranslateTo(menuName: string): string {
    return this.userProfileService.handleTranslateTo(menuName)
  }

  loadDesignations() {
    this.userProfileService.getDesignations({}).subscribe(
      (data: any) => {
        this.designationsMeta = data.responseData
      },
      (_err: any) => {
      })
  }

  getMasterLanguage(): void {
    this.userProfileService.getMasterLanguages()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((res: any) => {
        this.masterLanguages = res.languages
        this.masterLanguageBackup = res.languages
      },         (error: HttpErrorResponse) => {
        if (!error.ok) {
          this.snackBar.open(this.handleTranslateTo('unableFetchMasterLanguageData'))
        }
      })
  }

}
