import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  datasetKey = "95db4db8-f762-11e1-a439-00145eb45e9a";
  title = 'Search DOFbasen data in GBIF';
  searching : boolean = false;
  obsPosition : String = "";
  taxonKey : number;

  search(event : any){
    this.searching = true;
    console.log("searching:", this.searching);
  }

  endSearch(event : any){
    this.searching = false;
    console.log("searching:", this.searching);
  }

  setPosition(event : String){
    this.obsPosition = event;
  }

  setTaxonKey(event : number){
    this.taxonKey = event;
  }
}

