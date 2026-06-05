/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  
  isLoaded: boolean = false;

  
  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    auth: NbAuthService,
    userStore: UserStore,
    initService: InitUserService,
  ) {
    auth.isAuthenticated().subscribe(isLoggedIn => {
      if (isLoggedIn === true) {
        if (!userStore.getUser()) {
          initService.initCurrentUser().subscribe((user) => {
            this.isLoaded = user?.id > 0;
          });
        }
      } else {
        this.isLoaded = true;
      }
    });
  }
  

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}
