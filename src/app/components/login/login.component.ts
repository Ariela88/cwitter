import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAuth } from "firebase/auth";
import { FirebaseApp } from 'firebase/app';
import { FireappService } from 'src/app/services/fireapp.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.group({

    email: [''],
    password: [''],
    //id:['']
  })

  constructor(private fb: FormBuilder, private auth: AuthService) { }


  onSubmit() {

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;


    this.auth.login(email!,password!)
  }




}
