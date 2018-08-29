import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { OccurenceService } from '../occurence/occurence.service';
import { SearchOccurence} from '../occurence/occurence';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Input() searching: boolean;
  @Input() obsPosition: String;
  searchOccurrence : SearchOccurence;
  wkt : string = '';


  constructor(private occurenceService:OccurenceService) {
    this.searchOccurrence = {}; 
    this.occurenceService = occurenceService;
  }

  ngOnInit() {
    this.searchOccurrence = {
      dataset_key : "95db4db8-f762-11e1-a439-00145eb45e9a",
      taxon_key : 2495000,
      recordedBy : "Theo Askov"
    }
  }

  setWkt(wkt : string){
    this.wkt = wkt;
  }

  search() {
   this.occurenceService.setParam("dataset_key", this.searchOccurrence.dataset_key);
   this.occurenceService.setParam("taxon_key", this.searchOccurrence.taxon_key.toString());
   this.occurenceService.setParam("recordedBy", this.searchOccurrence.recordedBy);
   this.occurenceService.setParam("geometry", this.wkt);
   this.notifyParent.emit(this.searchOccurrence);
  }

}
