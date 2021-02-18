import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
  @Input() postToEdit: Post;
  @Output() CancelId = new EventEmitter();

  public editMode = false;
  public submitName = "Save Post";
  public post: Post = {_id:"", title:"", content:""};

  constructor(private _api : ApiService ) {
  }
  
  ngOnInit() {
    if(this.postToEdit !== undefined) {
      this.submitName = "Update Post";
      this.editMode = true;
      Object.assign(this.post, this.postToEdit);
    }
  }

  onSavePost(form: NgForm) {
   if (form.invalid) {
     return;
    }

    if(this.editMode === true) {
      if((this.post.title !== this.postToEdit.title)||(this.post.content !== this.postToEdit.content)) {
            this._api.updateData(this.post);
            this.onCancel();
      }
    } 
    else {
      this._api.addData(this.post);
    }
    form.resetForm();
  }
  onCancel() {
    this.CancelId.emit(this.postToEdit._id);
  }
}
