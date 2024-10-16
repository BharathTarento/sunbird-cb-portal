import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MicrosotesComponent } from './microsotes.component'
import { ContentStripWithTabsModule, SlidersModule } from '@sunbird-cb/collection/src/public-api'
import { CardsModule, CommonMethodsService, CompetencyPassbookModule, ContentStripWithTabsLibModule, DataPointsModule, SlidersLibModule } from '@sunbird-cb/consumption'
import { MicrositeService } from './microsites.service'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
@NgModule({
  declarations: [MicrosotesComponent],
  imports: [
    CommonModule,
    MatIconModule,
    SlidersModule,
    ContentStripWithTabsModule,
    ContentStripWithTabsLibModule,
    DataPointsModule,
    SlidersLibModule,
    CompetencyPassbookModule,
    MatFormFieldModule,
    MatInputModule,
    CardsModule,
  ],
  providers: [MicrositeService, CommonMethodsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MicrositesModule { }
