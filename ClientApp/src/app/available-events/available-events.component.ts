import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Event } from 'src/app/new-event/event';
import { NavBarService } from 'src/app/services/navVisible.service';

@Component({
  selector: 'app-available-events',
  templateUrl: './available-events.component.html',
})


export class AvailableEventsComponent implements OnInit, OnDestroy {

  private url = "/aboutevent";
  public event: Event;
  public event2: Event;
  public event1: Event[];

  constructor(private http: HttpClient, private navShow: NavBarService) {
  }

  ngOnInit() {
    this.loadEvents();
    this.navShow.show();
  }
  loadEvents() {
    return this.http.get("api/aboutevent/getevents").subscribe(
      (result: Event[]) => {
        this.event1 = result;
        console.log(result);
        console.log(this.event1);
      }
    )
  }
  ngOnDestroy() {
    this.navShow.hide();
  }
}
