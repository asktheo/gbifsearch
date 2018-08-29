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
  private searchParams : HttpParams;

  constructor(private http : HttpClient) { 
    this.baseUrl = 'http://api.gbif.org/v1/occurrence';
    this.searchParams = new HttpParams();
  }

  search() : Observable<OccurenceResult> {
    return this.http.get<OccurenceResult>(`${this.baseUrl}/search`,{headers: httpOptions.headers, params: this.searchParams});
  }  

  setParam(key : string,value : string){
    this.searchParams=this.searchParams.set(key, value);   
  }

}
