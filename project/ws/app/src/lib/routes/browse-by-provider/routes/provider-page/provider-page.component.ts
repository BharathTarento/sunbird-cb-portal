import { DatePipe } from '@angular/common'
import {  Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'ws-app-provider-page',
  templateUrl: './provider-page.component.html',
  styleUrls: ['./provider-page.component.scss'],
})
export class ProviderPageComponent implements OnInit  {

  providerName = ''
  providerId = ''
  navList: any
  hideCompetencyBlock = false
  sectionList: any = []
  currentMonthAndYear: any
  titles = [
    { title: `Providers`,
      url: `/app/learn/browse-by/provider/all-providers`,
      textClass: 'ws-mat-black60-text',
      icon: '', disableTranslate: true,
    },
  ]

  descriptionMaxLength = 1000
  expanded = false

  constructor(private route: ActivatedRoute,
              public router: Router, private datePipe: DatePipe) {

  }

  ngOnInit() {
    if (this.route.snapshot.data && this.route.snapshot.data.formData
      && this.route.snapshot.data.formData.data
      && this.route.snapshot.data.formData.data.result
      && this.route.snapshot.data.formData.data.result.form
      && this.route.snapshot.data.formData.data.result.form.data
      && this.route.snapshot.data.formData.data.result.form.data.sectionList
    ) {
      this.sectionList = this.route.snapshot.data.formData.data.result.form.data.sectionList
    }
    this.route.params.subscribe(params => {
      this.providerName = params['provider']
      this.providerId = params['orgId']
      this.titles.push({
        title: this.providerName, icon: '', url: 'none', disableTranslate: true,
        textClass: '',
      })
    })
    this.getNavitems()
    this.currentMonthAndYear = this.datePipe.transform(new Date(), 'MMMM y')
  }

  getNavitems() {
    this.navList = this.sectionList.filter(
      (obj: any) => obj.enabled && obj.navigation && obj.navOrder).sort(
        (a: any, b: any) => a.navOrder - b.navOrder)
  }

  scrollToSection(name:  string) {
    let section: HTMLElement | any
    section = document.getElementById(name)
    if (section) {
      // section.scrollIntoView({ behavior: 'smooth', block: 'start',inline: 'nearest', offsetTop: yOffset  })
      window.scrollTo({
        top: section.offsetTop - 121,
        behavior: 'smooth',
      })
    }
  }
  hideCompetency(event: any) {
    if (event) {
      this.hideCompetencyBlock = true
    }
  }
  hideContentStrip(event: any, contentStripData: any) {
    if (event) {
      contentStripData['hideSection'] = true
    }
  }
  hideLearnerReview(event: any, learnerReview: any) {
    if (event) {
      learnerReview['hideSection'] = true
    }
  }

  showAllContent(_stripData: any, contentStrip: any) {
    if (contentStrip && contentStrip.strips && contentStrip.strips.length) {
      const stripData: any = contentStrip.strips[0]
      if (stripData && stripData.request) {
        delete(stripData['loaderWidgets'])
        this.router.navigate(
          [`/app/learn/browse-by/provider/${this.providerName}/${this.providerId}/all-content`],
          { queryParams: { stripData: JSON.stringify(stripData) } })
      }
    } else {
       this.router.navigate(
        [`/app/learn/browse-by/provider/${this.providerName}/${this.providerId}/all-CBP`])
    }
  }

  viewMoreOrLess() {
    this.expanded = !this.expanded
  }
}
