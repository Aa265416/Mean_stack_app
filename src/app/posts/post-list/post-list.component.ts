import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
posts: Post[] = [];
isLoading = false;
totalPosts = 0;
postsPerPage = 2;
currentPage = 1;
pageSizeOptions = [1, 2, 5, 10]; 
private postSub!: Subscription;

constructor(public postSerice: PostService){}
  ngOnDestroy(): void {
    this.postSub.unsubscribe()
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.postSerice.getPost(this.postsPerPage, this.currentPage);
    this.postSub = this.postSerice.getPostUpdateListerner()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
      this.isLoading = false;
      this.posts = postData.posts;
      this.totalPosts = postData.postCount;
    })
  }
  onDeletePost(postId:string | null){
    this.isLoading = true;
    this.postSerice.deletePost(postId).subscribe(() => {
    this.postSerice.getPost(this.postsPerPage, this.currentPage);
    })
  }
  onChangedPage(pageData: PageEvent){
    console.log(pageData);
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postSerice.getPost(this.postsPerPage, this.currentPage);
  }

}
