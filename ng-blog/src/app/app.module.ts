import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireStorageModule } from 'angularfire2/storage'
import { AngularFireAuthModule } from 'angularfire2/auth'

import { environment } from '../environments/environment'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { MatSliderModule } from '@angular/material/slider';
import { PostsModule } from './posts/posts.module';
import { RouterModule, Routes } from '@angular/router';
import { FriendsModule } from './friends/friends.module';

const routes: Routes = [
  { path: '', redirectTo: '/recommand', pathMatch: 'full'},
  { path: '', loadChildren: './posts/posts.module#PostModule'}
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    MatSliderModule,
    PostsModule,
    FriendsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
