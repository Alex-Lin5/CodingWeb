import { Component } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../authdata.model';
import { User } from '../user.model';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    public fb: FormBuilder,
    public authService: AuthService
    ){}
  signupForm = this.fb.group({
    name: '',
    email: '',
    password: ''
  })
  onSignup(){
    // if (form.invalid) return undefined;
    const data: User = {
      username: this.signupForm.value.name,
      email: this.signupForm.value.email, 
      password: this.signupForm.value.password
    } as User
    this.authService.signup(data);
  }

}
