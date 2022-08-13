import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { CurrentTrackComponent } from './current-track/current-track.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistListComponent,
    LayoutComponent,
    HeaderComponent,
    LeftSidebarComponent,
    CurrentTrackComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
