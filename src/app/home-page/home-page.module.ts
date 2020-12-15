import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Material
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Routing
import { HomePageRoutingModule } from './home-page-routing.module';
// Components
import { ErrorMessagesComponent } from '../core/error-messages/error-messages.component';
import { HomePageComponent } from './home-page.component';
// Services

@NgModule({
  declarations: [
    ErrorMessagesComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    // Angular Material
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: []
})
export class HomePageModule { }
