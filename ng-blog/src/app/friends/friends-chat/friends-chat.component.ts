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
  receiverName: string
  friends: Observable<Friend[]>
  content: string
  receiveMessages: Message[]

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
      if(friends[i].personAId === this.receiverId && friends[i].personBId === this.auth.currentUserId) {
        this.receiver = friends[i].personA
        this.receiverName = friends[i].nameAToB
      }
      if(friends[i].personBId === this.receiverId && friends[i].personAId === this.auth.currentUserId) {
        this.receiver = friends[i].personB
        this.receiverName = friends[i].nameBToA
      }
    }
  }

  getUserMessages(messages: Message[]) {
    this.userMessages = of(messages.filter(m => this.predicate(m)))
    this.receive(messages)
  }

  predicate(m: Message) {
    return (this.auth.currentUserId === m.receiverId && this.receiverId === m.senderId) ||
     (this.auth.currentUserId === m.senderId && this.receiverId === m.receiverId)
  }

  receive(messages: Message[]) {
    var i;
    this.receiveMessages = new Array(messages.length)
    for(i = 0; i < messages.length; i++) {
      if(messages[i].receiverId === this.auth.currentUserId && messages[i].senderId === this.receiverId) {
        this.receiveMessages.push(messages[i])
      }
    }
    this.readAll();
  }

  createMessage() {
    const data = {
      sender: this.auth.authState.displayName,
      senderId: this.auth.currentUserId,
      receiver: this.receiver,
      receiverId: this.receiverId,
      time: new Date(),
      content: this.content,
      read: false
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

  readAll() {
    var i;
    for(i = 0; i < this.receiveMessages.length; i++) {
      if(this.receiveMessages[i] !== undefined && !this.receiveMessages[i].read) {
        this.messageServeice.update(this.receiveMessages[i].id)
      }
    }
  }
}
