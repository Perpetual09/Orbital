import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Post} from '../post'
import { PostService } from '../post.service';
import { AuthService } from '../../core/auth.service'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Observable<Post[]>
  userposts: Observable<Post[]>
  constructor(private postService: PostService, public auth: AuthService) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts()
    this.posts.subscribe(x => this.count(x))
  }

  delete(id: string) {
    this.postService.delete(id)
  }

  count(posts: Post[]) {
    var ps : Post[]
    var i : number
    ps = new Array()
    for(i = 0; i < posts.length; i = i + 1) {
      if(this.auth.currentUserId === posts[i].authorId) {
        ps.push(posts[i])
      }
    }
    this.userposts = of(ps)
  }

}
