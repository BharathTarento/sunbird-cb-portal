import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscussV2RoutingModule } from './discuss-v2-routing.module';
import { DiscussV2HomeComponent } from './routes/discuss-v2-home/discuss-v2-home.component';
import { WidgetDiscussionv2Module } from '@sunbird-cb/discussion-v2';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    DiscussV2HomeComponent
  ],
  imports: [
    CommonModule,
    DiscussV2RoutingModule,
    WidgetDiscussionv2Module,
    CKEditorModule
  ]
})
export class DiscussV2Module { }
