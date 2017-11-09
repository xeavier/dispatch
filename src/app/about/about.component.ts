import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  //IMAGES
  private eventRegistryLogo: string = 'https://pbs.twimg.com/profile_images/875698295808679936/b1Pqj1by_400x400.jpg';
  private amChartsLogo: string = 'https://avatars0.githubusercontent.com/u/1116146?s=400&v=4';
  private newsLogo: string = 'https://image.freepik.com/free-icon/news-logo_318-38132.jpg';
  private newsApiLogo: string = "https://pbs.twimg.com/profile_images/815237522641092609/6IeO3WLV.jpg";

  constructor() { }

  ngOnInit() {
  }



}
