import { Component, OnInit, OnChanges, 
  SimpleChanges, SimpleChange, 
  EventEmitter, Output, Input } from '@angular/core';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {Draw, Modify} from 'ol/interaction.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import Icon from 'ol/style/Icon';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import WKT from 'ol/format/WKT';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import * as epsg3857 from 'ol/proj/epsg3857.js';
import {Style, Fill, Stroke, CircleStyle} from 'ol/style.js';
import * as control from 'ol/control';

import { environment } from '../../environments/environment';
import { cloneWithOffset } from 'ngx-bootstrap/chronos/units/offset';
import { coordinate } from 'openlayers';

@Component({
  selector: 'app-searchmap',
  templateUrl: './searchmap.component.html',
  styleUrls: ['./searchmap.component.css']
})

export class SearchmapComponent implements OnInit, OnChanges{
  @Output() wktEmitter: EventEmitter<string> = new EventEmitter();
  @Input() obsPosition: String;
  private _obsPosition: String;
  private map : Map;
  private layers : any;
  private vectorLayer : VectorLayer;
  private vectorSource : VectorSource;
  private modify : Modify;
  private draw : Draw;
  private wktFormat : WKT;

  constructor() { 
 
    this.wktFormat = new WKT();

    this.vectorSource = new VectorSource();
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: this.getStyle
    });

    this.draw = new Draw({
      type: "Polygon"
    });

    this.modify = new Modify({source: this.vectorSource});
  
    this.layers = [new TileLayer({
      source: new OSM(),
      visible: true
    }),
    this.vectorLayer];      
  } //constructor

  setWkt(f : Feature){
    var geom = f.getGeometry().transform('EPSG:3857','EPSG:4326');
    var feature = new Feature({
       geometry: geom
     });
    this.map.getView().fit(this.vectorSource.getExtent());
    var wkt = this.wktFormat.writeFeature(feature);
    this.wktEmitter.emit(wkt);
  }

  getStyle(feature) {
    return new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new Stroke({
        color: '#33ccff',
        width: 2
      })
    });
  }

  getPointStyle(feature) {
    return new CircleStyle({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      radius: 7,
      stroke: new Stroke({
        color: '#33ccff',
        width: 2
      })
    });
  }

  addInteractions() {
    this.map.addInteraction(this.draw);
    this.map.addInteraction(this.modify); 
    
    var that = this;

    this.draw.on('drawstart', function(evt: any){
      that.vectorSource.clear();
    },that);
    this.draw.on('drawend', function(evt : any){
      that.vectorSource.addFeature(evt.feature);
      that.setWkt(evt.feature.clone());
    },that); 
    
    this.modify.on('modifyend', function(evt : any ){
      var mod_feature = that.vectorSource.getFeatures()[0];
      that.setWkt(mod_feature.clone());
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

  ngOnChanges(changes: SimpleChanges) {
    const obs: SimpleChange = changes.obsPosition;
    console.log('prev value: ', obs.previousValue);
    console.log('got value: ', obs.currentValue);
    if(obs.currentValue){
      this.obsPosition = obs.currentValue.toUpperCase();

      var xy = this.obsPosition.split(",");
      //var coords  = xy[0];
      var p = new Point([Number(xy[0]), Number(xy[1])]);

      var iconFeature = new Feature({
        geometry: p.transform('EPSG:4326', 'EPSG:3857')
      });
      
      var vectorSource = new VectorSource({
        features: [iconFeature]
      });
      
      var vectorLayer = new VectorLayer({
        source: vectorSource,
        target : this.map,
        style : this.getPointStyle
      });
    }
    
  }

}
