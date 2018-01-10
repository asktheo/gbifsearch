import { Component, OnInit } from '@angular/core';
import * as ol from 'openlayers';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-searchmap',
  templateUrl: './searchmap.component.html',
  styleUrls: ['./searchmap.component.css']
})
export class SearchmapComponent implements OnInit {
  private map : any;
  private layers : [any];

  constructor() { 
    this.layers = [new ol.layer.Tile({
			title: "OSM",
			name: "Open Street Map",
			source: new ol.source.OSM(),
			visible: true
		})]
  }

  ngOnInit() {
    this.map = new ol.Map({
      target: 'mapdiv',
      layers: this.layers,
      controls: ol.control.defaults().extend([
          new ol.control.ScaleLine()
      ]),
      view: new ol.View({
          projection: environment.MAP_PROJECTION,
          center: ol.proj.transform(environment.MAP_CENTER_LONLAT, 'EPSG:4326', environment.MAP_PROJECTION),
          zoom: 11
      })
  });    
  }

}
