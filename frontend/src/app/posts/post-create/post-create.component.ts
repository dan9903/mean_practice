import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @Input() postToEdit: Post;
  @Output() savedItem : EventEmitter<any> = new EventEmitter();
  @Output() CancelId = new EventEmitter();

  public editMode = false;
  public submitAction = "Save Post";
  public post: Post = {_id:null, title:null, content:null};

  constructor(private _api : ApiService ) {
  }
  
  ngOnInit() {
    if(this.postToEdit !== undefined) {
      this.submitAction = "Update Post";
      this.editMode = true;
      Object.assign(this.post, this.postToEdit);
    }
  }
  onSavePost(form: NgForm) {
   if (form.invalid) {
     return;
    }
    if(this.editMode === true) {
      if( (this.post.title !== this.postToEdit.title) || (this.post.content !== this.postToEdit.content) ) {
        this._api.updatePost(this.post).subscribe();
      } 
    } else {
      /*salvando mas n tá atualizando a lista sem atualizar a página*/
      var dados;
        this._api.addPost(this.post).subscribe((data)=>{
          dados = data;
        });
    }
    console.log(dados);
    this.savedItem.emit(this.post);
    form.resetForm();
  }
  onCancel() {
    this.CancelId.emit(this.postToEdit._id);
  }
}
