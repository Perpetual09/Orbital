import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import { FriendService } from '../friend.service' 
import { MessageService } from '../message.service'
import { AuthService } from 'src/app/core/auth.service';
import { Friend } from 'src/app/friends/friend';
import { Message } from '../message'
import { Observable, of } from 'rxjs';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface,PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';


@Component({
  selector: 'app-friends-chat',
  templateUrl: './friends-chat.component.html',
  styleUrls: ['./friends-chat.component.css']
})
export class FriendsChatComponent implements OnInit {

  userMessages: Observable<Message[]>
  receiverId: string
  receiver: string
  friends: Observable<Friend[]>
  content: string

  constructor(private route: ActivatedRoute, private messageServeice: MessageService, private friendService: FriendService,
    private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
    this.messageServeice.getMessages().subscribe(x => this.getUserMessages(x))
    this.friends = this.friendService.getFriends()
    this.receiverId = this.route.snapshot.paramMap.get("id")
    this.findName(this.receiverId)
  }

  findName(id: string) {
    this.friends.subscribe(x => this.assign(x))
  }

  assign(friends: Friend[]) {
    var i: number
    for(i = 0; i < friends.length; i++) {
      if(friends[i].personAId === this.receiverId) {
        this.receiver = friends[i].personA
      }
      if(friends[i].personBId === this.receiverId) {
        this.receiver = friends[i].personBId
      }
    }
  }

  getUserMessages(messages: Message[]) {
    this.userMessages = of(messages.filter(m => this.predicate(m)))
  }

  predicate(m: Message) {
    return (this.auth.currentUserId === m.receiverId && this.receiverId === m.senderId) ||
     (this.auth.currentUserId === m.senderId && this.receiverId === m.receiverId)
  }

  createMessage() {
    const data = {
      sender: this.auth.authState.displayName,
      senderId: this.auth.currentUserId,
      receiver: this.receiver,
      receiverId: this.receiverId,
      time: new Date(),
      content: this.content
    }
    this.initialize()
    this.messageServeice.addMessage(data)
  }

  initialize() {
    this.content = ''
  }

  isSender(m: Message) {
    return this.auth.currentUserId === m.senderId
  }
}
