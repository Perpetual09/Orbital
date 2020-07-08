import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs'

import {Friend} from '../friend'
import { FriendService } from '../friend.service';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { User } from '../user';
import { stringify } from 'querystring';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {
  friends: Observable<Friend[]>
  arr: Friend[]
  uFriends: Observable<User[]>
  ids: string[] = new Array()
  name: string

  constructor(private friendService: FriendService, public auth: AuthService) { }

  ngOnInit(): void {
    this.friends = this.friendService.getFriends()
    this.friends.subscribe(x => this.userFriends(x))
  }

  userFriends(friends: Friend[]) {
    this.arr = friends
    this.uFriends = of(friends.filter(x => this.predicate(x)).map(x => this.mapper(x)))
  }

  predicate(f: Friend) {
    this.ids.push(f.id)
    return f.personAId === this.auth.currentUserId || f.personBId === this.auth.currentUserId
  }

  mapper(f: Friend) {
    const u = {
      name: '',
      id: ''
    }
    if(f.personAId === this.auth.currentUserId) {
      u.name = f.nameBToA
      u.id = f.personBId
    } else {
      u.name = f.nameAToB
      u.id = f.personAId
    }
    return u;
  }

  delete(i: number) {
    this.friendService.delete(this.ids[i])
    window.alert("delete friend successfully")
  }

  update(i: number) {
    var formData
    const f = this.arr[i]
    if(f.personAId === this.auth.currentUserId) {
      formData = {
        nameBToA: this.name
      }
    } else {
      formData = {
        nameAToB: this.name
      }
    }
    this.friendService.update(this.ids[i], formData)
    this.name=''
  }

  reloadPage() {
    window.location.reload();
  }
}
