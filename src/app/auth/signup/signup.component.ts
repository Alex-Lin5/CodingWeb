import { Component } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../authdata.model';


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
    email: '',
    password: ''
  })
  onSignup(){
    // if (form.invalid) return undefined;
    const data: AuthData = {
      email: this.signupForm.value.email, 
      password: this.signupForm.value.password
    } as AuthData
    this.authService.login(data);
  }

}
