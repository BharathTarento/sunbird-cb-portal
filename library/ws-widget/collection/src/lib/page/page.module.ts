import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WidgetResolverModule } from '@sunbird-cb/resolver'
import { BtnPageBackModule } from '../btn-page-back/btn-page-back.module'
import { TourModule } from '../_common/tour-guide/tour-guide.module'
import { PageComponent } from './page.component'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
// import { BtnFeatureModule } from '../btn-feature/btn-feature.module'

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    RouterModule,
    WidgetResolverModule,
    BtnPageBackModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    TourModule,
    // BtnFeatureModule,
  ],
  exports: [PageComponent],
  entryComponents: [PageComponent],
})
export class PageModule { }
