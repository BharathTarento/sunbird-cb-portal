import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicrosotesComponent } from './microsotes.component';
import { MatIconModule } from '@angular/material';
import { ContentStripWithTabsModule, SlidersModule } from '@sunbird-cb/collection/src/public-api';
import { MicrositesCompetenciesComponent } from './microsites-competencies/microsites-competencies.component';
import { DataPointsComponent } from './data-points/data-points.component';




@NgModule({
  declarations: [MicrosotesComponent, MicrositesCompetenciesComponent, DataPointsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    SlidersModule,
    ContentStripWithTabsModule,
  ]
})
export class MicrositesModule { }
