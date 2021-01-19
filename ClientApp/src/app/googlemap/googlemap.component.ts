import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-google-map',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})

export class GoogleMapComponent{
  lat = 53.873294;
  lng = 27.552618;
  locationChoosen = true;
  url = "https://maps.googleapis.com/maps/api/geocode/json?place_id=";

  constructor(private http: HttpClient) { }

  onChoseLocation(data) {
    console.log(data);
    this.lat = data.coords.lat;
    this.lng = data.coords.lng;
    this.locationChoosen = true;
    console.log(data.placeId);
    if (data.placeId != "undefined") {
      this.url += data.placeId + "&key=" + "AIzaSyAI8-m3RdKekpagiQofMSHpT01RaW37nBg";
      this.http.get(this.url).subscribe(result => {
        console.log(result);
        })
     
    }
  }
}
