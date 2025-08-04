/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as Sentry from "@sentry/angular-ivy";

@Injectable()
export class MonitoringInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime: Date = new Date();
    return next.handle(req)
      .pipe(tap((response: HttpResponse<any>): void => {
        this.logRequestTime(req, response, startTime)
      }),);
  }

  private logRequestTime(
    request: HttpRequest<any>,
    response: HttpResponse<any>,
    startTime: Date
  ): void {
    if (!request || !request.url) {
      return;
    }
    const endTime: Date = new Date();
    const duration: number = (endTime.valueOf() - startTime.valueOf()) / 1000;

    /**
     * If you want you can add a threshold here to only log requests if they are slower than X seconds
     *
     * if (duration < 1) {
     *  return;
     * }
     */

    /**
     * This is just an example, feel free to add/replace any meta information you need
     */
    const dataToLog: Record<string, number | string> = {
      duration,
      params: request.params.toString(),
      method: request.method,
      requestUrl: request.url,
      // this is useful in cases of redirects
      responseUrl: response.url,
    };

    console.log(dataToLog);


  }
}


