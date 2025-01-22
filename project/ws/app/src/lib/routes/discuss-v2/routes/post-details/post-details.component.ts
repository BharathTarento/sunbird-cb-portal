import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NsDiscussionV2 } from '@sunbird-cb/discussion-v2';

@Component({
  selector: 'ws-app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  widgetData: NsDiscussionV2.IDiscussV2WidgetData | null = null
  discussionId!: string
  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params['discussionId'])
      this.discussionId = params['discussionId']
    })
  }
}
