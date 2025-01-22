import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DiscussV2RoutingModule } from './discuss-v2-routing.module';
import { DiscussV2HomeComponent } from './routes/discuss-v2-home/discuss-v2-home.component';
import { WidgetDiscussionv2Module,WidgetCommunityHomeModule,WidgetDiscussionv2HomeModule,TrendingDiscussionsModule,ShortcutsModule, WidgetPostdetailsModule } from '@sunbird-cb/discussion-v2';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PostDetailsComponent } from './routes/post-details/post-details.component';
import { CommunityDetailsHomeComponent } from './routes/community-details-home/community-details-home.component';


@NgModule({
  declarations: [
    DiscussV2HomeComponent,
    PostDetailsComponent,
    CommunityDetailsHomeComponent
  ],
  imports: [
    CommonModule,
    DiscussV2RoutingModule,
    WidgetDiscussionv2Module,
    WidgetPostdetailsModule,
    CKEditorModule,
    WidgetDiscussionv2HomeModule,
    MatIconModule,
    ShortcutsModule,
    TrendingDiscussionsModule,
    WidgetCommunityHomeModule

  ]
})
export class DiscussV2Module { }
