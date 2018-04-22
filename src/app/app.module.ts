import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';


import { AppComponent } from './app.component';

import {InterceptorModule, Interceptor, INTERCEPTORS} from "angular-http-interceptor"
import {Response, Request, HttpModule} from "@angular/http"

import {Observable} from "rxjs/Observable"
import "rxjs/add/observable/of"
import "rxjs/add/observable/empty"
import "rxjs/add/operator/delay"
import "rxjs/add/operator/mapTo"
import { Loading } from './loading';

export class MyInterceptor implements Interceptor {
  
  before(request: Request): Observable<any> {
    return Observable.empty()
  }

  after(response: Response): void {
    console.info("MyInterceptor - After")
    console.info(response)
  }

  error(error: Response): void {
    console.info("MyInterceptor - Error") 
    console.info(error)   
  }
}

export class DialogInterceptor implements Interceptor {
  
  before(request: Request): Observable<any> {
    return Observable.of("Bla") 
  }
  
  after(response: Response): void {
    window.alert(`Response from server ${response.text()} `);
  }
  
  error(error: Response): void {
    window.alert(`error from server! ${error.text()} `);
  }
}

@Injectable()
export class LoadingInterceptor implements Interceptor {

  constructor(private loading: Loading) {}

  before(request: Request): Observable<any> {

    let observable: Observable<any> = Observable.of("bla")

    if(request.url === "assets/data/loading.txt") {
      this.loading.isLoading = true
      return observable.delay(2000)
                       .mapTo(_ => "foo")
    }
    return observable
  }
  after(response: Response): void {
    this.loading.isLoading = false
    console.info("LoadingInterceptor - After")
  }
  error(error: Response): void {
    this.loading.isLoading = false
    console.info("LoadingInterceptor - Error")
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InterceptorModule.withInterceptors([
      {
        provide: INTERCEPTORS,
        useClass: MyInterceptor,
        multi: true
      }, {
        provide: INTERCEPTORS,
        useClass: DialogInterceptor,
        multi: true
      }, {
        provide: INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi: true
      }
    ])
  ],
  providers: [
    Loading
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
