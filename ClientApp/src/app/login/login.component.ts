import { Component, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { FormBuilder, Validators } from '@angular/forms';
import { NavBarService } from 'src/app/services/navVisible.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})


export class LoginComponent {

  public username: string;
  public password: string;
  loginForm;
  isError = false;

  constructor(private http: HttpClient, private authservice: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  public isLoggedIn(loginData) {
    console.log(loginData);
    this.authservice.login(loginData.username.toString(), loginData.password.toString()).subscribe(res => {
      this.router.navigate(['']);

    }, error => {
        console.log(error);
    });
  }

  get _username() {
    return this.loginForm.get("username");
  }

  get _password() {
    return this.loginForm.get("password");
  }
}
