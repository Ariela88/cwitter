import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { Firestore, getFirestore } from "firebase/firestore";
import { FireappService } from './fireapp.service';
import { collection, query, where, getDocs } from "firebase/firestore";



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {




  db: Firestore;

  constructor(private fireApp: FireappService) {
    this.db = getFirestore(fireApp.app)
  }


  getCwits() {

    const cwits = collection(this.db, 'cwit')
    return getDocs(cwits).then(snap => snap.docs.map(doc => {

      return {
        text: doc.data()['text'],
        url: doc.data()['url'],
        author: doc.data()['author'],
        creationTime: doc.data()['creationTime'].toDate().toUTCString()
        //.toDateString(),
      }
    }));
  }


}


