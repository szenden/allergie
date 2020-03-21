import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpErrorHandler }  from './services/http-error-handler.service';
import { ProductComponent } from './product/product.component'
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent, 
    ProductComponent, 
    NewsDetailComponent, 
    LoginComponent,
    ProfileComponent,
    RegisterComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpErrorHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
