import { AccessControlService } from '@ws/author'
import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { ActivatedRoute, Data } from '@angular/router'
import { NsContent } from '@sunbird-cb/collection'
import { ConfigurationsService } from '@sunbird-cb/utils'
import { Observable, Subscription } from 'rxjs'
import { share } from 'rxjs/operators'
import { NsAppToc } from '../../models/app-toc.model'
import { AppTocService } from '../../services/app-toc.service'
import { CreateBatchDialogComponent } from '../create-batch-dialog/create-batch-dialog.component'
import { TitleTagService } from '@ws/app/src/lib/routes/app-toc/services/title-tag.service'
import { MatDialog } from '@angular/material'
import { MobileAppsService } from 'src/app/services/mobile-apps.service'
import { IdiscussionConfig } from '@project-sunbird/discussions-ui-v8'

@Component({
  selector: 'ws-app-app-toc-single-page',
  templateUrl: './app-toc-single-page.component.html',
  styleUrls: ['./app-toc-single-page.component.scss'],
})
export class AppTocSinglePageComponent implements OnInit, OnDestroy {
  contentTypes = NsContent.EContentTypes
  showMoreGlance = false
  askAuthorEnabled = true
  trainingLHubEnabled = false
  trainingLHubCount$?: Observable<number>
  body: SafeHtml | null = null
  viewMoreRelatedTopics = false
  hasTocStructure = false
  tocStructure: NsAppToc.ITocStructure | null = null
  contentParents: { [key: string]: NsAppToc.IContentParentResponse[] } = {}
  objKeys = Object.keys
  fragment!: string
  activeFragment = this.route.fragment.pipe(share())
  content: NsContent.IContent | null = null
  routeSubscription: Subscription | null = null
  @Input() forPreview = false
  tocConfig: any = null
  loggedInUserId!: any
  private routeQuerySubscription: Subscription | null = null
  batchId!: string
  isNotEditor = true
  discussionConfig!: IdiscussionConfig = {}
  batchData: any
  batchDataLoaded: boolean
  // configSvc: any

  constructor(
    private route: ActivatedRoute,
    private tocSharedSvc: AppTocService,
    private domSanitizer: DomSanitizer,
    private authAccessControlSvc: AccessControlService,
    // private dialog: MatDialog,
    private titleTagService: TitleTagService,
    public createBatchDialog: MatDialog,
    private mobileAppsSvc: MobileAppsService,
    public configSvc: ConfigurationsService,
  ) {
    if (this.configSvc.restrictedFeatures) {
      this.askAuthorEnabled = !this.configSvc.restrictedFeatures.has('askAuthor')
      this.trainingLHubEnabled = !this.configSvc.restrictedFeatures.has('trainingLHub')
    }
    // if (this.route && this.route.parent) {
    //   this.configSvc = this.route.parent.snapshot.data.profileData
    // }
    // this.route.data.subscribe(data => {
    //   this.askAuthorEnabled = !data.restrictedData.data.has('askAuthor')
    //   this.trainingLHubEnabled = !data.restrictedData.data.has('trainingLHub')
    // })
  }

  ngOnInit() {
    if (!this.forPreview) {
      this.forPreview = window.location.href.includes('/author/')
    }

    if (this.route && this.route.parent) {
      this.routeSubscription = this.route.parent.data.subscribe((data: Data) => {
        this.routeQuerySubscription = this.route.queryParamMap.subscribe(qParamsMap => {
          const batchId = qParamsMap.get('batchId')
          if (batchId) { 
            this.discussionConfig.contextId = [batchId]
            this.discussionConfig.contextType = 'batch'
            this.batchId = batchId
          }
        })
        this.tocSharedSvc.setBatchDataSubject.subscribe(data => {
          this.discussionConfig = {
            // menuOptions: [{ route: 'categories', enable: true }],
            userName: 'nptest',
            categories: { result: [] },
          }

          this.batchData = data.content
          if (this.batchData) {
            const batchIdArr: any[] = []
            this.batchData.forEach((element: { identifier: any }) => {
              batchIdArr.push(element.identifier)
            })
            this.discussionConfig.contextIdArr = batchIdArr
            this.discussionConfig.contextType = 'batch'
            this.batchDataLoaded = true
          }
        })
        this.initData(data)
        this.tocConfig = data.pageData.data
      })
    }
    if (this.configSvc && this.configSvc.userProfile && this.configSvc.userProfile.userId) {
      this.loggedInUserId = this.configSvc.userProfile.userId
    }
    // check if the user has role editor,
    if (this.configSvc && this.configSvc.userRoles &&
      this.configSvc.userRoles.has('editor')
    ) {
      // if editor, create batch button will be shown
      this.isNotEditor = false
    }

    // this.routeQuerySubscription = this.route.queryParamMap.subscribe(qParamsMap => {
    //   const batchId = qParamsMap.get('batchId')
    //   if (batchId) {
    //     this.batchId = batchId
    //   }
    // })
  }

  detailUrl(data: any) {
    // let locationOrigin = environment.sitePath ? `https://${environment.sitePath}` : location.origin
    let locationOrigin = location.origin
    if (this.configSvc.activeLocale && this.configSvc.activeLocale.path) {
      locationOrigin += `/${this.configSvc.activeLocale.path}`
    }
    switch (data.contentType) {
      case NsContent.EContentTypes.CHANNEL:
        return `${locationOrigin}${data.artifactUrl}`
      case NsContent.EContentTypes.KNOWLEDGE_BOARD:
        return `${locationOrigin}/app/knowledge-board/${data.identifier}`
      case NsContent.EContentTypes.KNOWLEDGE_ARTIFACT:

        return `${locationOrigin}/app/toc/${data.identifier}/overview?primaryCategory=${data.primaryCategory}`
      default:
        return `${locationOrigin}/app/toc/${data.identifier}/overview?primaryCategory=${data.primaryCategory}`
    }
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
    if (this.routeQuerySubscription) {
      this.routeQuerySubscription.unsubscribe()
    }
  }

