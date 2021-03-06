import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { OccurenceResult } from '../occurence-result/occurence-result';
import { OccurenceService} from '../occurence/occurence.service';
import { Occurence } from '../occurence/occurence';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-occurence-result',
  templateUrl: './occurence-result.component.html',
  styleUrls: ['./occurence-result.component.css']
})

export class OccurenceResultComponent implements OnInit, OnChanges {
  @Input() searching: boolean;
  @Output() notifyParent: EventEmitter<boolean> = new EventEmitter();
  @Output() emitPosition: EventEmitter<String> = new EventEmitter();
  result:OccurenceResult;
  occurrences: Occurence[];

  constructor(private occurenceService:OccurenceService) { 
    this.occurenceService = occurenceService;
  }

  ngOnInit() {
  }
  
  ngOnChanges(){
    console.log("changed:",this.searching);
    if(this.searching){
      this.occurenceService.search().subscribe((data)=> {
        this.result = data;
        this.occurrences = this.result.results;
        this.searching = false;
        this.notifyParent.emit(this.searching);
      });
    }
  }

  setPosition(occurence : Occurence){
    this.emitPosition.emit(occurence.decimalLongitude+","+occurence.decimalLatitude);
  }

}
