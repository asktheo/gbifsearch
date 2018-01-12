import { Component, OnInit } from '@angular/core';
import { OccurenceResult } from '../occurence-result';
import { OccurenceService} from '../occurence.service';
import { Occurence } from '../occurence';

@Component({
  selector: 'app-occurence-result',
  templateUrl: './occurence-result.component.html',
  styleUrls: ['./occurence-result.component.css']
})
export class OccurenceResultComponent implements OnInit {
  result:OccurenceResult;
  occurences: Occurence[];

  constructor(private occurenceService:OccurenceService) { 
    this.occurenceService = occurenceService;
    this.occurences 
  }

  ngOnInit() {
    this.getOccurences();
  }

  getOccurences() {
    this.occurenceService.search().subscribe((data)=> {
      this.result= data;
      this.occurences = this.result.results;
    });
  }

}
