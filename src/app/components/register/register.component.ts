import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OurUser } from 'src/app/model/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    username:[''],
    email:[''],
    password:[''],
    //id:['']
  })

  constructor(private fb:FormBuilder, private auth:AuthService){}


onSubmit(){

const email = this.registerForm.value.email;
const password = this.registerForm.value.password;
const ourUser: OurUser = {
  username:this.registerForm.value.username!
}

  this.auth.registerUser(ourUser, password!,email!)
}

}
