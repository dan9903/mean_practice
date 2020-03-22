import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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
  getPosts():Observable<Post[]> {
    return this._http.get<Post[]>(this.baseUri).pipe(catchError(this.handleError));
  }

  addPost(aPost: Post){
    return this._http.post(this.baseUri, aPost)
  }

  updatePost(aPost: Post) {
    return this._http.put(`$this.baseUri/$aPost._id`, aPost);
  }
  deletePost(aIdPost: string) {
    const deleteUrl = this.baseUri+"/"+aIdPost;
    return this._http.delete(deleteUrl);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
