import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import {
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatSnackBarModule,
} from '@angular/material'

import {
  BtnContentDownloadModule,
  BtnContentFeedbackModule,
  BtnContentLikeModule,
  BtnContentShareModule,
  BtnGoalsModule,
  BtnPlaylistModule,
  DisplayContentTypeModule,
  UserImageModule,
  UserContentRatingModule,
  BtnContentFeedbackV2Module,
} from '@sunbird-cb/collection'

import {
  PipeDurationTransformModule,
  PipeLimitToModule,
  PipePartialContentModule,
} from '@sunbird-cb/utils-v2'

import { WidgetResolverModule } from '@sunbird-cb/resolver'

import { OfflineSessionModule as OfflineSessionContainerModule } from '../../route-view-container/offline-session/offline-session.module'
import { OfflineSessionComponent } from './offline-session.component'
import { RouterModule, Routes } from '@angular/router'
import { ViewerResolve } from '../../viewer.resolve'
import { TranslateModule } from '@ngx-translate/core'

const routes: Routes = [
  {
    path: '',
    component: OfflineSessionComponent,
    resolve: {
      content: ViewerResolve,
    },
  },
]

@NgModule({
  declarations: [OfflineSessionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule,
    BtnContentDownloadModule,
    BtnContentFeedbackModule,
    BtnContentLikeModule,
    BtnContentShareModule,
    BtnGoalsModule,
    BtnPlaylistModule,
    DisplayContentTypeModule,
    UserImageModule,
    PipeDurationTransformModule,
    PipeLimitToModule,
    PipePartialContentModule,
    WidgetResolverModule,
    UserContentRatingModule,
    BtnContentFeedbackV2Module,
    OfflineSessionContainerModule,
    TranslateModule.forChild(),
  ],
  providers: [ViewerResolve],
})
export class OfflineSessionModule { }
