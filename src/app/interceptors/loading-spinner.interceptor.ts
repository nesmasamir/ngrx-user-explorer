import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderSpinnerService } from '../services/loader-spinner.service';

@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {

  constructor(private loaderSpinner: LoaderSpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.loaderSpinner.show();
    return next.handle(request).pipe(
      finalize(() => {
        this.loaderSpinner.hide();
      })
    )
  }
}
