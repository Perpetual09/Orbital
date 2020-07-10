import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service'
import { MessageService } from 'src/app/friends/message.service';
import { FriendService } from 'src/app/friends/friend.service';
import { Observable } from 'rxjs';
import { Message } from 'src/app/friends/message';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor( public auth: AuthService) { }
  ngOnInit(): void {

  }
}
