import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'ws-app-provider-page',
  templateUrl: './provider-page.component.html',
  styleUrls: ['./provider-page.component.scss'],
})
export class ProviderPageComponent implements OnInit {

  providerName = ''
  providerId = ''
  navList: any
  hideCompetencyBlock = false
  sectionList: any = []
  titles = [
    { title: `Providers`,
      url: `/app/learn/browse-by/provider/all-providers`,
      textClass: 'ws-mat-black60-text',
      icon: '', disableTranslate: true,
    },
  ]

  constructor(private route: ActivatedRoute,
    public router: Router
  ) {

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

  showAllContent(_stripData: any){
    this.router.navigate([`/app/learn/browse-by/provider/${this.providerName}/${this.providerId}/all-CBP`])
  }
}
