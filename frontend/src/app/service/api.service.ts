import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from '../posts/post'; 
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  baseUri: string = 'http://localhost:3000/posts';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor( private _http: HttpClient ) { }

  //Create Posts
  getPosts() {
    return this._http.get(this.baseUri);
  }


}
