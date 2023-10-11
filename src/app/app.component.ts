import { Component, OnInit } from '@angular/core';
import { firebaseConfig } from './firebase-config';
import { initializeApp } from "firebase/app";
import { FirestoreService } from './services/firestore.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'cwitter';


  ngOnInit(): void {

  }

}
