import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import { PostService } from '../post.service'
import { Observable, of } from 'rxjs';
import {Post} from '../post'
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-post-recommand',
  templateUrl: './post-recommand.component.html',
  styleUrls: ['./post-recommand.component.css']
})
export class PostRecommandComponent implements OnInit {
  posts: Observable<Post[]>
  total: number = 0
  r1: number
  r2: number
  r3: number
  p1: Post
  p2: Post
  p3: Post
  recposts: Observable<Post[]>
  constructor(private postService: PostService, public auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts()
    this.posts.subscribe(x => this.count(x))
  }

  count(posts: Post[]) {
    this.total = posts.length - 1
    if(this.total > 3) {
      this.r1 = Number((Math.random() * this.total).toFixed(0))
      this.p1 = posts[this.r1]
      do {
        this.r2 = Number((Math.random() * this.total).toFixed(0))
      } while(this.r2 === this.r1)
      this.p2 = posts[this.r2]
      do {
        this.r3 = Number((Math.random() * this.total).toFixed(0))
      } while(this.r3 === this.r1 || this.r3 === this.r2)
      this.p3 = posts[this.r3]
      this.recposts = of(new Array(this.p1, this.p2, this.p3))
    }
  }
  reloadPage() {
   window.location.reload();
  }
}
