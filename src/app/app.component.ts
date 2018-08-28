import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Search a GBIF dataset';
  searching : boolean = false;
  obsPosition : String = "";

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
}


