import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  constructor(private postService: PostsService){}

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
    this.postService.addPost(form.value.title, form.value.content);
   form.resetForm();
  }
}
