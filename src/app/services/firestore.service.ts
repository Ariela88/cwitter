import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { Firestore, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { FireappService } from './fireapp.service';
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { OurUser } from '../model/user';



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

      }
    }));
  }

  postOurUser(ouruser: OurUser, uid: string) {

  const docUrl = doc(this.db, 'user', uid)
   return setDoc(docUrl, ouruser)


  }


  getOurUser(uid:string){
    const docUrl = doc(this.db, 'user', uid)
    return getDoc(docUrl)
  }

}


