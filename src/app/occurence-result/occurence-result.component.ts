import { Component, OnInit } from '@angular/core';
import { Occurence } from '../occurence';
import { OccurenceService} from '../occurence.service';

@Component({
  selector: 'app-occurence-result',
  templateUrl: './occurence-result.component.html',
  styleUrls: ['./occurence-result.component.css']
})
export class OccurenceResultComponent implements OnInit {
  private results:Occurence[];

  constructor(private occurenceService:OccurenceService) { 
    this.occurenceService = occurenceService;
  }

  ngOnInit() {
  }

  getOccurences(params:string[]) {
    
    
  }

}
