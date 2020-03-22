import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(private _api : ApiService ) { }

  ngOnInit() {
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post={_id: "", title: form.value.title, content: form.value.content}; 
    this._api.addPost(post).subscribe();
    form.resetForm();
  }

}
