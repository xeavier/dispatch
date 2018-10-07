import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  //IMAGES
  public eventRegistryLogo: string = 'https://i.imgur.com/840TdVZ.jpg';
  public amChartsLogo: string = 'https://avatars0.githubusercontent.com/u/1116146?s=400&v=4';
  public newsLogo: string = 'https://image.freepik.com/free-icon/news-logo_318-38132.jpg';
  public newsApiLogo: string = "https://pbs.twimg.com/profile_images/937857919986618368/Qd18tnjA_400x400.jpg";

  constructor() { }

  ngOnInit() {
  }



}
