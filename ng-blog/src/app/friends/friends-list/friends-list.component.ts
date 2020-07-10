import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs'

import {Friend} from '../friend'
import { FriendService } from '../friend.service';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { User } from '../user';
import { MessageService } from '../message.service';
import { Message } from '../message';

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
  unreadMessages: Message[]

  constructor(private messageServeice: MessageService, private friendService: FriendService, public auth: AuthService) { }

  ngOnInit(): void {
    this.friends = this.friendService.getFriends()
    this.messageServeice.getMessages().subscribe(x => this.getUnreadMessages(x))
  }

  getUnreadMessages(messages: Message[]) {
    var i;
    this.unreadMessages = new Array(messages.length)
    for(i = 0; i < messages.length; i++) {
      if(messages[i].receiverId === this.auth.currentUserId && !messages[i].read) {
        this.unreadMessages.push(messages[i])
      }
    }
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
    var read = true
    var i;
    const u = {
      name: '',
      id: '',
      read: read
    }
    if(f.personAId === this.auth.currentUserId) {
      u.name = f.nameBToA
      u.id = f.personBId
    } else {
      u.name = f.nameAToB
      u.id = f.personAId
    }
    for(i = 0; i < this.unreadMessages.length; i++) {
      if(this.unreadMessages[i] !== undefined && this.unreadMessages[i].senderId === u.id) {
        u.read = false;
        return u;
      }
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
