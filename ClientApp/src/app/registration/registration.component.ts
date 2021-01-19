import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})


export class RegistrationComponent {

  public username: string;
  public email: string;
  public password: string;
  public passwordrepeat: string;
  registrForm;
  isRegister = false;
  isNotRegister = false;



  constructor(private http: HttpClient, private authservice: AuthService, @Inject('BASE_URL') private baseUrl: string, private router: Router, private formBuilder: FormBuilder) {
    this.registrForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordrepeat: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
    })
  }
  registration(registr) {
    //let myheaders = new HttpHeaders();
    //myheaders.set("Content-Type", "application/json");
    //const body = { username: registr.username.toString(), email: registr.email.toString(), password: registr.password.toString() };
    const body = new FormData();
    body.append('username', registr.username);
    body.append('email', registr.email);
    body.append('password', registr.password);
    console.log(body);
    this.http.post('api/auth/register', body).subscribe(result => {
      // @ts-ignore
      if (result.status === 'Success') {
        this.isRegister = true;
        this.isNotRegister = false;
        this.registrForm.reset();
        this.router.navigate(['']);
      } else {
        this.isRegister = false;
        this.isNotRegister = true;
      }
    }
    );
  }

  get _username() {
    return this.registrForm.get("username");
  }

  get _password() {
    return this.registrForm.get("password");
  }

  get _passwordrepeat() {
    return this.registrForm.get("passwordrepeat");
  }

  get _email() {
    return this.registrForm.get("email");
  }
}
