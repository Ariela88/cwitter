import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isLogged:boolean = true
  constructor(private auth:AuthService){  }
user?:User

logOut(){
  this.auth.logout()
  this.isLogged = false
}



}
