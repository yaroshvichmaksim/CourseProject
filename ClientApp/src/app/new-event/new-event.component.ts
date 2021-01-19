import { Component, Inject, OnInit} from '@angular/core';
import { DataService } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from './event';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  providers: [DataService]
})


export class EventComponent implements OnInit{

  private url = "/api/aboutevent/";
  public event: Event;
  public event2: Event;
  public event1: Event[];

  constructor(private dataService: DataService, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.event = new Event();
  }

  ngOnInit() {
    this.loadEvent();
  }

  loadEvent() {
    this.http.get('aboutevent').subscribe((result:Event[])=> {
      console.log(result);
      this.event1 = result;
      this.event2 = this.event1[0];
 
    }, error => console.error(error));

  }

  add() {
    //this.event = new Event();
    const myheaders = { 'content-type': 'application/json' }
    const body = JSON.stringify(this.event);
    console.log(this.event)
    console.log(body)
    this.http.post('api/aboutevent/addevent', body, { headers: myheaders }).subscribe(res => {
      console.log(res);

    }, error => console.error(error));

  }

}
