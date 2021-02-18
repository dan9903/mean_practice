import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

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
    this.posts = this._api.getData();
  }

  onEdit(aIdPost: string){
    this.postsEdit.push(aIdPost);
  }
  onDelete(aIdPost: string){
    if( window.confirm("Are you sure?")) {
      this._api.deleteData(aIdPost);
      this.posts = this._api.getData();
    }
  }
  cancelEdition(aIdPost: string) {
   const index: number = this.postsEdit.indexOf(aIdPost);
    if(index !== -1) {
      this.postsEdit.splice(index, 1);
    }
  }
}
