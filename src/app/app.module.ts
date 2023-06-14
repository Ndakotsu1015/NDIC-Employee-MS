import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppState } from './store/app.state';
import { AppNotificationEffect } from './store/notification/app-notification.effect';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { UiModule } from './main/ui/ui.module';
import { httpInterceptorProviders } from './api/interceptors/interceptors';
import { appReducer } from './store/app.reducer';
import { EmployeeNewComponent } from './main/admin/layout/pages/employee/employee-new/employee-new.component';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    UiModule,
    StoreModule.forRoot<AppState>(appReducer, {}),
    EffectsModule.forRoot([AppNotificationEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),

  ],
  providers: [...httpInterceptorProviders, MessageService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
