import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
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
  isLoading = false;
  form!: FormGroup;
  public post: Post | null = null;
  
 
  private postId: string | null = null;
  public mode: string = 'create';

  constructor(public postService: PostService, public route: ActivatedRoute){}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(10)] }),
      content: new FormControl(null, { validators: [Validators.required] })
    });
   this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if(paramMap.has('postId')){
      this.mode = 'edit';
      this.postId = paramMap.get('postId');
      this.isLoading = true;
      this.postService.getPostById(this.postId).subscribe(postData => {
        this.isLoading = false;
        this.post = {
          id: postData._id,
          title: postData.title,
          content: postData.content
        };
        this.form.setValue({
          title: this.post.title,
          content: this.post.content
        });
      });
      console.log('Fetched post:', this.post);
    } else {
      this.mode = 'create';
      this.postId = null;
      console.log('No postId found in the route');
    }
   })
  }

  onImagePicked(event: Event) {
    
  }

  onSavePost(){
    if(this.form.invalid){
      return;
    }
  // const post: Post = {
  //   title: form.value.title,
  //   content: form.value.content
  //  }
  this.isLoading = true;
  if(this.mode === 'create'){
    this.postService.addPost(this.form.value.title, this.form.value.content);
  } else {
    if (this.postId) {
      this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content);
    }
  }
   this.form.reset();
  }
}
