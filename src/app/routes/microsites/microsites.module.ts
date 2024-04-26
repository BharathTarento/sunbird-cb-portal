import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MicrosotesComponent } from './microsotes.component'
import { MatIconModule } from '@angular/material'
import { ContentStripWithTabsModule, SlidersModule } from '@sunbird-cb/collection/src/public-api'

@NgModule({
  declarations: [MicrosotesComponent],
  imports: [
    CommonModule,
    MatIconModule,
    SlidersModule,
    ContentStripWithTabsModule,
  ],
})
export class MicrositesModule { }
