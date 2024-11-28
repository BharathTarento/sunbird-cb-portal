import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { GyaanKarmayogiService } from '../../services/gyaan-karmayogi.service'
import { NsContent } from '@sunbird-cb/utils-v2'
import * as _ from 'lodash'
import { gyaanConstants } from '../../models/gyaan-contants.model'
import { TitleCasePipe } from '@angular/common'
import { FormControl } from '@angular/forms'

import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { GyaanFilterComponent } from '../gyaan-filter/gyaan-filter.component'
import { environment } from 'src/environments/environment'
@Component({
  selector: 'ws-app-gyaan-karmayogi-view-all',
  templateUrl: './gyaan-karmayogi-view-all.component.html',
  styleUrls: ['./gyaan-karmayogi-view-all.component.scss'],
})
export class GyaanKarmayogiViewAllComponent implements OnInit {
  sectorsList = []
  keyData: any
  filterDataLoading = false
  searchControl = new FormControl('')
  contentDataList: any = []
  seeAllPageConfig: any
  facetsData: any
  facetsDataCopy: any
  titles: any = []
  selectedFilter: any = {}
  sectorNames: any = []
  selectedSector: any = ''
  limit = 50
  page = 0
  totalPages!: number | 0
  totalCount = 0
  newQueryParam: any
  throttle = 100
  scrollDistance = 0.2
  selectedContent: any
  constructor(private bottomSheet: MatBottomSheet,
              private route: ActivatedRoute,
              private seeAllSvc: GyaanKarmayogiService,
              public titleCasePipe: TitleCasePipe) { }

  async ngOnInit() {
    this.route.queryParams.subscribe((res: any) => {
      this.keyData = (res.key) ? res.key : ''
      this.selectedContent = res.content || 'otherResources'
      this.selectedSector = res.sector ? res.sector : ''
      const breadCrumb = this.keyData ? this.titleCasePipe.transform(this.keyData) :
      this.titleCasePipe.transform(this.selectedSector)
      this.titles = [
        { title: 'Amrit Gyaan Kosh', url: '/app/amrit-gyaan-kosh/all', disableTranslate: true, icon: 'menu_book' },
        { title: breadCrumb, url: `none`, icon: '' },
      ]
  })
  this.getFacetsData()

    this.seeAllPageConfig = this.route.snapshot.data.pageData &&
    this.route.snapshot.data.pageData.data &&
    this.route.snapshot.data.pageData.data.stripConfig &&
    this.route.snapshot.data.pageData.data.stripConfig.strips &&
    this.route.snapshot.data.pageData.data.stripConfig.strips[0]
    this.contentDataList = this.transformSkeletonToWidgets(this.seeAllPageConfig)

  }
  // the below method is used to convert cards to skeleton loader
  private transformSkeletonToWidgets(
    strip: any
  ) {
    return gyaanConstants.emptyArray.map(_content => ({
      widgetType: 'card',
      widgetSubType: 'cardContent',
      widgetHostClass: 'mb-2',
      widgetData: {
        cardSubType: strip.viewMoreUrl &&  strip.viewMoreUrl.loaderConfig
        && strip.viewMoreUrl.loaderConfig.cardSubType || 'card-portrait-skeleton',
        cardCustomeClass: strip.customeClass ? strip.customeClass : 'card-resource-container-small',
      },
    }))
  }

  // the below method is used to convert contents to widgetcard data
  private transformContentsToWidgets(
        contents: NsContent.IContent[],
        strip: any,
      ) {
        return (contents || []).map((content, idx) => ({
          widgetType: 'card',
          widgetSubType: 'cardContent',
          widgetHostClass: 'mb-2',
          widgetData: {
            content,
            ...(content.batch && {
              batch: content.batch,
            }),
            cardSubType: strip.viewMoreUrl &&  strip.viewMoreUrl.stripConfig
            && strip.viewMoreUrl.stripConfig.cardSubType,
            context: {
              pageSection: strip.key,
              position: idx,
            },
            cardCustomeClass: strip.customeClass ? strip.customeClass : 'card-resource-container-small',
            intranetMode: strip.stripConfig && strip.stripConfig.intranetMode,
            deletedMode: strip.stripConfig && strip.stripConfig.deletedMode,
            contentTags: strip.stripConfig && strip.stripConfig.contentTags,
          },
        }))
      }