  get showSubtitleOnBanner() {
    return this.tocSharedSvc.subtitleOnBanners
  }
  get showDescription() {
    if (this.content && !this.content.body) {
      return true
    }
    return this.tocSharedSvc.showDescription
  }

  get isResource() {
    if (this.content) {
      const isResource = this.content.contentType === NsContent.EContentTypes.KNOWLEDGE_ARTIFACT ||
        this.content.contentType === NsContent.EContentTypes.RESOURCE || !this.content.children.length
      if (isResource) {
        this.mobileAppsSvc.sendViewerData(this.content)
      }
      return isResource
    }
    return false
  }

  setSocialMediaMetaTags(data: any) {
    this.titleTagService.setSocialMediaTags(
      this.detailUrl(data),
      data.name,
      data.description,
      data.appIcon)
  }

  private initData(data: Data) {
    const initData = this.tocSharedSvc.initData(data)
    this.content = initData.content
    // if (!this.batchId || !this.batchData) {
    //   this.discussionConfig.contextIdArr = [this.content.identifier]
    //   this.discussionConfig.contextType = 'course'
    // }
    this.setSocialMediaMetaTags(this.content)
    this.body = this.domSanitizer.bypassSecurityTrustHtml(
      this.content && this.content.body
        ? this.forPreview
          ? this.authAccessControlSvc.proxyToAuthoringUrl(this.content.body)
          : this.content.body
        : '',
    )
    this.contentParents = {}
    this.resetAndFetchTocStructure()
    this.getTrainingCount()
    this.getContentParent()
  }

  getContentParent() {
    if (this.content) {
      const contentParentReq: NsAppToc.IContentParentReq = {
        fields: ['contentType', 'name'],
      }
      this.tocSharedSvc
        .fetchContentParent(this.content.identifier, contentParentReq, this.forPreview)
        .subscribe(
          res => {
            this.parseContentParent(res)
          },
          _err => {
            this.contentParents = {}
          },
        )
    }
  }

  public getCompetencies(competencies: any) {
    const competenciesArray = JSON.parse(competencies)
    const competencyStringArray: any[] = []
    competenciesArray.map((c: any) => {
      // if (i < (competenciesArray.length -1)) {
      //   competencyString.push(`${c.name}, `)
      // } else {
      //   competencyString.push(c.name)
      // }
      competencyStringArray.push(c.name)
    })
    return competencyStringArray
  }

  parseContentParent(content: NsAppToc.IContentParentResponse) {
    content.collections.forEach(collection => {
      if (!this.contentParents.hasOwnProperty(collection.contentType)) {
        this.contentParents[collection.contentType] = []
      }
      this.contentParents[collection.contentType].push(collection)
      this.parseContentParent(collection)
    })
  }

  resetAndFetchTocStructure() {
    this.tocStructure = {
      assessment: 0,
      course: 0,
      handsOn: 0,
      interactiveVideo: 0,
      learningModule: 0,
      other: 0,
      pdf: 0,
      podcast: 0,
      quiz: 0,
      video: 0,
      webModule: 0,
      webPage: 0,
      youtube: 0,
    }
    if (this.content) {
      this.hasTocStructure = false
      this.tocStructure.learningModule = this.content.contentType === 'Collection' ? -1 : 0
      this.tocStructure.course = this.content.contentType === 'Course' ? -1 : 0
      this.tocStructure = this.tocSharedSvc.getTocStructure(this.content, this.tocStructure)
      for (const progType in this.tocStructure) {
        if (this.tocStructure[progType] > 0) {
          this.hasTocStructure = true
          break
        }
      }
    }
  }

  // For Learning Hub trainings
  private getTrainingCount() {
    if (
      this.trainingLHubEnabled &&
      this.content &&
      // this.trainingSvc.isValidTrainingContent(this.content) &&
      !this.forPreview
    ) {
      // this.trainingLHubCount$ = this.trainingApi
      //   .getTrainingCount(this.content.identifier)
      //   .pipe(retry(2))
    }
  }

  // openQueryMailDialog(content: any, data: any) {
  //   const emailArray = []
  //   emailArray.push(data.email)
  //   const dialogdata = {
  //     content,
  //     user: data,
  //     emails: emailArray,
  //   }
  //   dialogdata.user.isAuthor = true
  //   this.dialog.open<BtnMailUserDialogComponent, IBtnMailUser>(
  //     BtnMailUserDialogComponent,
  //     {
  //       // width: '50vw',
  //       minWidth: '40vw',
  //       maxWidth: '80vw',
  //       data: dialogdata,
  //     }
  //   )
  // }

  openDialog(content: any): void {
    const dialogRef = this.createBatchDialog.open(CreateBatchDialogComponent, {
      // height: '400px',
      width: '600px',
      data: { content },
    })
    // dialogRef.componentInstance.xyz = this.configSvc
    dialogRef.afterClosed().subscribe((_result: any) => {
      if (!this.batchId) {
        this.tocSharedSvc.updateBatchData()
      }
    })
  }

  public parseJsonData(s: string) {
    try {
      const parsedString = JSON.parse(s)
      return parsedString
    } catch {
      return []
    }
  }
}
