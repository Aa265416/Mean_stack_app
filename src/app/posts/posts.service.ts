import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators"
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class PostService{
   private posts: Post[] = [];
   private postUpdated = new Subject<Post[]>();

   constructor(private http:HttpClient, private router: Router){}

 getPost(){
    //return [...this.posts]
    //new array created using spread. Create reference type. original array stay unaffected

    this.http.get<{message:string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) =>{
      return postData.posts.map((post: { title: any; content: any; _id: any; }) =>{
         return {
            title: post.title,
            content: post.content,
            id: post._id
         }
      })
    }) )
    .subscribe((transformedPost) => {
      this.posts = transformedPost;
      this.postUpdated.next([...this.posts])
    })
 }
 
 getPostUpdateListerner(){
    return this.postUpdated.asObservable();
 }

 addPost(title:string, content:string){
    const post:Post = { id: null, title: title, content: content};
    this.http.post<{message: string, postId: string}>("http://localhost:3000/api/posts", post)
    .subscribe((responseData) =>{
      //console.log(responseData.message);
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postUpdated.next([...this.posts]); 
      this.router.navigate(["/"]);    
    })
 }

 deletePost(PostId:string | null){
   this.http.delete('http://localhost:3000/api/posts/' + PostId)
   .subscribe(() =>{
     // console.log('Deleted');
     const updatedPosts = this.posts.filter(post => post.id !== PostId)
     this.posts = updatedPosts;
     this.postUpdated.next([...this.posts])
   })
 }

 getPostById(id: string | null){
   return this.http.get<{_id:string, title:string, content:string}>('http://localhost:3000/api/posts/' + id)
 }

 updatePost(id: string , title: string, content: string){
  const post: Post = {id: id, title: title, content: content};
  this.http.put('http://localhost:3000/api/posts/' + id, post)
  .subscribe(response => {
   const updatedPosts = [...this.posts];
   const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
   updatedPosts[oldPostIndex] = post;
   this.posts = updatedPosts;
   this.postUpdated.next([...this.posts]);
   this.router.navigate(["/"]);
  });   
}
  
}