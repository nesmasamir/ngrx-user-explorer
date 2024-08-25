import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheInterceptorInterceptor implements HttpInterceptor {

  constructor() { }
  // private _cache: Map<HttpRequest<any>, HttpResponse<unknown>> = new Map<string, any>();
  // public get cache(): Map<HttpRequest<any>, HttpResponse<unknown>> {
  //   return this._cache;
  // }
  // public set cache(value: Map<HttpRequest<any>, HttpResponse<unknown>>) {
  //   this._cache = value;
  // }

  private cache = new Map<string, any>();

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.method !== 'get') {

      return next.handle(request);
    }


    const cashedRes = this.cache.get(request.urlWithParams);
    if (cashedRes) {
      return of(cashedRes)
    }


    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(request.urlWithParams, event)
        }
      })
    )

  }
}
