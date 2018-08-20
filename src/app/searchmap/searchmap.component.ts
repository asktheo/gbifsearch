import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {Draw, Modify} from 'ol/interaction.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import WKT from 'ol/format/WKT';
import DrawEvent from 'ol/events';
import Feature from 'ol/Feature';
import * as epsg3857 from 'ol/proj/epsg3857.js';
import {Style, Fill, Stroke, Circle as CircleStyle} from 'ol/style.js';
import * as control from 'ol/control';

import { environment } from '../../environments/environment';
import { OccurenceService} from '../occurence.service';

var draw, modify;

@Component({
  selector: 'app-searchmap',
  templateUrl: './searchmap.component.html',
  styleUrls: ['./searchmap.component.css']
})
export class SearchmapComponent implements OnInit{
  @Output() setWkt: EventEmitter<string> = new EventEmitter();
  private map : Map;
  private layers : any;
  private vectorLayer : VectorLayer;
  private vectorSource : VectorSource;
  private modify : Modify;
  private draw : Draw;
  private selectType : String;
  private wktFormat : WKT;

  constructor(private occurenceService:OccurenceService) { 
    this.occurenceService = occurenceService;
    this.wktFormat = new WKT();
    this.vectorSource = new VectorSource();
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33'
          })
        })
      })
    });
    this.selectType = "Polygon";
  
    this.layers = [new TileLayer({
      source: new OSM(),
      visible: true
    }),
    this.vectorLayer];      
  } //constructor

  addInteractions() {
   // this.modify = new Modify({source: this.vectorSource});
    this.draw = new Draw({
      source: this.vectorSource,
      type: this.selectType
    });
    this.map.addInteraction(this.draw);
    //this.map.addInteraction(this.modify); 
    var that = this;
    this.draw.on('drawend', function(evt : any){
      //evt.preventDefault();
      var geom = evt.feature.getGeometry().transform('EPSG:3857','EPSG:4326');
      var feature = new Feature({
         geometry: geom
       });
      var wkt = that.wktFormat.writeFeature(feature);
      that.setWkt.emit(wkt);
    },that);    
  }

  ngOnInit() {
    this.map = new Map({
      target: 'mapdiv',
      layers: this.layers,
      // controls: control.defaults().extend([
      //    new control.ScaleLine()
      //  ]),
      view: new View({
          projection: environment.MAP_PROJECTION,
          center: epsg3857.fromEPSG4326(environment.MAP_CENTER_LONLAT),
          zoom: environment.ZOOM_DEFAULT
      })
    });

    this.addInteractions();
    
  }

}
