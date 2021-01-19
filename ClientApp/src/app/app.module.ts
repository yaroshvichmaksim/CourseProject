import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CardEventComponent } from './event/event.component';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './new-event/new-event.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { GoogleMapComponent } from './googlemap/googlemap.component';
import { AvailableEventsComponent } from './available-events/available-events.component';
import { AUTH_API_URL } from './app-injection-tokens';
import { environment } from '../environments/environment';
import { JwtModule } from '@auth0/angular-jwt'
import { ACCESS_TOKEN_KEY } from './services/auth.service';

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    EventComponent,
    LoginComponent,
    RegistrationComponent,
    AvailableEventsComponent,
    GoogleMapComponent,
    CardEventComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAI8-m3RdKekpagiQofMSHpT01RaW37nBg'
    }),

    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'new-event', component: EventComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'available-events', component: AvailableEventsComponent },
    ]),

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenWhiteListdDomians
      }
    })
  ],
  providers: [{
    provide: AUTH_API_URL,
    useValue: environment.authApi
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
