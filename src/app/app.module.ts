import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { DataServices } from './_services/data';
import { BaseObservableDataService } from './_services/core/base-observable-data.service';
import { RestClientService } from './_services/core/rest-client.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent,
		MainLayoutComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		NgbModule
	],
	providers: [
		BaseObservableDataService,
		RestClientService,
		DataServices,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
