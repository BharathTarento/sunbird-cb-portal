import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationsService } from '@sunbird-cb/utils-v2';

@Component({
  selector: 'ws-app-national-learning-week-microsite',
  templateUrl: './national-learning-week-microsite.component.html',
  styleUrls: ['./national-learning-week-microsite.component.scss']
})
export class NationalLearningWeekMicrositeComponent implements OnInit {

  sectionList: any = []
  nwlConfig: any
  widgetData = 
  {
    "order": 2,
    "stripType": "withPils",
    "stripVisable": "responsive",
    "strips": [
      {
        "active": true,
        "key": "forYou",
        "logo": "school",
        "title": "For you",
        "type": "forYou",
        "disableTranslate": true,
        "stripTitleLink": {
          "link": "",
          "icon": ""
        },
        "sliderConfig": {
          "showNavs": true,
          "showDots": true,
          "maxWidgets": 12,
          "showNavsSpacing": true
        },
        "stripBackground": "",
        "titleDescription": "For you",
        "stripConfig": {
          "cardSubType": "card-portrait-lib"
        },
        "viewMoreUrl": {
          "path": "/app/seeAll/new",
          "viewMoreText": "Show all",
          "queryParams": {
            "key": "recentlyAdded"
          },
          "loaderConfig": {
            "cardSubType": "card-portrait-click-skeleton"
          },
          "stripConfig": {
            "cardSubType": "card-portrait-click"
          }
        },
        "loader": true,
        "loaderConfig": {
          "cardSubType": "card-portrait-lib-skeleton"
        },
        "tabs": [
          {
            "label": "Trending in your Department",
            "value": "trendingInDepartment",
            "pillsData": [
              {
                "label": "Courses",
                "value": "courses",
                "computeDataOnClick": false,
                "computeDataOnClickKey": "",
                "requestRequired": false,
                "showTabDataCount": false,
                "maxWidgets": 12,
                "selected": false,
                "nodataMsg": "You will find trending courses here.",
                "request": {
                  "trendingSearch": {
                    "request": {
                      "filters": {
                        "contextType": [
                          "courses"
                        ],
                        "organisation": "<orgID>"
                      },
                      "limit": 12
                    }
                  }
                }
              },
              {
                "label": "Programs",
                "value": "programs",
                "computeDataOnClick": false,
                "computeDataOnClickKey": "",
                "requestRequired": false,
                "showTabDataCount": false,
                "maxWidgets": 12,
                "selected": false,
                "nodataMsg": "You will find trending programs here.",
                "request": {
                  "trendingSearch": {
                    "request": {
                      "filters": {
                        "contextType": [
                          "programs"
                        ],
                        "organisation": "<orgID>"
                      },
                      "limit": 12
                    }
                  }
                }
              }
            ]
          },
          {
            "label": "Trending across Departments",
            "value": "trendingAcrossDepartment",
            "pillsData": [
              {
                "label": "Courses",
                "value": "courses",
                "computeDataOnClick": false,
                "computeDataOnClickKey": "",
                "requestRequired": false,
                "showTabDataCount": false,
                "maxWidgets": 12,
                "selected": false,
                "nodataMsg": "You will find trending courses here.",
                "request": {
                  "trendingSearch": {
                    "request": {
                      "filters": {
                        "contextType": [
                          "courses"
                        ],
                        "organisation": "across"
                      },
                      "limit": 12
                    }
                  }
                }
              },
              {
                "label": "Programs",
                "value": "programs",
                "computeDataOnClick": false,
                "computeDataOnClickKey": "",
                "requestRequired": false,
                "showTabDataCount": false,
                "maxWidgets": 12,
                "selected": false,
                "nodataMsg": "You will find trending programs here.",
                "request": {
                  "trendingSearch": {
                    "request": {
                      "filters": {
                        "contextType": [
                          "programs"
                        ],
                        "organisation": "across"
                      },
                      "limit": 12
                    }
                  }
                }
              }
            ]
          },
          {
            "label": "Recently Added",
            "value": "recentlyAdded",
            "pillsData": [
              {
                "label": "Courses",
                "value": "courses",
                "computeDataOnClick": false,
                "computeDataOnClickKey": "",
                "requestRequired": false,
                "showTabDataCount": false,
                "maxWidgets": 12,
                "selected": false,
                "nodataMsg": "You will find recently added courses here.",
                "request": {
                  "searchV6": {
                    "request": {
                      "filters": {
                        "primaryCategory": [
                          "Course"
                        ],
                        "contentType": [
                          "Course"
                        ]
                      },
                      "query": "",
                      "sort_by": {
                        "lastUpdatedOn": "desc"
                      },
                      "fields": [
                        "name",
                        "appIcon",
                        "instructions",
                        "description",
                        "purpose",
                        "mimeType",
                        "gradeLevel",
                        "identifier",
                        "medium",
                        "pkgVersion",
                        "board",
                        "subject",
                        "resourceType",
                        "primaryCategory",
                        "contentType",
                        "channel",
                        "organisation",
                        "trackable",
                        "license",
                        "posterImage",
                        "idealScreenSize",
                        "learningMode",
                        "creatorLogo",
                        "duration",
                        "avgRating"
                      ]
                    }
                  }
                }
              },
              {
                "label": "Programs",
                "value": "programs",
                "computeDataOnClick": false,
                "computeDataOnClickKey": "",
                "requestRequired": false,
                "showTabDataCount": false,
                "maxWidgets": 12,
                "selected": false,
                "nodataMsg": "You will find recently added programs here.",
                "request": {
                  "searchV6": {
                    "request": {
                      "filters": {
                        "primaryCategory": [
                          "Curated Program"
                        ],
                        "contentType": [
                          "Course"
                        ]
                      },
                      "query": "",
                      "sort_by": {
                        "lastUpdatedOn": "desc"
                      },
                      "fields": [
                        "name",
                        "appIcon",
                        "instructions",
                        "description",
                        "purpose",
                        "mimeType",
                        "gradeLevel",
                        "identifier",
                        "medium",
                        "pkgVersion",
                        "board",
                        "subject",
                        "resourceType",
                        "primaryCategory",
                        "contentType",
                        "channel",
                        "organisation",
                        "trackable",
                        "license",
                        "posterImage",
                        "idealScreenSize",
                        "learningMode",
                        "creatorLogo",
                        "duration",
                        "avgRating"
                      ]
                    }
                  }
                }
              }
            ]
          }
        ],
        "filters": [], 
        "request": {
          "apiUrl": "apis/proxies/v8/sunbirdigot/v4/search",
          "requestBody": {
            "request": {
                "filters": {
                    "contentTagNames": [
                        "NLWContent"
                    ]
                },
                "fields": [
                ],
                "offset": 0,
                "limit": 500,
                "sort_by": {
                    "lastUpdatedOn": "desc"
                },
                "facets": [
                    "nlwOrgs",
                    "nlwUserExp"
                ]
            }
          }
        }
      }
    ]
  }
  constructor(private route: ActivatedRoute, private configService: ConfigurationsService) { }

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
    if (this.route.snapshot.data
        && this.route.snapshot.data.configData
        && this.route.snapshot.data.configData.data
        && this.route.snapshot.data.configData.data.nationalLearningWeek
      ) {
      this.nwlConfig = this.route.snapshot.data.configData.data.nationalLearningWeek
      console.log("nwlConfig ", this.nwlConfig)
    }
    console.log("configService ", this.configService)
  }

}
