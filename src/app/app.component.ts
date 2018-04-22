import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Loading } from './loading';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: Http, public loading: Loading) {}

  sendAjax() {
    this.http.get("assets/data/test.txt").subscribe()
  }
  sendError() {
    this.http.get("notfount/test.txt").subscribe()
  }

  loadingInterceptor() {
    this.http.get("assets/data/loading.txt").subscribe()
  }
}
