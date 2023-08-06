import { Component } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../authdata.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    public fb: FormBuilder,
    public authService: AuthService
    ){}
  loginForm = this.fb.group({
    email: '',
    password: ''
  })
  onLogin(){
    // if (form.invalid) return undefined;
    const data: AuthData = {
      email: this.loginForm.value.email, 
      password: this.loginForm.value.password
    } as AuthData
    this.authService.login(data);
  }
}