  // the below method is used to fetch data search api as promise
  async fetchFromSearchV6(strip: any, calculateParentStatus = true) {
    const factes = {
      'facets': [
        gyaanConstants.resourceCategory,
        gyaanConstants.subSectorName,
        gyaanConstants.sectorName,
        gyaanConstants.year,
    ],
    }
    // const addFilter = {
    //   gyaanConstants.resourceCategory: this.keyData,
    // }
    if (strip.request && strip.request.searchV6 && Object.keys(strip.request.searchV6).length) {
      if (strip.request &&
        strip.request.searchV6 &&
        strip.request.searchV6.request &&
        strip.request.searchV6.request.filters) {
          delete strip.request.searchV6.request.filters.createdFor
        strip.request.searchV6.request.filters = {
          ...strip.request.searchV6.request.filters,
          // ...addFilter,
          ...this.selectedFilter,
        }
        strip.request.searchV6.request = {
          ...strip.request.searchV6.request,
          ...factes,
        }
        if (this.selectedFilter[gyaanConstants.resourceCategory] &&
            this.selectedFilter[gyaanConstants.resourceCategory].toLowerCase() === 'case study' &&
          this.selectedContent !== 'otherResources'
        ) {
          strip.request.searchV6.request.filters.contentType = [
            'Resource',
            'Course',
          ]
        }  else {
          strip.request.searchV6.request.filters.contentType = [
            'Resource',
          ]
          delete strip.request.searchV6.request.filters.contextYear
        }
        strip.request.searchV6.request.query = this.searchControl && this.searchControl.value
        if (!(this.selectedFilter[gyaanConstants.sectorName] &&
          this.selectedFilter[gyaanConstants.sectorName].length)) {
          delete strip.request.searchV6.request.filters.sectorName
        }
        if (!(this.selectedFilter[gyaanConstants.subSectorName] &&
          this.selectedFilter[gyaanConstants.subSectorName].length)) {
          delete strip.request.searchV6.request.filters.subSectorName
        }
        if (!this.selectedFilter[gyaanConstants.resourceCategory]) {
          delete strip.request.searchV6.request.filters.resourceCategory
        }
        if (!(this.selectedFilter[gyaanConstants.sectorName] &&
          this.selectedFilter[gyaanConstants.sectorName].length) && this.selectedFilter[gyaanConstants.resourceCategory]) {
          strip.request.searchV6.request.filters = {
            ...strip.request.searchV6.request.filters,
            ...{ 'sectorName': this.sectorNames },
          }
        }
        strip.request.searchV6['request']['limit'] = this.limit
        strip.request.searchV6['request']['offset'] = 0
      }
      this.newQueryParam = strip.request
      try {
        const response = await this.searchV6Request(strip, strip.request, calculateParentStatus)
        if (response && response.results && response.results.result.content && response.results.result.content.length) {
          const filteRespose: any = []
          if (this.contentDataList.length && this.contentDataList[0].widgetData.content) {
            this.contentDataList =
            _.concat(this.contentDataList, this.transformContentsToWidgets(response.results.result.content, strip))
          } else {
            if (!this.selectedFilter.createdFor) {
              response.results.result.content.forEach((content: any) => {
                if (!content.createdFor.includes(environment.cbcOrg)) {
                  filteRespose.push(content)
                }
              })
              this.contentDataList = this.transformContentsToWidgets(filteRespose, strip)
              this.totalCount = filteRespose.length
              this.page = 0
              this.totalPages = Math.ceil(filteRespose.length / strip.request.searchV6.request.limit)
            } else {
              this.contentDataList = this.transformContentsToWidgets(response.results.result.content, strip)
              this.totalCount = response.results.result.count
              this.page = 0
              this.totalPages = Math.ceil(response.results.result.count / strip.request.searchV6.request.limit)
            }
          }
          this.totalCount = response.results.result.count
          this.page = 0
          this.totalPages = Math.ceil(response.results.result.count / strip.request.searchV6.request.limit)
        } else {
          this.contentDataList = []
        }
      } catch (error) {}

    }
  }

