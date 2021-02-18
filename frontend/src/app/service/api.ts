import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Post } from '../posts/post'; 

@Injectable({
    providedIn: 'root'
  })

export class Api {
    private baseUri: string = 'http://localhost:3000/posts';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor( private _http: HttpClient ) { }


  public getPosts():Observable<Post[]> {
    return this._http.get<Post[]>(this.baseUri).pipe(catchError(this.handleError));
  }
  
  public addPost(aPost: Post): Observable<Post> {
    return this._http.post<Post>(this.baseUri, aPost, this.httpOptions)
            .pipe(tap((newPost: Post) => console.log(`added post w/ id=${newPost._id}`)),
                  catchError(this.handleError));
  }

  public updatePost(aPost: Post) {
    const updateUri= this.baseUri+"/"+aPost._id;
    return this._http.put(updateUri, aPost, this.httpOptions)
            .pipe(tap(_ => console.log(`updated post id=${aPost._id}`)),
                  catchError(this.handleError));
  }

  public deletePost(aIdPost: string) {
    const deleteUri = this.baseUri+"/"+aIdPost;
    return this._http.delete(deleteUri)
            .pipe(tap(_ => console.log(`deleted post id=${aIdPost}`)),
                  catchError(this.handleError));
  }
  
  private handleError(error: HttpErrorResponse) {
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