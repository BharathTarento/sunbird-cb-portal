import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WidgetResolverModule } from '@sunbird-cb/resolver'
import { AvatarPhotoComponent } from './avatar-photo.component'
import { PipeCertificateImageURLModule } from '@sunbird-cb/utils-v2'
import { MatButtonModule } from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'

@NgModule({
  declarations: [AvatarPhotoComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatRippleModule,
    WidgetResolverModule,
    PipeCertificateImageURLModule,
],
  exports: [AvatarPhotoComponent],
  entryComponents: [AvatarPhotoComponent],
})
export class AvatarPhotoModule { }