  async searchV6Request(strip: any,
                        request: any,
                        _calculateParentStatus: boolean
  ): Promise <any> {
    const originalFilters: any = []
    // console.log('calling -- ')
    return new Promise <any>((resolve, reject) => {
      if (request && request.searchV6) {
        this.seeAllSvc.searchV6(request.searchV6).subscribe(results => {
          const showViewMore = Boolean(
            results.result.content && results.result.content.length > 5 && strip.stripConfig && strip.stripConfig.postCardForSearch,
          )
          const viewMoreUrl = showViewMore ?
            {
              path: strip.viewMoreUrl && strip.viewMoreUrl.path || '',
              queryParams: {
                tab: 'Learn',
                q: strip.viewMoreUrl && strip.viewMoreUrl.queryParams,
                f: request &&
                  request.searchV6 &&
                  request.searchV6.request &&
                  request.searchV6.request.filters ?
                  JSON.stringify(
                    this.transformSearchV6FiltersV2(
                      originalFilters,
                    )
                  ) :
                  {},
              },
            } :
            null
          resolve({
            results,
            viewMoreUrl,
          })
        },                                                  (error: any) => {
          reject(error)
        })
      }
    })
  }
  // search request filter form
  private transformSearchV6FiltersV2(v6filters: any) {
    const filters: any = {}
    if (v6filters.constructor === Array) {
      v6filters.forEach(((f: any) => {
        Object.keys(f).forEach(key => {
          filters[key] = f[key]
        })
      }))
      return filters
    }
    return v6filters
  }

