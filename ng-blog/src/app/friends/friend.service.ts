import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Friend} from './friend'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FriendService {
  friendsCollection: AngularFirestoreCollection<Friend>

  constructor(private afs: AngularFirestore) {
    this.friendsCollection = this.afs.collection('friends', ref => 
    ref.orderBy('personA', 'desc'))
   }

   getFriends() {
     return this.friendsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Friend
        const id = a.payload.doc.id
        return {id, ...data};
      })
    }))
   }

   addFriend(data: Friend) {
     this.friendsCollection.add(data)
   }
   getFriend(id: string) {
    return this.afs.doc<Friend>(`friends/${id}`)
  }
  delete(id: string) {
    return this.getFriend(id).delete();
  }
  update(id: string, formData) {
    return this.getFriend(id).update(formData);
  }
}
