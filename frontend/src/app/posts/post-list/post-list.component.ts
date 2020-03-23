import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  
  posts:any = [];
  postsEdit: string[] = [];
  
  constructor(private _api: ApiService ) { }

  ngOnInit() {
    this._api.getPosts().subscribe((data)=>{ this.posts = data; });
  }
  onEdit(aIdPost: string){
    this.postsEdit.push(aIdPost);
  }
  onDelete(aIdPost: string){
    if( window.confirm("Are you sure?")) {
      this._api.deletePost(aIdPost).subscribe();
      const index: number = this.posts.findIndex(x => x._id === aIdPost);
      if(index != -1 ){
        this.posts.splice(index, 1);
      }
    }
  }
  cancelEdition(aIdPost: string) {
    const index: number = this.postsEdit.indexOf(aIdPost);
    if(index !== -1) {
      this.postsEdit.splice(index, 1);
    }
  }
  saveList(aPost: Post){
    console.log("--------------- saved List ----------------------");
    console.log(aPost);
    const index: number = this.posts.findIndex(x => x._id === aPost._id);
    if(index === -1 ){
      this.posts.push(aPost);
      return;
    }
    Object.assign(this.posts[index], aPost);
    this.cancelEdition(aPost._id);
  }
}
