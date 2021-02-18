import { Injectable } from '@angular/core';

import { Post } from '../posts/post';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private posts: Post[] = [];

  constructor( private _api: Api ) { }

  public getData(): Post[] {
    if( this.posts.length === 0 || this.posts.length === null ) {
      this._api.getPosts().subscribe(data => { 
        data.forEach(val => this.posts.push(Object.assign({}, val)));
      });
    }
    return this.posts;
  }

  public addData(aPost: Post){
    this._api.addPost(aPost).subscribe(data =>{
      this.posts.push(data);
    });
    console.log(this.posts);
  }

  public updateData(aPost: Post) {
    this._api.updatePost(aPost).subscribe();
    const index: number = this.posts.findIndex(x => x._id === aPost._id);
    if(index > -1) {
      Object.assign(this.posts[index], aPost);
    }
  }

  public deleteData(aPostId: string) {
    this._api.deletePost(aPostId).subscribe();
    const index: number = this.posts.findIndex(x => x._id === aPostId);
    if(index !== -1) {
      this.posts.splice(index, 1);
    }
  }
}
