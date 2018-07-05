import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import Map from 'ol/Map';
import Vector from 'ol/layer/Vector';
import WKT from 'ol/format/WKT';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';
import Tile from 'ol/layer/Tile';
import View from 'ol/View';
import Feature from 'ol/Feature';
import GeometryType from 'ol/geom/GeometryType';
import * as epsg3857 from 'ol/proj/epsg3857';
import * as olsource from 'ol/source';
import * as olstyle from 'ol/style';

import { environment } from '../../environments/environment';
import { OccurenceService} from '../occurence.service';

@Component({
  selector: 'app-searchmap',
  templateUrl: './searchmap.component.html',
  styleUrls: ['./searchmap.component.css']
})
export class SearchmapComponent implements OnInit{
  @Output() setWkt: EventEmitter<string> = new EventEmitter();
  private map : Map;
  private layers : any;
  private vector : Vector;
  private source : olsource.Vector;
  private modify : Modify;
  private draw : Draw;
  private type : GeometryType = GeometryType.Polygon;
  private wktFormat : WKT;

  constructor(private occurenceService:OccurenceService) { 
    this.occurenceService = occurenceService;
    this.wktFormat = new WKT();
    this.source = new olsource.Vector();
    this.vector = new Vector({
      source: this.source,
      style: new olstyle.Style({
        fill: new olstyle.Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new olstyle.Stroke({
          color: '#ffcc33',
          width: 2
        }),
        image: new olstyle.Circle({
          radius: 7,
          fill: new olstyle.Fill({
            color: '#ffcc33'
          })
        })
      })
    });
  
    this.layers = [new Tile({
      source: new olsource.OSM(),
      visible: true
    }),
    this.vector];      
  } //constructor

  addInteractions() {
    this.modify = new Modify({source: this.source});
    this.draw = new Draw({
      type: this.type
    });
    this.map.addInteraction(this.draw);
    this.map.addInteraction(this.modify); 

    this.draw.on('drawend', function(evt : any){  
      var geom = evt.feature.getGeometry().transform('EPSG:3857','EPSG:4326');
      var feature = new Feature({
        geometry: geom.getGeometry()
      });
      var wkt = this.wktFormat.writeFeature(feature);
      this.setWkt.emit(wkt);
      this.source.addFeature(evt.feature);
    },this);    
  }

  ngOnInit() {
    this.map = new Map({
      target: 'mapdiv',
      layers: this.layers,
      // controls: control.defaults().extend([
      //     new control.ScaleLine()
      // ]),
      view: new View({
          projection: environment.MAP_PROJECTION,
          center: epsg3857.fromEPSG4326(environment.MAP_CENTER_LONLAT),
          zoom: environment.ZOOM_DEFAULT
      })
    });

    this.addInteractions();
    
  }

}
