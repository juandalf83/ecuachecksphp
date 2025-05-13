import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Needed for Touch functionality of Material Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { PendingInterceptorModule } from '../@fury/shared/loading-indicator/pending-interceptor.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { CanActivateViaAuthGuard } from './guards/guard.service';
import { UserLoggerService } from './pages/authentication/user_logger/user_logger.service';
import { LoginService } from './pages/authentication/login/login.service';
import { HelperService } from './guards/helper.service';
import { AlertService } from './pages/apps/alerts/alerts.service';

// import { DashboardService } from './pages/dashboard/dashboard.service';
import { UserService } from './services/user.service';
import { CompaniesService } from './services/companies.service';
import { ConsultationsService } from './services/consultations.service';
import { RolesService } from './services/roles.service';
import { PlansService } from './services/plans.service';
import { QueryService } from './services/query.service';
import { ContractsService } from './services/contracts.service';
import { RulesService } from './services/rules.service';

import { NetworkStatusComponent } from './components/network-status/network-status.component';

import { ConfirmAlertModule } from './pages/apps/alerts/confirm-alert.module';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from 'src/environments/environment.prod';

@NgModule({
  imports: [
    // Angular Core Module // Don't remove!
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Fury Core Modules
    AppRoutingModule,

    // Layout Module (Sidenav, Toolbar, Quickpanel, Content)
    LayoutModule,

    // Displays Loading Bar when a Route Request or HTTP Request is pending
    PendingInterceptorModule,

    // Register a Service Worker (optional)
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabaseModule,
    ConfirmAlertModule,
  ],
  declarations: [AppComponent, NetworkStatusComponent],
  bootstrap: [AppComponent],
  providers: [
    CanActivateViaAuthGuard,
    UserLoggerService,
    AlertService,
    UserService,
    CompaniesService,
    ConsultationsService,
    RolesService,
    LoginService,
    HelperService,
    // DashboardService,
    PlansService,
    QueryService,
    ContractsService,
    RulesService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill'
      } as MatFormFieldDefaultOptions
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom'
      } as MatSnackBarConfig
    }
  ]
})
export class AppModule {
}
