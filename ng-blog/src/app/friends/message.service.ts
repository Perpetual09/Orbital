import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Message} from './message'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messagesCollection: AngularFirestoreCollection<Message>
  constructor(private afs: AngularFirestore) {
    this.messagesCollection = this.afs.collection('messages', ref => 
    ref.orderBy('time', 'asc'))
   }

   getMessages() {
    return this.messagesCollection.snapshotChanges().pipe(map(actions => {
     return actions.map(a => {
       const data = a.payload.doc.data() as Message
       const id = a.payload.doc.id
       return {id, ...data};
     })
   }))
  }

  addMessage(data: Message) {
    this.messagesCollection.add(data)
  }
  
}
