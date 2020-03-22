import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts:any = [] ;
  
  constructor(private _api: ApiService ) { }

  ngOnInit() {
    this._api.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }
  
  onEdit(aPost: Post){
    this._api.updatePost(aPost).subscribe();
  }
  
  onDelete(aPost: Post){
    console.log("chegou aqui delete list component");
    this._api.deletePost(aPost._id).subscribe();
  }
}
