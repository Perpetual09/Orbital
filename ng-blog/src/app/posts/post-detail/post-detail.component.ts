import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import { PostService } from '../post.service'
import { FriendService } from '../../friends/friend.service' 
import {Post} from '../post'
import { AuthService } from 'src/app/core/auth.service';
import { Friend } from 'src/app/friends/friend';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: Post
  editing: boolean = false
  friends: Observable<Friend[]>
  relation: boolean = false
  self: boolean = false
  id: string

  constructor(private route: ActivatedRoute, private postServeice: PostService, private friendService: FriendService,
    private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
    this.getPost()
    this.friends = this.getFriends()
    this.friends.subscribe(x => this.isFriend(x))
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id')
    this.postServeice.getPostData(id).subscribe(data => this.post = data)
  } 

  delete() {
    const id = this.route.snapshot.paramMap.get("id");
    this.postServeice.delete(id)
    this.router.navigate(["/blog"])
  }

  updatePost() {
    const formData = {
      title: this.post.title,
      content: this.post.content
    }
    const id = this.route.snapshot.paramMap.get("id");
    this.postServeice.update(id, formData)
    this.editing = false
  }

  addFriend() {
    const data = {
      personA: this.auth.authState.displayName || this.auth.authState.email,
      personAId: this.auth.currentUserId,
      personB: this.post.author,
      personBId: this.post.authorId
    }
    this.friendService.addFriend(data)
    window.alert("add friends successfully")
  }

  getFriends() {
    return this.friendService.getFriends()
  }

  isFriend(friends: Friend[]) {
    var i: number
    for(i = 0; i < friends.length; i++) {
      if(this.auth.currentUserId === this.post.authorId) {
        this.self = true
        break
      }
      if((friends[i].personAId === this.auth.currentUserId && friends[i].personBId === this.post.authorId) || 
        (friends[i].personBId === this.auth.currentUserId && friends[i].personAId === this.post.authorId)) {
        this.relation = true
        this.id = friends[i].id
        break
      }
    }
  }

  deleteFriend() {
    this.friendService.delete(this.id)
    this.reloadPage()
  }

  reloadPage() {
    window.location.reload();
  }
}
