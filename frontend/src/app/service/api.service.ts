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

  addPost(aPost: Post): Observable<Post> {
    return this._http.post<Post>(this.baseUri, aPost);
  }

  updatePost(aPost: Post) {
    const updateUri= this.baseUri+"/"+aPost._id;
    return this._http.put(updateUri, aPost);
  }
  deletePost(aIdPost: string) {
    const deleteUri = this.baseUri+"/"+aIdPost;
    return this._http.delete(deleteUri);
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