  // the bellow method is used to get initial facet data to filters
  async getFacetsData() {
    this.filterDataLoading = true
    const request = this.route.snapshot.data.pageData &&
    this.route.snapshot.data.pageData.data &&
    this.route.snapshot.data.pageData.data.facetReqData &&
    this.route.snapshot.data.pageData.data.facetReqData
    this.seeAllSvc.searchV6(request).subscribe((response: any) => {
      if (response &&  response.result &&
         response.result.facets) {
          const localFacetData: any = {
            contentType: {
              name: gyaanConstants.contentType,
              displayName: gyaanConstants.contentLabel,
              label: gyaanConstants.contentLabel,
              placeHolder: gyaanConstants.contentLabel,
              values: [
                {
                  name: 'agkCaseStudies',
                  key: 'gyaanKarmayogi.agkCaseStudies',
                  count: 1,
                },
                {
                  name: 'otherResources',
                  key: 'gyaanKarmayogi.otherResources',
                  count: 1,
                },
              ],
            },
            sectorName: {
              name: gyaanConstants.sectors,
              displayName: gyaanConstants.sectors,
              label: gyaanConstants.sectors,
              placeHolder:  gyaanConstants.sectors,
              values: 'values',
            },
            subSectorName: {
              name: gyaanConstants.subSectors,
              displayName: gyaanConstants.subSectors,
              label: gyaanConstants.subSectors,
              placeHolder:  gyaanConstants.subSectors,
              values: 'values',
              viewMore: false,
            },
            resourceCategory: {
              name: gyaanConstants.category,
              displayName: gyaanConstants.categoryDislayName,
              label: gyaanConstants.singleCategory,
              placeHolder:  gyaanConstants.singleCategory,
              values: 'values',
              viewMore: false,
            },
            contextYear: {
              name: gyaanConstants.year,
              displayName: gyaanConstants.yearlable,
              label: gyaanConstants.yearlable,
              placeHolder: gyaanConstants.yearlable,
              values: 'values',
              viewMore: false,
            },
            contextStateOrUTs: {
              name: gyaanConstants.statesAndUts,
              displayName: gyaanConstants.statesAndUts,
              label: gyaanConstants.statesLable,
              placeHolder: gyaanConstants.placeHolderStates,
              values: 'values',
              viewMore: false,
            },
            contextSDGs: {
              name: gyaanConstants.sdgs,
              displayName: gyaanConstants.sdgs,
              label: gyaanConstants.sustainableDevelopmentLabel,
              placeHolder: gyaanConstants.placeHolderSdgs,
              values: 'values',
              viewMore: false,
            },
          }

          response.result.facets.forEach((facet: any) => {
            if (localFacetData[facet.name]) {
              if (facet.name === gyaanConstants.sectorName) {
                this.sectorNames = facet.values.map((sectorName: any) => sectorName.name)
              }
              facet.values.forEach((item: any) => {
                if (item.name === this.keyData.toLowerCase()) {
                  item['checked'] = true
                  this.selectedFilter[gyaanConstants.resourceCategory] = item.name
                }
                if (facet.name === gyaanConstants.sectorName) {
                  if (this.selectedSector === gyaanConstants.allSectors) {
                    if (this.selectedSector.toLowerCase()) {
                      item['checked'] = true
                      if (this.selectedFilter[gyaanConstants.sectorName]) {
                        this.selectedFilter[gyaanConstants.sectorName].push(item.name)
                      } else {
                        this.selectedFilter[gyaanConstants.sectorName] = [item.name]
                      }
                    }
                  } else {
                    if (item.name === this.selectedSector.toLowerCase()) {
                      item['checked'] = true
                      this.selectedFilter[gyaanConstants.sectorName] = [item.name]
                    }
                  }
                }
              })
              if (facet.name === gyaanConstants.resourceCategory) {
                const pageConfigData = this.route.snapshot.data
                let catFinalList: any = []
                if (pageConfigData.pageData
                  && pageConfigData.pageData.data
                  && pageConfigData.pageData.data.allowedCategories) {
                    catFinalList = facet.values.filter((ele: any) => pageConfigData.pageData.data.allowedCategories.includes(ele.name))
                  }
                  localFacetData[facet.name].values = catFinalList
              } else {
                if (facet.values.length > 0) {
                  if (facet.name !== gyaanConstants.contextYear) {
                    localFacetData[facet.name].values = [{
                      name: 'All', count: 1, checked: facet.name === gyaanConstants.sectorName
                      && (this.selectedFilter[gyaanConstants.sectorName]
                      && this.selectedFilter[gyaanConstants.sectorName].length) === facet.values.length,
                    }, ...facet.values]
                  } else {
                    localFacetData[facet.name].values = [..._.orderBy(facet.values, ['name'], ['asc'])]
                  }
                } else {
                  localFacetData[facet.name].values = facet.values
                }
              }
            }
          })

          this.facetsDataCopy = { ...localFacetData }
          this.facetsData = localFacetData
          if (this.seeAllPageConfig.request && this.seeAllPageConfig.request.searchV6) {
            if (this.selectedSector === gyaanConstants.allSectors)  {
              this.selectedFilter[gyaanConstants.sectorName]  = this.sectorNames
            } else if (this.selectedSector) {
              this.selectedFilter[gyaanConstants.sectorName] = [this.selectedSector]
            }
            if (this.keyData)  {
              this.selectedFilter[gyaanConstants.resourceCategory] = this.keyData
            }
            if (this.selectedContent !== 'otherResources') {
              this.selectedFilter['createdFor'] = environment.cbcOrg
            }
            if (this.selectedContent === 'otherResources') {
              this.selectedFilter['createdFor'] = ''
            }
            this.fetchFromSearchV6(this.seeAllPageConfig)
            this.seeAllPageConfig.request.searchV6.request.filters = {
              ...this.seeAllPageConfig.request.searchV6.request.filters,
            }
          }
         }
         this.filterDataLoading = false
    },                                         (_error: any) => {

    })
  }

  // the below method is used to get emitted value from filter component
  filterChange(event: any) {
    this.changeSelection(event.event, event.key, event.keyData)
  }

