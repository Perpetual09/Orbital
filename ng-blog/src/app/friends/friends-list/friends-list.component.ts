import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs'

import {Friend} from '../friend'
import { FriendService } from '../friend.service';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {
  friends: Observable<Friend[]>
  uFriends: Observable<string[]>
  ids: string[] = new Array()

  constructor(private friendService: FriendService, public auth: AuthService) { }

  ngOnInit(): void {
    this.friends = this.friendService.getFriends()
    this.friends.subscribe(x => this.userFriends(x))
  }

  userFriends(friends: Friend[]) {
    this.uFriends = of(friends.filter(x => this.predicate(x)).map(x => this.mapper(x)))
  }

  predicate(f: Friend) {
    this.ids.push(f.id)
    return f.personAId === this.auth.currentUserId || f.personBId === this.auth.currentUserId
  }

  mapper(f: Friend) {
    return f.personAId === this.auth.currentUserId ? f.personBId : f.personAId
  }

  delete(i: number) {
    this.friendService.delete(this.ids[i])
    window.alert("delete friend successfully")
  }

  reloadPage() {
    window.location.reload();
  }
}
