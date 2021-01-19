import { Component, Inject, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Event } from 'src/app/new-event/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
})

export class CardEventComponent{

  @Input() event;
  isDelete = false;

  constructor(private http: HttpClient) {
    
  }

  loadEvents() {
    return this.http.get("api/aboutevent/getevents").subscribe(
      (result: Event[]) => {
        this.event = result;
        console.log(result);
        console.log(this.event);
      }
    )
  }

  Delete(id) {
    this.http.delete('api/aboutevent/deleteevent?id=' + id).subscribe(result => {
      console.log(result);
      this.isDelete = true;
      if (result === 'Success') {
        this.loadEvents();
        
      }

    }, error => console.error(error));
  }

  EditPage() {
    
  }
}
