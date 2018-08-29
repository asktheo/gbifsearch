import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { SearchformComponent } from './searchform/searchform.component';
import { SearchmapComponent } from './searchmap/searchmap.component';
import { OccurenceService} from './occurence/occurence.service';
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
    HttpClientModule, 
    FormsModule,
    AlertModule.forRoot()
  ],
  providers: [HttpClientModule, OccurenceService],
  bootstrap: [AppComponent]
})

export class AppModule { }
