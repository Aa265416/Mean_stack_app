import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  enteredTitle='';
  enteredValue='';
  public post!: Post;
  
 
  private postId: string | null = null;
  public mode: string = 'create';

  constructor(public postService: PostService, public route: ActivatedRoute){}

  ngOnInit(): void {
   this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if(paramMap.has('postId')){
      this.mode = 'edit';
      this.postId = paramMap.get('postId');
      const fetchedPost = this.postService.getPostById(this.postId);
      if (fetchedPost) {
        this.post = {
          id: fetchedPost.id || '',
          title: fetchedPost.title || '',
          content: fetchedPost.content || ''
        };
      }
      console.log('Fetched post:', this.post);
    } else {
      this.mode = 'create';
      this.postId = null;
      console.log('No postId found in the route');
    }
   })
  }

  onSavePost(form: NgForm){
    if(form.invalid){
      return;
    }
  // const post: Post = {
  //   title: form.value.title,
  //   content: form.value.content
  //  }
  if(this.mode === 'create'){
    this.postService.addPost(form.value.title, form.value.content);
  } else {
    if (this.postId) {
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    }
  }
   form.resetForm();
  }
}
