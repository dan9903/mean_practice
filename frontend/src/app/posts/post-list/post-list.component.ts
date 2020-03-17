import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts;
  
  constructor(private _api: ApiService ) { }

  ngOnInit() {
    this._api.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

}
