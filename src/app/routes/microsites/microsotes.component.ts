import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ws-microsotes',
  templateUrl: './microsotes.component.html',
  styleUrls: ['./microsotes.component.scss']
})
export class MicrosotesComponent implements OnInit {

  currentFilter = 'Behavioural'
  currentCompetencies: any = []
  competencyData: any

  sectionList = [
    {
      "active": true,
      "enabled": true,
      "title": "",
      "key": "row1",
      "order": 1,
      "column": [
        {
          "active": true,
          "enabled": true,
          "key": "banner",
          "title": "",
          "colspan": 12,
          "data":  {
            logo: "/assets/instances/eagle/app_logos/KarmayogiBharat_Logo_Horizontal.svg",
            title: "Department Of Education",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            sliders: [
              {
                "active": true,
                "banners": {
                  "l": "assets/instances/eagle/banners/orgs/new-banner/6/l.png",
                  "m": "assets/instances/eagle/banners/orgs/new-banner/6/m.png",
                  "s": "assets/instances/eagle/banners/orgs/new-banner/6/s.png",
                  "xl": "assets/instances/eagle/banners/orgs/new-banner/6/l.png",
                  "xs": "assets/instances/eagle/banners/orgs/new-banner/6/s.png",
                  "xxl": "assets/instances/eagle/banners/orgs/new-banner/6/l.png"
                },
                "redirectUrl": "/app/curatedCollections/do_1137524714202480641252",
                "queryParams": {
                  "tab": "Learn",
                  "q": "Salesforce",
                  "lang": "en",
                  "f": "{}"
                },
                "title": ""
              },
              {
                "active": true,
                "banners": {
                  "l": "assets/instances/eagle/banners/orgs/new-banner/4/l.png",
                  "m": "assets/instances/eagle/banners/orgs/new-banner/4/m.png",
                  "s": "assets/instances/eagle/banners/orgs/new-banner/4/s.png",
                  "xl": "assets/instances/eagle/banners/orgs/new-banner/4/l.png",
                  "xs": "assets/instances/eagle/banners/orgs/new-banner/4/s.png",
                  "xxl": "assets/instances/eagle/banners/orgs/new-banner/4/l.png"
                },
                "redirectUrl": "/app/organisation/dopt",
                "queryParams": {
                  "tab": "Learn",
                  "q": "Salesforce",
                  "lang": "en",
                  "f": "{}"
                },
                "title": ""
              },
              {
                "active": true,
                "banners": {
                  "l": "assets/instances/eagle/banners/orgs/new-banner/2/l.png",
                  "m": "assets/instances/eagle/banners/orgs/new-banner/2/m.png",
                  "s": "assets/instances/eagle/banners/orgs/new-banner/2/s.png",
                  "xl": "assets/instances/eagle/banners/orgs/new-banner/2/l.png",
                  "xs": "assets/instances/eagle/banners/orgs/new-banner/2/s.png",
                  "xxl": "assets/instances/eagle/banners/orgs/new-banner/2/l.png"
                },
                "redirectUrl": "/app/globalsearch",
                "queryParams": {
                  "tab": "Learn",
                  "q": "Salesforce",
                  "lang": "en",
                  "f": "{}"
                },
                "title": ""
              }
            ]
          }
        }
      ],
    },
    {
      "active": true,
      "enabled": true,
      "title": "",
      "key": "row2",
      "order": 2,
      "column": [
        {
          "active": true,
          "enabled": true,
          "key": "stats",
          "title": "",
          "colspan": 6,
          "data":  [
            {
              icon: 'assessment',
              value: 28464,
              label: 'Total Content',
              colspan: 6
            },
            {
              icon: 'video_library',
              value: 4.2,
              label: 'Average Rating',
              colspan: 6
            },
            {
              icon: 'attachment',
              value: 28464,
              label: 'Total Enrollments',
              colspan: 6
            },
            {
              icon: 'image',
              value: 28464,
              label: 'Total Certificates issued',
              colspan: 6
            }
          ]
        },
        {
          "active": true,
          "enabled": true,
          "key": "calendar",
          "title": "",
          "colspan": 6,
          "data":  [{
            "date": "1-04-2024" ,
            "title": "POSH webinar session",
            "description": "POSH webinar session",
          },
          {
            "date": "5-04-2024" ,
            "title": "PPF webinar session",
            "description": "PPF webinar session",
          }]
        },
      ],
    },
    {
      "active": true,
      "enabled": true,
      "title": "",
      "key": "row4",
      "order": 3,
      "column": [
        {
          "active": true,
          "enabled": true,
          "key": "contentStrip",
          "title": "Popular courses",
          "data":  {
            "order": 4,
            "strips": [
              {
                "active": true,
                "key": "recentlyAdded",
                "logo": "school",
                "title": "Recently Added",
                "stripTitleLink": {
                  "link": "",
                  "icon": ""
                },
                "sliderConfig": {
                  "showNavs": true,
                  "showDots": true,
                  "maxWidgets": 12
                },
                "stripBackground": "",
                "titleDescription": "Recently Added",
                "stripConfig": {
                  "cardSubType": "standard"
                },
                "viewMoreUrl": {
                  "path": "/app/seeAll",
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
                  "cardSubType": "card-standard-skeleton"
                },
                "tabs": [
                ],
                "filters": [],
                "request": {
                  "searchV6": {
                    "request": {
                      "filters": [
                        {
                          "primaryCategory": [
                            "Course"
                          ],
                          "contentType": [
                            "Course"
                          ]
                        }
                      ],
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
        }
      ],
    },
    {
      "active": true,
      "enabled": true,
      "title": "",
      "key": "row4",
      "order": 4,
      "column": [
        {
          "active": true,
          "enabled": true,
          "key": "users",
          "title": "",
          "colspan": 12,
          "data":  ''
        }
      ],
    },
    {
      "active": true,
      "enabled": true,
      "title": "",
      "key": "row5",
      "order": 5,
      "column": [
        {
          "active": true,
          "enabled": true,
          "key": "competency",
          "title": "Competency Strength",
          "colspan": 12,
          "background": 'competencies-backgroud',
          "data": [
            {
              name: 'Functional one',
              description: "Functional oneLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              contentCount: 7,
              subTheme: [
                "Relationship Management",
                "Conflict Management",
                "Verbal & Non-Verbal Fluency"
              ],
              viewMore: false,
              type: "Functional",
            },
            {
              name: 'Functional two',
              description: "Functional two Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              contentCount: 10,
              subTheme: [
                "Relationship Management",
                "Conflict Management",
                "Verbal & Non-Verbal Fluency"
              ],
              viewMore: false,
              type: "Functional",
            },
            {
              name: 'Functional three',
              description: "Functional three Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              contentCount: 16,
              subTheme: [
                "Relationship Management",
                "Conflict Management",
                "Verbal & Non-Verbal Fluency"
              ],
              viewMore: false,
              type: "Functional",
            },
            {
              name: 'Domain one',
              description: "Domain two Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              contentCount: 10,
              subTheme: [
                "Relationship Management",
                "Conflict Management",
                "Verbal & Non-Verbal Fluency"
              ],
              viewMore: false,
              type: "Domain",
            },
            {
              name: 'Domain two',
              description: "Domain two Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              contentCount: 12,
              subTheme: [
                "Relationship Management",
                "Conflict Management",
                "Verbal & Non-Verbal Fluency"
              ],
              viewMore: false,
              type: "Domain",
            },
            {
              name: 'Domain three',
              description: "Domain three Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              contentCount: 19,
              subTheme: [
                "Relationship Management",
                "Conflict Management",
                "Verbal & Non-Verbal Fluency",
                "Testing"
              ],
              viewMore: true,
              type: "Domain",
            },
            {
              name: 'Collaboration',
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              contentCount: 12,
              subTheme: [
                "Relationship Management",
                "Conflict Management",
                "Verbal & Non-Verbal Fluency"
              ],
              viewMore: false,
              type: "Behavioural",
            },
            {
              name: 'Network Systems Maintenance',
              description: "Network Systems Maintenance Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              contentCount: 4,
              subTheme: [
                "Relationship Management",
                "Conflict Management",
                "Verbal & Non-Verbal Fluency",
                "Knowledge Sharing",
                "Planning & Prioritization",
                "Goal Setting",
                "Stress Management",
                "Dissemination of Information",
                "Handling Allowances & Reimbursement"
              ],
              viewMore: true,
              type: "Behavioural",
            },
            {
              name: 'Collaborative Leadership',
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              contentCount: 14,
              subTheme: [
                "Relationship Management",
                "Conflict Management",
                "Verbal & Non-Verbal Fluency",
                "Knowledge Sharing",
                "Planning & Prioritization",
                "Goal Setting",
                "Stress Management",
                "Dissemination of Information",
                "Handling Allowances & Reimbursement"
              ],
              viewMore: true,
              type: "Behavioural",
            },
            {
              name: 'Office Management',
              description: "Office Management Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              contentCount: 44,
              subTheme: [
                "Relationship Management",
                "Conflict Management",
                "Verbal & Non-Verbal Fluency",
                "Knowledge Sharing",
                "Planning & Prioritization",
                "Goal Setting",
                "Stress Management",
                "Dissemination of Information",
                "Handling Allowances & Reimbursement"
              ],
              viewMore: true,
              type: "Behavioural",
            },
            {
              name: 'Administration Matters',
              description: "Administration Matters Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              contentCount: 9,
              subTheme: [
                "Relationship Management",
                "Conflict Management",
                "Verbal & Non-Verbal Fluency",
                "Knowledge Sharing",
                "Planning & Prioritization",
                "Goal Setting",
                "Stress Management",
                "Dissemination of Information",
                "Handling Allowances & Reimbursement"
              ],
              viewMore: true,
              type: "Behavioural",
            },
          ],
        }
      ],
    },
    {
      "active": true,
      "enabled": true,
      "title": "",
      "key": "row6",
      "order": 6,
      "column": [
        {
          "active": true,
          "enabled": true,
          "key": "learner",
          "title": "",
          "colspan": 12,
          "data":  [],
        }
      ],
    },
    {
      "active": true,
      "enabled": true,
      "title": "",
      "key": "row7",
      "order": 7,
      "column": [
        {
          "active": true,
          "enabled": true,
          "key": "bmetrics",
          "background": 'banner-metrics',
          "title": "",
          "colspan": 12,
          "data":  [
            {
              icon: "https://portal.karmayogi.nic.in/content-store/content/do_114041344797859840128/artifact/do_114041344797859840128_1714031463360_star.svg",
              iconColor: 'white',
              header: '4.1',
              headercolor: 'white',
              description: 'Average Course Rating',
              descriptionColor: 'black',
              linebreak: true,
              background: 'banner-metrics',
            },
            {
              icon: "https://portal.karmayogi.nic.in/content-store/content/do_114041337110372352127/artifact/do_114041337110372352127_1714030607449_shape.svg",
              iconColor: 'white',
              header: '1234',
              headercolor: 'white',
              description: 'Content Available',
              descriptionColor: 'black',
              linebreak: true,
              background: 'banner-metrics',
            },
            {
              icon: "https://portal.karmayogi.nic.in/content-store/content/do_114041373226573824131/artifact/do_114041373226573824131_1714034836835_group_add.svg",
              iconColor: 'white',
              header: '7890',
              headercolor: 'white',
              description: 'Enrolments So Far',
              descriptionColor: 'black',
              linebreak: true,
              background: 'banner-metrics',
            },
            {
              icon: "https://portal.karmayogi.nic.in/content-store/content/do_114041378634399744134/artifact/do_114041378634399744134_1714035498087_combined-shape.svg",
              iconColor: 'white',
              header: '5678',
              headercolor: 'white',
              description: 'Certificates Issued So Far',
              descriptionColor: 'black',
              linebreak: true,
              background: 'banner-metrics',
            },
          ],
        }
      ],
    },
    {
      "active": true,
      "enabled": true,
      "title": "",
      "key": "row7",
      "order": 7,
      "column": [
        {
          "active": true,
          "enabled": true,
          "key": "mbmetrics",
          "background": 'transparent',
          "title": "",
          "colspan": 12,
          "data":  [
            {
              icon: "https://portal.karmayogi.nic.in/content-store/content/do_114041344797859840128/artifact/do_114041344797859840128_1714031463360_star.svg",
              iconColor: 'white',
              header: '4.1',
              headercolor: 'white',
              description: 'Average Rating',
              descriptionColor: 'black',
              linebreak: true,
              background: 'banner-metrics',
            },
            {
              icon: "https://portal.karmayogi.nic.in/content-store/content/do_114041337110372352127/artifact/do_114041337110372352127_1714030607449_shape.svg",
              iconColor: 'white',
              header: '1234',
              headercolor: 'white',
              description: 'Content Available',
              descriptionColor: 'black',
              linebreak: true,
              background: 'banner-metrics',
            },
            {
              icon: "https://portal.karmayogi.nic.in/content-store/content/do_114041373226573824131/artifact/do_114041373226573824131_1714034836835_group_add.svg",
              iconColor: 'white',
              header: '7890',
              headercolor: 'white',
              description: 'Enrolments So Far',
              descriptionColor: 'black',
              linebreak: true,
              background: 'banner-metrics',
            },
            {
              icon: "https://portal.karmayogi.nic.in/content-store/content/do_114041378634399744134/artifact/do_114041378634399744134_1714035498087_combined-shape.svg",
              iconColor: 'white',
              header: '5678',
              headercolor: 'white',
              description: 'Certificates Issued So Far',
              descriptionColor: 'black',
              linebreak: true,
              background: 'banner-metrics',
            },
          ],
        }
      ],
    },
    {
      "active": true,
      "enabled": true,
      "title": "",
      "key": "row8",
      "order": 8,
      "column": [
        {
          "active": true,
          "enabled": true,
          "key": "infra",
          "background": 'infra-background',
          "title": "",
          "colspan": 12,
          "data":  [
            {
              icon: "https://portal.karmayogi.nic.in/content-store/content/do_114041375850471424132/artifact/do_114041375850471424132_1714035157784_group.svg",
              iconColor: 'white',
              header: '4.1',
              headercolor: 'white',
              description: 'Average Course Rating',
              descriptionColor: 'white custom-opacity',
              linebreak: false,
              background: 'tranparent',
            },
            {
              icon: "https://portal.karmayogi.nic.in/content-store/content/do_114041377520844800133/artifact/do_114041377520844800133_1714035357308_computer.svg",
              iconColor: 'white',
              header: '1234',
              headercolor: 'white',
              description: 'Content Available',
              descriptionColor: 'white custom-opacity',
              linebreak: false,
              background: 'tranparent',
            },
            {
              icon: "https://portal.karmayogi.nic.in/content-store/content/do_114041379912810496135/artifact/do_114041379912810496135_1714035650285_auto_stories.svg",
              iconColor: 'white',
              header: '7890',
              headercolor: 'white',
              description: 'Enrolments So Far',
              descriptionColor: 'white custom-opacity',
              linebreak: false,
              background: 'tranparent',
            },
            {
              icon: "https://portal.karmayogi.nic.in/content-store/content/do_114041366180069376130/artifact/do_114041366180069376130_1714033990328_podium.svg",
              iconColor: 'white',
              header: '5678',
              headercolor: 'white',
              description: 'Certificates Issued So Far',
              descriptionColor: 'white custom-opacity',
              linebreak: false,
              background: 'tranparent',
            },
          ],
        }
      ],
    }
    
  ]
 
  constructor() { }

  ngOnInit() {
    this.competencyData = this.sectionList.filter(data => data.key === 'row5')
    this.filter(this.currentFilter)
  }

  filter(filterValue: string) {
    this.currentFilter = filterValue
    this.currentCompetencies = this.competencyData[0].column[0].data.filter((item: any) => item.type === filterValue)
  }
  
}
