import { Injectable } from '@angular/core';
import { FireappService } from './fireapp.service';
import { Auth, User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { OurUser } from '../model/user';
import { FirestoreService } from './firestore.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: Auth;

  ourUser = new BehaviorSubject<OurUser | null>(null)
  fireBaseUser = new BehaviorSubject<User | null>(null)

  constructor(private fireApp: FireappService, private fireStore: FirestoreService) {
    this.auth = getAuth(fireApp.app)

    onAuthStateChanged(this.auth, (user) => {
      console.log('autenticazione cambiata')
      if (user) {
        const uid = user.uid;
        this.fireBaseUser.next(user)
        this.fireStore.getOurUser(uid).then(ourU => this.ourUser.next(ourU.data() as OurUser))


        console.log(user)
      } else {

        this.fireBaseUser.next(null)
        console.log('user non c è')
        this.ourUser.next(null)
      }
    });
  }

  registerUser(newUser: OurUser, password: string, email: string) {

    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;

        this.fireStore.postOurUser(newUser, user.uid).then(()=>{this.ourUser.next(newUser)})

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errore di registrazione', errorCode, errorMessage)
      });


  }

  login(email: string, password: string) {
    console.log(email, password)
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('login eseguita', user);
        this.fireStore.getOurUser(user.uid)

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errore login', errorMessage)
      });
  }


  logout() {
    signOut(this.auth).then(() => {

    }).catch((error) => {

    });
  }






}
