import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './event';

@Injectable()
export class DataService {

  private url = "/aboutevent";

  constructor(private http: HttpClient) {
  }

  getEvents() {
    return this.http.get(this.url);
  }

  createEvent(event: Event) {
    return this.http.post(this.url, event);
  }
}
