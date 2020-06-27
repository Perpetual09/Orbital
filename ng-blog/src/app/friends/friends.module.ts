import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { FriendService } from './friend.service';
import { FriendsChatComponent } from './friends-chat/friends-chat.component';

const routes: Routes = [
  { path: 'friendlist', component: FriendsListComponent }, 
  { path: 'chat/:id', component: FriendsChatComponent },
]

@NgModule({
  declarations: [FriendsListComponent, FriendsChatComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [FriendService]
})
export class FriendsModule { }
