import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
posts:Post[] = [];
private postSubb!: Subscription;

constructor(private postService: PostsService ){}

ngOnInit(): void {
  this.postService.getPosts();  
  this.postSubb = this.postService.getPostUpdateListner().subscribe((posts: Post[]) => {
    this.posts = posts;
  });
}

onDelete(postId:string | null){
this.postService.deletePost(postId);
}

ngOnDestroy(): void {
 this.postSubb.unsubscribe();
}

}
