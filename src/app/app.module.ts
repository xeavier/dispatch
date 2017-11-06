import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { routes } from './routes/app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';
import { ResultsComponent } from './results/results.component';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { NewsApiService } from "./news-api.service";
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MapComponent,
    ResultsComponent,
    AboutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AmChartsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [NewsApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
