import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AmChartsModule } from "@amcharts/amcharts3-angular";

//Declaring AmCharts variable
declare var AmCharts: any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {


  @Output() shareCountries = new EventEmitter();

  selectedCountries: any;
  map: any;

   //Share selected countries with results.component
  fireShareEvent(event) {
    this.shareCountries.emit(this.selectedCountries);
  }


  constructor() {
  }


  ngOnInit() {


    this.map = AmCharts.makeChart("mapdiv", {

      type: "map",
      theme: "dark",
      projection: "Eckert 5",
      panEventsEnabled: true,
      backgroundColor: "#F2F1F1",
      backgroundAlpha: 1,
      zoomControl: {
        zoomControlEnabled: true
      },
      dataProvider: {
        map: "worldHigh",
        getAreasFromMap: true,
        areas:
        []
      },
      areasSettings: {
        autoZoom: false,
        selectable: true,
        color: "#6277A7",
        colorSolid: "#84ADE9",
        selectedColor: "#6164ce",
        outlineColor: "#4B4B4B",
        rollOverColor: "#9EC2F7",
        rollOverOutlineColor: "#000000"
      },
      listeners: [{
        "event": "clickMapObject",
        "method": (e) => {

          // Ignore any click not on area
          if (e.mapObject.objectType !== "MapArea")
            return;

          var area = e.mapObject;

          // Toggle showAsSelected
          area.showAsSelected = !area.showAsSelected;
          e.chart.returnInitialColor(area);

          // Update the list
          let result = this.getSelectedCountries(this.map);
          document.getElementById("selected").innerHTML = JSON.stringify(result);
          this.selectedCountries = result;

        }
      }]
    });



  }

  /**
* Function which extracts currently selected country list.
* Returns array of country names
*/

  getSelectedCountries(map: any) {
    var selected = [];
    for (var i = 0; i < map.dataProvider.areas.length; i++) {
      if (map.dataProvider.areas[i].showAsSelected)
        selected.push(map.dataProvider.areas[i].enTitle);
    }
    return selected;
  }



}
