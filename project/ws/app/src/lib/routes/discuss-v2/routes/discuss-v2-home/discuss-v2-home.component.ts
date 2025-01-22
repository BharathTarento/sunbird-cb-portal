import { Component } from '@angular/core';

@Component({
  selector: 'ws-app-discuss-v2-home',
  templateUrl: './discuss-v2-home.component.html',
  styleUrls: ['./discuss-v2-home.component.scss']
})
export class DiscussV2HomeComponent {
  shortCutData: any[]= [
    {
      name:"Saved Posts",
      icon:"bookmark_border",
      link:"/page/learn"
    },
    {
      name:"Posts By You",
      icon:"list_alt",
      link:""
    },
    {
      name:"Pending Request",
      icon:"update",
      link:""
    }
  ]

  trendingDiscussions = [
    {
      author: 'Harshit T Rao',
      time: 'Today, 10:21 AM',
      title: "What are some merits and demerits of the Dicey's Rule of Law?",
      likes: 598,
      views: 43,
      comments: 43,
      avatar: 'https://portal.dev.karmayogibharat.net/assets/public/content/do_11408384025512345617/artifact/do_11408384025512345617_1719218781302_assessment1719218781448.jpg'
    },
    {
      author: 'Harshit T Rao',
      time: 'Today, 10:21 AM',
      title: "What are some merits and demerits of the Dicey's Rule of Law?",
      likes: 598,
      views: 43,
      comments: 43,
      avatar: 'https://portal.dev.karmayogibharat.net/assets/public/content/do_11408384025512345617/artifact/do_11408384025512345617_1719218781302_assessment1719218781448.jpg'
    },
    {
      author: 'Harshit T Rao',
      time: 'Today, 10:21 AM',
      title: "What are some merits and demerits of the Dicey's Rule of Law?",
      likes: 598,
      views: 43,
      comments: 43,
      avatar: 'https://portal.dev.karmayogibharat.net/assets/public/content/do_11408384025512345617/artifact/do_11408384025512345617_1719218781302_assessment1719218781448.jpg'
    },
    {
      author: 'Harshit T Rao',
      time: 'Today, 10:21 AM',
      title: "What are some merits and demerits of the Dicey's Rule of Law?",
      likes: 598,
      views: 43,
      comments: 43,
      avatar: 'https://portal.dev.karmayogibharat.net/assets/public/content/do_11408384025512345617/artifact/do_11408384025512345617_1719218781302_assessment1719218781448.jpg'
    },
    // Add more discussions...
  ]
}
