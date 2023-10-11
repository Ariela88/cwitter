import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AppComponent } from 'src/app/app.component';
import { Cwit } from 'src/app/model/cwit';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  cwits:Cwit[]=[]
  constructor(private firestore:FirestoreService){}


  ngOnInit(): void {
   this.firestore.getCwits().then(data => this.cwits = data as Cwit[])
  }

}


// prima cosa: viene avviata AppComponent,
// il mio AppComponent, renderizza l'html,
// trova router OutletContext, va nel routing module e capisce che deve aprire la Home
// per caricare l'homecomponent, Home component usa il costruttore per costruire il FirestoreService perchè è nel suo costruttore.
// Ma per usare il FirestoreService, ho bisogno del file APP, quindi ho bisogno del di FireappService, e non avendo nulla nel costruttore, inizializza il file app e costruisce il DB
// Una volta che app è pronta posso tornare indietro e finire di costruire il mio fireStoreService.
//A questo PushSubscriptionOptions, il ciclo torna all'homecomponent
//