  // the below method used to form the filters and call api
  changeSelection(event: any, key: any, keyData: any) {
    keyData['checked'] = event
    if (keyData.name) {
      if (key === gyaanConstants.resourceCategory) {
        this.selectedFilter[key] = keyData.name
        this.titles = [
          { title: 'Amrit Gyaan Kosh', url: '/app/amrit-gyaan-kosh/all', disableTranslate: true, icon: 'menu_book' },
          { title: this.titleCasePipe.transform(keyData.name), url: `none`, icon: '' },
        ]
      } else {
        if (keyData.name === 'All' && !keyData.checked) {
          if (this.selectedFilter && this.selectedFilter[key]) {
            this.selectedFilter[key] = []
          }
        } else if (keyData.name === 'All' && keyData.checked) {
          this.selectedFilter[key] = []
          this.facetsDataCopy[key].values.forEach((_section: any) => {
            if (_section.name !== 'All') {
              this.selectedFilter[key].push(_section.name)
            }
          })
        } else {
            if (this.selectedFilter && this.selectedFilter[key] && this.selectedFilter[key].includes(keyData.name)) {
              const index = this.selectedFilter[key].findIndex((x: any) => x === keyData.name)
              this.selectedFilter[key].splice(index, 1)
            } else {
              if (this.selectedFilter[key] && this.selectedFilter[key].length) {
                if (key === 'contentType') {
                  this.contentTypeSelection(this.selectedFilter , key, keyData)
                } else {
                  this.selectedFilter[key].push(keyData.name)
                }
              } else {
                if (key === 'contentType') {
                  this.contentTypeSelection(this.selectedFilter , key, keyData)
                } else {
                  this.selectedFilter[key] = [keyData.name]
                }
              }
            }
        }
      }
    } else {
      if (key === gyaanConstants.contextYear) {
        this.selectedFilter[key] = keyData
      }
    }
    this.contentDataList = this.transformSkeletonToWidgets(this.seeAllPageConfig)
    if (this.seeAllPageConfig.request && this.seeAllPageConfig.request.searchV6) {
      this.fetchFromSearchV6(this.seeAllPageConfig)
    }
  }
  contentTypeSelection(selectedFilter: any , _key: any, keyData: any) {

    if (keyData.name === 'otherResources') {
      this.selectedContent =  keyData.name
      delete selectedFilter.createdFor
    } else {
      this.selectedContent = keyData.name
      selectedFilter['createdFor'] = environment.cbcOrg
    }
  }

  // Bottom sheet open only in mobileview
  openBottomSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(GyaanFilterComponent, {
      data: {
        filterDataLoading: this.filterDataLoading,
        facetsDataCopy: this.facetsDataCopy,
        facetsData: this.facetsData,
        selectedFilter: this.selectedFilter,
    }, panelClass: 'filter-bottomsheet',
  })
  bottomSheetRef.afterDismissed().subscribe((result: any) => {
   if (result) {
    const filter = result.filter
      this.titles = [
        { title: 'Amrit Gyaan Kosh', url: '/app/amrit-gyaan-kosh/all', disableTranslate: true, icon: 'menu_book' },
        { title: this.titleCasePipe.transform(filter[gyaanConstants.resourceCategory] ?
           filter[gyaanConstants.resourceCategory] : ''), url: `none`, icon: '' },
      ]
      this.facetsData = result.facetData
      this.facetsDataCopy = result.facetData
      this.selectedFilter = filter
      this.contentDataList = this.transformSkeletonToWidgets(this.seeAllPageConfig)
      if (this.seeAllPageConfig.request && this.seeAllPageConfig.request.searchV6) {
        this.fetchFromSearchV6(this.seeAllPageConfig)
      }
   }
  })
  }
  // free text search functionality
  globalSearch() {
    this.contentDataList = this.transformSkeletonToWidgets(this.seeAllPageConfig)
    if (this.seeAllPageConfig.request && this.seeAllPageConfig.request.searchV6) {
      this.fetchFromSearchV6(this.seeAllPageConfig)
    }
  }
  async onScrollEnd() {
    this.page += 1
    if (this.page <= this.totalPages && this.contentDataList.length < this.totalCount) {
      const queryparam = this.newQueryParam
      if (queryparam.searchV6.request) {
        queryparam.searchV6.request['offset'] += 50
      }
      // this.searchSrvc.fetchSearchDataByCategory(queryparam).subscribe((response: any) => {
      //   const array2 = response.result.content
      //   this.searchResults = this.searchResults.concat(array2)
      // })
      try {
        const response = await this.searchV6Request(this.seeAllPageConfig, queryparam, true)
        if (response && response.results) {
          if (this.contentDataList.length && this.contentDataList[0].widgetData.content) {
            this.contentDataList =
            _.concat(this.contentDataList, this.transformContentsToWidgets(response.results.result.content, this.seeAllPageConfig))
          } else {
            this.contentDataList = this.transformContentsToWidgets(response.results.result.content, this.seeAllPageConfig)
          }
        }
      } catch (error) {}
    }
  }
}
