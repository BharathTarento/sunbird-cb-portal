import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  PipeFilterModule,
  PipeHtmlTagRemovalModule,
  PipeOrderByModule,
  PipeRelativeTimeModule,
  PipeListFilterModule,
  PipeFilterV2Module,
} from '@sunbird-cb/utils'
import { MatGridListModule } from '@angular/material/grid-list'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { WidgetResolverModule } from '@sunbird-cb/resolver'
import { AvatarPhotoModule, BtnPageBackModule, CardContentModule } from '@sunbird-cb/collection'
import {
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatDialogModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatMenuModule,
  MatOptionModule,
  MatRippleModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatDividerModule,

} from '@angular/material'
import { LoaderService } from '@ws/author/src/lib/services/loader.service'
import { BrowseByCompetencyRoutingModule } from './browse-by-competency-routing.module'
import { AllCompetenciesComponent } from './routes/all-competencies/all-competencies.component'
import { CompetencyDetailsComponent } from './routes/competency-details/competency-details.component'
import { CompetencyFiltersComponent } from './components/competency-filters/competency-filters.component'
import { CompetencyCardComponent } from './components/competency-card/competency-card.component'
import { PopularCompetencyCardComponent } from './components/popular-competency-card/popular-competency-card.component'
import { LocalDataService } from './services/localService'
import { CardContentV2Module } from '@sunbird-cb/collection/src/lib/card-content-v2/card-content-v2.module'
import { TranslateModule } from '@ngx-translate/core'
import { AllCompetenciesV2Component } from './routes/all-competencies-v2/all-competencies-v2.component'
import { SkeletonLoaderModule } from '@sunbird-cb/collection/src/lib/_common/skeleton-loader/skeleton-loader.module'
import { AllCompetenciesSearchComponent } from './routes/all-competencies-search/all-competencies-search.component'

@NgModule({
  declarations: [
    AllCompetenciesComponent,
    CompetencyDetailsComponent,
    CompetencyFiltersComponent,
    CompetencyCardComponent,
    PopularCompetencyCardComponent,
    AllCompetenciesV2Component,
    AllCompetenciesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowseByCompetencyRoutingModule,
    MatGridListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatMenuModule,
    MatOptionModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    PipeFilterModule,
    PipeHtmlTagRemovalModule,
    PipeRelativeTimeModule,
    PipeFilterV2Module,
    AvatarPhotoModule,
    PipeOrderByModule,
    PipeListFilterModule,
    BtnPageBackModule,
    WidgetResolverModule,
    CardContentModule,
    CardContentV2Module,
    TranslateModule,
    SkeletonLoaderModule,
  ],
  exports: [CompetencyFiltersComponent],
  providers: [
    LoaderService,
    LocalDataService,
  ],
})
export class BrowseByCompetencyModule { }
