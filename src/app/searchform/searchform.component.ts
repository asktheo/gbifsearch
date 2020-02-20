import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OccurenceService } from '../occurence/occurence.service';
import { SearchOccurence} from '../occurence/occurence';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit, OnChanges {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Input() datasetKey: string;
  @Input() speciesKey: number;
  @Input() searching: boolean;
  @Input() obsPosition: String;
  title="Observer name"
  searchOccurrence : SearchOccurence;
  wkt : string = '';

  constructor(private occurenceService:OccurenceService) {
    this.searchOccurrence = {}; 
    this.occurenceService = occurenceService;
  }

  ngOnInit() {
    this.searchOccurrence = {
      dataset_key : this.datasetKey,
      taxon_key : null,
      recordedBy : "Theo Askov"
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.speciesKey){
      this.searchOccurrence.taxon_key = this.speciesKey
    }
  }

  setWkt(wkt : string){
    this.wkt = wkt;
  }

  search() {
   this.occurenceService.setParam("dataset_key", this.searchOccurrence.dataset_key);
   if(this.searchOccurrence.taxon_key != null){
    this.occurenceService.setParam("taxon_key", this.searchOccurrence.taxon_key.toString());
   }
   this.occurenceService.setParam("recordedBy", this.searchOccurrence.recordedBy);
   this.occurenceService.setParam("geometry", this.wkt);
   this.notifyParent.emit(this.searchOccurrence);
  }

}
