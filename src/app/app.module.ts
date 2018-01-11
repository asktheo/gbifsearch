import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-bootstrap';
import { SearchformComponent } from './searchform/searchform.component';
import { SearchmapComponent } from './searchmap/searchmap.component';
import { OccurenceService} from './occurence.service';
import { OccurenceResultComponent } from './occurence-result/occurence-result.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchformComponent,
    SearchmapComponent,
    OccurenceResultComponent
  ],
  imports: [
    BrowserModule, 
    HttpModule, 
    AlertModule.forRoot()
  ],
  providers: [OccurenceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
