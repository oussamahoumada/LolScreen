import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from './app.component';
import { ChampionsComponent } from './champions/champions.component';
import { ChampionsListComponent } from './champions/champions-list/champions-list.component';
import { DetailsComponent } from './champions/details/details.component';


@NgModule({
  declarations: [
    AppComponent,
    ChampionsComponent,
    ChampionsListComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
