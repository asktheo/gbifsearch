import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as ol from 'openlayers';
import { environment } from '../../environments/environment';
import { OccurenceService} from '../occurence.service';

@Component({
  selector: 'app-searchmap',
  templateUrl: './searchmap.component.html',
  styleUrls: ['./searchmap.component.css']
})
export class SearchmapComponent implements OnInit{
  @Output() setWkt: EventEmitter<string> = new EventEmitter();
  private map : any;
  private layers : ol.layer.layers;
  private vector : ol.layer.Vector;
  private source : ol.source.Vector;
  private modify : ol.interaction.Modify;
  private draw : ol.interaction.Draw;
  private type : string = 'Polygon';
  private wktFormat : ol.format.WKT;

  constructor(private occurenceService:OccurenceService) { 
    this.occurenceService = occurenceService;
    this.wktFormat = new ol.format.WKT();
    this.source = new ol.source.Vector();
    this.vector = new ol.layer.Vector({
      source: this.source,
      style: new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
          color: '#ffcc33',
          width: 2
        }),
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
            color: '#ffcc33'
          })
        })
      })
    });
  
    this.layers = [new ol.layer.Tile({
      title: "OSM",
      name: "Open Street Map",
      source: new ol.source.OSM(),
      visible: true
    }),
    this.vector];      
  } //constructor

  addInteractions() {
    this.modify = new ol.interaction.Modify({source: this.source});
    this.draw = new ol.interaction.Draw({
      type: this.type
    });
    this.map.addInteraction(this.draw);
    this.map.addInteraction(this.modify); 

    this.draw.on('drawend', function(evt){   
      var geom = evt.feature.getGeometry().transform('EPSG:3857','EPSG:4326');
      var feature = new ol.Feature({
        geometry: geom
      });
      var wkt = this.wktFormat.writeFeature(feature);
      this.setWkt.emit(wkt);
      this.source.addFeature(evt.feature);
    },this);    
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
          zoom: environment.ZOOM_DEFAULT
      })
    });

    this.addInteractions();
    
  }

}
