import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
posts: Post[] = [];
private postSub!: Subscription;

constructor(public postSerice: PostService){}
  ngOnDestroy(): void {
    this.postSub.unsubscribe()
  }
  ngOnInit(): void {
    this.postSerice.getPost();
    this.postSub = this.postSerice.getPostUpdateListerner()
    .subscribe((posts: Post[]) => {
this.posts = posts;
    })
  }
  onDeletePost(postId:string | null){
 this.postSerice.deletePost(postId)
  }

}
