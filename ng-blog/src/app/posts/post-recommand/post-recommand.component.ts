import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import { PostService } from '../post.service'
import { Observable, of } from 'rxjs';
import {Post} from '../post'
import { AuthService } from 'src/app/core/auth.service';
import { Friend } from 'src/app/friends/friend';
import { FriendService } from 'src/app/friends/friend.service';
import { MessageService } from 'src/app/friends/message.service';
import { Message } from 'src/app/friends/message';

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
  ps: Post[] = new Array(3)
  recposts: Observable<Post[]>
  friends: Observable<Friend[]>
  ids: string[]
  unread: boolean

  constructor(private messageServeice: MessageService, private friendService: FriendService, private postService: PostService, public auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts()
    this.friends = this.friendService.getFriends()
    this.friends.subscribe(x => this.userFriends(x))
  }

  count(posts: Post[]) {
    this.total = posts.length - 1
    var friendPosts = new Array(Post.length)
    if(this.total > 3) {
      var i, j;
      for(i = 0; i < this.ids.length; i++) {
        for(j = 0; j < posts.length; j++) {
          if(posts[j].authorId === this.ids[i]) {
            friendPosts.push(posts[j])
          }
        }
      }
      if(friendPosts.length != 0) {
        this.r1 = Number((Math.random() * (friendPosts.length - 1)).toFixed(0))
        this.ps[0] = friendPosts[this.r1]
      } else {
        do {
          this.r1 = Number((Math.random() * this.total).toFixed(0))
        } while(posts[this.r1].authorId === this.auth.currentUserId)
        this.ps[0] = posts[this.r1]
      }
      do {
        this.r2 = Number((Math.random() * this.total).toFixed(0))
      } while(posts[this.r2].authorId === this.auth.currentUserId || this.ps[0] === posts[this.r2])
      this.ps[1] = posts[this.r2]
      do {
        this.r3 = Number((Math.random() * this.total).toFixed(0))
      } while(this.ps[0] === posts[this.r3] || this.ps[1] === posts[this.r3] || posts[this.r3].authorId === this.auth.currentUserId)
      this.ps[2] = posts[this.r3]
      this.recposts = of(this.ps)
    } else {
      console.log("Inadequate data in database, please add more posts.")
    }
    this.messageServeice.getMessages().subscribe(x => this.checkUnread(x))
  }

  userFriends(friends: Friend[]) {
    var i;
    this.ids = new Array(friends.length)
    for(i = 0; i < friends.length; i++) {
      if(friends[i].personAId === this.auth.currentUserId) {
        this.ids.push(friends[i].personBId)
      }
      if(friends[i].personBId === this.auth.currentUserId) {
        this.ids.push(friends[i].personAId)
      }
    }
    this.posts.subscribe(x => this.count(x))
  }

  checkUnread(messages: Message[]) {
    var i;
    for(i = 0; i < messages.length; i++) {
      if(messages[i].receiverId === this.auth.currentUserId && !messages[i].read) {
        console.log(messages)
        window.alert("Notice: you have unread messages")
        break
      }
    }
  }
  
  reloadPage() {
   window.location.reload();
  }
}
