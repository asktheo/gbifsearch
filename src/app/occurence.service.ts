import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { OccurenceResult } from './occurence-result';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OccurenceService {
  private baseUrl : string;

  constructor(private http : HttpClient) { 
    this.baseUrl = 'http://api.gbif.org/v1/occurrence';
  }
      
  search() : Observable<OccurenceResult> {
    const params = new HttpParams()
    .set("dataset_key","95db4db8-f762-11e1-a439-00145eb45e9a")
    .set("taxon_key", "2495000")
    .set("recordedBy", "Theo Askov");

    return this.http.get<OccurenceResult>(`${this.baseUrl}/search`,{params});
  }  

}
